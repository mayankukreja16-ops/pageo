import React from 'react';
import { Product } from '../data/products';
import { Eye, ShoppingCart, Star, CheckCircle2, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface StoreSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onPreview: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onPreview,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const categories = [
    { id: 'all', label: 'All Products', icon: '🎨', desc: 'Browse our complete catalog of 300 DPI digital publishing assets' },
    { id: 'colouring-books', label: 'Colouring E-Books', icon: '🌸', desc: 'Print-ready 300 DPI PDFs, mandalas, fantasy art & relaxation' },
    { id: 'digital-brushes', label: 'Digital Brushes & Textures', icon: '🖌️', desc: 'Procreate & Photoshop brushsets, 4K paper textures & palettes' },
    { id: 'story-children-books', label: 'Story & Children Books', icon: '🦁', desc: 'Illustrated narrative digital books & educational bedtime adventures' },
    { id: 'calligraphy-lettering', label: 'Calligraphy & Hand Lettering Guides', icon: '✒️', desc: 'Traceable practice sheets, brush nibs & lettering workbooks' },
    { id: 'vector-kdp-interiors', label: 'Vector & KDP Interiors', icon: '📑', desc: 'Amazon KDP ready low-content publishing interiors & scalable vectors' },
  ];

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <section id="store" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            100% Digital Art Store • Instant Lifetime Access
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--text-main)]">
            Digital Publishing & Art Store
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {currentCategoryObj.desc}
          </p>
        </div>

        <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--card-border)] font-bold">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
          </span>
        </div>
      </div>

      {/* Filter Tabs / Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const count = cat.id === 'all' 
            ? products.length 
            : products.filter((p) => p.category === cat.id).length;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all shadow-sm ${
                isActive
                  ? 'bg-rose-500 text-white shadow-rose-500/25 ring-2 ring-rose-400/40'
                  : 'bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Search Filter Pill */}
      {searchQuery && (
        <div className="mb-6 flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
          <span className="text-[var(--text-main)]">
            Showing results matching: <strong className="font-bold font-mono">"{searchQuery}"</strong>
          </span>
          <button
            onClick={onClearSearch}
            className="ml-auto px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-200 font-bold"
          >
            Clear Filter ✕
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--card-border)]">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="font-heading font-bold text-lg text-[var(--text-main)] mb-1">
            No digital assets found in this segment
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mb-4">
            Try adjusting your search query or browse across all digital publishing categories.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onClearSearch();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-500/40 transition-all group"
            >
              <div>
                {/* Card Top: Badges & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                      {product.badge}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] font-mono">
                      {product.format.split('+')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      aria-label={wishlistIds.includes(product.id) ? "Remove from Favorites" : "Add to Favorites"}
                      title={wishlistIds.includes(product.id) ? "In My Favorites" : "Save to Favorites"}
                      className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] hover:border-rose-400 hover:scale-110 transition-all"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          wishlistIds.includes(product.id)
                            ? 'text-rose-500 fill-rose-500 scale-105'
                            : 'text-[var(--text-muted)] hover:text-rose-500'
                        }`}
                      />
                    </button>
                    <span className="text-2xl transform group-hover:scale-110 transition-transform">
                      {product.icon}
                    </span>
                  </div>
                </div>

                {/* Category Label */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono block mb-1">
                  {product.categoryLabel}
                </span>

                {/* Title */}
                <h3 className="font-heading font-bold text-base text-[var(--text-main)] group-hover:text-rose-500 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {product.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="text-xs font-bold ml-1 text-[var(--text-main)]">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    ({product.reviewsCount} reviews)
                  </span>
                  <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Commercial License
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Package Inclusions */}
                <div className="bg-[var(--bg-card-subtle)] rounded-xl p-3 mb-5 border border-[var(--card-border)]">
                  <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                    <span>Package Inclusions</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">300 DPI Masters</span>
                  </div>
                  <ul className="space-y-1.5">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-xs text-[var(--text-main)] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Pricing & Action Buttons */}
              <div className="pt-3 border-t border-[var(--card-border)]">
                <div className="flex items-baseline justify-between mb-3.5">
                  <div>
                    <span className="font-heading font-black text-xl text-emerald-600 dark:text-emerald-400">
                      ${product.price}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onPreview(product)}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:bg-[var(--card-border)] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Flipbook Preview
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white flex items-center justify-center gap-1.5 shadow-sm shadow-rose-500/20 transition-all hover:scale-[1.02]"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};
