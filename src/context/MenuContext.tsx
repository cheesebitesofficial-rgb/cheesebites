import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MenuItem, DealItem } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_DEALS } from '../data/menuData';
import { supabaseApi } from '../lib/supabase';

interface MenuContextType {
  menuItems: MenuItem[];
  deals: DealItem[];
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  updateDealItem: (deal: DealItem) => void;
  addDealItem: (deal: DealItem) => void;
  deleteDealItem: (id: string) => void;
  resetToDefaultMenu: () => void;
}

const MENU_KEY = 'cheese_bites_menu_items_v6_real';
const DEALS_KEY = 'cheese_bites_deals_items_v5_real';

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(MENU_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [deals, setDeals] = useState<DealItem[]>(() => {
    try {
      const saved = localStorage.getItem(DEALS_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEALS;
    } catch {
      return INITIAL_DEALS;
    }
  });

  // Fetch live menu updates from Supabase (updated via POS)
  useEffect(() => {
    let isMounted = true;
    async function loadOnlineMenu() {
      if (!supabaseApi.isConfigured()) return;
      const res = await supabaseApi.fetchLiveMenu();
      if (res.success && isMounted) {
        if (res.products && res.products.length > 0) {
          const mappedProducts: MenuItem[] = res.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            description: p.description || '',
            basePrice: Number(p.base_price || p.price),
            image: p.image || '/images/real/crown-crust-pizza.jpg',
            sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes,
            isPopular: Boolean(p.is_popular),
            isSpecial: Boolean(p.is_special),
            supportsExtraToppings: p.category === 'Pizza',
          }));
          setMenuItems(mappedProducts);
        }

        if (res.deals && res.deals.length > 0) {
          const mappedDeals: DealItem[] = res.deals.map((d: any) => ({
            id: d.id,
            dealNumber: Number(d.deal_number || 1),
            name: d.name,
            category: d.category,
            price: Number(d.price),
            contents: typeof d.contents === 'string' ? JSON.parse(d.contents) : (d.contents || []),
            image: d.image || '/images/real/deal-12.jpg',
            isPopular: Boolean(d.is_popular),
          }));
          setDeals(mappedDeals);
        }
      }
    }
    loadOnlineMenu();
    return () => { isMounted = false; };
  }, []);

  // Real-time Cloud Relay and BroadcastChannel Sync for Menu/Price/Images from POS
  useEffect(() => {
    const handleMenuPayload = (data: any) => {
      if (!data) return;
      if (data.type === 'UPDATE_PRODUCT' && data.product) {
        const prod = data.product;
        const isDeal = String(prod.cat || prod.category || '').toLowerCase().includes('deal');

        if (isDeal) {
          const dealItem: DealItem = {
            id: String(prod.id || prod.code || `deal-${Date.now()}`),
            dealNumber: parseInt(String(prod.n || prod.name || '').replace(/[^0-9]/g, '')) || 1,
            name: prod.n || prod.name || 'Unnamed Deal',
            category: (prod.cat || prod.category || 'Solo Era') as any,
            price: Number(prod.p || prod.price || 0),
            contents: Array.isArray(prod.components)
              ? prod.components.map((c: any) => `${c.q || 1}x ${c.n}`)
              : (Array.isArray(prod.contents) ? prod.contents : []),
            image: prod.img || prod.image || '/images/real/deal-12.jpg',
            isPopular: Boolean(prod.isPopular),
          };
          setDeals(prev => {
            const copy = [...prev];
            const idx = copy.findIndex(d => String(d.id) === String(dealItem.id));
            if (idx > -1) copy[idx] = dealItem;
            else copy.unshift(dealItem);
            return copy;
          });
        } else {
          const menuItem: MenuItem = {
            id: String(prod.id || prod.code || `item-${Date.now()}`),
            name: prod.n || prod.name || 'Unnamed Item',
            category: (prod.cat || prod.category || 'Pizza') as any,
            description: prod.d || prod.description || '',
            basePrice: Number(prod.p || prod.basePrice || prod.price || 0),
            image: prod.img || prod.image || '/images/real/crown-crust-pizza.jpg',
            sizes: prod.sizes ? (typeof prod.sizes === 'string' ? JSON.parse(prod.sizes) : prod.sizes) : undefined,
            isPopular: Boolean(prod.isPopular),
            isSpecial: Boolean(prod.isSpecial),
            supportsExtraToppings: String(prod.cat || prod.category || '').toLowerCase().includes('pizza'),
          };
          setMenuItems(prev => {
            const copy = [...prev];
            const idx = copy.findIndex(m => String(m.id) === String(menuItem.id));
            if (idx > -1) copy[idx] = menuItem;
            else copy.unshift(menuItem);
            return copy;
          });
        }
      } else if (data.type === 'DELETE_PRODUCT' && data.id) {
        const targetId = String(data.id);
        setMenuItems(prev => prev.filter(m => String(m.id) !== targetId));
        setDeals(prev => prev.filter(d => String(d.id) !== targetId));
      }
    };

    // 1. Local tab sync via BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('cb_menu_sync');
        channel.onmessage = (e) => handleMenuPayload(e.data);
      }
    } catch(e) {}

    // 2. Cloud relay polling via ntfy.sh
    let intervalId: any = null;
    const fetchMenuUpdates = async () => {
      try {
        const res = await fetch('https://ntfy.sh/cheesebites_menu_v2/json?poll=1&since=24h');
        if (res.ok) {
          const text = await res.text();
          const lines = text.trim().split('\n').filter(Boolean);
          lines.forEach(line => {
            try {
              const msg = JSON.parse(line);
              const payload = typeof msg.message === 'string' ? JSON.parse(msg.message) : msg.message;
              handleMenuPayload(payload);
            } catch(e) {}
          });
        }
      } catch(e) {}
    };

    fetchMenuUpdates();
    intervalId = setInterval(fetchMenuUpdates, 5000);

    return () => {
      if (channel) channel.close();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(MENU_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(DEALS_KEY, JSON.stringify(deals));
    } catch (e) {
      console.error(e);
    }
  }, [deals]);

  const updateMenuItem = (updated: MenuItem) => {
    setMenuItems(prev => prev.map(item => (item.id === updated.id ? updated : item)));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [item, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const updateDealItem = (updated: DealItem) => {
    setDeals(prev => prev.map(deal => (deal.id === updated.id ? updated : deal)));
  };

  const addDealItem = (deal: DealItem) => {
    setDeals(prev => [deal, ...prev]);
  };

  const deleteDealItem = (id: string) => {
    setDeals(prev => prev.filter(deal => deal.id !== id));
  };

  const resetToDefaultMenu = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    setDeals(INITIAL_DEALS);
    try {
      localStorage.setItem(MENU_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
      localStorage.setItem(DEALS_KEY, JSON.stringify(INITIAL_DEALS));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        deals,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        updateDealItem,
        addDealItem,
        deleteDealItem,
        resetToDefaultMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
