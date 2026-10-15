import React, { useState } from 'react';
import { Send, MessageSquare, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface CommunitySectionProps {
  onShowToast: (msg: string) => void;
  onOpenSupport: (type: 'telegram' | 'whatsapp' | 'contact' | 'licensing') => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  onShowToast,
  onOpenSupport,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    onShowToast('🎉 Welcome to Pageo VIP Club! Check inbox for your 10 Free Mandala pages bonus.');
    setEmail('');
  };

  return (
    <section id="community" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--card-border)]">
      <div className="bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-purple-500/10 border border-[var(--card-border)] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Community stats & channels */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              18,400+ Illustrators & KDP Publishers
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--text-main)] mb-3 leading-tight">
              Join the Pageo Artist Circle & Get 0-Day Asset Drops
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-xl">
              Get direct alerts whenever new 300 DPI coloring book volumes, Procreate brush updates, or time-sensitive hardware discounts go live. Plus exclusive monthly freebies for community members.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenSupport('telegram')}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" /> Telegram Artist Channel (14K+)
              </button>
              <button
                onClick={() => onOpenSupport('whatsapp')}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#10b981] hover:bg-[#059669] text-white flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp VIP Alerts
              </button>
            </div>
          </div>

          {/* Right Column: Weekly Freebie Drops Newsletter */}
          <div className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm">
            <h4 className="font-heading font-extrabold text-base text-[var(--text-main)] mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-500" />
              Weekly Free Printable Art Drops
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Get 2 free high-res coloring pages and Procreate brushes in your inbox every Friday morning. No spam ever.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                You're on the list! First drop arriving this Friday.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-sm transition-all hover:scale-[1.01]"
                >
                  Join Pageo Club & Get Free Bonus Pack →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
