import React from 'react';
import { FREEBIES_DATA, Freebie } from '../data/products';
import { Download, Gift, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface FreebiesSectionProps {
  onDownloadFreebie: (freebie: Freebie) => void;
}

export const FreebiesSection: React.FC<FreebiesSectionProps> = ({ onDownloadFreebie }) => {
  return (
    <section id="freebies" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--card-border)] bg-[var(--bg-card-subtle)]/40 rounded-3xl my-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 mb-2">
          <Gift className="w-3.5 h-3.5" />
          Pageo Artist Freebies & Samples
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--text-main)]">
          Free Printable Coloring Pages & Brush Samples
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
          Try our studio-quality 300 DPI line art, Procreate pencils, and vector graphics completely free. Zero payment required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FREEBIES_DATA.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-rose-400/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono">
                  100% FREE
                </span>
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
              </div>

              <h3 className="font-heading font-bold text-sm text-[var(--text-main)] leading-snug mb-1 group-hover:text-rose-500 transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] mb-2.5">
                <span>{item.format}</span>
                <span>•</span>
                <span>{item.fileSize}</span>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                {item.desc}
              </p>
            </div>

            <div>
              <button
                onClick={() => onDownloadFreebie(item)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[var(--bg-card-subtle)] border border-[var(--card-border)] hover:bg-rose-500 hover:text-white hover:border-rose-500 text-[var(--text-main)] flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:scale-[1.01]"
              >
                <Download className="w-3.5 h-3.5" /> 1-Click Free Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
