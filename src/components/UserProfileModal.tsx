import React, { useState } from 'react';
import { Product } from '../data/products';
import {
  X,
  Heart,
  ShoppingCart,
  Eye,
  Trash2,
  Sparkles,
  User,
  ShieldCheck,
  Download,
  Presentation,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Paintbrush,
  FileText,
  Printer,
  Award,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  allProducts: Product[];
  libraryItems: Product[];
  onToggleWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: (products: Product[]) => void;
  onPreview: (product: Product) => void;
  onOpenSlidesModal: () => void;
  onOpenColoringStudio: (templateIndex?: number) => void;
  onDownloadAsset: (product: Product) => void;
  onShowToast: (msg: string) => void;
  initialTab?: 'library' | 'favorites' | 'account' | 'workspace';
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  allProducts,
  libraryItems,
  onToggleWishlist,
  onClearWishlist,
  onAddToCart,
  onAddAllToCart,
  onPreview,
  onOpenSlidesModal,
  onOpenColoringStudio,
  onDownloadAsset,
  onShowToast,
  initialTab = 'library',
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'favorites' | 'account' | 'workspace'>(initialTab);
  const [viewingLicenseProduct, setViewingLicenseProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const favoriteProducts = allProducts.filter((p) => wishlistIds.includes(p.id));
  const favoritesTotal = favoriteProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        
        {/* Top Profile Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[var(--card-border)] mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-500 to-purple-600 p-0.5 shadow-md shadow-rose-500/20">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-[14px] flex items-center justify-center text-xl">
                🎨
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-heading font-black text-lg text-[var(--text-main)]">
                  Artist Studio Profile & Library
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-mono">
                  VIP Creator
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                mayankukreja16@gmail.com • Unlimited Commercial License
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close user profile"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-5 border-b border-[var(--card-border)] pb-2 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-2 px-3 transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'library'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-500" />
            My Digital Library ({libraryItems.length})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-2 px-3 transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'favorites'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favoriteProducts.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            My Favorites ({favoriteProducts.length})
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`pb-2 px-3 transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'account'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Commercial Licenses
          </button>

          <button
            onClick={() => setActiveTab('workspace')}
            className={`pb-2 px-3 transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'workspace'
                ? 'border-rose-500 text-rose-500 font-bold'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-amber-500" />
            Google Slides Deck
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto mb-4">
          
          {/* TAB 0: MY DIGITAL LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>Permanent Cloud Vault:</strong> You own lifetime instant downloads & free revision updates for all unlocked assets below.
                  </span>
                </div>
              </div>

              {libraryItems.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-[var(--bg-card-subtle)] rounded-3xl p-8 border border-[var(--card-border)]">
                  <BookOpen className="w-10 h-10 text-rose-500 mx-auto" />
                  <h4 className="font-heading font-black text-lg text-[var(--text-main)]">
                    No Digital Assets in Library Yet
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    When you purchase colouring e-books, Procreate brush sets, or custom bundles, your 300 DPI master files appear here permanently.
                  </p>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-5 rounded-xl font-bold text-xs bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-md"
                  >
                    Browse Digital Store
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {libraryItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="text-3xl p-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--card-border)] flex-shrink-0">
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                              Unlocked Master
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">
                              v2.1 • 300 DPI
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-sm text-[var(--text-main)] truncate max-w-xs sm:max-w-md">
                            {item.title}
                          </h4>
                          <span className="text-xs text-[var(--text-muted)] font-mono block">
                            Format: {item.format}
                          </span>
                        </div>
                      </div>

                      {/* Download & Launch Studio Actions */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap pt-2 sm:pt-0 border-t sm:border-0 border-[var(--card-border)]">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenColoringStudio(0);
                          }}
                          className="py-2 px-3 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 flex items-center gap-1 transition-colors"
                          title="Color online in browser"
                        >
                          <Paintbrush className="w-3.5 h-3.5" /> Color in Studio
                        </button>
                        <button
                          onClick={() => setViewingLicenseProduct(item)}
                          className="py-2 px-3 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 flex items-center gap-1 transition-colors"
                          title="View Official License Certificate"
                        >
                          <Award className="w-3.5 h-3.5 text-purple-500" /> License
                        </button>
                        <button
                          onClick={() => onDownloadAsset(item)}
                          className="py-2 px-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                          title="Download high-resolution master file"
                        >
                          <Download className="w-3.5 h-3.5" /> Download (300 DPI)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 1: MY FAVORITES */}
          {activeTab === 'favorites' && (
            <div>
              {favoriteProducts.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-[var(--bg-card-subtle)] rounded-3xl p-8 border border-[var(--card-border)]">
                  <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                    <Heart className="w-8 h-8 text-rose-400 stroke-[1.5]" />
                  </div>
                  <h4 className="font-heading font-black text-lg text-[var(--text-main)]">
                    Your Favorites Wishlist is Empty
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                    Heart any 300 DPI colouring e-book, Procreate brush studio, or vector bundle across the Pageo store to build your personal artist wishlist.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="py-2.5 px-5 rounded-xl font-bold text-xs bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all"
                    >
                      Explore Digital Products
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Top Bar with Actions */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--card-border)]">
                    <span className="text-[var(--text-muted)]">
                      Showing <strong>{favoriteProducts.length}</strong> saved digital art assets:
                    </span>
                    <button
                      onClick={onClearWishlist}
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-rose-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  </div>

                  {/* List of Favorite Items */}
                  <div className="space-y-3">
                    {favoriteProducts.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-rose-400/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="text-2xl p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--card-border)] flex-shrink-0 group-hover:scale-105 transition-transform">
                            {product.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.2 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono">
                                {product.badge}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                                {product.categoryLabel}
                              </span>
                            </div>
                            <h4 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-main)] truncate max-w-xs sm:max-w-md">
                              {product.title}
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="font-heading font-black text-sm text-emerald-600 dark:text-emerald-400">
                                ${product.price}
                              </span>
                              <span className="text-[11px] text-[var(--text-muted)] line-through">
                                ${product.originalPrice}
                              </span>
                              <span className="text-[10px] font-mono text-[var(--text-muted)] ml-2">
                                {product.format.split('+')[0]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions for this item */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-[var(--card-border)]">
                          <button
                            onClick={() => onPreview(product)}
                            className="py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-main)] hover:bg-[var(--card-border)] flex items-center gap-1 transition-colors"
                            title="Preview Art"
                          >
                            <Eye className="w-3.5 h-3.5" /> Preview
                          </button>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="py-1.5 px-3 rounded-lg text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 flex items-center gap-1 shadow-sm transition-colors"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                          <button
                            onClick={() => onToggleWishlist(product.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card)] border border-[var(--card-border)] text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Remove from favorites"
                          >
                            <Heart className="w-4 h-4 fill-rose-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Favorites Summary & Add All */}
                  <div className="pt-3 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--bg-card)] p-4 rounded-2xl">
                    <div className="text-xs text-[var(--text-muted)]">
                      <span>Favorites Total: </span>
                      <strong className="font-heading font-black text-base text-emerald-600 dark:text-emerald-400">
                        ${favoritesTotal.toFixed(2)}
                      </strong>
                    </div>
                    <button
                      onClick={() => onAddAllToCart(favoriteProducts)}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add All ({favoriteProducts.length}) to Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LICENSES & DOWNLOAD LIBRARY */}
          {activeTab === 'account' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200 space-y-1">
                <div className="font-heading font-bold text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Commercial License Certificate Active
                </div>
                <p>
                  Your account is registered with unlimited commercial rights for Amazon KDP, Etsy print-on-demand, and client illustration projects.
                </p>
              </div>

              <div className="bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--card-border)] space-y-2">
                <div className="font-bold text-[var(--text-main)] uppercase tracking-wider text-[11px] font-mono">
                  Your Active Promo Discounts
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--card-border)]">
                    <span className="font-mono font-bold text-rose-500">PAGEO25</span>
                    <span className="text-[var(--text-muted)] block">25% OFF Any Order</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--card-border)]">
                    <span className="font-mono font-bold text-amber-500">PAGEOMANDALA</span>
                    <span className="text-[var(--text-muted)] block">30% OFF Colouring Books</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--card-border)] space-y-2">
                <div className="font-bold text-[var(--text-main)] uppercase tracking-wider text-[11px] font-mono">
                  Direct Download Re-delivery
                </div>
                <p className="text-[var(--text-muted)]">
                  Need fresh download links for previously acquired assets or Procreate brush updates? Tap below to resend to your email.
                </p>
                <button
                  onClick={() => onShowToast('Download links resent to mayankukreja16@gmail.com!')}
                  className="py-2 px-3 rounded-lg font-bold bg-[var(--bg-card)] border border-[var(--card-border)] hover:border-rose-400 text-[var(--text-main)] flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-rose-500" /> Resend Download Links
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE SLIDES DECK */}
          {activeTab === 'workspace' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 space-y-2">
                <div className="font-heading font-bold text-sm flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                  <Presentation className="w-4 h-4" />
                  Google Workspace Connected
                </div>
                <p>
                  Export your Pageo colouring books, Procreate brushes, and vector showcases directly into editable Google Slides presentation decks for client pitches or portfolio presentations.
                </p>
              </div>

              <div className="bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--card-border)] space-y-3">
                <div className="font-bold text-[var(--text-main)]">
                  Presentation Export Features:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)]">
                  <li>Automated title slide with branding</li>
                  <li>300 DPI Colouring Books catalog & KDP interior specifications</li>
                  <li>Procreate 5X & Photoshop brushes showcase slide</li>
                  <li>Commercial licensing overview</li>
                </ul>

                <button
                  onClick={() => {
                    onClose();
                    onOpenSlidesModal();
                  }}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 shadow-sm transition-all"
                >
                  <Presentation className="w-3.5 h-3.5" /> Open Google Slides Exporter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* License Certificate Modal Inspector */}
        {viewingLicenseProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white text-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300/80 relative">
              <div className="text-center pb-4 border-b border-amber-200 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl mb-2">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800">
                  Pageo Studio • Official Digital License
                </span>
                <h3 className="font-heading font-black text-xl text-zinc-900 mt-1">
                  Certificate of Commercial Usage
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-700 mb-6">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <div className="font-mono text-[10px] text-amber-800 font-bold uppercase">
                    Licensed Asset
                  </div>
                  <strong className="text-sm text-zinc-900 block font-heading">
                    {viewingLicenseProduct.title}
                  </strong>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    ID: PGO-LIC-2026-{viewingLicenseProduct.id.toUpperCase().slice(0, 10)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <span className="text-zinc-400 font-mono block text-[9px] uppercase">Licensee</span>
                    <strong className="text-zinc-800">Mayank Ukreja</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <span className="text-zinc-400 font-mono block text-[9px] uppercase">Effective Date</span>
                    <strong className="text-zinc-800">October 2026 (Lifetime)</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 text-[11px]">
                  <span className="font-bold text-zinc-900">Commercial Grants Included:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-zinc-600">
                    <li>Unlimited Amazon KDP paperback and hardcover publishing</li>
                    <li>Etsy print-on-demand, apparel, posters & merchandise</li>
                    <li>Digital client work and advertising illustrations</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-200">
                <button
                  onClick={() => {
                    window.print();
                    onShowToast('Printing license certificate...');
                  }}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Certificate
                </button>
                <button
                  onClick={() => setViewingLicenseProduct(null)}
                  className="py-2.5 px-5 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-black text-white transition-colors"
                >
                  Close Certificate
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
