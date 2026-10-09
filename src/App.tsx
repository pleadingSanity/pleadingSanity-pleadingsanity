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
import { CreatorHub } from './components/CreatorHub';
import { WorkspaceHub } from './components/WorkspaceHub';
import { ArronAICompanion } from './components/ArronAICompanion';
import { SanctuaryArcade } from './components/SanctuaryArcade';
import { NewGenBible } from './components/NewGenBible';
import { ManifestoStory } from './components/ManifestoStory';
import { VisualSanctuary } from './components/VisualSanctuary';
import { GPTIntegrationFile } from './components/GPTIntegrationFile';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CrisisModal } from './components/CrisisModal';
import { AuthModal } from './components/AuthModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { CartItem, Product } from './types';
import { Smartphone, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [selectedHz, setSelectedHz] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

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
        onOpenAuth={() => setIsAuthModalOpen(true)}
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

            {/* Embedded Creator Hub */}
            <div className="border-t border-slate-900 bg-[#090d18]">
              <CreatorHub onOpenAuth={() => setIsAuthModalOpen(true)} />
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

        {activeTab === 'arcade' && (
          <SanctuaryArcade />
        )}

        {activeTab === 'bible' && (
          <NewGenBible />
        )}

        {activeTab === 'story' && (
          <ManifestoStory />
        )}

        {activeTab === 'visuals' && (
          <VisualSanctuary />
        )}

        {activeTab === 'gptfile' && (
          <GPTIntegrationFile />
        )}

        {activeTab === 'creators' && (
          <CreatorHub onOpenAuth={() => setIsAuthModalOpen(true)} />
        )}

        {activeTab === 'arron' && (
          <ArronAICompanion onTuneFrequency={handleOpenFrequency} />
        )}

        {activeTab === 'workspace' && (
          <WorkspaceHub />
        )}

        {activeTab === 'connect' && (
          <SanctuaryArcade />
        )}

        {activeTab === 'resilience' && (
          <ResilienceWall />
        )}

        {activeTab === 'crisis' && (
          <HumanSanityHub />
        )}
      </main>

      {/* Floating Google Play / PWA Install Launcher */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsInstallModalOpen(true)}
          className="flex items-center gap-2 rounded-full border border-indigo-500/40 bg-slate-900/90 py-2.5 px-4 text-xs font-bold text-indigo-200 shadow-xl backdrop-blur-md hover:bg-slate-800 hover:border-indigo-400 transition-all group"
        >
          <Smartphone className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Install Sanctuary (Android / Play)</span>
        </button>
      </div>

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

      {/* Firebase Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Google Play / PWA Install Modal */}
      <InstallPromptModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}

