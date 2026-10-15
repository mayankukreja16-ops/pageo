import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Star, CheckCircle2, ShieldCheck, Download, ShoppingCart, Sparkles, Layers, Printer, Heart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'license'>('overview');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-y-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-[var(--card-border)] mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)]">
              {product.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                  {product.badge}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {product.categoryLabel}
                </span>
              </div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-[var(--text-main)] leading-snug">
                {product.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? "Remove from Favorites" : "Add to Favorites"}
              title={isWishlisted ? "In My Favorites" : "Save to Favorites"}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-rose-500 hover:border-rose-400 hover:scale-105 transition-all border border-[var(--card-border)]"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-5 border-b border-[var(--card-border)] pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-2 transition-all border-b-2 ${
              activeTab === 'overview'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 px-2 transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Resolution & Specs
          </button>
          <button
            onClick={() => setActiveTab('license')}
            className={`pb-2 px-2 transition-all border-b-2 ${
              activeTab === 'license'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Commercial License
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 space-y-4 mb-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {product.detailedOverview}
              </p>

              {/* Package features */}
              <div className="bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--card-border)]">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-main)] mb-3">
                  Included in this Digital Asset Pack
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-main)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Art Visual Box */}
              <div className="p-4 rounded-2xl border border-dashed border-rose-500/30 bg-rose-500/5 text-center">
                <div className="text-2xl mb-1">✨ 🎨 🖌️ 🌸</div>
                <div className="text-xs font-bold text-[var(--text-main)]">
                  Print-Ready 300 DPI Vector-Rendered Assets
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Compatible with home printers, Procreate, Photoshop, Illustrator & Amazon KDP
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    File Formats
                  </span>
                  <strong className="text-[var(--text-main)] block font-heading">
                    {product.format}
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Resolution & Print DPI
                  </span>
                  <strong className="text-[var(--text-main)] block font-heading text-emerald-600 dark:text-emerald-400">
                    {product.resolution}
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Item / Page Count
                  </span>
                  <strong className="text-[var(--text-main)] block font-heading">
                    {product.itemCount}
                  </strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Color Profile
                  </span>
                  <strong className="text-[var(--text-main)] block font-heading">
                    CMYK & sRGB High Gamut Mastered
                  </strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-xs text-[var(--text-muted)] flex items-start gap-2">
                <Printer className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Printing Guide:</strong> For optimal coloring results, print at 100% scale (Do Not Scale) on 120gsm - 200gsm heavy paper or cardstock.
                </span>
              </div>
            </div>
          )}

          {activeTab === 'license' && (
            <div className="space-y-3 text-xs text-[var(--text-muted)]">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200">
                <div className="font-heading font-bold text-sm flex items-center gap-1.5 mb-1 text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4" /> Commercial License Included
                </div>
                <p>
                  You are granted full commercial rights to publish printed coloring books on Amazon KDP, sell physical art prints, t-shirts, mugs, or client projects.
                </p>
              </div>

              <div className="bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--card-border)] space-y-2">
                <div className="font-bold text-[var(--text-main)]">What is Allowed:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Amazon KDP paperback & hardcover publication</li>
                  <li>Physical print-on-demand products (Etsy, Shopify, Merch)</li>
                  <li>Personal coloring, framed home wall art & gifts</li>
                  <li>Client illustration & graphic design deliverables</li>
                </ul>
                <div className="font-bold text-[var(--text-main)] pt-2">What is Not Allowed:</div>
                <p>
                  Reselling or distributing the raw source files, brushes, or PDFs as standalone digital downloads without substantial alteration.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="pt-4 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-2xl text-emerald-600 dark:text-emerald-400">
              ${product.price}
            </span>
            <span className="text-sm text-[var(--text-muted)] line-through">
              ${product.originalPrice}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Instant Download
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`py-3 px-3.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-all ${
                isWishlisted
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-[var(--bg-card-subtle)] border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isWishlisted ? 'In Favorites' : 'Add to Favorites'}</span>
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 sm:flex-initial py-3 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02]"
            >
              <ShoppingCart className="w-4 h-4" /> Buy & Download Now (${product.price})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
