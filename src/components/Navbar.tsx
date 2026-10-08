import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  PhoneCall, 
  Menu, 
  X, 
  Radio, 
  Compass, 
  HeartHandshake,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  onOpenCrisisModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  onOpenCrisisModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hub', label: 'Manifesto', icon: Sparkles },
    { id: 'healing', label: 'Healing Hz', icon: Radio },
    { id: 'shop', label: 'Streetwear', icon: ShoppingBag },
    { id: 'connect', label: 'Cosmic Connect', icon: Compass },
    { id: 'resilience', label: 'Resilience Wall', icon: HeartHandshake },
    { id: 'crisis', label: 'Sanity Hub', icon: ShieldAlert }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Identity */}
        <button 
          onClick={() => { setActiveTab('hub'); setMobileMenuOpen(false); }}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-950/40 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
            <div className="absolute -inset-0.5 rounded-lg bg-indigo-500/20 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                PLEADING SANITY
              </span>
              <span className="text-[10px] tracking-wider text-indigo-400/80 uppercase font-mono">
                UK
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">
              Rise From Madness · Evolution, Not Erasure
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <item.icon className={`h-3.5 w-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Urgent Crisis Button */}
          <button
            onClick={onOpenCrisisModal}
            className="flex items-center gap-1.5 rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-900/40 transition-colors"
            title="Immediate Free Crisis Support (UK & Global)"
          >
            <PhoneCall className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Crisis Lifelines (24/7)</span>
            <span className="sm:hidden">Help</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center rounded-md border border-slate-700/60 bg-slate-900/80 p-2 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center rounded-md border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b0e17] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <item.icon className="h-4 w-4 text-indigo-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
