import React from 'react';
import { ShieldCheck, Download, Printer, Lock, Sparkles, BookOpen, Paintbrush, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavClick: (nav: string) => void;
  onSelectCategory: (cat: string) => void;
  onOpenSupport: (type: 'telegram' | 'whatsapp' | 'contact' | 'licensing') => void;
  onOpenColoringStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onSelectCategory,
  onOpenSupport,
  onOpenColoringStudio,
}) => {
  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--card-border)] text-[var(--text-muted)] text-xs mt-16 transition-colors">
      
      {/* Digital Store Benefits Banner */}
      <div className="border-b border-[var(--card-border)] bg-[var(--bg-card-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-black text-xs uppercase tracking-wider text-[var(--text-main)] mb-1">
                  Instant Lifetime Access
                </h4>
                <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                  Immediate 1-click downloads with unlimited cloud re-downloads from your digital library vault.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-black text-xs uppercase tracking-wider text-[var(--text-main)] mb-1">
                  300 DPI Print-Ready PDFs
                </h4>
                <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                  Vector-mastered zero-bleed pages ready for home printers and Amazon KDP publishing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-black text-xs uppercase tracking-wider text-[var(--text-main)] mb-1">
                  Commercial Licensing
                </h4>
                <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                  Full rights to publish and sell physical books, prints, and client work with complete confidence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-black text-xs uppercase tracking-wider text-[var(--text-main)] mb-1">
                  Secure Digital Vault
                </h4>
                <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                  Protected encrypted files, clean licensing certificates, and automatic version updates.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[var(--bg-card)] rounded-[10px] flex items-center justify-center text-sm">
                  🎨
                </div>
              </div>
              <span className="font-heading font-black text-xl text-[var(--text-main)]">
                Pageo
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                100% Digital Store
              </span>
            </div>
            <p className="leading-relaxed max-w-sm">
              Pageo is your specialized digital art storefront offering 300 DPI print-ready colouring e-books, Procreate brushes, illustrated storybooks, traceable lettering guides, and Amazon KDP low-content interiors.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-muted)] text-[11px] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant Lifetime Cloud Delivery & Zero Physical Shipping</span>
              </div>
            </div>
          </div>

          {/* Col 2: Digital Publishing Segments */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-main)]">
              Publishing Segments
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('colouring-books');
                    onNavClick('store');
                  }}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  🌸 Colouring E-Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('digital-brushes');
                    onNavClick('store');
                  }}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  🖌️ Digital Brushes & Textures
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('story-children-books');
                    onNavClick('store');
                  }}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  🦁 Story & Children Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('calligraphy-lettering');
                    onNavClick('store');
                  }}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  ✒️ Calligraphy & Lettering Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('vector-kdp-interiors');
                    onNavClick('store');
                  }}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  📑 Vector & KDP Interiors
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Creative Interactive Studio */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-main)]">
              Interactive Studio
            </h4>
            <ul className="space-y-2">
              {onOpenColoringStudio && (
                <li>
                  <button
                    onClick={onOpenColoringStudio}
                    className="hover:text-rose-500 transition-colors text-left flex items-center gap-1.5"
                  >
                    <Paintbrush className="w-3.5 h-3.5 text-rose-500" />
                    Color Online Web Studio
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavClick('bundle-builder')}
                  className="hover:text-rose-500 transition-colors text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Custom 3-Item Bundle ($24.99)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('reviews')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  Artist Reviews & Community Wall
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('freebies')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  Free Artist Download Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('store')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  All 300 DPI Print Masters
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Guarantees */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-main)]">
              Licensing & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenSupport('licensing')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  Commercial Rights & License
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSupport('contact')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  Contact Art Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSupport('telegram')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  Telegram Creator Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSupport('whatsapp')}
                  className="hover:text-rose-500 transition-colors text-left"
                >
                  WhatsApp VIP Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenSupport('licensing')}
                  className="hover:text-rose-500 transition-colors text-left text-emerald-600 dark:text-emerald-400 font-semibold"
                >
                  100% Download Guarantee
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px]">
          <p>© 2026 Pageo — Digital Art & Publishing Hub. All rights reserved.</p>
          <p className="text-[var(--text-muted)] font-mono">
            Instant Lifetime Access • 300 DPI Print-Ready PDFs • Commercial Licensing • Secure Digital Vault
          </p>
        </div>
      </div>
    </footer>
  );
};
