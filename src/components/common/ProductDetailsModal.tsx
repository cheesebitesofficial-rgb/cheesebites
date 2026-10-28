import React, { useState, useEffect } from 'react';
import type { MenuItem, ExtraTopping, PizzaSize } from '../../types';
import { X, Plus, Minus, Check, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EXTRA_TOPPING_PRICES } from '../../data/menuData';
import { useLanguage } from '../../context/LanguageContext';

interface ProductDetailsModalProps {
  product: MenuItem | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedToppings, setSelectedToppings] = useState<ExtraTopping[]>([]);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedToppings([]);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0].name);
      } else {
        setSelectedSize('');
      }
    }
  }, [product]);

  if (!product) return null;

  const currentSizeObj = product.sizes?.find(s => s.name === selectedSize);
  const unitBasePrice = currentSizeObj ? currentSizeObj.price : product.basePrice;

  // Calculate topping price according to selected size or default 100
  const toppingPriceForSize = selectedSize && EXTRA_TOPPING_PRICES[selectedSize as PizzaSize]
    ? EXTRA_TOPPING_PRICES[selectedSize as PizzaSize]
    : 100;

  const toppingsCost = selectedToppings.length * toppingPriceForSize;
  const totalPrice = (unitBasePrice + toppingsCost) * quantity;

  const toggleTopping = (name: string) => {
    if (selectedToppings.some(t => t.name === name)) {
      setSelectedToppings(selectedToppings.filter(t => t.name !== name));
    } else {
      setSelectedToppings([...selectedToppings, { name, price: toppingPriceForSize }]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize || undefined, selectedToppings, quantity);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      <div 
        className="relative bg-[#0c0d14] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-500/30 my-8 text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-950/80 hover:bg-gray-950 text-amber-400 p-2.5 rounded-full backdrop-blur-md transition-colors border border-amber-500/30 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative aspect-[16/9] bg-gray-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/50 to-transparent flex items-end p-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg">
                  {product.category}
                </span>
                {product.isPopular && (
                  <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Flame className="w-3.5 h-3.5 fill-white animate-bounce" /> {t('modal.popularChoice')}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">{product.name}</h2>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-300 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {t('modal.selectSize')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {product.sizes.map(size => {
                  const isSelected = selectedSize === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/20 text-white font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] ring-2 ring-amber-500'
                          : 'border-gray-800 hover:border-amber-500/40 bg-gray-950/70 text-gray-300 font-bold'
                      }`}
                    >
                      <span className="text-sm uppercase font-black">{size.name}</span>
                      <span className="text-xs font-black text-amber-400 font-mono mt-0.5">Rs. {size.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Toppings Option for Pizza */}
          {product.supportsExtraToppings && (
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  {t('modal.addToppings')}
                </label>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  +Rs. {toppingPriceForSize} {t('modal.perTopping')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {['Extra Cheese', 'Extra Chicken Tikka', 'Double Jalapenos', 'Mushrooms & Olives'].map(toppingName => {
                  const isChecked = selectedToppings.some(t => t.name === toppingName);
                  return (
                    <button
                      key={toppingName}
                      type="button"
                      onClick={() => toggleTopping(toppingName)}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-500 bg-amber-500 text-gray-950 font-black shadow-lg'
                          : 'border-gray-800 bg-gray-950/70 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <span>{toppingName}</span>
                      {isChecked && <Check className="w-4 h-4 text-gray-950" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Add to Order Bar */}
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center space-x-3 bg-gray-950 p-1.5 rounded-2xl border border-gray-800">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black shadow hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-black px-3 min-w-[2rem] text-center font-mono text-amber-400">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black shadow hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Submit */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-black py-4 px-6 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t('modal.addToOrder')} • Rs. {totalPrice}</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
