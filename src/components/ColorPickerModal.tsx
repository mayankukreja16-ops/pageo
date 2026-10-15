import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Sparkles,
  Sliders,
  History,
  Image as ImageIcon,
  RotateCcw,
  Palette,
  ExternalLink,
} from 'lucide-react';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  cmykToRgb,
  extractPaletteFromImage,
} from '../utils/canvasColorUtils';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColor: string;
  onSelectColor: (color: string) => void;
  recentColors: string[];
  onAddRecentColor: (color: string) => void;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  currentColor,
  onSelectColor,
  recentColors,
  onAddRecentColor,
}) => {
  // Color representation states
  const [hexInput, setHexInput] = useState(currentColor);
  const [rgb, setRgb] = useState(hexToRgb(currentColor));
  const [hsv, setHsv] = useState(rgbToHsv(rgb.r, rgb.g, rgb.b));
  const [cmyk, setCmyk] = useState(rgbToCmyk(rgb.r, rgb.g, rgb.b));

  const [activeTab, setActiveTab] = useState<'picker' | 'cmyk' | 'palette-generator'>('picker');
  const [copied, setCopied] = useState(false);

  // Palette generator states
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');

  // Sample image inspiration presets
  const samplePresets = [
    {
      name: 'Sunset Glow',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60',
      icon: '🌅',
    },
    {
      name: 'Botanical Garden',
      url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&auto=format&fit=crop&q=60',
      icon: '🌿',
    },
    {
      name: 'Cyberpunk Neon',
      url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=300&auto=format&fit=crop&q=60',
      icon: '⚡',
    },
    {
      name: 'Vintage Peony',
      url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=300&auto=format&fit=crop&q=60',
      icon: '🌸',
    },
  ];

  // Saturation / Value 2D Box Dragging
  const svBoxRef = useRef<HTMLDivElement>(null);
  const [isDraggingSV, setIsDraggingSV] = useState(false);

  // Sync state when currentColor prop changes or opens
  useEffect(() => {
    if (isOpen) {
      const initialRgb = hexToRgb(currentColor);
      setRgb(initialRgb);
      setHsv(rgbToHsv(initialRgb.r, initialRgb.g, initialRgb.b));
      setCmyk(rgbToCmyk(initialRgb.r, initialRgb.g, initialRgb.b));
      setHexInput(currentColor);
    }
  }, [isOpen, currentColor]);

  // Update from HSV
  const updateFromHsv = (newHsv: { h: number; s: number; v: number }) => {
    setHsv(newHsv);
    const newRgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(newHex);
    setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
  };

  // Update from RGB
  const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(newHex);
    setHsv(rgbToHsv(newRgb.r, newRgb.g, newRgb.b));
    setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
  };

  // Update from CMYK
  const updateFromCmyk = (newCmyk: { c: number; m: number; y: number; k: number }) => {
    setCmyk(newCmyk);
    const newRgb = cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k);
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(newHex);
    setHsv(rgbToHsv(newRgb.r, newRgb.g, newRgb.b));
  };

  // Update from Hex string
  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#?[0-9A-Fa-f]{6}$/.test(val)) {
      const clean = val.startsWith('#') ? val : `#${val}`;
      const newRgb = hexToRgb(clean);
      setRgb(newRgb);
      setHsv(rgbToHsv(newRgb.r, newRgb.g, newRgb.b));
      setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  // Handle SV 2D Box Mouse / Touch interaction
  const handleSVMove = (clientX: number, clientY: number) => {
    const box = svBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    updateFromHsv({ ...hsv, s, v });
  };

  const handleApplyColor = (colorToApply = hexInput) => {
    const clean = colorToApply.startsWith('#') ? colorToApply : `#${colorToApply}`;
    onSelectColor(clean);
    onAddRecentColor(clean);
    onClose();
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(hexInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Palette Generator Action
  const handleExtractFromUrl = (url = imageUrlInput) => {
    if (!url.trim()) return;
    setIsExtracting(true);
    setExtractError('');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = async () => {
      try {
        const palette = await extractPaletteFromImage(img, 5);
        setExtractedPalette(palette);
      } catch (err) {
        setExtractError('Could not read image colors due to browser security restrictions. Please try a preset.');
      } finally {
        setIsExtracting(false);
      }
    };
    img.onerror = () => {
      setIsExtracting(false);
      setExtractError('Unable to load image. Ensure URL is direct and supports CORS, or click a preset below.');
    };
    img.src = url;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden text-[var(--text-main)]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--card-border)] flex items-center justify-between bg-[var(--bg-card)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-[10px] flex items-center justify-center">
                <Palette className="w-4 h-4 text-rose-500" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base">
                Pro Color Matrix & Custom Lab
              </h3>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">
                HSV • RGB • 300 DPI CMYK Print Values • AI Palette Extractor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close color picker"
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-[var(--card-border)] px-4 bg-[var(--bg-card-subtle)] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('picker')}
            className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'picker'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            HSV & RGB Sliders
          </button>
          <button
            onClick={() => setActiveTab('cmyk')}
            className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'cmyk'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <span className="font-mono text-[11px] font-bold">CMYK</span>
            Print Precision (KDP)
          </button>
          <button
            onClick={() => setActiveTab('palette-generator')}
            className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'palette-generator'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Palette Extractor
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] space-y-5">
          
          {/* Main Visual Color Swatch & Comparison */}
          <div className="flex items-center gap-4 bg-[var(--bg-card-subtle)] p-3.5 rounded-2xl border border-[var(--card-border)]">
            <div className="flex items-center gap-2">
              <div
                className="w-14 h-14 rounded-2xl shadow-inner border border-black/10 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: hexInput }}
              >
                <span className="text-[10px] font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  New
                </span>
              </div>
              <div
                className="w-10 h-10 rounded-xl shadow-inner border border-black/10 flex items-center justify-center opacity-70"
                style={{ backgroundColor: currentColor }}
                title="Current Color"
              >
                <span className="text-[9px] font-mono text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Old
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Hex Code
                </span>
                <button
                  onClick={handleCopyHex}
                  className="text-[10px] text-rose-500 hover:underline flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy Hex'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="w-32 px-3 py-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] font-mono text-sm font-bold uppercase focus:ring-2 focus:ring-rose-500 outline-none"
                  placeholder="#FF6B6B"
                />
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: HSV Saturation/Value Box & Hue Bar + RGB Sliders */}
          {activeTab === 'picker' && (
            <div className="space-y-4">
              
              {/* 2D Saturation / Value Gradient Box */}
              <div>
                <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono mb-1.5">
                  Saturation & Brightness Field
                </div>
                <div
                  ref={svBoxRef}
                  onMouseDown={(e) => {
                    setIsDraggingSV(true);
                    handleSVMove(e.clientX, e.clientY);
                  }}
                  onMouseMove={(e) => {
                    if (isDraggingSV) handleSVMove(e.clientX, e.clientY);
                  }}
                  onMouseUp={() => setIsDraggingSV(false)}
                  onMouseLeave={() => setIsDraggingSV(false)}
                  onTouchStart={(e) => {
                    if (e.touches[0]) handleSVMove(e.touches[0].clientX, e.touches[0].clientY);
                  }}
                  onTouchMove={(e) => {
                    if (e.touches[0]) handleSVMove(e.touches[0].clientX, e.touches[0].clientY);
                  }}
                  className="w-full h-44 rounded-2xl cursor-crosshair relative select-none shadow-inner border border-black/10 overflow-hidden"
                  style={{
                    backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                    backgroundImage: `
                      linear-gradient(to right, #fff, rgba(255,255,255,0)),
                      linear-gradient(to top, #000, rgba(0,0,0,0))
                    `,
                  }}
                >
                  {/* Indicator Dot */}
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.8)] absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${hsv.s}%`,
                      top: `${100 - hsv.v}%`,
                      backgroundColor: hexInput,
                    }}
                  />
                </div>
              </div>

              {/* 360° Hue Rainbow Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="font-semibold">Hue Spectral Ring</span>
                  <span className="font-mono">{hsv.h}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={hsv.h}
                  onChange={(e) => updateFromHsv({ ...hsv, h: Number(e.target.value) })}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
                  }}
                />
              </div>

              {/* Fine-Tuning RGB Sliders */}
              <div className="space-y-2.5 bg-[var(--bg-card-subtle)] p-3.5 rounded-2xl border border-[var(--card-border)]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                  Fine-Tune RGB Channels
                </div>
                
                {/* Red */}
                <div className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-red-500 font-mono">R</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => updateFromRgb({ ...rgb, r: Number(e.target.value) })}
                    className="flex-1 accent-red-500 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => updateFromRgb({ ...rgb, r: Math.min(255, Math.max(0, Number(e.target.value))) })}
                    className="w-14 px-2 py-1 text-center font-mono text-xs rounded-lg border border-[var(--card-border)] bg-[var(--bg-card)]"
                  />
                </div>

                {/* Green */}
                <div className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-green-500 font-mono">G</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => updateFromRgb({ ...rgb, g: Number(e.target.value) })}
                    className="flex-1 accent-emerald-500 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => updateFromRgb({ ...rgb, g: Math.min(255, Math.max(0, Number(e.target.value))) })}
                    className="w-14 px-2 py-1 text-center font-mono text-xs rounded-lg border border-[var(--card-border)] bg-[var(--bg-card)]"
                  />
                </div>

                {/* Blue */}
                <div className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-blue-500 font-mono">B</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => updateFromRgb({ ...rgb, b: Number(e.target.value) })}
                    className="flex-1 accent-blue-500 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => updateFromRgb({ ...rgb, b: Math.min(255, Math.max(0, Number(e.target.value))) })}
                    className="w-14 px-2 py-1 text-center font-mono text-xs rounded-lg border border-[var(--card-border)] bg-[var(--bg-card)]"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CMYK Subtractive Sliders for Amazon KDP Print */}
          {activeTab === 'cmyk' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <span className="font-bold">Amazon KDP & 300 DPI Subtractive Inks:</span> Calibrate four-color process pigments (Cyan, Magenta, Yellow, Key/Black) to ensure your physical prints have 100% color-match accuracy with zero muddying.
              </div>

              <div className="space-y-3 bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--card-border)]">
                {/* Cyan */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">Cyan (C)</span>
                    <span className="font-mono">{cmyk.c}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cmyk.c}
                    onChange={(e) => updateFromCmyk({ ...cmyk, c: Number(e.target.value) })}
                    className="w-full accent-cyan-500 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Magenta */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-pink-600 dark:text-pink-400 font-mono">Magenta (M)</span>
                    <span className="font-mono">{cmyk.m}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cmyk.m}
                    onChange={(e) => updateFromCmyk({ ...cmyk, m: Number(e.target.value) })}
                    className="w-full accent-pink-500 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Yellow */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-yellow-600 dark:text-yellow-400 font-mono">Yellow (Y)</span>
                    <span className="font-mono">{cmyk.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cmyk.y}
                    onChange={(e) => updateFromCmyk({ ...cmyk, y: Number(e.target.value) })}
                    className="w-full accent-yellow-500 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Key (Black) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800 dark:text-gray-200 font-mono">Key / Black (K)</span>
                    <span className="font-mono">{cmyk.k}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cmyk.k}
                    onChange={(e) => updateFromCmyk({ ...cmyk, k: Number(e.target.value) })}
                    className="w-full accent-gray-700 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-xs font-mono">
                <span className="text-[var(--text-muted)]">CMYK Value:</span>
                <span className="font-bold text-[var(--text-main)]">
                  cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: AI / Image Palette Extractor */}
          {activeTab === 'palette-generator' && (
            <div className="space-y-4">
              <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                Extract an authentic 5-color harmonized palette directly from an image or photo URL (like Adobe Color). Select a curated inspiration preset or paste your own image URL.
              </div>

              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL (e.g. https://.../art.jpg)"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                />
                <button
                  onClick={() => handleExtractFromUrl()}
                  disabled={isExtracting || !imageUrlInput.trim()}
                  className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs disabled:opacity-40 hover:bg-rose-600 transition-colors flex items-center gap-1.5"
                >
                  {isExtracting ? 'Analyzing...' : 'Extract Palette'}
                </button>
              </div>

              {extractError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
                  {extractError}
                </div>
              )}

              {/* Sample Art Presets */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                  Curated Inspiration Presets
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setImageUrlInput(preset.url);
                        handleExtractFromUrl(preset.url);
                      }}
                      className="p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card-subtle)] hover:border-rose-400 text-left transition-all hover:scale-102 flex flex-col items-center gap-1.5"
                    >
                      <span className="text-2xl">{preset.icon}</span>
                      <span className="text-[11px] font-bold text-center">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extracted Swatches */}
              {extractedPalette.length > 0 && (
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> 5-Color Harmonic Extract
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">Click swatch to load</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {extractedPalette.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleHexChange(color);
                        }}
                        style={{ backgroundColor: color }}
                        className="h-14 rounded-xl border border-black/10 shadow hover:scale-105 transition-transform flex flex-col justify-end p-1 text-[9px] font-mono text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recent Colors History (Session-based 20 colors) */}
          <div className="pt-3 border-t border-[var(--card-border)] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-rose-500" />
                Recent Colors History ({recentColors.length}/20)
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">Auto-saved</span>
            </div>

            {recentColors.length === 0 ? (
              <div className="text-xs text-[var(--text-muted)] py-2 text-center font-mono">
                No recent colors yet. Pick or mix colors to populate your palette!
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
                {recentColors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHexChange(col)}
                    style={{ backgroundColor: col }}
                    title={col}
                    className={`w-7 h-7 rounded-lg border border-black/10 transition-transform hover:scale-110 ${
                      hexInput.toLowerCase() === col.toLowerCase() ? 'ring-2 ring-rose-500 scale-110' : ''
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[var(--card-border)] bg-[var(--bg-card)] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[var(--card-border)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyColor(hexInput)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all hover:scale-102 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Use This Color in Studio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
