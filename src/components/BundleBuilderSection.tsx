import React, { useState } from 'react';
import { Product } from '../data/products';
import {
  PackageCheck,
  Plus,
  Trash2,
  Check,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface BundleBuilderSectionProps {
  products: Product[];
  onAddCustomBundleToCart: (bundleItems: Product[], bundlePrice: number) => void;
  onShowToast: (msg: string) => void;
}

export const BundleBuilderSection: React.FC<BundleBuilderSectionProps> = ({
  products,
  onAddCustomBundleToCart,
  onShowToast,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['colour-mandala-zen', 'brush-watercolor-master']);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const bundleLimit = 3;
  const bundleFlatPrice = 24.99;

  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));
  const regularTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = Math.max(0, regularTotal - bundleFlatPrice);
  const isComplete = selectedIds.length === bundleLimit;

  const handleToggleProduct = (product: Product) => {
    if (selectedIds.includes(product.id)) {
      setSelectedIds((prev) => prev.filter((id) => id !== product.id));
    } else {
      if (selectedIds.length >= bundleLimit) {
        onShowToast(`Bundle full! You can pick maximum 3 items for the $${bundleFlatPrice} special.`);
        return;
      }
      setSelectedIds((prev) => [...prev, product.id]);
      if (selectedIds.length + 1 === bundleLimit) {
        onShowToast('🎉 Custom 3-Item Art Bundle complete! $24.99 discount unlocked.');
      }
    }
  };

  const handleAddToCart = () => {
    if (!isComplete) {
      onShowToast(`Please select ${bundleLimit - selectedIds.length} more item(s) to complete your 3-item bundle.`);
      return;
    }

    onAddCustomBundleToCart(selectedProducts, bundleFlatPrice);
    onShowToast(`🛍️ Custom 3-Item Art Bundle added to cart for $${bundleFlatPrice}!`);
  };

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'colouring-books', label: 'Colouring Books' },
    { id: 'digital-brushes', label: 'Brushes & Textures' },
    { id: 'story-children-books', label: 'Story & Children Books' },
    { id: 'calligraphy-lettering', label: 'Calligraphy & Lettering' },
    { id: 'vector-kdp-interiors', label: 'Vector & KDP Interiors' },
  ];

  const filteredProducts = products.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="bundle-builder" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--card-border)]">
      {/* Bundle Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500/15 to-amber-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          Exclusive Bundle & Save Deal
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--text-main)] leading-tight">
          Create Your Custom 3-Item Art Bundle
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
          Mix & match any 3 colouring e-books, Procreate brush studios, or vector bundles of your choice for a flat <strong>${bundleFlatPrice}</strong> (normally up to $50+).
        </p>
      </div>

      {/* Dynamic 3-Slot Interactive Dashboard */}
      <div className="bg-[var(--bg-card)] border-2 border-dashed border-rose-400/50 dark:border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[0, 1, 2].map((slotIndex) => {
            const item = selectedProducts[slotIndex];
            return (
              <div
                key={slotIndex}
                className={`relative rounded-2xl p-4 min-h-[140px] flex flex-col justify-between transition-all ${
                  item
                    ? 'bg-[var(--bg-card-subtle)] border-2 border-rose-500/40 shadow-sm'
                    : 'bg-zinc-100/50 dark:bg-zinc-900/40 border-2 border-dashed border-gray-300 dark:border-zinc-700 items-center justify-center text-center'
                }`}
              >
                {item ? (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--card-border)]">
                          {item.icon}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-rose-500 font-bold block">
                            Slot {slotIndex + 1} Selected
                          </span>
                          <h4 className="font-heading font-bold text-xs text-[var(--text-main)] line-clamp-1">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleProduct(item)}
                        className="p-1 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Remove from bundle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--card-border)] mt-3">
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        {item.format.split('+')[0]}
                      </span>
                      <span className="font-mono font-bold text-[var(--text-main)]">
                        Valued at ${item.price}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1.5 p-2">
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-sm font-bold">
                      {slotIndex + 1}
                    </div>
                    <div className="text-xs font-bold text-[var(--text-muted)]">
                      Pick Item #{slotIndex + 1}
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      Select below from the catalog
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pricing Math Bar */}
        <div className="pt-4 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-xs">
              <span className="text-[var(--text-muted)]">Standard Combined Value: </span>
              <span className="line-through text-gray-500 font-mono font-bold">
                ${regularTotal.toFixed(2)}
              </span>
            </div>
            <div className="text-sm font-heading font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
              <span>Bundle Special:</span>
              <span className="text-xl text-emerald-600 dark:text-emerald-400">
                ${bundleFlatPrice}
              </span>
            </div>
            {isComplete && savings > 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
                Save ${savings.toFixed(2)}!
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!isComplete}
            className={`w-full sm:w-auto py-3 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              isComplete
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-rose-500/25 hover:scale-105 cursor-pointer'
                : 'bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isComplete
              ? `Claim Custom Bundle ($${bundleFlatPrice}) →`
              : `Select ${bundleLimit - selectedIds.length} More Item(s)`}
          </button>
        </div>

      </div>

      {/* Catalog Item Chooser Grid */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h3 className="font-heading font-bold text-base text-[var(--text-main)]">
            Choose Items For Your Bundle:
          </h3>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-rose-500 text-white'
                    : 'bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => handleToggleProduct(p)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-500/10 border-rose-500 shadow-sm ring-2 ring-rose-400'
                    : 'bg-[var(--bg-card)] border-[var(--card-border)] hover:border-rose-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{p.icon}</span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                        isSelected
                          ? 'bg-rose-500 text-white font-bold'
                          : 'bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-muted)]'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    {p.categoryLabel}
                  </span>
                  <h4 className="font-heading font-bold text-xs text-[var(--text-main)] line-clamp-2 leading-snug mb-1">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mb-3">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-[var(--card-border)] text-xs">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ${p.price}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      isSelected ? 'text-rose-600 font-bold' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {isSelected ? '✓ In Bundle' : '+ Add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
