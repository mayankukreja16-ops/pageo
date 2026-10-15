/**
 * Professional Canvas & Color Utilities for Pageo Paint Studio
 * Supports HSV, RGB, CMYK, Hex conversions, Palette Extraction, and Flood Fill
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  h: number; // 0 - 360
  s: number; // 0 - 100
  v: number; // 0 - 100
}

export interface CMYK {
  c: number; // 0 - 100
  m: number; // 0 - 100
  y: number; // 0 - 100
  k: number; // 0 - 100
}

/**
 * HEX to RGB
 */
export function hexToRgb(hex: string): RGB {
  let cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return { r: 255, g: 107, b: 107 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * RGB to HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): HSV {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const v = Math.round(max * 100);

  return { h, s, v };
}

/**
 * HSV to RGB
 */
export function hsvToRgb(h: number, s: number, v: number): RGB {
  const sNorm = s / 100;
  const vNorm = v / 100;
  const c = vNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vNorm - c;

  let rNorm = 0, gNorm = 0, bNorm = 0;

  if (h >= 0 && h < 60) {
    rNorm = c; gNorm = x; bNorm = 0;
  } else if (h >= 60 && h < 120) {
    rNorm = x; gNorm = c; bNorm = 0;
  } else if (h >= 120 && h < 180) {
    rNorm = 0; gNorm = c; bNorm = x;
  } else if (h >= 180 && h < 240) {
    rNorm = 0; gNorm = x; bNorm = c;
  } else if (h >= 240 && h < 300) {
    rNorm = x; gNorm = 0; bNorm = c;
  } else {
    rNorm = c; gNorm = 0; bNorm = x;
  }

  return {
    r: Math.round((rNorm + m) * 255),
    g: Math.round((gNorm + m) * 255),
    b: Math.round((bNorm + m) * 255),
  };
}

/**
 * RGB to CMYK (standard subtractive model for print)
 */
export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = Math.round(((1 - rNorm - k) / (1 - k)) * 100);
  const m = Math.round(((1 - gNorm - k) / (1 - k)) * 100);
  const y = Math.round(((1 - bNorm - k) / (1 - k)) * 100);

  return {
    c: Math.max(0, Math.min(100, c)),
    m: Math.max(0, Math.min(100, m)),
    y: Math.max(0, Math.min(100, y)),
    k: Math.max(0, Math.min(100, Math.round(k * 100))),
  };
}

/**
 * CMYK to RGB
 */
export function cmykToRgb(c: number, m: number, y: number, k: number): RGB {
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;

  const r = Math.round(255 * (1 - cNorm) * (1 - kNorm));
  const g = Math.round(255 * (1 - mNorm) * (1 - kNorm));
  const b = Math.round(255 * (1 - yNorm) * (1 - kNorm));

  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b)),
  };
}

/**
 * High-performance Flood Fill Algorithm (Stack-based Scanline)
 */
export function floodFill(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  fillColorHex: string,
  tolerance = 32
): boolean {
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;

  const x = Math.floor(startX);
  const y = Math.floor(startY);

  if (x < 0 || x >= width || y < 0 || y >= height) return false;

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const fillRgb = hexToRgb(fillColorHex);
  const startIndex = (y * width + x) * 4;

  const startR = data[startIndex];
  const startG = data[startIndex + 1];
  const startB = data[startIndex + 2];
  const startA = data[startIndex + 3];

  // If already matches fill color, skip
  if (
    Math.abs(startR - fillRgb.r) < 5 &&
    Math.abs(startG - fillRgb.g) < 5 &&
    Math.abs(startB - fillRgb.b) < 5 &&
    startA > 240
  ) {
    return false;
  }

  // Prevent filling over solid black outline
  if (startR < 40 && startG < 40 && startB < 40 && startA > 200) {
    return false;
  }

  const colorMatch = (idx: number) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];

    // Don't bleed into dark outline lines
    if (r < 60 && g < 60 && b < 60 && a > 180) return false;

    const diff = Math.abs(r - startR) + Math.abs(g - startG) + Math.abs(b - startB) + Math.abs(a - startA);
    return diff <= tolerance * 4;
  };

  const visited = new Uint8Array(width * height);
  const stack: [number, number][] = [[x, y]];

  while (stack.length > 0) {
    const [curX, curY] = stack.pop()!;
    const pixelPos = curY * width + curX;

    if (visited[pixelPos]) continue;
    visited[pixelPos] = 1;

    const idx = pixelPos * 4;
    data[idx] = fillRgb.r;
    data[idx + 1] = fillRgb.g;
    data[idx + 2] = fillRgb.b;
    data[idx + 3] = 255;

    // Check 4-connected neighbors
    if (curX > 0 && !visited[pixelPos - 1] && colorMatch((pixelPos - 1) * 4)) {
      stack.push([curX - 1, curY]);
    }
    if (curX < width - 1 && !visited[pixelPos + 1] && colorMatch((pixelPos + 1) * 4)) {
      stack.push([curX + 1, curY]);
    }
    if (curY > 0 && !visited[pixelPos - width] && colorMatch((pixelPos - width) * 4)) {
      stack.push([curX, curY - 1]);
    }
    if (curY < height - 1 && !visited[pixelPos + width] && colorMatch((pixelPos + width) * 4)) {
      stack.push([curX, curY + 1]);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return true;
}

/**
 * Extract 5-Color Harmonic Palette from an Image
 */
export function extractPaletteFromImage(
  img: HTMLImageElement,
  colorCount = 5
): Promise<string[]> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(['#ff7675', '#fab1a0', '#ffeaa7', '#00b894', '#6c5ce7']);
      return;
    }

    const maxDim = 80;
    const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
    canvas.width = Math.max(1, Math.floor(img.width * scale));
    canvas.height = Math.max(1, Math.floor(img.height * scale));

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Bucket colors by quantized RGB
    const buckets: { [key: string]: { r: number; g: number; b: number; count: number } } = {};

    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 128) continue;
      // Skip pure black & pure white
      if ((r < 25 && g < 25 && b < 25) || (r > 245 && g > 245 && b > 245)) continue;

      // Quantize to 32 increments
      const qr = Math.floor(r / 32) * 32 + 16;
      const qg = Math.floor(g / 32) * 32 + 16;
      const qb = Math.floor(b / 32) * 32 + 16;
      const key = `${qr},${qg},${qb}`;

      if (!buckets[key]) {
        buckets[key] = { r: qr, g: qg, b: qb, count: 1 };
      } else {
        buckets[key].count++;
      }
    }

    const sorted = Object.values(buckets).sort((a, b) => b.count - a.count);
    const selectedHexes: string[] = [];

    for (const item of sorted) {
      const hex = rgbToHex(item.r, item.g, item.b);
      if (!selectedHexes.includes(hex)) {
        selectedHexes.push(hex);
      }
      if (selectedHexes.length >= colorCount) break;
    }

    // Fallbacks if image had very few colors
    const fallbacks = ['#ff7675', '#fab1a0', '#ffeaa7', '#00b894', '#6c5ce7', '#e17055'];
    while (selectedHexes.length < colorCount) {
      const nextFallback = fallbacks.find(c => !selectedHexes.includes(c)) || '#fdcb6e';
      selectedHexes.push(nextFallback);
    }

    resolve(selectedHexes);
  });
}
