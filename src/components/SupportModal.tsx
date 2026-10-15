import React, { useState } from 'react';
import { X, Send, MessageSquare, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  type: 'telegram' | 'whatsapp' | 'contact' | 'licensing' | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  type,
  onClose,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onShowToast('✉️ Ticket submitted! Pageo studio will reply within 4 hours.');
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)] mb-4">
          <h3 className="font-heading font-black text-base text-[var(--text-main)] flex items-center gap-2">
            {type === 'telegram' && '✈️ Telegram VIP Artist Hub'}
            {type === 'whatsapp' && '💬 WhatsApp Creator Desk'}
            {type === 'contact' && '✉️ Contact Pageo Studio'}
            {type === 'licensing' && '🛡️ Commercial License & Guarantee'}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {type === 'telegram' && (
          <div className="space-y-4 text-xs">
            <p className="text-[var(--text-muted)] leading-relaxed">
              Connect directly with our creative community and automated asset bot for instant download re-sends and custom coloring book inquiries:
            </p>
            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] space-y-1.5">
              <div className="font-bold text-[var(--text-main)]">
                Community Handle: <span className="text-[#0284c7]">@PageoArtHub</span>
              </div>
              <div className="text-[var(--text-muted)]">
                VIP Alert Bot: <span className="font-mono text-rose-500">@PageoDropBot</span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Average reply time: &lt; 5 minutes
              </div>
            </div>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center justify-center gap-2 shadow-sm transition-all block text-center"
            >
              Open Telegram Channel →
            </a>
          </div>
        )}

        {type === 'whatsapp' && (
          <div className="space-y-4 text-xs">
            <p className="text-[var(--text-muted)] leading-relaxed">
              Order help, Amazon KDP formatting questions, or custom Procreate brush inquiries:
            </p>
            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] space-y-1.5">
              <div className="font-bold text-[var(--text-main)]">
                Helpline: <span className="text-emerald-600 dark:text-emerald-400">+91 98765 43210</span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                Available Monday - Saturday, 9:00 AM - 9:00 PM IST
              </div>
            </div>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-bold bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center gap-2 shadow-sm transition-all block text-center"
            >
              Start WhatsApp Conversation →
            </a>
          </div>
        )}

        {type === 'contact' && (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {isSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-bold text-[var(--text-main)]">Message Dispatched!</div>
                <div className="text-[var(--text-muted)]">Our team will get back to you shortly.</div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@email.com"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                    How can we help?
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="E.g., custom coloring book licensing, download link issue..."
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all"
                >
                  Send Message to Pageo Support
                </button>
              </>
            )}
          </form>
        )}

        {type === 'licensing' && (
          <div className="space-y-3 text-xs text-[var(--text-muted)] max-h-72 overflow-y-auto pr-1">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200">
              <strong className="block text-[var(--text-main)] font-heading mb-1">
                Full Commercial Rights Included
              </strong>
              Every digital asset on Pageo comes with an unrestricted commercial license for physical printed goods, Amazon KDP books, and client projects.
            </div>
            <p>
              <strong>7-Day Money Back Guarantee:</strong> If any PDF or Procreate brush set has technical flaws or fails to meet 300 DPI print standards, reach out within 7 days for an immediate 100% refund.
            </p>
            <p>
              <strong>Print-on-Demand (POD):</strong> You may incorporate our vector line art and coloring pages into Amazon KDP interiors, Etsy printed merchandise, wall art posters, and stationery.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
