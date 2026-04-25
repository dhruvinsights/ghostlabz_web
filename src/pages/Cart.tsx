import React from 'react';
import { useCart } from '../hooks/useCart';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 bg-brand-bg">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-surface flex items-center justify-center text-brand-muted border border-brand-border">
          <ShoppingBag size={40} />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">Your manifest is empty</h1>
          <p className="text-sm sm:text-base text-brand-muted max-w-sm mx-auto px-4">
            You have not selected any research compounds for your current protocol.
          </p>
        </div>
        <Link
          to="/catalog"
          className="bg-brand-purple text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold tracking-widest text-[10px] sm:text-xs hover:scale-105 transition-all shadow-lg shadow-brand-purple/20"
        >
          BROWSE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold italic border-b border-brand-border pb-5 sm:pb-8">
            Research Manifest
          </h1>

          <div className="space-y-4 sm:space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 sm:items-center border border-brand-border"
              >
                <div className="w-full sm:w-24 h-40 sm:h-24 rounded-2xl overflow-hidden border border-brand-border shrink-0 bg-brand-surface">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1.5 sm:space-y-2 text-center sm:text-left min-w-0">
                  <span className="text-[10px] font-bold tracking-widest text-brand-purple uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-brand-muted">
                    LOT: {item.batchId}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 pt-3 sm:pt-0 border-t border-brand-border sm:border-0">
                  <div className="flex items-center gap-3 sm:gap-4 bg-brand-surface px-3 sm:px-4 py-2 rounded-2xl border border-brand-border">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="hover:text-brand-purple p-1 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-sm w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="hover:text-brand-purple p-1 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-mono text-base sm:text-lg text-brand-purple font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1 sm:mt-2 flex items-center gap-1 hover:text-red-400 transition-colors ml-auto"
                    >
                      <Trash2 size={12} /> REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="relative">
          <div className="lg:sticky lg:top-32 glass p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border border-brand-purple/10 space-y-6 sm:space-y-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold">Summary</h2>

            <div className="space-y-3 sm:space-y-4 border-b border-brand-border pb-5 sm:pb-8">
              <div className="flex justify-between text-brand-muted text-xs sm:text-sm uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-brand-text">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-muted text-xs sm:text-sm uppercase tracking-widest">
                <span>Research Shipping</span>
                <span className="text-brand-purple">FREE</span>
              </div>
              <div className="flex justify-between text-brand-muted text-xs sm:text-sm uppercase tracking-widest">
                <span>Protocol Tier</span>
                <span className="text-brand-text">STANDARD</span>
              </div>
            </div>

            <div className="flex justify-between items-end gap-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-muted">
                Total Manifest
              </span>
              <span className="text-3xl sm:text-4xl font-serif font-black text-brand-purple">
                ${total.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-brand-purple text-white font-bold tracking-[0.2em] py-4 sm:py-5 rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-purple/20 text-xs sm:text-sm">
              PROCESS ORDER <ArrowRight size={18} />
            </button>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <div className="flex items-center gap-3 text-[10px] text-brand-muted font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse"></span>
                SECURE DATA LINK: ACTIVE
              </div>
              <p className="text-[10px] leading-relaxed text-brand-muted italic">
                Transactions are encrypted via GhostShield™ and tied to laboratory IDs.
                Researcher identity verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
