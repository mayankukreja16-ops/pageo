import React, { useRef } from 'react';
import { Product } from '../data/products';
import { ChevronLeft, ChevronRight, Zap, Eye, ShoppingCart, Heart } from 'lucide-react';

interface QuickPicksProps {
  products: Product[];
  onPreview: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const QuickPicks: React.FC<QuickPicksProps> = ({
  products,
  onPreview,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const topPicks = products.filter((p) => p.isTopPick);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-main)] flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/15 text-amber-500">
              <Zap className="w-4 h-4 fill-amber-500" />
            </span>
            Top-Selling Digital Art Picks
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Instant 300 DPI PDF downloads, Procreate brushsets & scalable vector designs
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Cards Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {topPicks.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[280px] sm:w-[300px] bg-[var(--bg-card)] border border-[var(--card-border)] rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 font-mono">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label={wishlistIds.includes(product.id) ? "Remove from Favorites" : "Add to Favorites"}
                    title={wishlistIds.includes(product.id) ? "In My Favorites" : "Save to Favorites"}
                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] hover:border-rose-400 hover:scale-105 transition-all"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        wishlistIds.includes(product.id)
                          ? 'text-rose-500 fill-rose-500'
                          : 'text-[var(--text-muted)] hover:text-rose-500'
                      }`}
                    />
                  </button>
                  <span className="text-lg">{product.icon}</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-heading font-bold text-sm text-[var(--text-main)] group-hover:text-rose-500 transition-colors line-clamp-2 leading-snug mb-2">
                {product.title}
              </h4>

              {/* Format Badge */}
              <div className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border border-[var(--card-border)] mb-2">
                {product.format.split('+')[0]}
              </div>

              {/* Description snippet */}
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Price & Actions */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-heading font-black text-lg text-emerald-600 dark:text-emerald-400">
                  ${product.price}
                </span>
                <span className="text-xs text-[var(--text-muted)] line-through">
                  ${product.originalPrice}
                </span>
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onPreview(product)}
                  className="py-2 px-2.5 rounded-xl text-xs font-semibold bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:bg-[var(--card-border)] flex items-center justify-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="py-2 px-2.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 flex items-center justify-center gap-1 shadow-sm transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
