import React from 'react';
import { motion } from 'framer-motion';
import type { DealItem } from '../../types';
import { CheckCircle2, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

interface DealCardProps {
  deal: DealItem;
}

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addToCart(deal, undefined, undefined, 1, true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group card-3d-hover bg-[#0c0d14]/90 rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400/60 flex flex-col justify-between relative shadow-[0_15px_35px_rgba(0,0,0,0.75)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-all duration-500"
    >
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#07070b] via-[#121320] to-amber-950/60 px-5 py-3.5 text-white flex items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center space-x-2.5">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-gray-950 font-black text-xs flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] shrink-0">
            #{deal.dealNumber}
          </span>
          <span className="font-black text-base tracking-tight text-white uppercase font-sans">
            {t('deal.deal')} {deal.dealNumber}
          </span>
        </div>
        <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30 tracking-wider">
          {deal.category}
        </span>
      </div>

      {/* Food Visual */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#07070b]">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-transparent to-transparent opacity-80" />

        {deal.isPopular && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-red-400/40">
            <Flame className="w-3 h-3 fill-white animate-bounce" /> {t('deal.hotDeal')}
          </span>
        )}
      </div>

      {/* Deal Contents Checklist */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1 mb-2.5">
            <Sparkles className="w-3 h-3 text-amber-400" /> {t('deal.includesCombo')}
          </span>
          <ul className="space-y-2 mb-4">
            {deal.contents.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center text-xs font-black text-gray-200 bg-[#07070b]/90 px-3.5 py-2.5 rounded-xl border border-gray-800/80 group-hover:border-amber-500/25 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">{t('deal.comboPrice')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-400 font-mono">Rs. {deal.price}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 px-5 py-3 rounded-2xl font-black text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 uppercase cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('deal.addToCart')}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
