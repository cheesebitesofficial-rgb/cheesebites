import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, total } = useCart();
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6"
        dir={dir}
      >
        <div className="w-24 h-24 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-[0_0_30px_rgba(245,158,11,0.25)]">
          🛒
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-3xl font-black text-white uppercase font-sans">{t('cart.emptyTitle')}</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            {t('cart.emptyDesc')}
          </p>
        </div>
        <div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('cart.browseMenu')}</span>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-[#07070b] min-h-screen"
      dir={dir}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight font-sans">
            {t('cart.yourFood')} <span className="text-gold-gradient">{t('cart.basket')}</span>
          </h1>
          <p className="text-xs text-amber-400 font-extrabold uppercase mt-1 tracking-wider">{t('cart.reviewItems')}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearCart}
          className="text-xs font-black uppercase text-red-400 hover:text-red-300 flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900/60 px-4 py-2.5 rounded-xl border border-red-500/30 transition-colors shadow-md cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> {t('cart.clearBasket')}
        </motion.button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              key={item.cartItemId}
              className="bg-[#0c0d14]/90 rounded-3xl p-4 sm:p-6 border border-amber-500/20 shadow-xl flex flex-col sm:flex-row items-center gap-5 transition-all hover:border-amber-400/50"
            >
              {/* Product Thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl shrink-0 border border-gray-800 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)]"
              />

              {/* Item Info */}
              <div className="flex-1 text-center sm:text-left space-y-1.5 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-black text-lg text-white uppercase font-sans">{item.name}</h3>
                  <span className="font-black text-xl text-amber-400 font-mono">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>

                {/* Badges for Size, Category */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                  <span className="text-[10px] font-black uppercase bg-[#07070b] text-slate-300 px-2.5 py-0.5 rounded-md border border-gray-800">
                    {item.category}
                  </span>
                  {item.selectedSize && (
                    <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                      {t('cart.size')}: {item.selectedSize}
                    </span>
                  )}
                </div>

                {/* Deal contents if applicable */}
                {item.contents && item.contents.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-medium">
                    {t('cart.includes')}: {item.contents.join(' • ')}
                  </p>
                )}

                {/* Extra Toppings */}
                {item.extraToppings && item.extraToppings.length > 0 && (
                  <div className="text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 mt-1 inline-block font-bold">
                    {t('cart.toppings')}: {item.extraToppings.map((topping) => topping.name).join(', ')}
                  </div>
                )}
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center space-x-3 shrink-0 pt-2 sm:pt-0">
                <div className="flex items-center bg-[#07070b] p-1.5 rounded-xl border border-gray-800">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold hover:bg-gray-800"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </motion.button>
                  <span className="w-8 text-center text-sm font-black text-white font-mono">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold hover:bg-gray-800"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}

          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t('cart.continueShopping')}
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <div className="bg-[#0c0d14] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight border-b border-gray-800 pb-4 font-sans">
              {t('cart.orderSummary')}
            </h3>

            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-center justify-between text-slate-300">
                <span>{t('cart.itemsSubtotal')}</span>
                <span className="font-black text-white font-mono">Rs. {subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>{t('cart.deliveryFee')}</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-black uppercase text-xs bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">{t('cart.free')}</span>
                ) : (
                  <span className="font-black text-white font-mono">Rs. {deliveryFee}</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-black text-slate-400 block tracking-wider">{t('cart.totalAmount')}</span>
                <span className="text-3xl font-black text-amber-400 font-mono">Rs. {total}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 font-black py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300 cursor-pointer"
            >
              <span>{t('cart.proceedCheckout')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 pt-2 border-t border-gray-800">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t('cart.fastDelivery')}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
