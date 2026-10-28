import React from 'react';
import { motion } from 'framer-motion';
import type { MenuItem } from '../../types';
import { Plus, Eye, Flame, Sparkles, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: MenuItem;
  onQuickView: (product: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const hasMultipleSizes = product.sizes && product.sizes.length > 1;

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleSizes || product.supportsExtraToppings) {
      onQuickView(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onClick={() => onQuickView(product)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${y * -14}deg) rotateY(${x * 14}deg) scale3d(1.03, 1.03, 1.03)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }}
      className="group bg-[#0c0d14]/95 rounded-3xl overflow-hidden border border-amber-500/25 hover:border-amber-400/80 flex flex-col justify-between relative cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_22px_50px_rgba(245,158,11,0.35)] transition-transform duration-200 transform-gpu"
    >
      {/* High-Resolution Food Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#07070b]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
          loading="lazy"
        />

        {/* Ambient Dark Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Hover Quick Customize Pill Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs">
          <span className="text-gray-950 text-xs font-black flex items-center gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-5 py-2.5 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.7)] uppercase tracking-wider">
            <Eye className="w-4 h-4" /> {t('product.quickCustomize')}
          </span>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isPopular && (
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xl flex items-center gap-1 border border-red-400/40">
              <Flame className="w-3.5 h-3.5 fill-white animate-bounce" /> {t('product.hotPopular')}
            </span>
          )}
          {product.isSpecial && (
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xl flex items-center gap-1 border border-amber-300/60">
              <Sparkles className="w-3.5 h-3.5 fill-gray-950" /> {t('product.chefSpecial')}
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 bg-[#07070b]/90 backdrop-blur-md text-amber-400 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/40 uppercase tracking-widest shadow-md">
          {product.category}
        </span>
      </div>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1 uppercase tracking-tight font-sans">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 shrink-0 ml-2 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-[11px] font-black">4.9</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Size Pills Preview */}
          {hasMultipleSizes && (
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {product.sizes?.map((size) => (
                <span
                  key={size.name}
                  className="text-[10px] font-extrabold bg-[#07070b] text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/25"
                >
                  {size.name}: Rs.{size.price}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">{t('product.startingFrom')}</span>
            <span className="text-xl font-black text-white font-sans">
              Rs. <span className="text-amber-400 font-mono text-2xl">{product.basePrice}</span>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrimaryClick}
            className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300 cursor-pointer"
          >
            {hasMultipleSizes ? (
              <>
                <span>{t('product.options')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t('product.add')}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
