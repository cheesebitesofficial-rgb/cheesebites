import React from 'react';
import { Sparkles, Pizza, ShoppingBag, ArrowRight } from 'lucide-react';
import { SPECIAL_PIZZA_OFFERS } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import type { DealItem } from '../../types';

export const SpecialOffersSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddOffer = (offer: typeof SPECIAL_PIZZA_OFFERS[0]) => {
    const dealItem: DealItem = {
      id: offer.id,
      dealNumber: offer.dealNumber,
      name: offer.name,
      category: 'Duo Pizza Deals',
      price: offer.price,
      contents: [offer.pizzas, offer.drink],
      image: offer.image,
      isSpecial: true,
    };
    addToCart(dealItem, undefined, [], 1, true);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Special Offers</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
          Special Pizza <span className="text-[#FF6B00]">Promotions</span>
        </h2>
        <p className="text-amber-100/80 text-xs sm:text-sm font-medium max-w-xl mx-auto">
          1 Pizza From Legend Flavour + 1 Pizza From Premium Flavours with Chilled Cold Drink!
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SPECIAL_PIZZA_OFFERS.map((offer, idx) => (
          <div
            key={offer.id}
            className="relative rounded-3xl bg-gradient-to-br from-[#121320] via-[#0e0f18] to-[#14101a] border-2 border-amber-500/40 p-6 sm:p-8 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-400/80 transition-all duration-300"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider">
                  Special Offer {idx + 1}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                  Rs. {offer.price}
                </span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <Pizza className="w-3.5 h-3.5 text-amber-400" />
                  <span>2 Fresh Hot Pizzas + 1L Drink</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {offer.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="bg-gray-950/80 rounded-2xl p-3 border border-gray-800 space-y-1.5 text-xs font-bold text-amber-200/90">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✔</span>
                  <span>{offer.pizzas}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✔</span>
                  <span>{offer.drink} included</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={() => handleAddOffer(offer)}
                className="w-full py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-gray-950 bg-gradient-to-r from-amber-400 to-[#FF6B00] hover:from-amber-300 hover:to-[#FF8800] shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Claim Offer for Rs. {offer.price}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
