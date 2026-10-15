import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Printer,
  Paintbrush,
  Eraser,
  Sparkles,
  Palette,
  Sliders,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Check,
  Search,
  PenTool,
  Droplet,
  Feather,
  RefreshCw,
  Compass,
  Move,
} from 'lucide-react';
import { SWATCH_FAMILIES } from '../data/paintStudioSwatches';
import { ColorPickerModal } from './ColorPickerModal';
import { floodFill, hexToRgb } from '../utils/canvasColorUtils';

interface ColoringStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplateIndex?: number;
  onShowToast: (msg: string) => void;
}

export type ToolType = 'brush' | 'smudge' | 'vector-pen' | 'fill' | 'watercolor' | 'marker' | 'eraser';

interface Point {
  x: number;
  y: number;
  pressure: number;
}

interface Template {
  id: string;
  title: string;
  category: string;
  icon: string;
  difficulty: string;
  drawOutline: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

export const ColoringStudioModal: React.FC<ColoringStudioModalProps> = ({
  isOpen,
  onClose,
  initialTemplateIndex = 0,
  onShowToast,
}) => {
  // Canvases:
  // 1. colorCanvas: stores user painted strokes and fills
  // 2. outlineCanvas: offscreen canvas caching the crisp vector line art
  // 3. displayCanvas: combined presentation canvas
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const colorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Studio configuration
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(initialTemplateIndex);
  const [currentColor, setCurrentColor] = useState('#e07a5f');
  const [brushSize, setBrushSize] = useState(12);
  const [brushOpacity, setBrushOpacity] = useState(1.0);
  const [brushHardness, setBrushHardness] = useState(85); // 0-100%
  const [activeTool, setActiveTool] = useState<ToolType>('brush');
  const [enablePressure, setEnablePressure] = useState(true);
  const [pressureSensitivity, setPressureSensitivity] = useState(1.2);
  const [symmetryMode, setSymmetryMode] = useState<'none' | 'mirror' | 'radial-4' | 'radial-8' | 'radial-16'>('none');

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Intelligent Cursor Tracking
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);

  // Undo / Redo History (stored on color canvas)
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Color Palette UI
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('all');
  const [swatchSearchQuery, setSwatchSearchQuery] = useState('');
  const [recentColors, setRecentColors] = useState<string[]>([
    '#e07a5f', '#81b29a', '#f2cc8f', '#3d405b', '#f4f1de', '#d4af37', '#ff007f', '#00f5d4',
  ]);

  // Vector Pen Tool Anchors
  const [vectorPoints, setVectorPoints] = useState<{ x: number; y: number }[]>([]);

  // Drawing state
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);

  // High-res internal dimensions (1200 x 1200 for crisp 300 DPI vectors)
  const CANVAS_SIZE = 1200;

  // 6 Handcrafted High-Precision Line Art Master Templates
  const templates: Template[] = [
    {
      id: 'mandala-zen',
      title: 'Sacred Floral Mandala',
      category: 'Adult Relaxation',
      icon: '🌸',
      difficulty: 'Intricate • Master',
      drawOutline: (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        ctx.save();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer ornamental border circles
        ctx.beginPath();
        ctx.arc(cx, cy, 520, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 480, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 430, 0, Math.PI * 2);
        ctx.stroke();

        // 16 Concentric Lotus Petals
        for (let i = 0; i < 16; i++) {
          const angle = (i * Math.PI * 2) / 16;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);

          // Outer Petal
          ctx.beginPath();
          ctx.moveTo(0, -140);
          ctx.bezierCurveTo(110, -260, 95, -400, 0, -480);
          ctx.bezierCurveTo(-95, -400, -110, -260, 0, -140);
          ctx.stroke();

          // Petal Spine & Droplets
          ctx.beginPath();
          ctx.moveTo(0, -160);
          ctx.lineTo(0, -440);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, -350, 9, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, -280, 6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        }

        // Inner 8 Sacred Geometry Diamond Petals
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8 + Math.PI / 8;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.moveTo(0, -70);
          ctx.lineTo(85, -190);
          ctx.lineTo(0, -310);
          ctx.lineTo(-85, -190);
          ctx.closePath();
          ctx.stroke();

          // Inner mini tear
          ctx.beginPath();
          ctx.moveTo(0, -110);
          ctx.quadraticCurveTo(35, -180, 0, -250);
          ctx.quadraticCurveTo(-35, -180, 0, -110);
          ctx.stroke();

          ctx.restore();
        }

        // Central Floral Rosette
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.arc(0, -50, 22, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Center jewel
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      },
    },
    {
      id: 'safari-lion',
      title: 'Little Safari King Lion',
      category: 'Kids Adventure',
      icon: '🦁',
      difficulty: 'Beginner • Bold Outlines',
      drawOutline: (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2 - 30;
        ctx.save();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Big Fluffy Mane
        for (let i = 0; i < 16; i++) {
          const angle = (i * Math.PI * 2) / 16;
          const r1 = 330;
          const r2 = 450;
          const x1 = cx + Math.cos(angle - 0.18) * r1;
          const y1 = cy + Math.sin(angle - 0.18) * r1;
          const tipX = cx + Math.cos(angle) * r2;
          const tipY = cy + Math.sin(angle) * r2;
          const x2 = cx + Math.cos(angle + 0.18) * r1;
          const y2 = cy + Math.sin(angle + 0.18) * r1;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(tipX, tipY, x2, y2);
          ctx.stroke();
        }

        // Face outline
        ctx.beginPath();
        ctx.arc(cx, cy, 260, 0, Math.PI * 2);
        ctx.stroke();

        // Round Cute Ears
        ctx.beginPath();
        ctx.arc(cx - 180, cy - 190, 75, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 180, cy - 190, 38, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + 180, cy - 190, 75, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 180, cy - 190, 38, 0, Math.PI * 2);
        ctx.stroke();

        // Kawaii Eyes
        ctx.beginPath();
        ctx.arc(cx - 85, cy - 35, 34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 85, cy - 35, 34, 0, Math.PI * 2);
        ctx.stroke();

        // Eye highlights
        ctx.beginPath();
        ctx.arc(cx - 93, cy - 42, 10, 0, Math.PI * 2);
        ctx.arc(cx + 77, cy - 42, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Cute Triangle Nose
        ctx.beginPath();
        ctx.moveTo(cx - 38, cy + 35);
        ctx.lineTo(cx + 38, cy + 35);
        ctx.lineTo(cx, cy + 78);
        ctx.closePath();
        ctx.stroke();

        // Smile Muzzle
        ctx.beginPath();
        ctx.moveTo(cx, cy + 78);
        ctx.lineTo(cx, cy + 115);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx - 35, cy + 120, 35, 0, Math.PI * 0.9);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + 35, cy + 120, 35, Math.PI * 0.1, Math.PI);
        ctx.stroke();

        // Whiskers
        ctx.beginPath();
        ctx.moveTo(cx - 120, cy + 85);
        ctx.lineTo(cx - 200, cy + 78);
        ctx.moveTo(cx - 120, cy + 110);
        ctx.lineTo(cx - 205, cy + 125);
        ctx.moveTo(cx + 120, cy + 85);
        ctx.lineTo(cx + 200, cy + 78);
        ctx.moveTo(cx + 120, cy + 110);
        ctx.lineTo(cx + 205, cy + 125);
        ctx.stroke();

        // Royal Crown
        ctx.beginPath();
        ctx.moveTo(cx - 80, cy - 260);
        ctx.lineTo(cx - 80, cy - 340);
        ctx.lineTo(cx - 40, cy - 300);
        ctx.lineTo(cx, cy - 360);
        ctx.lineTo(cx + 40, cy - 300);
        ctx.lineTo(cx + 80, cy - 340);
        ctx.lineTo(cx + 80, cy - 260);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      },
    },
    {
      id: 'celestial-moon',
      title: 'Celestial Goddess & Moon Phases',
      category: 'Aesthetic Line Art',
      icon: '🌙',
      difficulty: 'Medium • Fine Details',
      drawOutline: (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        ctx.save();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Giant Crescent Moon
        ctx.beginPath();
        ctx.arc(cx, cy, 440, -Math.PI * 0.45, Math.PI * 0.45, false);
        ctx.bezierCurveTo(cx - 120, cy + 300, cx - 120, cy - 300, cx + 440 * Math.cos(-Math.PI * 0.45), cy + 440 * Math.sin(-Math.PI * 0.45));
        ctx.stroke();

        // Sleeping Goddess Profile inside Moon
        ctx.beginPath();
        ctx.moveTo(cx - 30, cy - 180);
        ctx.bezierCurveTo(cx + 20, cy - 140, cx + 50, cy - 110, cx + 70, cy - 60); // Forehead
        ctx.bezierCurveTo(cx + 80, cy - 40, cx + 90, cy - 20, cx + 110, cy - 10); // Nose tip
        ctx.lineTo(cx + 80, cy + 15); // Under nose
        ctx.bezierCurveTo(cx + 95, cy + 25, cx + 95, cy + 38, cx + 80, cy + 50); // Upper lip
        ctx.bezierCurveTo(cx + 90, cy + 62, cx + 85, cy + 72, cx + 70, cy + 82); // Lower lip
        ctx.bezierCurveTo(cx + 85, cy + 115, cx + 65, cy + 145, cx + 30, cy + 170); // Chin & jaw
        ctx.stroke();

        // Closed Serene Eye & Lashes
        ctx.beginPath();
        ctx.arc(cx + 35, cy - 30, 22, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        // Flowing Celestial Hair strands
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(cx - 30, cy - 180 + i * 40);
          ctx.bezierCurveTo(cx - 200, cy - 100 + i * 50, cx - 350, cy + 50 + i * 40, cx - 420, cy + 250 + i * 30);
          ctx.stroke();
        }

        // Sparkling Starlight Stars
        const starLocations = [
          { x: cx + 220, y: cy - 260, r: 24 },
          { x: cx + 320, y: cy - 100, r: 18 },
          { x: cx + 280, y: cy + 120, r: 22 },
          { x: cx + 180, y: cy + 280, r: 16 },
          { x: cx - 240, y: cy - 280, r: 20 },
        ];

        starLocations.forEach(star => {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.r);
          ctx.lineTo(star.x + star.r * 0.3, star.y - star.r * 0.3);
          ctx.lineTo(star.x + star.r, star.y);
          ctx.lineTo(star.x + star.r * 0.3, star.y + star.r * 0.3);
          ctx.lineTo(star.x, star.y + star.r);
          ctx.lineTo(star.x - star.r * 0.3, star.y + star.r * 0.3);
          ctx.lineTo(star.x - star.r, star.y);
          ctx.lineTo(star.x - star.r * 0.3, star.y - star.r * 0.3);
          ctx.closePath();
          ctx.stroke();
        });

        ctx.restore();
      },
    },
    {
      id: 'botanical-peonies',
      title: 'Botanical Peony & Wildflower Garden',
      category: 'Florals & Plants',
      icon: '🌿',
      difficulty: 'Intermediate • Elegant',
      drawOutline: (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        ctx.save();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Terracotta planter base
        ctx.beginPath();
        ctx.moveTo(cx - 160, cy + 240);
        ctx.lineTo(cx + 160, cy + 240);
        ctx.lineTo(cx + 120, cy + 450);
        ctx.lineTo(cx - 120, cy + 450);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx, cy + 240, 170, 26, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Large Center Peony
        ctx.beginPath();
        ctx.arc(cx, cy - 20, 100, 0, Math.PI * 2);
        ctx.stroke();

        // Concentric swirling lush petals
        ctx.beginPath();
        ctx.arc(cx, cy - 20, 70, 0.4, Math.PI * 1.8);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 10, cy - 20, 42, 1, Math.PI * 2.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy - 25, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Left Daisy
        const lx = cx - 210;
        const ly = cy - 110;
        ctx.beginPath();
        ctx.arc(lx, ly, 38, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 10; i++) {
          const a = (i * Math.PI * 2) / 10;
          ctx.beginPath();
          ctx.ellipse(lx + Math.cos(a) * 65, ly + Math.sin(a) * 65, 32, 14, a, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Right Sunflower
        const rx = cx + 200;
        const ry = cy - 90;
        ctx.beginPath();
        ctx.arc(rx, ry, 50, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI * 2) / 12;
          ctx.beginPath();
          ctx.ellipse(rx + Math.cos(a) * 85, ry + Math.sin(a) * 85, 38, 16, a, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Eucalyptus leaves
        ctx.beginPath();
        ctx.moveTo(cx, cy - 120);
        ctx.quadraticCurveTo(cx - 30, cy - 280, cx - 50, cy - 420);
        ctx.stroke();

        for (let i = 0; i < 6; i++) {
          const ey = cy - 150 - i * 45;
          ctx.beginPath();
          ctx.ellipse(cx - 70, ey, 32, 18, -0.4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(cx - 20, ey - 15, 32, 18, 0.4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      },
    },
    {
      id: 'stained-butterfly',
      title: 'Mystical Stained Glass Butterfly',
      category: 'Art Deco & Mandalas',
      icon: '🦋',
      difficulty: 'Intricate • Segmented',
      drawOutline: (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        ctx.save();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Butterfly Body & Head
        ctx.beginPath();
        ctx.ellipse(cx, cy, 18, 110, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy - 130, 24, 0, Math.PI * 2);
        ctx.stroke();

        // Antennae
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 150);
        ctx.quadraticCurveTo(cx - 70, cy - 240, cx - 120, cy - 220);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 120, cy - 220, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + 8, cy - 150);
        ctx.quadraticCurveTo(cx + 70, cy - 240, cx + 120, cy - 220);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 120, cy - 220, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Symmetric Stained Glass Wings
        [-1, 1].forEach(side => {
          // Upper Wing Outline
          ctx.beginPath();
          ctx.moveTo(cx + side * 15, cy - 60);
          ctx.bezierCurveTo(cx + side * 160, cy - 350, cx + side * 420, cy - 320, cx + side * 480, cy - 140);
          ctx.bezierCurveTo(cx + side * 440, cy + 40, cx + side * 220, cy + 40, cx + side * 15, cy + 20);
          ctx.stroke();

          // Internal Stained Glass Cells Upper Wing
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(cx + side * 20, cy - 50);
            ctx.lineTo(cx + side * (120 + i * 70), cy - 200 + i * 35);
            ctx.stroke();
          }

          // Lower Wing Outline
          ctx.beginPath();
          ctx.moveTo(cx + side * 15, cy + 20);
          ctx.bezierCurveTo(cx + side * 280, cy + 40, cx + side * 380, cy + 260, cx + side * 200, cy + 400);
          ctx.bezierCurveTo(cx + side * 100, cy + 440, cx + side * 40, cy + 300, cx + side * 15, cy + 90);
          ctx.stroke();

          // Internal Lower Cells
          ctx.beginPath();
          ctx.arc(cx + side * 180, cy + 240, 45, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Ornate Diamond Border Frame
        ctx.beginPath();
        ctx.moveTo(cx, 40);
        ctx.lineTo(w - 40, cy);
        ctx.lineTo(cx, h - 40);
        ctx.lineTo(40, cy);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      },
    },
    {
      id: 'zen-koi-pond',
      title: 'Japanese Zen Koi & Water Lotus',
      category: 'Zen & Nature',
      icon: '🎏',
      difficulty: 'Medium • Calming',
      drawOutline: (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        ctx.save();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Pond Ripple Rings
        for (let r = 200; r <= 520; r += 120) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.setLineDash([15, 25]);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Two Swimming Yin-Yang Koi Fish
        [0, Math.PI].forEach(rotation => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rotation);

          // Fish Body
          ctx.beginPath();
          ctx.moveTo(0, -220); // Head
          ctx.bezierCurveTo(120, -180, 110, 0, 40, 140); // Right flank
          ctx.bezierCurveTo(10, 200, 5, 230, 0, 260); // Tail base
          ctx.bezierCurveTo(-5, 230, -10, 200, -40, 140); // Left flank
          ctx.bezierCurveTo(-110, 0, -120, -180, 0, -220); // Left head
          ctx.stroke();

          // Flowing Tail Fins
          ctx.beginPath();
          ctx.moveTo(0, 260);
          ctx.bezierCurveTo(80, 320, 110, 400, 30, 460);
          ctx.bezierCurveTo(0, 410, 0, 340, 0, 260);
          ctx.bezierCurveTo(0, 340, 0, 410, -30, 460);
          ctx.bezierCurveTo(-110, 400, -80, 320, 0, 260);
          ctx.stroke();

          // Pectoral Fins
          ctx.beginPath();
          ctx.moveTo(85, -80);
          ctx.bezierCurveTo(190, -80, 210, 0, 80, -20);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-85, -80);
          ctx.bezierCurveTo(-190, -80, -210, 0, -80, -20);
          ctx.stroke();

          // Scales lines
          for (let s = -100; s <= 100; s += 40) {
            ctx.beginPath();
            ctx.arc(0, s, 25, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.stroke();
          }

          ctx.restore();
        });

        // Floating Lotus Lily Pad in corner
        ctx.beginPath();
        ctx.arc(cx - 320, cy - 320, 110, 0.35, Math.PI * 1.85);
        ctx.lineTo(cx - 320, cy - 320);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      },
    },
  ];

  // Initialize Color Canvas & Line Art Outline
  const initCanvases = useCallback((templateIdx = selectedTemplateIndex) => {
    // 1. Create color canvas offscreen buffer
    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = CANVAS_SIZE;
    colorCanvas.height = CANVAS_SIZE;
    const colorCtx = colorCanvas.getContext('2d', { willReadFrequently: true });
    if (!colorCtx) return;

    // Fill pristine white
    colorCtx.fillStyle = '#ffffff';
    colorCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    colorCanvasRef.current = colorCanvas;

    // 2. Create outline canvas offscreen buffer
    const outlineCanvas = document.createElement('canvas');
    outlineCanvas.width = CANVAS_SIZE;
    outlineCanvas.height = CANVAS_SIZE;
    const outlineCtx = outlineCanvas.getContext('2d');
    if (!outlineCtx) return;

    outlineCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const tmpl = templates[templateIdx];
    if (tmpl) {
      tmpl.drawOutline(outlineCtx, CANVAS_SIZE, CANVAS_SIZE);
    }
    outlineCanvasRef.current = outlineCanvas;

    // 3. Composite onto display canvas
    renderDisplay();

    // 4. Save to history stack
    const initialImg = colorCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setHistory([initialImg]);
    setHistoryStep(0);
    setVectorPoints([]);
  }, [selectedTemplateIndex]);

  // Composite Color Layer + Outline Layer onto Display Canvas
  const renderDisplay = useCallback(() => {
    const displayCanvas = displayCanvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    const outlineCanvas = outlineCanvasRef.current;
    if (!displayCanvas || !colorCanvas || !outlineCanvas) return;

    const ctx = displayCanvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw painted color layer
    ctx.drawImage(colorCanvas, 0, 0);

    // Overlay crisp vector outline on top so it never smears!
    ctx.drawImage(outlineCanvas, 0, 0);

    // If using vector-pen, draw active curve path preview
    if (vectorPoints.length > 0) {
      ctx.save();
      ctx.strokeStyle = currentColor;
      ctx.fillStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(vectorPoints[0].x, vectorPoints[0].y);
      for (let i = 1; i < vectorPoints.length; i++) {
        ctx.lineTo(vectorPoints[i].x, vectorPoints[i].y);
      }
      ctx.stroke();

      // Draw anchor handles
      vectorPoints.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0f172a';
        ctx.stroke();
      });
      ctx.restore();
    }
  }, [currentColor, brushSize, vectorPoints]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        initCanvases(selectedTemplateIndex);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedTemplateIndex, initCanvases]);

  // Push new state to history
  const pushState = () => {
    const colorCanvas = colorCanvasRef.current;
    if (!colorCanvas) return;
    const ctx = colorCanvas.getContext('2d');
    if (!ctx) return;

    const currentImg = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(currentImg);
    if (newHistory.length > 30) newHistory.shift();

    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const nextStep = historyStep - 1;
      const colorCanvas = colorCanvasRef.current;
      if (!colorCanvas) return;
      const ctx = colorCanvas.getContext('2d');
      if (!ctx) return;

      ctx.putImageData(history[nextStep], 0, 0);
      setHistoryStep(nextStep);
      renderDisplay();
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const nextStep = historyStep + 1;
      const colorCanvas = colorCanvasRef.current;
      if (!colorCanvas) return;
      const ctx = colorCanvas.getContext('2d');
      if (!ctx) return;

      ctx.putImageData(history[nextStep], 0, 0);
      setHistoryStep(nextStep);
      renderDisplay();
    }
  };

  const handleClear = () => {
    if (window.confirm('Reset this coloring masterpiece back to blank line art?')) {
      initCanvases(selectedTemplateIndex);
      onShowToast('Canvas reset to fresh pristine lines.');
    }
  };

  // Coordinates Converter (handling display zoom, pan, and canvas scale)
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
    const rect = canvas.getBoundingClientRect();

    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Stylus pressure check
    let pressure = e.pressure;
    if (pressure === 0 || pressure === undefined || isNaN(pressure)) {
      pressure = 0.5; // fallback for non-pressure mouse
    }

    return { x, y, pressure };
  };

  // Radial Symmetry Transformation Helpers
  const getSymmetricPoints = (pt: Point): Point[] => {
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;

    if (symmetryMode === 'none') return [pt];

    if (symmetryMode === 'mirror') {
      const mirroredX = cx - (pt.x - cx);
      return [pt, { x: mirroredX, y: pt.y, pressure: pt.pressure }];
    }

    const folds = symmetryMode === 'radial-4' ? 4 : symmetryMode === 'radial-8' ? 8 : 16;
    const points: Point[] = [];
    const relX = pt.x - cx;
    const relY = pt.y - cy;
    const radius = Math.sqrt(relX * relX + relY * relY);
    const initialAngle = Math.atan2(relY, relX);

    for (let i = 0; i < folds; i++) {
      const angle = initialAngle + (i * 2 * Math.PI) / folds;
      points.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        pressure: pt.pressure,
      });
    }

    return points;
  };

  // High-performance Smudge / Blender Implementation
  const applySmudge = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point) => {
    const radius = Math.round(brushSize * 1.4);
    const steps = Math.max(1, Math.floor(Math.hypot(p2.x - p1.x, p2.y - p1.y) / 4));

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const curX = Math.round(p1.x + (p2.x - p1.x) * t);
      const curY = Math.round(p1.y + (p2.y - p1.y) * t);

      const diameter = radius * 2;
      const sx = Math.max(0, curX - radius);
      const sy = Math.max(0, curY - radius);
      const w = Math.min(CANVAS_SIZE - sx, diameter);
      const h = Math.min(CANVAS_SIZE - sy, diameter);

      if (w <= 0 || h <= 0) continue;

      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.drawImage(
        ctx.canvas,
        sx,
        sy,
        w,
        h,
        sx + (p2.x - p1.x) * 0.1,
        sy + (p2.y - p1.y) * 0.1,
        w,
        h
      );
      ctx.restore();
    }
  };

  // Stroke Smoothing Draw Step (Quadratic Bezier with midpoint interpolation)
  const drawStrokeSegment = (
    ctx: CanvasRenderingContext2D,
    p0: Point,
    p1: Point,
    p2: Point,
    tool: ToolType
  ) => {
    const sym0 = getSymmetricPoints(p0);
    const sym1 = getSymmetricPoints(p1);
    const sym2 = getSymmetricPoints(p2);

    for (let i = 0; i < sym1.length; i++) {
      const pt0 = sym0[i] || p0;
      const pt1 = sym1[i] || p1;
      const pt2 = sym2[i] || p2;

      const mid1X = (pt0.x + pt1.x) / 2;
      const mid1Y = (pt0.y + pt1.y) / 2;
      const mid2X = (pt1.x + pt2.x) / 2;
      const mid2Y = (pt1.y + pt2.y) / 2;

      // Calculate width and opacity with pressure scaling
      let effectiveSize = brushSize;
      let effectiveAlpha = brushOpacity;

      if (enablePressure) {
        const pressureFactor = Math.pow(pt1.pressure, pressureSensitivity);
        effectiveSize = Math.max(2, brushSize * (0.35 + 0.65 * pressureFactor));
        effectiveAlpha = Math.max(0.2, brushOpacity * (0.4 + 0.6 * pressureFactor));
      }

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = effectiveSize * 1.8;
        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.moveTo(mid1X, mid1Y);
        ctx.quadraticCurveTo(pt1.x, pt1.y, mid2X, mid2Y);
        ctx.stroke();
      } else if (tool === 'smudge') {
        applySmudge(ctx, pt1, pt2);
      } else if (tool === 'watercolor') {
        // Soft translucent glazing
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = effectiveSize * 2.2;
        ctx.globalAlpha = effectiveAlpha * 0.22;
        ctx.shadowColor = currentColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(mid1X, mid1Y);
        ctx.quadraticCurveTo(pt1.x, pt1.y, mid2X, mid2Y);
        ctx.stroke();
      } else if (tool === 'marker') {
        // Semi-transparent vibrant chisel marker
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = effectiveSize * 1.5;
        ctx.globalAlpha = effectiveAlpha * 0.75;
        ctx.beginPath();
        ctx.moveTo(mid1X, mid1Y);
        ctx.quadraticCurveTo(pt1.x, pt1.y, mid2X, mid2Y);
        ctx.stroke();
      } else {
        // Precision micro-brush
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = effectiveSize;
        ctx.globalAlpha = effectiveAlpha;
        if (brushHardness < 80) {
          ctx.shadowColor = currentColor;
          ctx.shadowBlur = ((100 - brushHardness) / 100) * (brushSize * 0.7);
        }
        ctx.beginPath();
        ctx.moveTo(mid1X, mid1Y);
        ctx.quadraticCurveTo(pt1.x, pt1.y, mid2X, mid2Y);
        ctx.stroke();
      }

      ctx.restore();
    }
  };

  // Pointer Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // If Space or Pan tool is active
    if (isPanning || e.button === 1 || (e.altKey && e.button === 0)) {
      panStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
      return;
    }

    const coords = getCanvasCoords(e);

    // Vector Pen Mode: Add anchor point
    if (activeTool === 'vector-pen') {
      const nextPoints = [...vectorPoints, { x: coords.x, y: coords.y }];
      setVectorPoints(nextPoints);
      renderDisplay();
      return;
    }

    // Fill Bucket Mode: Instant Flood Fill
    if (activeTool === 'fill') {
      const colorCanvas = colorCanvasRef.current;
      if (!colorCanvas) return;
      const ctx = colorCanvas.getContext('2d');
      if (!ctx) return;

      const filled = floodFill(ctx, coords.x, coords.y, currentColor, 32);
      if (filled) {
        renderDisplay();
        pushState();
        onShowToast('Filled area with zero line bleed.');
      }
      return;
    }

    // Drawing brush/eraser/smudge
    isDrawingRef.current = true;
    pointsRef.current = [coords, coords, coords];

    const colorCanvas = colorCanvasRef.current;
    if (!colorCanvas) return;
    const ctx = colorCanvas.getContext('2d');
    if (!ctx) return;

    // Stamp single point
    drawStrokeSegment(ctx, coords, coords, coords, activeTool);
    renderDisplay();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Track cursor for Intelligent Cursor Visual
    const canvas = displayCanvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    // Handle Pan
    if (isPanning && e.buttons === 1) {
      setPanOffset({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
      return;
    }

    if (!isDrawingRef.current) return;

    const coords = getCanvasCoords(e);
    pointsRef.current.push(coords);

    if (pointsRef.current.length > 3) {
      pointsRef.current.shift();
    }

    const colorCanvas = colorCanvasRef.current;
    if (!colorCanvas) return;
    const ctx = colorCanvas.getContext('2d');
    if (!ctx) return;

    const [p0, p1, p2] = pointsRef.current;
    drawStrokeSegment(ctx, p0, p1, p2, activeTool);
    renderDisplay();
  };

  const handlePointerUp = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      pointsRef.current = [];
      renderDisplay();
      pushState();
    }
  };

  // Commit Vector Pen Path to Color Canvas
  const commitVectorPath = () => {
    if (vectorPoints.length < 2) {
      setVectorPoints([]);
      return;
    }

    const colorCanvas = colorCanvasRef.current;
    if (!colorCanvas) return;
    const ctx = colorCanvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = brushOpacity;

    ctx.beginPath();
    ctx.moveTo(vectorPoints[0].x, vectorPoints[0].y);
    for (let i = 1; i < vectorPoints.length; i++) {
      ctx.lineTo(vectorPoints[i].x, vectorPoints[i].y);
    }
    ctx.stroke();
    ctx.restore();

    setVectorPoints([]);
    renderDisplay();
    pushState();
    onShowToast('Vector pen curve committed to canvas.');
  };

  // High-Resolution 300 DPI Export
  const handleDownload = () => {
    const displayCanvas = displayCanvasRef.current;
    if (!displayCanvas) return;

    // Render at full 300 DPI 1200x1200 master with watermark
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = CANVAS_SIZE;
    exportCanvas.height = CANVAS_SIZE;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(displayCanvas, 0, 0);

    // Watermark
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText('Pageo Studio • 300 DPI Print Master', CANVAS_SIZE - 40, CANVAS_SIZE - 35);

    const link = document.createElement('a');
    link.download = `pageo-masterpiece-${templates[selectedTemplateIndex].id}-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png', 1.0);
    link.click();
    onShowToast('🎉 Masterpiece downloaded! High-res 300 DPI PNG saved.');
  };

  // Print Masterpiece
  const handlePrint = () => {
    const displayCanvas = displayCanvasRef.current;
    if (!displayCanvas) return;
    const dataUrl = displayCanvas.toDataURL('image/png', 1.0);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Pageo Coloring Masterpiece - 300 DPI Print</title>
            <style>
              body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; font-family: sans-serif; }
              img { max-width: 95%; max-height: 95vh; object-fit: contain; }
              @media print { body { -webkit-print-color-adjust: exact; } }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleSelectColor = (color: string) => {
    setCurrentColor(color);
    if (activeTool === 'eraser') setActiveTool('brush');
  };

  const handleAddRecentColor = (color: string) => {
    setRecentColors(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== color.toLowerCase());
      return [color, ...filtered].slice(0, 20);
    });
  };

  // Filter swatches based on family tab & query
  const displayedSwatches = React.useMemo(() => {
    let list = SWATCH_FAMILIES.flatMap(fam => fam.colors);
    if (selectedFamilyId !== 'all') {
      const family = SWATCH_FAMILIES.find(f => f.id === selectedFamilyId);
      list = family ? family.colors : list;
    }
    if (swatchSearchQuery.trim()) {
      const q = swatchSearchQuery.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q));
    }
    return list;
  }, [selectedFamilyId, swatchSearchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none text-[var(--text-main)]">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-6xl w-full h-[96vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Studio Top Toolbar */}
        <div className="px-4 py-2.5 border-b border-[var(--card-border)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-card)] flex-shrink-0">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-purple-600 p-0.5 shadow-md shadow-rose-500/20">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-[10px] flex items-center justify-center text-lg">
                🎨
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-sm sm:text-base">
                  Pageo Pro Paint Studio
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono">
                  Steek Brush Engine • 300 DPI
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] hidden md:block">
                Protected vector outlines • 126+ curated pigments • Bezier smoothing & stylus dynamics
              </p>
            </div>
          </div>

          {/* Canvas Navigation & Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Undo / Redo */}
            <div className="flex items-center bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--card-border)] p-0.5">
              <button
                onClick={handleUndo}
                disabled={historyStep <= 0}
                className="p-1.5 rounded-lg text-[var(--text-main)] disabled:opacity-30 hover:bg-rose-500/10 transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyStep >= history.length - 1}
                className="p-1.5 rounded-lg text-[var(--text-main)] disabled:opacity-30 hover:bg-rose-500/10 transition-colors"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--card-border)] p-0.5 text-xs font-mono">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                className="p-1.5 hover:text-rose-500"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-bold">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.25))}
                className="p-1.5 hover:text-rose-500"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="p-1.5 hover:text-rose-500"
                title="Reset View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Symmetry Menu */}
            <div className="flex items-center bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--card-border)] p-1 text-xs">
              <Compass className="w-3.5 h-3.5 text-amber-500 mr-1 hidden sm:inline" />
              <select
                value={symmetryMode}
                onChange={(e) => setSymmetryMode(e.target.value as any)}
                className="bg-transparent text-[11px] font-bold text-[var(--text-main)] outline-none cursor-pointer"
                title="Radial Mandala Symmetry"
              >
                <option value="none">Symmetry: Off</option>
                <option value="mirror">Mirror X</option>
                <option value="radial-4">4x Mandala</option>
                <option value="radial-8">8x Mandala</option>
                <option value="radial-16">16x Kaleidoscope</option>
              </select>
            </div>

            {/* Clear Canvas */}
            <button
              onClick={handleClear}
              className="p-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-rose-500 hover:border-rose-400 transition-colors"
              title="Reset Line Art"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Print & Download */}
            <button
              onClick={handlePrint}
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-md shadow-rose-500/20 transition-all hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" /> Download 300 DPI
            </button>

            {/* Close Studio */}
            <button
              onClick={onClose}
              aria-label="Close studio"
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[var(--bg-main)]">
          
          {/* Main Interactive Canvas Stage */}
          <div
            className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden relative cursor-default select-none"
            onPointerEnter={() => setIsPointerInside(true)}
            onPointerLeave={() => {
              setIsPointerInside(false);
              setCursorPos(null);
            }}
          >
            {/* Viewport Transform Wrapper */}
            <div
              className="relative shadow-2xl rounded-2xl border border-[var(--card-border)] bg-white overflow-hidden transition-transform duration-75 ease-out"
              style={{
                width: 'min(78vh, 600px)',
                height: 'min(78vh, 600px)',
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                cursor: isPanning ? 'grab' : 'none', // We render the intelligent cursor
              }}
            >
              <canvas
                ref={displayCanvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="w-full h-full touch-none select-none bg-white block"
                style={{ imageRendering: 'auto' }}
              />

              {/* Watermark badge at bottom-right */}
              <div className="absolute bottom-2.5 right-3.5 text-[9px] font-mono font-bold text-gray-400 pointer-events-none select-none">
                Pageo Pro Canvas • Anti-Bleed Master
              </div>

              {/* Vector Pen Path Commit Bar when points active */}
              {vectorPoints.length > 0 && (
                <div className="absolute top-3 left-3 right-3 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl flex items-center justify-between text-xs animate-fadeIn z-20">
                  <span className="font-semibold flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-rose-400" />
                    Vector Path: {vectorPoints.length} anchor points
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setVectorPoints([])}
                      className="px-2 py-1 text-[11px] rounded bg-white/10 hover:bg-white/20"
                    >
                      Cancel Path
                    </button>
                    <button
                      onClick={commitVectorPath}
                      className="px-3 py-1 text-[11px] font-bold rounded bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Commit Line
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Intelligent Visual Cursor (Dynamic size, hardness ring & active color dot) */}
            {isPointerInside && cursorPos && !isPanning && (
              <div
                className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{
                  left: cursorPos.x + (displayCanvasRef.current?.getBoundingClientRect().left || 0),
                  top: cursorPos.y + (displayCanvasRef.current?.getBoundingClientRect().top || 0),
                }}
              >
                {/* Outer Hardness / Diameter Ring */}
                <div
                  className="rounded-full border border-black/40 dark:border-white/60 shadow-[0_0_2px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center"
                  style={{
                    width: Math.max(8, brushSize * zoomLevel * (activeTool === 'eraser' ? 1.8 : 1)),
                    height: Math.max(8, brushSize * zoomLevel * (activeTool === 'eraser' ? 1.8 : 1)),
                    backgroundColor:
                      activeTool === 'eraser'
                        ? 'rgba(255,255,255,0.4)'
                        : activeTool === 'smudge'
                        ? 'rgba(168,85,247,0.2)'
                        : `${currentColor}33`,
                  }}
                >
                  {/* Center Core Dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full border border-white shadow-sm"
                    style={{
                      backgroundColor:
                        activeTool === 'eraser'
                          ? '#ffffff'
                          : activeTool === 'smudge'
                          ? '#a855f7'
                          : currentColor,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Professional Studio Sidebar (Tools, Swatches, Precision Controls) */}
          <div className="w-full lg:w-96 bg-[var(--bg-card)] border-t lg:border-t-0 lg:border-l border-[var(--card-border)] p-4 flex flex-col justify-between overflow-y-auto space-y-4">
            
            {/* 1. Precision Toolset */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono flex items-center justify-between">
                <span>Precision Toolset</span>
                <span className="text-rose-500 font-bold">{activeTool.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 gap-1.5">
                
                {/* Precision Brush */}
                <button
                  onClick={() => setActiveTool('brush')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'brush'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Precision Steek Brush with micro-detail smoothing"
                >
                  <Paintbrush className="w-4 h-4" />
                  <span className="text-[10px]">Brush</span>
                </button>

                {/* Soft Blender Smudge */}
                <button
                  onClick={() => setActiveTool('smudge')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'smudge'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Soft Blender Smudge for authentic pigment mixing"
                >
                  <Feather className="w-4 h-4" />
                  <span className="text-[10px]">Smudge</span>
                </button>

                {/* Vector Pen Tool */}
                <button
                  onClick={() => setActiveTool('vector-pen')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'vector-pen'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Vector Pen Tool for sharp, editable line art paths"
                >
                  <PenTool className="w-4 h-4" />
                  <span className="text-[10px]">Vector Pen</span>
                </button>

                {/* Fill Bucket Tool */}
                <button
                  onClick={() => setActiveTool('fill')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'fill'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Instant Flood Fill into enclosed coloring sections"
                >
                  <Droplet className="w-4 h-4" />
                  <span className="text-[10px]">Fill Bucket</span>
                </button>

                {/* Watercolor Glaze */}
                <button
                  onClick={() => setActiveTool('watercolor')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'watercolor'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Soft translucent multi-layer watercolor glaze"
                >
                  <span className="text-sm">💧</span>
                  <span className="text-[10px]">Glaze</span>
                </button>

                {/* Chisel Marker */}
                <button
                  onClick={() => setActiveTool('marker')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'marker'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Semi-opaque vibrant marker chisel stroke"
                >
                  <span className="text-sm font-bold">✒️</span>
                  <span className="text-[10px]">Marker</span>
                </button>

                {/* Precision Eraser */}
                <button
                  onClick={() => setActiveTool('eraser')}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    activeTool === 'eraser'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                  }`}
                  title="Precision Eraser (clears color while protecting outlines)"
                >
                  <Eraser className="w-4 h-4" />
                  <span className="text-[10px]">Eraser</span>
                </button>

                {/* Pan / Hand Tool */}
                <button
                  onClick={() => setIsPanning(!isPanning)}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    isPanning
                      ? 'bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-amber-300'
                  }`}
                  title="Pan Canvas Viewport"
                >
                  <Move className="w-4 h-4" />
                  <span className="text-[10px]">Pan Canvas</span>
                </button>
              </div>
            </div>

            {/* 2. Stroke & Dynamics Sliders (Size, Hardness, Stylus Pressure) */}
            <div className="bg-[var(--bg-card-subtle)] p-3.5 rounded-2xl border border-[var(--card-border)] space-y-3">
              
              {/* Brush Width */}
              <div>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1">
                  <span className="font-semibold flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-rose-500" /> Stroke Diameter
                  </span>
                  <span className="font-mono font-bold text-[var(--text-main)]">{brushSize}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="64"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
                />
              </div>

              {/* Opacity & Hardness Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                    <span>Opacity</span>
                    <span className="font-mono font-bold">{Math.round(brushOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={brushOpacity}
                    onChange={(e) => setBrushOpacity(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                    <span>Edge Hardness</span>
                    <span className="font-mono font-bold">{brushHardness}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={brushHardness}
                    onChange={(e) => setBrushHardness(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  />
                </div>
              </div>

              {/* Stylus Pressure Dynamics Toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-[var(--card-border)] text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[11px] font-semibold">
                  <input
                    type="checkbox"
                    checked={enablePressure}
                    onChange={(e) => setEnablePressure(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                  <span>Stylus Pressure Dynamics</span>
                </label>
                <span className="text-[10px] text-rose-500 font-mono font-bold">
                  {enablePressure ? 'Procreate Mode' : 'Fixed'}
                </span>
              </div>
            </div>

            {/* 3. Professional 100+ Swatch Matrix & Custom Lab */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                  <Palette className="w-3.5 h-3.5 text-rose-500" />
                  <span>100+ Swatch Matrix</span>
                </div>
                
                {/* Custom Color Lab Modal Button */}
                <button
                  onClick={() => setIsColorPickerOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-[10px] shadow-sm flex items-center gap-1 hover:scale-105 transition-all"
                >
                  <Sparkles className="w-3 h-3" /> Custom Lab (HSV/CMYK)
                </button>
              </div>

              {/* Active Color Preview & Quick Hex */}
              <div className="flex items-center gap-2.5 bg-[var(--bg-card-subtle)] p-2.5 rounded-2xl border border-[var(--card-border)]">
                <div
                  className="w-8 h-8 rounded-xl shadow-inner border border-black/10 flex-shrink-0"
                  style={{ backgroundColor: currentColor }}
                />
                <div className="flex-1 truncate">
                  <div className="text-[11px] font-bold font-mono uppercase">{currentColor}</div>
                  <div className="text-[9px] text-[var(--text-muted)] font-mono">
                    Active Studio Pigment
                  </div>
                </div>
                <button
                  onClick={() => setIsColorPickerOpen(true)}
                  className="text-[10px] text-rose-500 font-bold hover:underline"
                >
                  Edit In Lab
                </button>
              </div>

              {/* Swatch Family Filter Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <button
                  onClick={() => setSelectedFamilyId('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex-shrink-0 transition-colors ${
                    selectedFamilyId === 'all'
                      ? 'bg-rose-500 text-white'
                      : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  All (126)
                </button>
                {SWATCH_FAMILIES.map(fam => (
                  <button
                    key={fam.id}
                    onClick={() => setSelectedFamilyId(fam.id)}
                    className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 flex-shrink-0 transition-colors text-[10px] ${
                      selectedFamilyId === fam.id
                        ? 'bg-rose-500 text-white'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <span>{fam.icon}</span>
                    <span>{fam.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Search Bar for Swatches */}
              <div className="relative">
                <Search className="w-3 h-3 text-[var(--text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 126 pigments by name or hex..."
                  value={swatchSearchQuery}
                  onChange={(e) => setSwatchSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-3 py-1 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] text-[11px] outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-7 sm:grid-cols-9 lg:grid-cols-7 gap-1.5 max-h-44 overflow-y-auto pr-1">
                {displayedSwatches.map((swatch, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSelectColor(swatch.hex)}
                    style={{ backgroundColor: swatch.hex }}
                    title={`${swatch.name} (${swatch.hex}) • CMYK: ${swatch.cmyk}`}
                    className={`h-7 rounded-lg border border-black/10 transition-transform hover:scale-115 flex items-center justify-center relative group ${
                      currentColor.toLowerCase() === swatch.hex.toLowerCase() && activeTool !== 'eraser'
                        ? 'scale-110 ring-2 ring-rose-500 shadow-md'
                        : ''
                    }`}
                  >
                    {currentColor.toLowerCase() === swatch.hex.toLowerCase() && activeTool !== 'eraser' && (
                      <Check className="w-3 h-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Switch Coloring Template Carousel */}
            <div className="pt-2 border-t border-[var(--card-border)]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1.5 flex items-center justify-between">
                <span>Coloring Book Outlines</span>
                <span className="text-[10px] text-rose-500 font-bold">{templates.length} Vector Masters</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {templates.map((tmpl, idx) => (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplateIndex(idx);
                      initCanvases(idx);
                      onShowToast(`Loaded "${tmpl.title}" line art template.`);
                    }}
                    className={`w-full p-2 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                      selectedTemplateIndex === idx
                        ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                        : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{tmpl.icon}</span>
                      <div className="truncate">
                        <div className="text-xs truncate">{tmpl.title}</div>
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">{tmpl.difficulty}</div>
                      </div>
                    </div>
                    {selectedTemplateIndex === idx && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* State-of-the-Art Color Picker Lab Modal */}
        <ColorPickerModal
          isOpen={isColorPickerOpen}
          onClose={() => setIsColorPickerOpen(false)}
          currentColor={currentColor}
          onSelectColor={handleSelectColor}
          recentColors={recentColors}
          onAddRecentColor={handleAddRecentColor}
        />

      </div>
    </div>
  );
};
