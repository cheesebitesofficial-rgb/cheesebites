import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

export interface BrandSettings {
  logoUrl: string;
  brandName: string;
  brandHighlight: string;
  tagline: string;
}

export interface AnnouncementSettings {
  enabled: boolean;
  text: string;
  badge: string;
  linkText?: string;
  linkUrl?: string;
}

export interface HeroSettings {
  badge: string;
  headline1: string;
  headline2: string;
  subtitle: string;
  btn1Text: string;
  btn1Link: string;
  btn2Text: string;
  btn2Link: string;
  pizzaImage: string;
  pizzaTag: string;
}

export interface CampaignSettings {
  badge: string;
  title1: string;
  title2: string;
  desc: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutSettings {
  badge: string;
  heading1: string;
  heading2: string;
  desc: string;
  heroImage: string;
  heroTag: string;
  storyBadge: string;
  storyHeading: string;
  storyText1: string;
  storyText2: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface FooterSettings {
  desc: string;
  copyrightText: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
}

export interface StoreInfoSettings {
  isOpen: boolean;
  closedNotice: string;
  phone: string;
  whatsapp: string;
  hours: string;
  address: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minOrder: number;
}

export interface FullSiteSettings {
  brand: BrandSettings;
  announcement: AnnouncementSettings;
  hero: HeroSettings;
  campaign: CampaignSettings;
  about: AboutSettings;
  footer: FooterSettings;
  storeInfo: StoreInfoSettings;
}

interface SiteSettingsContextType {
  brand: BrandSettings;
  announcement: AnnouncementSettings;
  hero: HeroSettings;
  campaign: CampaignSettings;
  about: AboutSettings;
  footer: FooterSettings;
  storeInfo: StoreInfoSettings;
  updateBrand: (partial: Partial<BrandSettings>) => void;
  updateAnnouncement: (partial: Partial<AnnouncementSettings>) => void;
  updateHero: (partial: Partial<HeroSettings>) => void;
  updateCampaign: (partial: Partial<CampaignSettings>) => void;
  updateAbout: (partial: Partial<AboutSettings>) => void;
  updateFooter: (partial: Partial<FooterSettings>) => void;
  updateStoreInfo: (partial: Partial<StoreInfoSettings>) => void;
  updateAllSettings: (full: Partial<FullSiteSettings>) => void;
  resetSiteSettings: () => void;
}

const SETTINGS_KEY = 'cheese_bites_full_cms_settings_v3';

export const DEFAULT_BRAND: BrandSettings = {
  logoUrl: '/logo.png',
  brandName: 'CHEESE',
  brandHighlight: 'BITES',
  tagline: 'Fresh. Cheesy. Delicious.',
};

export const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  enabled: true,
  badge: 'SPECIAL OFFER',
  text: 'Free Delivery on orders above Rs. 2,000! Freshly baked, extra cheesy.',
  linkText: 'Order Menu',
  linkUrl: '/menu',
};

export const DEFAULT_HERO: HeroSettings = {
  badge: '🔥 Hot & Fresh From Our Oven',
  headline1: 'CRAVING REAL CHEESE?',
  headline2: 'BITE INTO PERFECTION',
  subtitle: 'Loaded with 100% real mozzarella, handcrafted dough made fresh daily, and bold flavors crafted for true pizza lovers in Islamabad.',
  btn1Text: 'Order Now',
  btn1Link: '/menu',
  btn2Text: 'See The Menu',
  btn2Link: '/menu',
  pizzaImage: '/images/hero-pizza-user.jpg',
  pizzaTag: 'Crown Crust Pizza',
};

export const DEFAULT_CAMPAIGN: CampaignSettings = {
  badge: 'FEATURED DEAL',
  title1: 'THE BIG',
  title2: 'FLEX',
  desc: 'Double the joy with our massive family feast packed with supreme pizzas, crispy sides, and cold beverages.',
  ctaText: 'Order The Big Flex',
  ctaLink: '/deals',
};

export const DEFAULT_ABOUT: AboutSettings = {
  badge: 'ABOUT CHEESE BITES',
  heading1: 'Good Food. Great Taste.',
  heading2: 'Unforgettable Cravings.',
  desc: 'At Cheese Bites, every bite brings together delicious flavors, quality ingredients and a love for great food.',
  heroImage: '/images/about/about-pizza.jpg',
  heroTag: 'Signature Cheesy Pizza',
  storyBadge: 'Our Story',
  storyHeading: 'We Craft Every Meal with Passion and Real Ingredients',
  storyText1: 'From our secret-recipe tomato sauce simmered with Italian herbs, to our slow-proofed dough and generous blankets of 100% pure whole-milk mozzarella — we don\'t cut corners.',
  storyText2: 'Every pizza, burger, and crispy chicken piece is prepared fresh to order in our kitchen, ensuring that signature golden crust and cheesy pull you crave.',
  stat1Value: '100%',
  stat1Label: 'Pure Mozzarella',
  stat2Value: '25+',
  stat2Label: 'Handcrafted Items',
  stat3Value: '15k+',
  stat3Label: 'Happy Cravings Satisfied',
};

export const DEFAULT_FOOTER: FooterSettings = {
  desc: "Islamabad's premium destination for oven-hot cheesy pizzas, crispy zinger burgers, stuffed crust specialties, and irresistible family deals.",
  copyrightText: '© 2026 Cheese Bites Islamabad. All rights reserved.',
  instagram: 'https://www.instagram.com/cheesebites_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  facebook: 'https://www.facebook.com/profile.php?id=61595736367068',
  tiktok: 'https://tiktok.com/@cheesebites.pk',
  youtube: 'https://youtube.com/@cheesebites',
};

export const DEFAULT_STORE_INFO: StoreInfoSettings = {
  isOpen: true,
  closedNotice: 'Kitchen is temporarily closed for preparation. We will resume taking orders shortly!',
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
  const [brand, setBrand] = useState<BrandSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.brand) return { ...DEFAULT_BRAND, ...p.brand };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_BRAND;
  });

  const [announcement, setAnnouncement] = useState<AnnouncementSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.announcement) return { ...DEFAULT_ANNOUNCEMENT, ...p.announcement };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ANNOUNCEMENT;
  });

  const [hero, setHero] = useState<HeroSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.hero) return { ...DEFAULT_HERO, ...p.hero };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_HERO;
  });

  const [campaign, setCampaign] = useState<CampaignSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.campaign) return { ...DEFAULT_CAMPAIGN, ...p.campaign };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CAMPAIGN;
  });

  const [about, setAbout] = useState<AboutSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.about) return { ...DEFAULT_ABOUT, ...p.about };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ABOUT;
  });

  const [footer, setFooter] = useState<FooterSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.footer) return { ...DEFAULT_FOOTER, ...p.footer };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_FOOTER;
  });

  const [storeInfo, setStoreInfo] = useState<StoreInfoSettings>(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p?.storeInfo) return { ...DEFAULT_STORE_INFO, ...p.storeInfo };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STORE_INFO;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          brand,
          announcement,
          hero,
          campaign,
          about,
          footer,
          storeInfo,
        })
      );
    } catch (e) {
      console.error(e);
    }
  }, [brand, announcement, hero, campaign, about, footer, storeInfo]);

  const updateBrand = (partial: Partial<BrandSettings>) => {
    setBrand(prev => ({ ...prev, ...partial }));
  };

  const updateAnnouncement = (partial: Partial<AnnouncementSettings>) => {
    setAnnouncement(prev => ({ ...prev, ...partial }));
  };

  const updateHero = (partial: Partial<HeroSettings>) => {
    setHero(prev => ({ ...prev, ...partial }));
  };

  const updateCampaign = (partial: Partial<CampaignSettings>) => {
    setCampaign(prev => ({ ...prev, ...partial }));
  };

  const updateAbout = (partial: Partial<AboutSettings>) => {
    setAbout(prev => ({ ...prev, ...partial }));
  };

  const updateFooter = (partial: Partial<FooterSettings>) => {
    setFooter(prev => ({ ...prev, ...partial }));
  };

  const updateStoreInfo = (partial: Partial<StoreInfoSettings>) => {
    setStoreInfo(prev => ({ ...prev, ...partial }));
  };

  const updateAllSettings = (full: Partial<FullSiteSettings>) => {
    if (full.brand) setBrand(prev => ({ ...prev, ...full.brand }));
    if (full.announcement) setAnnouncement(prev => ({ ...prev, ...full.announcement }));
    if (full.hero) setHero(prev => ({ ...prev, ...full.hero }));
    if (full.campaign) setCampaign(prev => ({ ...prev, ...full.campaign }));
    if (full.about) setAbout(prev => ({ ...prev, ...full.about }));
    if (full.footer) setFooter(prev => ({ ...prev, ...full.footer }));
    if (full.storeInfo) setStoreInfo(prev => ({ ...prev, ...full.storeInfo }));
  };

  const resetSiteSettings = () => {
    setBrand(DEFAULT_BRAND);
    setAnnouncement(DEFAULT_ANNOUNCEMENT);
    setHero(DEFAULT_HERO);
    setCampaign(DEFAULT_CAMPAIGN);
    setAbout(DEFAULT_ABOUT);
    setFooter(DEFAULT_FOOTER);
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
        brand,
        announcement,
        hero,
        campaign,
        about,
        footer,
        storeInfo,
        updateBrand,
        updateAnnouncement,
        updateHero,
        updateCampaign,
        updateAbout,
        updateFooter,
        updateStoreInfo,
        updateAllSettings,
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
