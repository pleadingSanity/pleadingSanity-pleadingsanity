/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HealingHz } from './components/HealingHz';
import { StreetwearShop } from './components/StreetwearShop';
import { CosmicConnect } from './components/CosmicConnect';
import { HumanSanityHub } from './components/HumanSanityHub';
import { ResilienceWall } from './components/ResilienceWall';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CrisisModal } from './components/CrisisModal';
import { CartItem, Product } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [selectedHz, setSelectedHz] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ps_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('ps_cart', JSON.stringify(items));
  };

  const handleAddToCart = (product: Product, size: string) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { product, size, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.product.id === id && item.size === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    saveCart(updated);
  };

  const handleRemoveItem = (id: string, size: string) => {
    const updated = cartItems.filter(
      (item) => !(item.product.id === id && item.size === size)
    );
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenFrequency = (hz: number) => {
    setSelectedHz(hz);
    setActiveTab('healing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Primary Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        cartCount={cartTotalCount}
        openCart={() => setIsCartOpen(true)}
        onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
      />

      {/* Main Sanctuary Content */}
      <main className="flex-1">
        {activeTab === 'hub' && (
          <>
            <Hero
              onNavigate={handleNavigate}
              onOpenFrequency={handleOpenFrequency}
            />
            {/* Embedded Streetwear Snapshot */}
            <div className="border-t border-slate-900 bg-[#080b13]">
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-xs font-mono text-indigo-400">TACTILE SANCTUARY</span>
                    <h2 className="font-display text-2xl font-bold text-white mt-0.5">
                      The Streetwear Vault
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('shop')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline font-mono"
                  >
                    View Full 450 GSM Line →
                  </button>
                </div>
                <StreetwearShop
                  onAddToCart={handleAddToCart}
                  openCart={() => setIsCartOpen(true)}
                />
              </div>
            </div>

            {/* Embedded Healing Hz Preview */}
            <div className="border-t border-slate-900 bg-[#070a12]">
              <HealingHz initialHz={528} />
            </div>

            {/* Embedded Resilience Wall Snapshot */}
            <div className="border-t border-slate-900 bg-[#080b14]">
              <ResilienceWall />
            </div>
          </>
        )}

        {activeTab === 'healing' && (
          <HealingHz initialHz={selectedHz} />
        )}

        {activeTab === 'shop' && (
          <StreetwearShop
            onAddToCart={handleAddToCart}
            openCart={() => setIsCartOpen(true)}
          />
        )}

        {activeTab === 'connect' && (
          <CosmicConnect />
        )}

        {activeTab === 'resilience' && (
          <ResilienceWall />
        )}

        {activeTab === 'crisis' && (
          <HumanSanityHub />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Immediate Crisis Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />
    </div>
  );
}
