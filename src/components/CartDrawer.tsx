import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 4.50;
  const grandTotal = subtotal + shipping;
  const grassrootsPledge = (subtotal * 0.1).toFixed(2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'MADNESS10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Rise From Madness discount applied');
      setPromoError('');
    } else if (code === 'GROUNDED') {
      setDiscountPercent(15);
      setPromoSuccess('15% Grounding community discount applied');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "MADNESS10" or "GROUNDED"');
      setPromoSuccess('');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="relative flex h-full w-full max-w-md flex-col bg-[#0b0e18] border-l border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-400" />
            <h2 className="font-display text-base font-bold text-white">
              Your Garment Bag
            </h2>
            <span className="font-mono text-xs text-slate-400">({cartItems.length})</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Complete Confirmation View */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Order Confirmed & Pledged
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Thank you for standing with the Pleading Sanity movement. Your order has been placed, and 10% has been queued for our grassroots youth mental health sanctuary fund.
            </p>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 w-full text-left text-xs font-mono text-slate-400 space-y-1">
              <div>ORDER ID: #PS-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>DISPATCH: Royal Mail Tracked 24 (UK)</div>
              <div>STATUS: Cut, Hand-Screened & Packed</div>
            </div>
            <button
              onClick={() => {
                setOrderComplete(false);
                onClose();
              }}
              className="mt-4 w-full rounded-lg bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500"
            >
              Continue Exploring
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag State */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-600">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h3 className="font-display text-base font-bold text-white">Your bag is empty</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Explore our heavyweight organic armor pieces designed to ground the nervous system.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* Populated Cart */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Free shipping progress bar */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">
                    {subtotal >= 60 ? 'Free UK Royal Mail Shipping Unlocked' : `Add £${(60 - subtotal).toFixed(2)} for Free UK Shipping`}
                  </span>
                  <span className="font-mono text-indigo-400">£60 goal</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 60) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg object-cover bg-black"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-0.5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span>Size: {item.size}</span>
                        <span>·</span>
                        <span className="font-bold text-white">£{item.product.price}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-xs text-white min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (try MADNESS10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <p className="text-[11px] text-emerald-400 mt-1">{promoSuccess}</p>}
                {promoError && <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>}
              </form>

              {/* Grassroots Donation Highlight */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-white">£{grassrootsPledge} pledged to UK crisis sanctuaries.</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    10% of this order directly funds peer support groups and free youth mental health lifelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Checkout Summary */}
            <div className="border-t border-slate-800 bg-[#080b13] p-6 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">£{rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>UK Royal Mail Tracked</span>
                  <span className="font-mono text-white">
                    {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-white">
                  <span>Total</span>
                  <span className="font-mono text-base text-indigo-300">£{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Securing Order & Pledge...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-mono">
                  Official Store: shop.pleadingsanity.co.uk · SSL Encrypted
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
