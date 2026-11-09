import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

export interface AnnouncementSettings {
  enabled: boolean;
  text: string;
  badge: string;
  linkText?: string;
  linkUrl?: string;
}

export interface StoreInfoSettings {
  isOpen: boolean;
  phone: string;
  whatsapp: string;
  hours: string;
  address: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minOrder: number;
}

interface SiteSettingsContextType {
  announcement: AnnouncementSettings;
  storeInfo: StoreInfoSettings;
  updateAnnouncement: (settings: Partial<AnnouncementSettings>) => void;
  updateStoreInfo: (info: Partial<StoreInfoSettings>) => void;
  resetSiteSettings: () => void;
}

const SETTINGS_KEY = 'cheese_bites_site_settings_v2';

const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  enabled: true,
  badge: 'SPECIAL OFFER',
  text: 'Free Delivery on orders above Rs. 2,000! Freshly baked, extra cheesy.',
  linkText: 'Order Menu',
  linkUrl: '/menu',
};

const DEFAULT_STORE_INFO: StoreInfoSettings = {
  isOpen: true,
  phone: RESTAURANT_INFO.phone || '0337-1500150',
  whatsapp: RESTAURANT_INFO.whatsapp || 'https://wa.me/923371500150',
  hours: RESTAURANT_INFO.hours || '11:00 AM - 4:00 AM',
  address: RESTAURANT_INFO.address || '17 Meel Stop, Japan Dam Road, Islamabad',
  deliveryFee: RESTAURANT_INFO.deliveryFee || 150,
  freeDeliveryThreshold: RESTAURANT_INFO.freeDeliveryThreshold || 2000,
  minOrder: RESTAURANT_INFO.minOrder || 300,
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [announcement, setAnnouncement] = useState<AnnouncementSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.announcement) return { ...DEFAULT_ANNOUNCEMENT, ...parsed.announcement };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ANNOUNCEMENT;
  });

  const [storeInfo, setStoreInfo] = useState<StoreInfoSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.storeInfo) return { ...DEFAULT_STORE_INFO, ...parsed.storeInfo };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STORE_INFO;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          announcement,
          storeInfo,
        })
      );
    } catch (e) {
      console.error(e);
    }
  }, [announcement, storeInfo]);

  const updateAnnouncement = (partial: Partial<AnnouncementSettings>) => {
    setAnnouncement(prev => ({ ...prev, ...partial }));
  };

  const updateStoreInfo = (partial: Partial<StoreInfoSettings>) => {
    setStoreInfo(prev => ({ ...prev, ...partial }));
  };

  const resetSiteSettings = () => {
    setAnnouncement(DEFAULT_ANNOUNCEMENT);
    setStoreInfo(DEFAULT_STORE_INFO);
    try {
      localStorage.removeItem(SETTINGS_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        announcement,
        storeInfo,
        updateAnnouncement,
        updateStoreInfo,
        resetSiteSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
