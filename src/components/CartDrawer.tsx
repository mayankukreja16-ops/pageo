import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onShowToast: (msg: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'PAGEO25') {
      setAppliedDiscount(0.25);
      onShowToast('🎉 25% Spring discount applied!');
    } else if (code === 'PAGEOMANDALA' || code === 'BRUSHMASTER') {
      setAppliedDiscount(0.30);
      onShowToast('🎉 30% VIP Creator coupon applied!');
    } else if (code) {
      onShowToast('❌ Invalid code. Try "PAGEO25" for 25% off.');
    }
  };

  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCheckout = () => {
    setIsSuccess(true);
    onShowToast('✨ Order processed! Instant download links prepared.');
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-card)] border-l border-[var(--card-border)] shadow-2xl flex flex-col justify-between p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h3 className="font-heading font-black text-lg text-[var(--text-main)]">
                Your Art Cart ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Contents */}
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-black text-xl text-[var(--text-main)]">
                Download Links Ready!
              </h4>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
                Thank you for supporting Pageo art! A copy of your commercial licenses and 300 DPI high-speed download links have been sent.
              </p>
              <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-left text-xs space-y-2">
                <div className="font-bold text-[var(--text-main)]">Digital Files Delivered:</div>
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[var(--text-muted)]">
                    <span className="line-clamp-1">{item.title}</span>
                    <span className="font-mono text-emerald-600 font-bold ml-2">Ready</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-md"
              >
                Back to Store
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="text-4xl">🎨</div>
              <h4 className="font-heading font-bold text-base text-[var(--text-main)]">
                Your cart is empty
              </h4>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                Add colouring e-books, Procreate brush studios, or vector bundles to get started.
              </p>
              <button
                onClick={onClose}
                className="mt-2 py-2 px-4 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              >
                Explore Digital Assets
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] flex items-center justify-between gap-3"
                  >
                    <span className="text-2xl p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--card-border)] flex-shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-heading font-bold text-xs text-[var(--text-main)] truncate">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                        {item.format.split('+')[0]} • Commercial
                      </span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-heading">
                        ${item.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      aria-label="Remove item"
                      className="p-2 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon Form & Totals */}
              <div className="pt-4 border-t border-[var(--card-border)] space-y-3">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (try PAGEO25)"
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] placeholder-[var(--text-muted)] uppercase font-mono focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-[var(--bg-card-subtle)] border border-[var(--card-border)] hover:border-rose-400 text-[var(--text-main)]"
                  >
                    Apply
                  </button>
                </form>

                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount ({appliedDiscount * 100}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[var(--text-main)]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between font-heading font-black text-lg text-[var(--text-main)] pt-2 border-t border-[var(--card-border)]">
                  <span>Total:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>300 DPI Print Files • Commercial Rights • Instant Download</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.01]"
                >
                  Complete Instant Download (${finalTotal.toFixed(2)}) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
