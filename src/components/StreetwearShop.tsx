import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  Heart, 
  ExternalLink 
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface StreetwearShopProps {
  onAddToCart: (product: Product, size: string) => void;
  openCart: () => void;
}

export const StreetwearShop: React.FC<StreetwearShopProps> = ({ onAddToCart, openCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'One Size';
    onAddToCart(product, defaultSize);
    showToast(`Added ${product.name} (${defaultSize}) to cart`);
  };

  const handleModalAdd = () => {
    if (!activeModalProduct) return;
    onAddToCart(activeModalProduct, selectedSize);
    showToast(`Added ${activeModalProduct.name} (${selectedSize}) to cart`);
    setActiveModalProduct(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button 
            onClick={openCart} 
            className="ml-2 text-indigo-400 hover:text-indigo-300 underline font-mono text-[11px]"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Header and Brand Declaration */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>OFFICIAL MERCHANDISE</span>
            <span aria-hidden="true">·</span>
            <span>SHOP.PLEADINGSANITY.CO.UK</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Evolution, Not Erasure Collection
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Heavyweight tactile sanctuary garments designed to ground the nervous system. 
            Custom-milled 450 GSM French terry and mineral-washed combed cotton with hidden grounding reminders. 
            10% of every garment pledged directly to UK grassroots mental health sanctuaries.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-lg border border-slate-800 self-start md:self-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Garments' },
            { id: 'hoodies', label: 'Heavy Hoodies' },
            { id: 'tees', label: 'Acid-Wash Tees' },
            { id: 'bottoms', label: 'Fleece Pants' },
            { id: 'essentials', label: 'Essentials' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              setActiveModalProduct(product);
              setSelectedSize(product.sizes[0] || 'M');
            }}
            className="group cursor-pointer rounded-xl border border-slate-800/90 bg-[#0c101c]/80 overflow-hidden flex flex-col justify-between transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/20"
          >
            <div>
              {/* Product Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-black/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {product.badge && (
                  <div className="absolute top-3 left-3 rounded bg-slate-900/90 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-mono text-indigo-300 backdrop-blur-md">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-3 right-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-mono text-emerald-400 backdrop-blur-sm">
                  {product.stockStatus}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>{product.subtitle}</span>
                  <span className="font-bold text-white text-base">£{product.price}</span>
                </div>

                <h3 className="font-display text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  {product.description}
                </p>

                {/* 10% Grassroots Impact */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{product.pledgeAmount} directly pledged to youth crisis support</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="border-t border-slate-800/80 p-4 bg-[#0a0d17] flex items-center justify-between">
              <span className="text-xs text-indigo-400 group-hover:underline font-medium">
                Inspect Specs & Sizes
              </span>
              <button
                onClick={(e) => handleQuickAdd(product, e)}
                className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                <ShoppingBag className="h-3 w-3" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainable Craftsmanship & Brand Commitment */}
      <div className="mt-16 rounded-2xl border border-indigo-900/40 bg-gradient-to-r from-[#0d1222] via-[#0b0e18] to-[#0d1222] p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-indigo-400">
            <Sparkles className="h-4 w-4" />
            <span>ETHICAL UK PRODUCTION ETHOS</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            Built as Armor for Heavy Days.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every garment from Pleading Sanity is crafted with heavyweight, sensory-conscious textiles. 
            No synthetic polyester plastic, no fast-fashion shortcuts, and no scratchy neck tags. 
            Designed to hold space for you when the world feels too loud.
          </p>
        </div>

        <div className="mt-6 sm:mt-0 flex flex-col items-center sm:items-end gap-2 shrink-0">
          <div className="font-mono text-xs text-slate-400">Official Store Domain:</div>
          <a
            href="https://shop.pleadingsanity.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-950/60 px-4 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900/60 transition-colors"
          >
            <span>shop.pleadingsanity.co.uk</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Product Inspection Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-indigo-500/40 bg-[#0c101d] p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 rounded-lg bg-slate-800/80 p-2 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Modal Image */}
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-slate-800">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Modal Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-indigo-400 uppercase">
                    {activeModalProduct.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {activeModalProduct.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="font-display text-2xl font-extrabold text-white">
                      £{activeModalProduct.price}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono">
                      {activeModalProduct.pledgeAmount} directly to mental health
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProduct.description}
                </p>

                {/* Garment Highlights */}
                <div className="space-y-1.5 border-t border-slate-800 pt-3">
                  <span className="text-[11px] font-mono text-slate-400">TEXTILE SPECIFICATIONS:</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {activeModalProduct.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selector */}
                <div className="border-t border-slate-800 pt-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>Select Sizing:</span>
                    <span className="text-indigo-400 font-mono text-[11px]">True to oversized boxy fit</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-9 min-w-9 px-3 rounded-lg border text-xs font-bold transition-all ${
                          selectedSize === size
                            ? 'border-indigo-500 bg-indigo-600 text-white'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <div className="pt-2">
                  <button
                    onClick={handleModalAdd}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag (£{activeModalProduct.price})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
