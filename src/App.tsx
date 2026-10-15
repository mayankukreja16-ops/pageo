import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { QuickPicks } from './components/QuickPicks';
import { StoreSection } from './components/StoreSection';
import { BundleBuilderSection } from './components/BundleBuilderSection';
import { ReviewShowcaseSection } from './components/ReviewShowcaseSection';
import { FreebiesSection } from './components/FreebiesSection';
import { CommunitySection } from './components/CommunitySection';
import { ProductModal } from './components/ProductModal';
import { FlipbookReaderModal } from './components/FlipbookReaderModal';
import { ColoringStudioModal } from './components/ColoringStudioModal';
import { CartDrawer } from './components/CartDrawer';
import { SupportModal } from './components/SupportModal';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Footer } from './components/Footer';
import { PRODUCTS_DATA, Product, Freebie } from './data/products';
import { MessageSquare, Send, X, Presentation, Heart, User, Paintbrush, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('pageo_theme');
    if (saved) return saved === 'dark';
    return false; // Default light warm pastel aesthetic
  });

  // Search & Navigation state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [flipbookProduct, setFlipbookProduct] = useState<Product | null>(PRODUCTS_DATA[0]);
  const [isColoringStudioOpen, setIsColoringStudioOpen] = useState(false);
  const [coloringTemplateIndex, setColoringTemplateIndex] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [supportModalType, setSupportModalType] = useState<'telegram' | 'whatsapp' | 'contact' | 'licensing' | null>(null);
  const [isSlidesModalOpen, setIsSlidesModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [userProfileTab, setUserProfileTab] = useState<'library' | 'favorites' | 'account' | 'workspace'>('library');

  // Wishlist / Favorites state (persisted to localStorage, empty by default)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pageo_wishlist_ids');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Purge any legacy mock-seeded items
          return parsed.filter(id => id !== 'colour-mandala-zen' && id !== 'brush-watercolor-master');
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // User Digital Library state (unlocked purchases)
  const [libraryItems, setLibraryItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pageo_library_ids');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return PRODUCTS_DATA.filter((p) => ids.includes(p.id));
      }
      // Default initial starter library
      return [PRODUCTS_DATA[0], PRODUCTS_DATA[4]];
    } catch {
      return [PRODUCTS_DATA[0]];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pageo_wishlist_ids', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('pageo_library_ids', JSON.stringify(libraryItems.map((p) => p.id)));
    } catch (e) {
      console.warn('Could not save library to localStorage', e);
    }
  }, [libraryItems]);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('pageo_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('pageo_theme', 'light');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      showToast(next ? 'Switched to Dark Luxe Art Studio theme' : 'Switched to Warm Creative Pastel theme');
      return next;
    });
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(nav);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    // Automatically add to library when acquired
    setLibraryItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [product, ...prev];
    });
    showToast(`Added "${product.title}" to cart!`);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart.');
  };

  const toggleWishlist = (productId: string) => {
    const prod = PRODUCTS_DATA.find((p) => p.id === productId);
    const title = prod ? prod.title : 'Asset';
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from My Favorites: "${title}"`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added to My Favorites ❤️: "${title}"`);
        return [...prev, productId];
      }
    });
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    showToast('Cleared all items from My Favorites');
  };

  const handleAddAllFavoritesToCart = (favs: Product[]) => {
    if (!favs.length) return;
    setCartItems((prev) => [...prev, ...favs]);
    showToast(`Added ${favs.length} favorites to your cart! 🛍️`);
  };

  // Open multi-page flipbook reader
  const handleOpenFlipbook = (product: Product) => {
    setFlipbookProduct(product);
    setIsFlipbookOpen(true);
  };

  // Open live in-browser coloring studio
  const handleOpenColoringStudio = (templateIndex = 0) => {
    setColoringTemplateIndex(templateIndex);
    setIsColoringStudioOpen(true);
  };

  // Direct download asset simulation
  const handleDownloadAsset = (product: Product) => {
    showToast(`📥 Downloading "${product.title}" master package (300 DPI PDF + Source Assets)...`);
    setTimeout(() => {
      showToast(`✅ "${product.title}" saved to your downloads.`);
    }, 1200);
  };

  // Add custom bundle to cart
  const handleAddCustomBundleToCart = (bundleItems: Product[], bundlePrice: number) => {
    const customBundle: Product = {
      id: `custom-bundle-${Date.now()}`,
      title: `Custom 3-Item Art Bundle: ${bundleItems.map((b) => b.title.split(' ')[0]).join(' + ')}`,
      category: 'colouring-books',
      categoryLabel: 'Custom Art Bundle',
      badge: 'BUNDLE 45% OFF',
      price: bundlePrice,
      originalPrice: bundleItems.reduce((acc, i) => acc + i.price, 0),
      rating: 5.0,
      reviewsCount: 1,
      description: `Custom bundle comprising: ${bundleItems.map((b) => b.title).join(' • ')}.`,
      detailedOverview: 'Custom 3-Item Art Bundle including print-ready 300 DPI PDFs, Procreate brushes, and commercial KDP licenses.',
      format: '300 DPI PDFs, .brushset & Vector Masters',
      resolution: 'Native 300 DPI Print Masters',
      itemCount: '3 Full Digital Products',
      features: bundleItems.map((b) => `Includes: ${b.title}`),
      licenseType: 'Full Commercial & KDP Publishing License',
      icon: '📦',
      bgGradient: 'from-amber-500/20 to-rose-500/20',
      accentColor: '#ff9f43',
    };

    setCartItems((prev) => [...prev, customBundle]);
    // Unlock all 3 in user library
    setLibraryItems((prev) => {
      const newItems = bundleItems.filter((bi) => !prev.some((p) => p.id === bi.id));
      return [...newItems, ...prev];
    });

    setIsCartOpen(true);
  };

  const handleDownloadFreebie = (freebie: Freebie) => {
    showToast(`📥 Preparing instant download for "${freebie.title}" (${freebie.fileSize})...`);
    setTimeout(() => {
      showToast(`✅ "${freebie.title}" downloaded! Enjoy your free digital asset.`);
    }, 1200);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Copied code: "${code}"! Discount ready at checkout.`);
    }).catch(() => {
      showToast(`Code: ${code} ready to use!`);
    });
  };

  const handleExploreCategory = (category: string) => {
    if (category === 'bundle-builder' || category === 'bundle') {
      handleNavClick('bundle-builder');
    } else {
      setSelectedCategory(category);
      handleNavClick('store');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        cartCount={cartItems.length}
        wishlistCount={wishlistIds.length}
        libraryCount={libraryItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUserProfile={(tab) => {
          setUserProfileTab(tab || 'library');
          setIsUserProfileOpen(true);
        }}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSlidesModal={() => setIsSlidesModalOpen(true)}
        onOpenColoringStudio={() => handleOpenColoringStudio(0)}
        onSelectCategory={handleExploreCategory}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 8-Slide Hero 3D Carousel */}
        <HeroCarousel
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavClick('store');
          }}
          onCopyCoupon={handleCopyCoupon}
          onExploreClick={handleExploreCategory}
        />

        {/* Quick-Picks Top Sellers Mini Slider */}
        <QuickPicks
          products={PRODUCTS_DATA}
          onPreview={handleOpenFlipbook}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
        />

        {/* Digital Products Store with 6 Segment Filters */}
        <StoreSection
          products={PRODUCTS_DATA}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onPreview={handleOpenFlipbook}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
        />

        {/* Custom 3-Item Art Bundle Builder Section */}
        <BundleBuilderSection
          products={PRODUCTS_DATA}
          onAddCustomBundleToCart={handleAddCustomBundleToCart}
          onShowToast={showToast}
        />

        {/* Customer Reviews & Colored Artwork Showcase */}
        <ReviewShowcaseSection
          products={PRODUCTS_DATA}
          onShowToast={showToast}
          onOpenColoringStudio={() => handleOpenColoringStudio(0)}
        />

        {/* Freebies Section (100% Digital Samples) */}
        <FreebiesSection onDownloadFreebie={handleDownloadFreebie} />

        {/* Community & Newsletter Section */}
        <CommunitySection
          onShowToast={showToast}
          onOpenSupport={(type) => setSupportModalType(type)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleNavClick}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavClick('store');
        }}
        onOpenSupport={(type) => setSupportModalType(type)}
        onOpenColoringStudio={() => handleOpenColoringStudio(0)}
      />

      {/* Interactive Multi-Page Flipbook Reader Modal */}
      <FlipbookReaderModal
        product={flipbookProduct}
        isOpen={isFlipbookOpen}
        onClose={() => setIsFlipbookOpen(false)}
        onAddToCart={handleAddToCart}
        isWishlisted={flipbookProduct ? wishlistIds.includes(flipbookProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        onOpenColoringStudio={handleOpenColoringStudio}
      />

      {/* Interactive In-Browser Live Coloring Studio Modal */}
      <ColoringStudioModal
        isOpen={isColoringStudioOpen}
        onClose={() => setIsColoringStudioOpen(false)}
        initialTemplateIndex={coloringTemplateIndex}
        onShowToast={showToast}
      />

      {/* User Profile & My Digital Library Modal */}
      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        wishlistIds={wishlistIds}
        allProducts={PRODUCTS_DATA}
        libraryItems={libraryItems}
        onToggleWishlist={toggleWishlist}
        onClearWishlist={clearWishlist}
        onAddToCart={handleAddToCart}
        onAddAllToCart={handleAddAllFavoritesToCart}
        onPreview={handleOpenFlipbook}
        onOpenSlidesModal={() => {
          setIsUserProfileOpen(false);
          setIsSlidesModalOpen(true);
        }}
        onOpenColoringStudio={handleOpenColoringStudio}
        onDownloadAsset={handleDownloadAsset}
        onShowToast={showToast}
        initialTab={userProfileTab}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
        onShowToast={showToast}
      />

      {/* Support Modal (Telegram, WhatsApp, Contact Form, Licensing) */}
      <SupportModal
        isOpen={supportModalType !== null}
        type={supportModalType}
        onClose={() => setSupportModalType(null)}
        onShowToast={showToast}
      />

      {/* Google Slides Integration Modal */}
      <GoogleSlidesModal
        isOpen={isSlidesModalOpen}
        onClose={() => setIsSlidesModalOpen(false)}
        products={PRODUCTS_DATA}
        onShowToast={showToast}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => handleOpenColoringStudio(0)}
          title="Color Online in Browser Studio"
          className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-110 transition-transform"
        >
          <Paintbrush className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSupportModalType('telegram')}
          title="Telegram Artist Support"
          className="w-12 h-12 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shadow-lg shadow-sky-600/30 hover:scale-110 transition-transform"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => {
            setUserProfileTab('favorites');
            setIsUserProfileOpen(true);
          }}
          title="My Favorites Wishlist"
          className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'fill-white' : ''}`} />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-rose-600 text-[10px] font-black rounded-full flex items-center justify-center shadow">
              {wishlistIds.length}
            </span>
          )}
        </button>
        <button
          onClick={() => {
            setUserProfileTab('library');
            setIsUserProfileOpen(true);
          }}
          title="My Digital Library"
          className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-110 transition-transform"
        >
          <BookOpen className="w-5 h-5" />
          {libraryItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-emerald-700 text-[10px] font-black rounded-full flex items-center justify-center shadow">
              {libraryItems.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsSlidesModalOpen(true)}
          title="Export to Google Slides"
          className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform"
        >
          <Presentation className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSupportModalType('whatsapp')}
          title="WhatsApp Creator Support"
          className="w-12 h-12 rounded-2xl bg-[#10b981] text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-110 transition-transform"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-80 bg-[var(--bg-card)] border-l border-[var(--card-border)] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎨</span>
                    <div>
                      <span className="font-heading font-black text-lg text-[var(--text-main)] block leading-none">
                        Pageo Store
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        100% Digital Assets
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-sm font-semibold">
                  <button
                    onClick={() => handleNavClick('home')}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-[var(--text-main)]"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      handleNavClick('store');
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-[var(--text-main)]"
                  >
                    All Digital Products
                  </button>

                  {/* Publishing Segments */}
                  <div className="pt-2 pb-1 px-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                      Publishing Segments
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('colouring-books');
                      handleNavClick('store');
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-main)] flex items-center gap-2"
                  >
                    <span>🌸</span> Colouring E-Books
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('digital-brushes');
                      handleNavClick('store');
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-main)] flex items-center gap-2"
                  >
                    <span>🖌️</span> Digital Brushes & Textures
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('story-children-books');
                      handleNavClick('store');
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-main)] flex items-center gap-2"
                  >
                    <span>🦁</span> Story & Children Books
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('calligraphy-lettering');
                      handleNavClick('store');
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-main)] flex items-center gap-2"
                  >
                    <span>✒️</span> Calligraphy & Lettering Guides
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('vector-kdp-interiors');
                      handleNavClick('store');
                    }}
                    className="w-full text-left py-2 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-main)] flex items-center gap-2"
                  >
                    <span>📑</span> Vector & KDP Interiors
                  </button>

                  <hr className="my-2 border-[var(--card-border)]" />

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleOpenColoringStudio(0);
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-xl bg-rose-500/10 text-rose-600 font-bold flex items-center gap-2"
                  >
                    <Paintbrush className="w-4 h-4" /> Color Online Studio
                  </button>
                  <button
                    onClick={() => handleNavClick('bundle-builder')}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-amber-600 font-bold flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Custom Bundle (Save 45%)
                  </button>
                  <button
                    onClick={() => handleNavClick('reviews')}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-[var(--text-main)]"
                  >
                    Artist Reviews & Artworks
                  </button>
                  <button
                    onClick={() => handleNavClick('freebies')}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-[var(--text-main)]"
                  >
                    Free Digital Samples
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setUserProfileTab('library');
                      setIsUserProfileOpen(true);
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-emerald-600 dark:text-emerald-400 flex items-center justify-between font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> My Digital Library
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      {libraryItems.length}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setUserProfileTab('favorites');
                      setIsUserProfileOpen(true);
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-rose-600 dark:text-rose-400 flex items-center justify-between font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 fill-rose-500" /> My Favorites
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400">
                      {wishlistIds.length}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSlidesModalOpen(true);
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[var(--bg-card-subtle)] text-amber-600 dark:text-amber-400 flex items-center gap-2"
                  >
                    <Presentation className="w-4 h-4" /> Google Slides Deck
                  </button>
                </div>

                <hr className="my-5 border-[var(--card-border)]" />

                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSupportModalType('telegram');
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-card-subtle)]"
                  >
                    ✈️ Telegram Artist Bot
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSupportModalType('whatsapp');
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-card-subtle)]"
                  >
                    💬 WhatsApp Creator Desk
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSupportModalType('licensing');
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-card-subtle)]"
                  >
                    🛡️ Commercial Rights & Guarantee
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--card-border)] text-[10px] text-[var(--text-muted)] text-center">
                Pageo Art Studio © 2026 • 100% Digital Store
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--bg-card)] border border-rose-500/40 text-[var(--text-main)] px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
