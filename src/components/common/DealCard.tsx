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
      className="group card-3d-hover bg-white rounded-3xl overflow-hidden border border-amber-300 hover:border-amber-500 flex flex-col justify-between relative shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)] transition-all duration-500"
    >
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-[#FAF5E4] to-amber-100/70 px-5 py-3.5 text-gray-900 flex items-center justify-between border-b border-amber-200">
        <div className="flex items-center space-x-2.5">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
            #{deal.dealNumber}
          </span>
          <span className="font-black text-base tracking-tight text-gray-900 uppercase font-sans">
            {t('deal.deal')} {deal.dealNumber}
          </span>
        </div>
        <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-800 px-3 py-1 rounded-full border border-amber-300 tracking-wider">
          {deal.category}
        </span>
      </div>

      {/* Food Visual - Uncropped High-Definition */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-amber-50/50 flex items-center justify-center">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500 opacity-95 group-hover:opacity-100 filter drop-shadow-[0_6px_15px_rgba(0,0,0,0.15)]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />

        {deal.isPopular && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-red-400/40">
            <Flame className="w-3 h-3 fill-white animate-bounce" /> {t('deal.hotDeal')}
          </span>
        )}
      </div>

      {/* Deal Contents Checklist */}
      <div className="p-3.5 sm:p-6 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 flex items-center gap-1 mb-2.5">
            <Sparkles className="w-3 h-3 text-amber-600" /> {t('deal.includesCombo')}
          </span>
          <ul className="space-y-2 mb-4">
            {deal.contents.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center text-xs font-black text-gray-800 bg-[#FAF5E4]/80 px-3.5 py-2.5 rounded-xl border border-amber-200/80 group-hover:border-amber-400 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black text-gray-500 block tracking-wider">{t('deal.comboPrice')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-600 font-mono">Rs. {deal.price}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-white px-5 py-3 rounded-2xl font-black text-xs tracking-wider flex items-center gap-2 shadow-[0_4px_15px_rgba(245,158,11,0.4)] transition-all duration-300 uppercase cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('deal.addToCart')}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
