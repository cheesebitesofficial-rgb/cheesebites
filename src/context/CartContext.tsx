import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, MenuItem, DealItem, ExtraTopping } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: MenuItem | DealItem,
    size?: string,
    extraToppings?: ExtraTopping[],
    quantity?: number,
    isDeal?: boolean
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cheese_bites_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem | DealItem,
    selectedSize?: string,
    extraToppings: ExtraTopping[] = [],
    quantity = 1,
    isDeal = false
  ) => {
    let unitPrice = 'price' in item ? item.price : item.basePrice;

    if (!isDeal && 'sizes' in item && item.sizes && selectedSize) {
      const sizeObj = item.sizes.find(s => s.name === selectedSize);
      if (sizeObj) {
        unitPrice = sizeObj.price;
      }
    }

    // Add extra toppings cost
    const toppingsCost = extraToppings.reduce((acc, t) => acc + t.price, 0);
    const finalUnitPrice = unitPrice + toppingsCost;

    // Create unique cartItemId based on item + size + toppings signature
    const toppingsSignature = extraToppings.map(t => t.name).sort().join(',');
    const cartItemId = `${item.id}-${selectedSize || 'default'}-${toppingsSignature}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(ci => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          itemId: item.id,
          name: isDeal ? `Deal ${ (item as DealItem).dealNumber }: ${item.name}` : item.name,
          category: isDeal ? 'Deals' : (item as MenuItem).category,
          price: finalUnitPrice,
          quantity,
          selectedSize: selectedSize || ( ('sizes' in item && item.sizes) ? item.sizes[0].name : undefined ),
          extraToppings: extraToppings.length > 0 ? extraToppings : undefined,
          contents: isDeal ? (item as DealItem).contents : undefined,
          image: item.image,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = subtotal === 0 
    ? 0 
    : subtotal >= RESTAURANT_INFO.freeDeliveryThreshold 
      ? 0 
      : RESTAURANT_INFO.deliveryFee;

  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
