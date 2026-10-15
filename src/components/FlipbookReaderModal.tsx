import React, { useState } from 'react';
import { Product } from '../data/products';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Paintbrush,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Sparkles,
  Layers,
  Printer,
} from 'lucide-react';

interface FlipbookReaderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenColoringStudio: (templateIndex?: number) => void;
}

export const FlipbookReaderModal: React.FC<FlipbookReaderModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenColoringStudio,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState(false);

  if (!isOpen || !product) return null;

  const totalPages = 5;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 200);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 200);
    }
  };

  const pageTitles = [
    'Deluxe Master Cover',
    'Table of Contents & Swatches',
    'Feature Art: High-Res Line Art',
    'Feature Art: Contrast & Shading',
    'Amazon KDP Certified Interior',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-4xl w-full h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Flipbook Top Header */}
        <div className="px-5 py-3 border-b border-[var(--card-border)] flex items-center justify-between gap-3 bg-[var(--bg-card)] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-xs sm:text-sm text-[var(--text-main)] truncate max-w-xs sm:max-w-md">
                  {product.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono hidden sm:inline">
                  300 DPI Preview
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">
                {pageTitles[currentPage]} • {currentPage + 1} of {totalPages}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Wishlist"
              className={`p-2 rounded-xl border text-rose-500 transition-all ${
                isWishlisted
                  ? 'bg-rose-500/15 border-rose-500/40 fill-rose-500'
                  : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] hover:border-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenColoringStudio(0);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 transition-all"
            >
              <Paintbrush className="w-3.5 h-3.5 text-amber-500" /> Color Online Studio
            </button>
            <button
              onClick={onClose}
              aria-label="Close reader"
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Flipbook Interactive Reading Area */}
        <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 bg-[#e9e4dc] dark:bg-[#0c0910] overflow-hidden select-none">
          
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-2xl bg-white/90 dark:bg-zinc-800/90 text-gray-800 dark:text-white shadow-lg border border-gray-200 dark:border-zinc-700 disabled:opacity-30 disabled:pointer-events-none hover:scale-110 transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
            className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-2xl bg-white/90 dark:bg-zinc-800/90 text-gray-800 dark:text-white shadow-lg border border-gray-200 dark:border-zinc-700 disabled:opacity-30 disabled:pointer-events-none hover:scale-110 transition-all flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Realistic Book Mockup Frame */}
          <div
            className={`relative bg-white text-zinc-900 rounded-2xl shadow-2xl border-4 border-amber-100/60 dark:border-zinc-700/60 w-full max-w-lg aspect-[1/1.3] p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 transform ${
              isFlipping ? 'scale-95 rotate-1 opacity-80' : 'scale-100 rotate-0 opacity-100'
            }`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0,0,0,0.05)',
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
          >
            {/* Center Book Spine Shadow Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none rounded-l-2xl" />

            {/* PAGE 0: COVER PAGE */}
            {currentPage === 0 && (
              <div className="h-full flex flex-col justify-between text-center border-2 border-dashed border-amber-400/40 p-6 rounded-xl bg-gradient-to-b from-amber-50/50 via-white to-rose-50/40 relative">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest">
                  <span>Pageo Publishing</span>
                  <span>Vol. 2026 Edition</span>
                </div>

                <div className="my-auto space-y-3">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/25">
                    {product.icon}
                  </div>
                  <h2 className="font-heading font-black text-xl sm:text-2xl text-zinc-900 leading-snug">
                    {product.title}
                  </h2>
                  <p className="font-serif-title italic text-xs text-rose-600 font-semibold max-w-xs mx-auto">
                    {product.format} • High Resolution Studio Masters
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ★ 300 DPI Zero Bleed
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800 border border-amber-300">
                      KDP Ready
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Standard 8.5" x 11"</span>
                  <span>Flip to Sample Pages →</span>
                </div>
              </div>
            )}

            {/* PAGE 1: TABLE OF CONTENTS & COLOR GUIDE */}
            {currentPage === 1 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 font-bold">
                      Interior Blueprint
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">Page 1</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-zinc-900 mt-2">
                    Contents & Swatch Palette
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Recommended color pairings for maximum relaxation:
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                      <span className="font-semibold text-zinc-800">Part I: Sacred Symmetries</span>
                      <span className="font-mono text-zinc-400">Pages 1-18</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                      <span className="font-semibold text-zinc-800">Part II: Nocturnal Botanical Blooms</span>
                      <span className="font-mono text-zinc-400">Pages 19-36</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                      <span className="font-semibold text-zinc-800">Part III: Deep Cosmic Geometry</span>
                      <span className="font-mono text-zinc-400">Pages 37-52</span>
                    </div>
                  </div>

                  <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-[10px] font-mono font-bold text-amber-800 uppercase mb-1.5">
                      Recommended Harmonious Swatches
                    </div>
                    <div className="flex gap-2">
                      {['#ff7675', '#fdcb6e', '#00b894', '#6c5ce7', '#fab1a0', '#0984e3'].map((c, i) => (
                        <span
                          key={i}
                          style={{ backgroundColor: c }}
                          className="w-6 h-6 rounded-md shadow-sm border border-black/10 inline-block"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-zinc-400 text-center">
                  Pageo Print-Ready E-Book Series
                </div>
              </div>
            )}

            {/* PAGE 2: FEATURE ART SAMPLE 1 (MANDALA LINE ART) */}
            {currentPage === 2 && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                  <span className="text-[10px] font-mono text-rose-600 font-bold uppercase">
                    Sample Plate #07
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Page 14</span>
                </div>

                {/* Simulated High-Res Line Art Vector Graphic */}
                <div className="my-auto flex flex-col items-center justify-center p-4">
                  <svg viewBox="0 0 200 200" className="w-56 h-56 max-w-full text-zinc-800 stroke-current fill-none stroke-[1.8]">
                    {/* Concentric rings */}
                    <circle cx="100" cy="100" r="90" strokeDasharray="3,3" />
                    <circle cx="100" cy="100" r="80" />
                    <circle cx="100" cy="100" r="60" />
                    <circle cx="100" cy="100" r="30" />
                    <circle cx="100" cy="100" r="10" fill="#1e293b" />
                    {/* Petal designs */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                      <g key={ang} transform={`rotate(${ang} 100 100)`}>
                        <path d="M100,70 Q115,50 100,20 Q85,50 100,70" />
                        <line x1="100" y1="30" x2="100" y2="65" />
                        <circle cx="100" cy="38" r="2.5" fill="#1e293b" />
                        <path d="M100,40 Q110,65 100,80 Q90,65 100,40" />
                      </g>
                    ))}
                  </svg>
                  <p className="text-[11px] font-serif-title italic text-zinc-600 mt-2">
                    "Sacred Lotus Bloom" — Mastered at native 300 DPI
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenColoringStudio(0);
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <Paintbrush className="w-3.5 h-3.5" /> Color this page in studio
                  </button>
                  <span className="text-[10px] font-mono text-zinc-400">Single-Sided Print</span>
                </div>
              </div>
            )}

            {/* PAGE 3: FEATURE ART SAMPLE 2 (SHADED GRAYSCALE CONTRAST) */}
            {currentPage === 3 && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                  <span className="text-[10px] font-mono text-rose-600 font-bold uppercase">
                    Sample Plate #19
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Page 28</span>
                </div>

                {/* Simulated Fantasy Ethereal Artwork */}
                <div className="my-auto flex flex-col items-center justify-center p-3 text-center">
                  <div className="w-48 h-48 rounded-2xl border-2 border-zinc-800 flex items-center justify-center bg-zinc-50 relative overflow-hidden p-3">
                    <svg viewBox="0 0 160 160" className="w-full h-full text-zinc-800 stroke-current fill-none stroke-[2]">
                      <path d="M30,130 Q80,20 130,130" />
                      <circle cx="80" cy="70" r="35" />
                      <path d="M80,35 Q100,70 80,105 Q60,70 80,35" />
                      <circle cx="80" cy="70" r="14" fill="#cbd5e1" opacity="0.6" />
                      <line x1="20" y1="130" x2="140" y2="130" />
                      {/* Sunburst stars */}
                      <circle cx="35" cy="40" r="3" fill="#1e293b" />
                      <circle cx="125" cy="40" r="3" fill="#1e293b" />
                      <circle cx="80" cy="18" r="4" fill="#1e293b" />
                    </svg>
                  </div>
                  <span className="text-xs font-heading font-bold text-zinc-900 mt-2.5">
                    Atmospheric Grayscale Edition Included
                  </span>
                  <span className="text-[11px] text-zinc-500 max-w-xs mt-0.5">
                    Pre-shaded lighting guides allow beginning colorists to achieve 3D cinematic depth.
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[10px] font-mono text-zinc-400">
                  <span>Ultra-Dense Ink Fidelity</span>
                  <span>Pure White Background</span>
                </div>
              </div>
            )}

            {/* PAGE 4: AMAZON KDP CERTIFIED INTERIOR & SWATCHES */}
            {currentPage === 4 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Amazon KDP Ready
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">Specs Page</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-zinc-900 mt-2">
                    Commercial Publishing Certification
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Verified zero-bleed margins formatted for Amazon KDP Paperback & Hardcover:
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
                      <span className="text-zinc-400 font-mono block text-[9px] uppercase">Trim Size</span>
                      <strong className="text-zinc-800">8.5" x 11" Standard</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
                      <span className="text-zinc-400 font-mono block text-[9px] uppercase">Gutter Margin</span>
                      <strong className="text-zinc-800">0.75" Safe Bleed</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
                      <span className="text-zinc-400 font-mono block text-[9px] uppercase">Native DPI</span>
                      <strong className="text-emerald-600">300 DPI Vector PDF</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
                      <span className="text-zinc-400 font-mono block text-[9px] uppercase">License</span>
                      <strong className="text-zinc-800">Commercial POD</strong>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <span className="font-bold flex items-center gap-1">
                      ✓ Instant Unlimited Reprinting Rights
                    </span>
                    <span>Publish directly to Amazon KDP, Etsy, or print for personal relaxation.</span>
                  </div>
                </div>

                <div className="text-center pt-2 border-t border-zinc-200">
                  <span className="text-xs font-mono font-bold text-zinc-600">
                    End of Preview Sample • Full 52+ Pages in Download
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Flipbook Footer Bar: Zoom & Page Scrubber */}
        <div className="px-5 py-3 border-t border-[var(--card-border)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] font-mono">Zoom:</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--card-border)] hover:border-rose-400 text-[var(--text-main)]"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold text-[var(--text-main)] w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-1.5 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--card-border)] hover:border-rose-400 text-[var(--text-main)]"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="text-[11px] font-mono text-[var(--text-muted)] hover:underline ml-1"
            >
              Reset
            </button>
          </div>

          {/* Page Scrubber Dots */}
          <div className="flex items-center gap-1.5">
            {pageTitles.map((title, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to ${title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentPage
                    ? 'w-7 bg-rose-500'
                    : 'w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/60'
                }`}
                title={title}
              />
            ))}
          </div>

          {/* Buy Now / Add to Cart CTA */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="font-heading font-black text-lg text-emerald-600 dark:text-emerald-400 mr-2">
              ${product.price}
            </div>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="py-2.5 px-5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition-all hover:scale-105"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Buy & Download Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
