import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Moon,
  Sun,
  ShoppingBag,
  Menu,
  Sparkles,
  Heart,
  User,
  Paintbrush,
  BookOpen,
  ChevronDown,
  Layers,
  Book,
  Feather,
  Palette,
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  cartCount: number;
  wishlistCount: number;
  libraryCount?: number;
  onOpenCart: () => void;
  onOpenUserProfile: (tab?: 'library' | 'favorites' | 'account' | 'workspace') => void;
  onOpenMobileMenu: () => void;
  onOpenSlidesModal: () => void;
  onOpenColoringStudio: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeNav,
  onNavClick,
  isDark,
  onToggleTheme,
  cartCount,
  wishlistCount,
  libraryCount = 0,
  onOpenCart,
  onOpenUserProfile,
  onOpenMobileMenu,
  onOpenSlidesModal,
  onOpenColoringStudio,
  onSelectCategory,
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close category menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const digitalCategories = [
    { id: 'all', label: 'All Products', icon: '🎨', desc: 'Browse full digital catalog' },
    { id: 'colouring-books', label: 'Colouring E-Books', icon: '🌸', desc: '300 DPI print-ready mandalas & fantasy' },
    { id: 'digital-brushes', label: 'Digital Brushes & Textures', icon: '🖌️', desc: 'Procreate, Photoshop & 4K paper' },
    { id: 'story-children-books', label: 'Story & Children Books', icon: '🦁', desc: 'Illustrated bedtime stories & activities' },
    { id: 'calligraphy-lettering', label: 'Calligraphy & Hand Lettering', icon: '✒️', desc: 'Traceable workbooks & inking pens' },
    { id: 'vector-kdp-interiors', label: 'Vector & KDP Interiors', icon: '📑', desc: 'Ready-to-publish Amazon KDP interiors' },
  ];

  const handleCategoryPick = (catId: string) => {
    setIsCategoryMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    onNavClick('store');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 text-white text-xs py-2 px-4 text-center font-medium shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
          <span>
            <strong>🎨 100% Digital Art Publishing Store:</strong> 300 DPI Print-Ready PDFs, Procreate Brushes & KDP Interiors
          </span>
          <span className="hidden sm:inline text-amber-200">|</span>
          <span className="bg-white/20 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
            Code: PAGEO25 (25% OFF)
          </span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--header-bg)] border-b border-[var(--header-border)] transition-colors">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('home');
            }}
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-purple-600 p-0.5 shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[var(--bg-card)] rounded-[10px] flex items-center justify-center text-xl">
                🎨
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-[var(--text-main)] flex items-center gap-1.5 leading-none">
                Pageo
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                  Digital Store
                </span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-[var(--text-muted)] uppercase font-mono mt-0.5">
                E-Books & Art Assets
              </span>
            </div>
          </a>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs md:max-w-sm hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search colouring books, brushes, KDP interiors..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* Categories Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isCategoryMenuOpen || activeNav === 'store'
                    ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCategoryMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[var(--bg-card)] border border-[var(--card-border)] shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="px-3.5 py-1.5 border-b border-[var(--card-border)] mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] font-mono">
                      Digital Publishing Segments
                    </span>
                  </div>
                  {digitalCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryPick(cat.id)}
                      className="w-full text-left px-3.5 py-2 hover:bg-[var(--bg-card-subtle)] flex items-start gap-2.5 transition-colors group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-rose-500 transition-colors">
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                          {cat.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bundle Builder link */}
            <button
              onClick={() => onNavClick('bundle-builder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                activeNav === 'bundle-builder'
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Bundle Builder
            </button>

            {/* Community Reviews link */}
            <button
              onClick={() => onNavClick('reviews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeNav === 'reviews'
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              Artist Reviews
            </button>

            {/* Freebies link */}
            <button
              onClick={() => onNavClick('freebies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeNav === 'freebies'
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              Free Samples
            </button>

            {/* Color Online Button */}
            <button
              onClick={onOpenColoringStudio}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="Launch Live Web Paint Studio"
            >
              <Paintbrush className="w-3.5 h-3.5" /> Color Online
            </button>

            {/* My Favorites (Wishlist) */}
            <button
              onClick={() => onOpenUserProfile('favorites')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all"
              title="My Favorites Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              Favorites
              {wishlistCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* My Digital Library */}
            <button
              onClick={() => onOpenUserProfile('library')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-all"
              title="My Digital Library"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Library
              {libraryCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                  {libraryCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
            </button>

            {/* My Favorites Quick Heart Button */}
            <button
              onClick={() => onOpenUserProfile('favorites')}
              aria-label="My Favorites"
              title="My Favorites Wishlist"
              className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-rose-500 hover:border-rose-400 hover:bg-rose-500/10 transition-all group"
            >
              <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${wishlistCount > 0 ? 'fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Cart"
              title="Shopping Cart"
              className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-rose-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Account Button */}
            <button
              onClick={() => onOpenUserProfile('account')}
              aria-label="User Profile"
              title="My Digital Account & Downloads"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-rose-500/10 to-amber-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:border-rose-500 transition-all hover:scale-105"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open mobile menu"
              className="w-9 h-9 rounded-xl flex lg:hidden items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)]"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 pb-2.5 sm:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search colouring books, brushes, KDP..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
            />
          </div>
        </div>
      </header>
    </>
  );
};
