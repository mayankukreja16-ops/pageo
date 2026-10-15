import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES, HeroSlide } from '../data/products';
import { ChevronLeft, ChevronRight, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

interface HeroCarouselProps {
  onSelectCategory: (cat: string) => void;
  onCopyCoupon: (code: string) => void;
  onExploreClick: (category: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onSelectCategory,
  onCopyCoupon,
  onExploreClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimer = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;

    autoPlayTimer.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleCopy = (code: string) => {
    onCopyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="home"
      className="pt-6 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          Featured Art Collections & Digital E-Books
        </span>
        <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
          300 DPI Print-Ready PDFs • KDP Interior Ready • Instant Downloads
        </span>
      </div>

      {/* Main Carousel Frame */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 shadow-xl shadow-rose-950/10 dark:shadow-rose-900/20">
        <div className="relative overflow-hidden rounded-[22px] bg-[var(--bg-card)] border border-[var(--card-border)] min-h-[420px] sm:min-h-[380px] p-6 sm:p-10 flex flex-col justify-between transition-all">
          
          {/* Subtle Ambient Background Glow */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700 bg-gradient-to-br ${activeSlide.gradient}`}
          />

          {/* Slide Content */}
          <div className="relative z-10 max-w-3xl">
            {/* Slide Badges */}
            <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                {activeSlide.tag}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {activeSlide.dealTag}
              </span>
              <span className="text-xl ml-1">{activeSlide.icon}</span>
            </div>

            {/* Slide Title */}
            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl leading-tight text-[var(--text-main)] mb-2.5 tracking-tight">
              {activeSlide.title}
            </h1>

            {/* Slide Subtitle */}
            <p className="font-serif-title italic text-sm sm:text-base text-rose-600 dark:text-rose-400 font-semibold mb-2">
              {activeSlide.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-2xl">
              {activeSlide.description}
            </p>

            {/* Promo Code Box */}
            <div className="inline-flex items-center gap-3 bg-[var(--bg-card-subtle)] border border-[var(--card-border)] rounded-2xl px-4 py-2 mb-6 shadow-sm">
              <div className="text-xs">
                <span className="text-[var(--text-muted)]">{activeSlide.couponLabel}: </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 ml-1">
                  {activeSlide.couponCode}
                </span>
              </div>
              <button
                onClick={() => handleCopy(activeSlide.couponCode)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500 text-white hover:bg-rose-600 transition-colors flex items-center gap-1 shadow-sm"
              >
                {copiedCode === activeSlide.couponCode ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => onExploreClick(activeSlide.ctaTarget)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-md shadow-rose-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                {activeSlide.ctaText}
              </button>
              <button
                onClick={() => onSelectCategory('all')}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:bg-[var(--card-border)] transition-colors"
              >
                Browse All Products (20)
              </button>
              <div className="ml-auto hidden sm:flex items-baseline gap-1.5 pl-4">
                <span className="text-xs text-[var(--text-muted)]">Starting at</span>
                <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">
                  {activeSlide.price}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Bottom Controls */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-[var(--card-border)] mt-4">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-7 bg-rose-500'
                      : 'w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/60'
                  }`}
                />
              ))}
            </div>

            {/* Slide Index & Nav Arrows */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[var(--text-muted)] mr-2">
                {currentSlide + 1} / {totalSlides}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-rose-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
