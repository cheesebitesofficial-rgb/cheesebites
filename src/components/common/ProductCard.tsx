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
      className="group bg-white rounded-3xl overflow-hidden border border-amber-300 hover:border-amber-500 flex flex-col justify-between relative cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition-transform duration-200 transform-gpu"
    >
      {/* High-Resolution Food Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-amber-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out opacity-95 group-hover:opacity-100 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
          loading="lazy"
          decoding="async"
        />

        {/* Ambient Warm Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

        {/* Hover Quick Customize Pill Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs">
          <span className="text-white text-xs font-black flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(245,158,11,0.6)] uppercase tracking-wider">
            <Eye className="w-4 h-4" /> {t('product.quickCustomize')}
          </span>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isPopular && (
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-red-400/40">
              <Flame className="w-3.5 h-3.5 fill-white animate-bounce" /> {t('product.hotPopular')}
            </span>
          )}
          {product.isSpecial && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 fill-white" /> {t('product.chefSpecial')}
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-amber-700 text-[10px] font-black px-3 py-1 rounded-full border border-amber-300 uppercase tracking-widest shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-6 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1 uppercase tracking-tight font-sans">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 shrink-0 ml-2 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span className="text-[11px] font-black">4.9</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Size Pills Preview */}
          {hasMultipleSizes && (
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {product.sizes?.map((size) => (
                <span
                  key={size.name}
                  className="text-[10px] font-extrabold bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200"
                >
                  {size.name}: Rs.{size.price}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black text-gray-500 block tracking-wider">{t('product.startingFrom')}</span>
            <span className="text-xl font-black text-gray-900 font-sans">
              Rs. <span className="text-amber-600 font-mono text-2xl">{product.basePrice}</span>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrimaryClick}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-white px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_4px_15px_rgba(245,158,11,0.4)] transition-all duration-300 cursor-pointer"
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
