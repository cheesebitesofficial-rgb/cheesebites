import React, { useState } from 'react';
import { 
  Layers, 
  Utensils, 
  Tag, 
  Megaphone, 
  Save, 
  Download, 
  Upload, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  RotateCcw, 
  Check, 
  Copy, 
  ExternalLink,
  Store,
  Phone,
  Clock,
  MapPin,
  Flame,
  Star,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Layout,
  Info,
  Share2
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import type { MenuItem, Category, DealItem, DealCategory, SizeOption } from '../../types';

// Preset authentic assets for one-click selection
const PRESET_IMAGES = [
  { label: 'Crown Crust Pizza', url: '/images/real/crown-crust-pizza.jpg' },
  { label: 'Behari Kabab Pizza', url: '/images/menu/behari-kabab-pizza.jpg' },
  { label: 'Malai Boti Pizza', url: '/images/menu/chicken-tikka-pizza.jpg' },
  { label: 'Pepperoni Pizza', url: '/images/menu/pepperoni-passion-pizza.jpg' },
  { label: 'Fajita Sicilian', url: '/images/menu/chicken-fajita-pizza.jpg' },
  { label: 'Hero Pizza (Fresh Oven)', url: '/images/hero-pizza-user.jpg' },
  { label: 'About Cheesy Pizza', url: '/images/about/about-pizza.jpg' },
  { label: 'Signature Cheeseburger', url: '/images/about/about-cheeseburger.jpg' },
  { label: 'Loaded Cheesy Fries', url: '/images/about/about-cheesy-fries.jpg' },
  { label: 'Crispy Wings', url: '/images/about/about-chicken-wings.jpg' },
  { label: 'Deal 15 (Pizza + 2 Zingers)', url: '/images/real/deal-15.jpg' },
  { label: 'Deal 12 (Solo Pizza)', url: '/images/real/deal-12.jpg' },
  { label: 'Deal 1 (Pizza + Drink)', url: '/images/real/deal-1.jpg' },
  { label: 'Alfredo Pasta', url: '/images/menu/creamy-alfredo-pasta.jpg' },
];

const PRESET_LOGOS = [
  { label: 'Favicon 3D Circular Logo', url: '/logo.png' },
  { label: 'Official Badge Logo', url: '/images/real/cheese-bites-badge-logo.png' },
  { label: 'Icon Clean Logo', url: '/images/real/icon.png' },
];

type CMSTab = 
  | 'dishes' 
  | 'deals' 
  | 'brand' 
  | 'hero' 
  | 'announcement' 
  | 'about' 
  | 'footer' 
  | 'store' 
  | 'backup';

export const AdminCMS: React.FC = () => {
  const {
    menuItems,
    deals,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addDealItem,
    updateDealItem,
    deleteDealItem,
    resetToDefaultMenu,
    setFullMenu,
    toggleItemAvailability,
    toggleDealAvailability,
  } = useMenu();

  const {
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
  } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<CMSTab>('brand');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);

  // Form States - Brand
  const [brandLogoUrl, setBrandLogoUrl] = useState(brand.logoUrl);
  const [brandName, setBrandName] = useState(brand.brandName);
  const [brandHighlight, setBrandHighlight] = useState(brand.brandHighlight);
  const [brandTagline, setBrandTagline] = useState(brand.tagline);

  // Form States - Hero
  const [heroBadge, setHeroBadge] = useState(hero.badge);
  const [heroHeadline1, setHeroHeadline1] = useState(hero.headline1);
  const [heroHeadline2, setHeroHeadline2] = useState(hero.headline2);
  const [heroSubtitle, setHeroSubtitle] = useState(hero.subtitle);
  const [heroBtn1Text, setHeroBtn1Text] = useState(hero.btn1Text);
  const [heroBtn1Link, setHeroBtn1Link] = useState(hero.btn1Link);
  const [heroBtn2Text, setHeroBtn2Text] = useState(hero.btn2Text);
  const [heroBtn2Link, setHeroBtn2Link] = useState(hero.btn2Link);
  const [heroPizzaImage, setHeroPizzaImage] = useState(hero.pizzaImage);
  const [heroPizzaTag, setHeroPizzaTag] = useState(hero.pizzaTag);

  // Form States - Announcement
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement.enabled);
  const [announcementBadge, setAnnouncementBadge] = useState(announcement.badge);
  const [announcementText, setAnnouncementText] = useState(announcement.text);
  const [announcementLinkText, setAnnouncementLinkText] = useState(announcement.linkText || '');
  const [announcementLinkUrl, setAnnouncementLinkUrl] = useState(announcement.linkUrl || '');

  // Form States - Campaign
  const [campaignBadge, setCampaignBadge] = useState(campaign.badge);
  const [campaignTitle1, setCampaignTitle1] = useState(campaign.title1);
  const [campaignTitle2, setCampaignTitle2] = useState(campaign.title2);
  const [campaignDesc, setCampaignDesc] = useState(campaign.desc);

  // Form States - About
  const [aboutBadge, setAboutBadge] = useState(about.badge);
  const [aboutHeading1, setAboutHeading1] = useState(about.heading1);
  const [aboutHeading2, setAboutHeading2] = useState(about.heading2);
  const [aboutDesc, setAboutDesc] = useState(about.desc);
  const [aboutHeroImage, setAboutHeroImage] = useState(about.heroImage);
  const [aboutHeroTag, setAboutHeroTag] = useState(about.heroTag);
  const [aboutStoryBadge, setAboutStoryBadge] = useState(about.storyBadge);
  const [aboutStoryHeading, setAboutStoryHeading] = useState(about.storyHeading);
  const [aboutStoryText1, setAboutStoryText1] = useState(about.storyText1);
  const [aboutStoryText2, setAboutStoryText2] = useState(about.storyText2);
  const [aboutStat1Value, setAboutStat1Value] = useState(about.stat1Value);
  const [aboutStat1Label, setAboutStat1Label] = useState(about.stat1Label);
  const [aboutStat2Value, setAboutStat2Value] = useState(about.stat2Value);
  const [aboutStat2Label, setAboutStat2Label] = useState(about.stat2Label);
  const [aboutStat3Value, setAboutStat3Value] = useState(about.stat3Value);
  const [aboutStat3Label, setAboutStat3Label] = useState(about.stat3Label);

  // Form States - Footer
  const [footerDesc, setFooterDesc] = useState(footer.desc);
  const [footerCopyright, setFooterCopyright] = useState(footer.copyrightText);
  const [footerInstagram, setFooterInstagram] = useState(footer.instagram);
  const [footerFacebook, setFooterFacebook] = useState(footer.facebook);
  const [footerTiktok, setFooterTiktok] = useState(footer.tiktok);
  const [footerYoutube, setFooterYoutube] = useState(footer.youtube);

  // Form States - Store
  const [storeOpen, setStoreOpen] = useState(storeInfo.isOpen);
  const [storeClosedNotice, setStoreClosedNotice] = useState(storeInfo.closedNotice);
  const [storePhone, setStorePhone] = useState(storeInfo.phone);
  const [storeWhatsapp, setStoreWhatsapp] = useState(storeInfo.whatsapp);
  const [storeHours, setStoreHours] = useState(storeInfo.hours);
  const [storeAddress, setStoreAddress] = useState(storeInfo.address);
  const [storeDeliveryFee, setStoreDeliveryFee] = useState(storeInfo.deliveryFee);
  const [storeFreeThreshold, setStoreFreeThreshold] = useState(storeInfo.freeDeliveryThreshold);
  const [storeMinOrder, setStoreMinOrder] = useState(storeInfo.minOrder);

  // Product Modals
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<Category>('Pizza');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editIsPopular, setEditIsPopular] = useState(false);
  const [editIsSpecial, setEditIsSpecial] = useState(false);
  const [editSizes, setEditSizes] = useState<SizeOption[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('Pizza');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState<number>(690);
  const [newImage, setNewImage] = useState('/images/real/crown-crust-pizza.jpg');
  const [newIsPopular, setNewIsPopular] = useState(false);
  const [newIsSpecial, setNewIsSpecial] = useState(false);
  const [newSizes, setNewSizes] = useState<SizeOption[]>([
    { name: 'Small', price: 690 },
    { name: 'Medium', price: 1300 },
    { name: 'Large', price: 1750 },
    { name: 'X-Large', price: 2300 },
  ]);

  // Deal Modals
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);
  const [editDealNumber, setEditDealNumber] = useState<number>(1);
  const [editDealName, setEditDealName] = useState('');
  const [editDealPrice, setEditDealPrice] = useState<number>(0);
  const [editDealCategory, setEditDealCategory] = useState<DealCategory>('Solo Era');
  const [editDealContentsStr, setEditDealContentsStr] = useState('');
  const [editDealImage, setEditDealImage] = useState('');
  const [editDealIsPopular, setEditDealIsPopular] = useState(false);

  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [newDealNumber, setNewDealNumber] = useState<number>(deals.length + 1);
  const [newDealName, setNewDealName] = useState('');
  const [newDealPrice, setNewDealPrice] = useState<number>(1200);
  const [newDealCategory, setNewDealCategory] = useState<DealCategory>('Solo Era');
  const [newDealContentsStr, setNewDealContentsStr] = useState('');
  const [newDealImage, setNewDealImage] = useState('/images/real/deal-15.jpg');
  const [newDealIsPopular, setNewDealIsPopular] = useState(false);

  // Backup & Import
  const [jsonInput, setJsonInput] = useState('');
  const [jsonMessage, setJsonMessage] = useState('');

  const showFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Save Handlers
  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrand({
      logoUrl: brandLogoUrl.trim(),
      brandName: brandName.trim(),
      brandHighlight: brandHighlight.trim(),
      tagline: brandTagline.trim(),
    });
    showFeedback('Brand & Logo settings published live!');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero({
      badge: heroBadge.trim(),
      headline1: heroHeadline1.trim(),
      headline2: heroHeadline2.trim(),
      subtitle: heroSubtitle.trim(),
      btn1Text: heroBtn1Text.trim(),
      btn1Link: heroBtn1Link.trim(),
      btn2Text: heroBtn2Text.trim(),
      btn2Link: heroBtn2Link.trim(),
      pizzaImage: heroPizzaImage.trim(),
      pizzaTag: heroPizzaTag.trim(),
    });
    updateCampaign({
      badge: campaignBadge.trim(),
      title1: campaignTitle1.trim(),
      title2: campaignTitle2.trim(),
      desc: campaignDesc.trim(),
    });
    showFeedback('Hero Banner & Campaign updated live on homepage!');
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      enabled: announcementEnabled,
      badge: announcementBadge.trim(),
      text: announcementText.trim(),
      linkText: announcementLinkText.trim(),
      linkUrl: announcementLinkUrl.trim(),
    });
    showFeedback('Top Announcement Marquee updated live!');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout({
      badge: aboutBadge.trim(),
      heading1: aboutHeading1.trim(),
      heading2: aboutHeading2.trim(),
      desc: aboutDesc.trim(),
      heroImage: aboutHeroImage.trim(),
      heroTag: aboutHeroTag.trim(),
      storyBadge: aboutStoryBadge.trim(),
      storyHeading: aboutStoryHeading.trim(),
      storyText1: aboutStoryText1.trim(),
      storyText2: aboutStoryText2.trim(),
      stat1Value: aboutStat1Value.trim(),
      stat1Label: aboutStat1Label.trim(),
      stat2Value: aboutStat2Value.trim(),
      stat2Label: aboutStat2Label.trim(),
      stat3Value: aboutStat3Value.trim(),
      stat3Label: aboutStat3Label.trim(),
    });
    showFeedback('About Us story, photos, and stats updated live!');
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooter({
      desc: footerDesc.trim(),
      copyrightText: footerCopyright.trim(),
      instagram: footerInstagram.trim(),
      facebook: footerFacebook.trim(),
      tiktok: footerTiktok.trim(),
      youtube: footerYoutube.trim(),
    });
    showFeedback('Footer bio, social links, and copyright saved!');
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreInfo({
      isOpen: storeOpen,
      closedNotice: storeClosedNotice.trim(),
      phone: storePhone.trim(),
      whatsapp: storeWhatsapp.trim(),
      hours: storeHours.trim(),
      address: storeAddress.trim(),
      deliveryFee: Number(storeDeliveryFee),
      freeDeliveryThreshold: Number(storeFreeThreshold),
      minOrder: Number(storeMinOrder),
    });
    showFeedback('Kitchen status, timings, phone & delivery fee updated!');
  };

  // Product CRUD
  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditPrice(item.basePrice);
    setEditCategory(item.category);
    setEditDescription(item.description);
    setEditImage(item.image);
    setEditIsPopular(Boolean(item.isPopular));
    setEditIsSpecial(Boolean(item.isSpecial));
    setEditSizes(item.sizes ? [...item.sizes] : []);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name: editName.trim(),
        basePrice: editPrice,
        category: editCategory,
        description: editDescription.trim(),
        image: editImage.trim() || editingItem.image,
        isPopular: editIsPopular,
        isSpecial: editIsSpecial,
        sizes: editSizes.length > 0 ? editSizes : undefined,
      });
      setEditingItem(null);
      showFeedback(`Updated "${editName}" successfully!`);
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: MenuItem = {
      id: `custom-prod-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      description: newDescription.trim(),
      basePrice: Number(newPrice),
      image: newImage.trim() || '/images/real/crown-crust-pizza.jpg',
      isPopular: newIsPopular,
      isSpecial: newIsSpecial,
      isAvailable: true,
      sizes: newCategory === 'Pizza' && newSizes.length > 0 ? newSizes : undefined,
      supportsExtraToppings: newCategory === 'Pizza',
    };

    addMenuItem(newItem);
    setIsAddModalOpen(false);
    setNewName('');
    setNewDescription('');
    setNewPrice(690);
    showFeedback(`Added new product "${newItem.name}" to menu!`);
  };

  // Deal CRUD
  const handleOpenEditDeal = (deal: DealItem) => {
    setEditingDeal(deal);
    setEditDealNumber(deal.dealNumber);
    setEditDealName(deal.name);
    setEditDealPrice(deal.price);
    setEditDealCategory(deal.category);
    setEditDealContentsStr(deal.contents.join(', '));
    setEditDealImage(deal.image);
    setEditDealIsPopular(Boolean(deal.isPopular));
  };

  const handleSaveEditDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeal) {
      const contentsArray = editDealContentsStr.split(',').map(s => s.trim()).filter(Boolean);
      updateDealItem({
        ...editingDeal,
        dealNumber: editDealNumber,
        name: editDealName.trim(),
        price: editDealPrice,
        category: editDealCategory,
        contents: contentsArray.length > 0 ? contentsArray : editingDeal.contents,
        image: editDealImage.trim() || editingDeal.image,
        isPopular: editDealIsPopular,
      });
      setEditingDeal(null);
      showFeedback(`Updated Deal #${editDealNumber} successfully!`);
    }
  };

  const handleAddDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealName.trim()) return;

    const contentsArray = newDealContentsStr.split(',').map(s => s.trim()).filter(Boolean);
    const newDeal: DealItem = {
      id: `deal-custom-${Date.now()}`,
      dealNumber: newDealNumber,
      name: newDealName.trim(),
      category: newDealCategory,
      price: Number(newDealPrice),
      contents: contentsArray,
      image: newDealImage.trim() || '/images/real/deal-15.jpg',
      isPopular: newDealIsPopular,
      isAvailable: true,
    };

    addDealItem(newDeal);
    setIsAddDealModalOpen(false);
    setNewDealName('');
    setNewDealPrice(1200);
    setNewDealContentsStr('');
    showFeedback(`Created Deal #${newDeal.dealNumber} successfully!`);
  };

  // Master JSON Export / Backup
  const handleExportAllJSON = () => {
    const fullBackup = {
      backupDate: new Date().toISOString(),
      brand,
      announcement,
      hero,
      campaign,
      about,
      footer,
      storeInfo,
      menuItems,
      deals,
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cheesebites_master_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showFeedback('Downloaded full website CMS backup file!');
  };

  const handleCopyAllJSON = () => {
    const fullBackup = {
      brand,
      announcement,
      hero,
      campaign,
      about,
      footer,
      storeInfo,
      menuItems,
      deals,
    };
    navigator.clipboard.writeText(JSON.stringify(fullBackup, null, 2));
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
    showFeedback('Copied complete JSON to clipboard!');
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.brand || parsed.hero || parsed.menuItems) {
        updateAllSettings({
          brand: parsed.brand,
          announcement: parsed.announcement,
          hero: parsed.hero,
          campaign: parsed.campaign,
          about: parsed.about,
          footer: parsed.footer,
          storeInfo: parsed.storeInfo,
        });
        if (parsed.menuItems || parsed.deals) {
          setFullMenu(parsed.menuItems || [], parsed.deals || []);
        }
        setJsonMessage('Success! Full website CMS data imported and applied.');
        setJsonInput('');
        showFeedback('Website restored from JSON backup!');
      } else {
        setJsonMessage('Invalid format: JSON does not contain recognized CMS structure.');
      }
    } catch (err: any) {
      setJsonMessage(`Error parsing JSON: ${err.message}`);
    }
  };

  // Filtering
  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = searchQuery === '' ||
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `deal ${deal.dealNumber}`.includes(searchQuery.toLowerCase()) ||
      deal.contents.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Layers className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-black tracking-widest text-amber-400">A-Z Website CMS Master</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-2 font-sans">
            Cheese Bites Content Management System
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
            Complete control over Logo, Banners, Hero, Menu, Deals, Operating Hours & Footer live on the website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-extrabold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-gray-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={handleExportAllJSON}
            className="bg-gray-800 hover:bg-gray-700 text-amber-300 font-extrabold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-amber-500/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Backup All JSON</span>
          </button>
        </div>
      </div>

      {/* Floating Save Alert Banner */}
      {saveSuccessMsg && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button onClick={() => setSaveSuccessMsg('')} className="text-white hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Pills Bar */}
      <div className="flex flex-wrap border-b border-gray-200 bg-white p-2 rounded-2xl shadow-sm gap-1.5 overflow-x-auto">
        {[
          { id: 'brand', label: 'Logo & Brand', icon: <ImageIcon className="w-4 h-4" /> },
          { id: 'hero', label: 'Hero Banner', icon: <Layout className="w-4 h-4" /> },
          { id: 'announcement', label: 'Top Notice Bar', icon: <Megaphone className="w-4 h-4" /> },
          { id: 'dishes', label: `Dishes (${menuItems.length})`, icon: <Utensils className="w-4 h-4" /> },
          { id: 'deals', label: `Deals (${deals.length})`, icon: <Tag className="w-4 h-4" /> },
          { id: 'about', label: 'About Us Page', icon: <Info className="w-4 h-4" /> },
          { id: 'footer', label: 'Footer & Social', icon: <Share2 className="w-4 h-4" /> },
          { id: 'store', label: 'Kitchen & Hours', icon: <Store className="w-4 h-4" /> },
          { id: 'backup', label: 'JSON Backup', icon: <Save className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CMSTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-gray-950 shadow-md scale-102'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* TAB: BRAND & LOGO CMS */}
      {/* ======================================================== */}
      {activeTab === 'brand' && (
        <form onSubmit={handleSaveBrand} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-500" />
                <span>Website Logo & Brand Identity</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Change the main website logo, restaurant brand name, and header styling live across all pages.
              </p>
            </div>

            {/* Live Logo Preview Box */}
            <div className="p-6 bg-gray-950 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.5)] overflow-hidden shrink-0">
                  <img
                    src={brandLogoUrl || '/logo.png'}
                    alt="Logo Preview"
                    className="w-full h-full object-cover rounded-full bg-[#07070b]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                  />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase block leading-none font-sans">
                    {brandName || 'CHEESE'} <span className="text-amber-400">{brandHighlight || 'BITES'}</span>
                  </span>
                  <span className="text-xs text-amber-200/80 font-bold block mt-1 tracking-wider">
                    {brandTagline || 'Fresh. Cheesy. Delicious.'}
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Header & Footer Display Preview</span>
                <span className="text-xs text-emerald-400 font-bold block mt-0.5">● Active in Navigation Bar</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <label className="text-xs font-black uppercase text-gray-700">Logo Image URL</label>
                <input
                  type="text"
                  value={brandLogoUrl}
                  onChange={e => setBrandLogoUrl(e.target.value)}
                  placeholder="/logo.png or https://example.com/logo.png"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {PRESET_LOGOS.map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setBrandLogoUrl(p.url)}
                      className="text-[10px] bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 font-bold px-2 py-0.5 rounded border border-gray-200"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Brand Name (First Part)</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  placeholder="e.g. CHEESE"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Brand Name Highlight Word</label>
                <input
                  type="text"
                  value={brandHighlight}
                  onChange={e => setBrandHighlight(e.target.value)}
                  placeholder="e.g. BITES"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                <label className="text-xs font-black uppercase text-gray-700">Tagline / Slogan</label>
                <input
                  type="text"
                  value={brandTagline}
                  onChange={e => setBrandTagline(e.target.value)}
                  placeholder="e.g. Fresh. Cheesy. Delicious."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save & Publish Brand Changes</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB: HERO BANNER CMS */}
      {/* ======================================================== */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                <Layout className="w-5 h-5 text-amber-500" />
                <span>Home Hero Section & Featured Pizza</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Control the headlines, badge text, action buttons, and featured hero pizza photo on the homepage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Hero Badge Pill</label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={e => setHeroBadge(e.target.value)}
                  placeholder="e.g. 🔥 Hot & Fresh From Our Oven"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Featured Pizza Badge Tag</label>
                <input
                  type="text"
                  value={heroPizzaTag}
                  onChange={e => setHeroPizzaTag(e.target.value)}
                  placeholder="e.g. Crown Crust Pizza"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Headline Line 1</label>
                <input
                  type="text"
                  value={heroHeadline1}
                  onChange={e => setHeroHeadline1(e.target.value)}
                  placeholder="e.g. CRAVING REAL CHEESE?"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Headline Line 2 (Highlighted in Orange)</label>
                <input
                  type="text"
                  value={heroHeadline2}
                  onChange={e => setHeroHeadline2(e.target.value)}
                  placeholder="e.g. BITE INTO PERFECTION"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black uppercase text-gray-700">Subtitle Paragraph</label>
                <textarea
                  value={heroSubtitle}
                  onChange={e => setHeroSubtitle(e.target.value)}
                  rows={2}
                  placeholder="Description of Cheese Bites quality, fresh dough, mozzarella..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Primary Button Text</label>
                <input
                  type="text"
                  value={heroBtn1Text}
                  onChange={e => setHeroBtn1Text(e.target.value)}
                  placeholder="e.g. Order Now"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Primary Button Link</label>
                <input
                  type="text"
                  value={heroBtn1Link}
                  onChange={e => setHeroBtn1Link(e.target.value)}
                  placeholder="e.g. /menu"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Secondary Button Text</label>
                <input
                  type="text"
                  value={heroBtn2Text}
                  onChange={e => setHeroBtn2Text(e.target.value)}
                  placeholder="e.g. See The Menu"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Secondary Button Link</label>
                <input
                  type="text"
                  value={heroBtn2Link}
                  onChange={e => setHeroBtn2Link(e.target.value)}
                  placeholder="e.g. /menu"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black uppercase text-gray-700">Featured Pizza Image URL</label>
                <input
                  type="text"
                  value={heroPizzaImage}
                  onChange={e => setHeroPizzaImage(e.target.value)}
                  placeholder="/images/hero-pizza-user.jpg"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {PRESET_IMAGES.slice(0, 6).map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setHeroPizzaImage(p.url)}
                      className="text-[10px] bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 font-bold px-2 py-0.5 rounded border border-gray-200"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Deal Banner Settings */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-sm font-black text-gray-900 uppercase">Featured Advertising Campaign ("The Big Flex" Banner)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Campaign Badge</label>
                  <input
                    type="text"
                    value={campaignBadge}
                    onChange={e => setCampaignBadge(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Title Part 1</label>
                  <input
                    type="text"
                    value={campaignTitle1}
                    onChange={e => setCampaignTitle1(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Title Part 2 (Highlight)</label>
                  <input
                    type="text"
                    value={campaignTitle2}
                    onChange={e => setCampaignTitle2(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1 sm:col-span-3">
                  <label className="text-xs font-black uppercase text-gray-700">Campaign Description</label>
                  <input
                    type="text"
                    value={campaignDesc}
                    onChange={e => setCampaignDesc(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save & Publish Hero Banner</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB: TOP ANNOUNCEMENT MARQUEE */}
      {/* ======================================================== */}
      {activeTab === 'announcement' && (
        <form onSubmit={handleSaveAnnouncement} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-500" />
                  <span>Top Website Announcement Marquee Bar</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Prominent notification strip rendered at the very top of all website pages.
                </p>
              </div>

              <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto">
                <span className="text-xs font-black uppercase text-gray-700">
                  {announcementEnabled ? '🟢 Marquee Bar Active' : '⚪ Marquee Bar Disabled'}
                </span>
                <input
                  type="checkbox"
                  checked={announcementEnabled}
                  onChange={e => setAnnouncementEnabled(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Live Preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-gray-400 block tracking-wider">Live Preview:</span>
              <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-gray-950 py-2.5 px-4 rounded-2xl flex items-center justify-between text-xs font-black shadow-md">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="bg-gray-950 text-amber-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase shrink-0">
                    {announcementBadge || 'SPECIAL OFFER'}
                  </span>
                  <span className="truncate">{announcementText || 'Free Delivery on orders above Rs. 2,000!'}</span>
                </div>
                {announcementLinkText && (
                  <span className="bg-gray-950 text-amber-400 text-[10px] uppercase px-2.5 py-0.5 rounded-full ml-3 shrink-0">
                    {announcementLinkText} &rarr;
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Badge Text</label>
                <input
                  type="text"
                  value={announcementBadge}
                  onChange={e => setAnnouncementBadge(e.target.value)}
                  placeholder="e.g. SPECIAL OFFER, HOT DEAL, NOTICE"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Announcement Message</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Free Delivery on orders above Rs. 2,000! Freshly baked, extra cheesy."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Button Label (Optional)</label>
                <input
                  type="text"
                  value={announcementLinkText}
                  onChange={e => setAnnouncementLinkText(e.target.value)}
                  placeholder="e.g. Order Menu"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Button Destination Link</label>
                <input
                  type="text"
                  value={announcementLinkUrl}
                  onChange={e => setAnnouncementLinkUrl(e.target.value)}
                  placeholder="e.g. /menu, /deals"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save Announcement Bar</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB: DISHES & MENU CMS */}
      {/* ======================================================== */}
      {activeTab === 'dishes' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search dishes by name, category, or ingredients..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Pizza', 'Burgers', 'Sandwiches', 'Roll Paratha', 'Pasta', 'Fried Chicken', 'Fries'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gray-950 text-amber-400 shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-4 py-2 rounded-xl text-xs uppercase flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map(item => {
              const isAvailable = item.isAvailable !== false;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border ${
                    isAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/20'
                  } p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover ${!isAvailable ? 'grayscale opacity-60' : ''}`}
                    />
                    
                    <span className="absolute top-2 left-2 bg-gray-950/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {item.category}
                    </span>

                    {!isAvailable && (
                      <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                      {item.isPopular && (
                        <span className="bg-amber-500 text-gray-950 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5" /> Popular
                        </span>
                      )}
                      {item.isSpecial && (
                        <span className="bg-purple-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                          <Star className="w-2.5 h-2.5" /> Special
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-black text-gray-900 text-sm leading-snug line-clamp-1">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{item.description || 'Authentic Cheese Bites recipe.'}</p>
                    
                    {item.sizes && item.sizes.length > 0 ? (
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {item.sizes.map(s => (
                          <span
                            key={s.name}
                            className="text-[10px] bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded-md border border-gray-200"
                          >
                            {s.name}: <strong className="text-amber-600">Rs. {s.price}</strong>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="pt-1.5">
                        <span className="text-base font-black text-amber-600">Rs. {item.basePrice}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => toggleItemAvailability(item.id)}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      }`}
                    >
                      {isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isAvailable ? 'In Stock' : 'Out of Stock'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-xl transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${item.name}" from menu?`)) {
                            deleteMenuItem(item.id);
                          }
                        }}
                        className="p-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-xl transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: DEALS CMS */}
      {/* ======================================================== */}
      {activeTab === 'deals' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search deals by deal number, title, or included items..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <button
              onClick={() => setIsAddDealModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-4 py-2 rounded-xl text-xs uppercase flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Deal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDeals.map(deal => {
              const isAvailable = deal.isAvailable !== false;
              return (
                <div
                  key={deal.id}
                  className={`bg-white rounded-3xl border ${
                    isAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/20'
                  } p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className={`w-full h-full object-cover ${!isAvailable ? 'grayscale opacity-60' : ''}`}
                    />
                    
                    <span className="absolute top-2 left-2 bg-amber-500 text-gray-950 text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow">
                      Deal #{deal.dealNumber}
                    </span>

                    {!isAvailable && (
                      <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg">
                          Unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                      {deal.category}
                    </span>
                    <h3 className="font-black text-gray-900 text-sm leading-snug">{deal.name}</h3>
                    
                    <div className="space-y-1 pt-1.5">
                      {deal.contents.map((c, i) => (
                        <div key={i} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="line-clamp-1">{c}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3">
                      <span className="text-xl font-black text-gray-950">Rs. {deal.price}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => toggleDealAvailability(deal.id)}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      }`}
                    >
                      {isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isAvailable ? 'In Stock' : 'Out of Stock'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditDeal(deal)}
                        className="p-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-xl transition-colors"
                        title="Edit Deal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete Deal #${deal.dealNumber} (${deal.name})?`)) {
                            deleteDealItem(deal.id);
                          }
                        }}
                        className="p-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-xl transition-colors"
                        title="Delete Deal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: ABOUT US PAGE CMS */}
      {/* ======================================================== */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-500" />
                <span>About Us Page Story & Statistics</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Manage the Brand story, culinary commitment paragraphs, featured food photos, and key metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Top Label Pill</label>
                <input
                  type="text"
                  value={aboutBadge}
                  onChange={e => setAboutBadge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Featured Image Badge Stamp</label>
                <input
                  type="text"
                  value={aboutHeroTag}
                  onChange={e => setAboutHeroTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">About Heading (Part 1)</label>
                <input
                  type="text"
                  value={aboutHeading1}
                  onChange={e => setAboutHeading1(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">About Heading (Part 2 - Highlight)</label>
                <input
                  type="text"
                  value={aboutHeading2}
                  onChange={e => setAboutHeading2(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black uppercase text-gray-700">About Hero Description</label>
                <textarea
                  value={aboutDesc}
                  onChange={e => setAboutDesc(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black uppercase text-gray-700">About Hero Image URL</label>
                <input
                  type="text"
                  value={aboutHeroImage}
                  onChange={e => setAboutHeroImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-black text-gray-900 uppercase">Our Story Section</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Story Badge</label>
                <input
                  type="text"
                  value={aboutStoryBadge}
                  onChange={e => setAboutStoryBadge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Story Heading</label>
                <input
                  type="text"
                  value={aboutStoryHeading}
                  onChange={e => setAboutStoryHeading(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black uppercase text-gray-700">Story Paragraph 1</label>
                <textarea
                  value={aboutStoryText1}
                  onChange={e => setAboutStoryText1(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black uppercase text-gray-700">Story Paragraph 2</label>
                <textarea
                  value={aboutStoryText2}
                  onChange={e => setAboutStoryText2(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* 3 Metric Stats */}
              <div className="sm:col-span-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-black uppercase text-gray-700 mb-3">3 Metrics / Counter Stats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Stat 1 (Value & Label)</label>
                    <input
                      type="text"
                      value={aboutStat1Value}
                      onChange={e => setAboutStat1Value(e.target.value)}
                      placeholder="e.g. 100%"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={aboutStat1Label}
                      onChange={e => setAboutStat1Label(e.target.value)}
                      placeholder="e.g. Pure Mozzarella"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Stat 2 (Value & Label)</label>
                    <input
                      type="text"
                      value={aboutStat2Value}
                      onChange={e => setAboutStat2Value(e.target.value)}
                      placeholder="e.g. 25+"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={aboutStat2Label}
                      onChange={e => setAboutStat2Label(e.target.value)}
                      placeholder="e.g. Handcrafted Items"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Stat 3 (Value & Label)</label>
                    <input
                      type="text"
                      value={aboutStat3Value}
                      onChange={e => setAboutStat3Value(e.target.value)}
                      placeholder="e.g. 15k+"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold mb-1"
                    />
                    <input
                      type="text"
                      value={aboutStat3Label}
                      onChange={e => setAboutStat3Label(e.target.value)}
                      placeholder="e.g. Happy Cravings"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save About Page Changes</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB: FOOTER & SOCIAL LINKS CMS */}
      {/* ======================================================== */}
      {activeTab === 'footer' && (
        <form onSubmit={handleSaveFooter} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-500" />
                <span>Footer & Social Media Channels</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Manage the footer bio description, copyright line, and links to Instagram, Facebook, TikTok & YouTube.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Footer Restaurant Bio / Description</label>
                <textarea
                  value={footerDesc}
                  onChange={e => setFooterDesc(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Footer Copyright Text</label>
                <input
                  type="text"
                  value={footerCopyright}
                  onChange={e => setFooterCopyright(e.target.value)}
                  placeholder="e.g. © 2026 Cheese Bites Islamabad. All rights reserved."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-700">Instagram Profile Link</label>
                  <input
                    type="text"
                    value={footerInstagram}
                    onChange={e => setFooterInstagram(e.target.value)}
                    placeholder="https://instagram.com/cheesebites_official"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-700">Facebook Page Link</label>
                  <input
                    type="text"
                    value={footerFacebook}
                    onChange={e => setFooterFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-700">TikTok Profile Link</label>
                  <input
                    type="text"
                    value={footerTiktok}
                    onChange={e => setFooterTiktok(e.target.value)}
                    placeholder="https://tiktok.com/@cheesebites.pk"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-700">YouTube Channel Link</label>
                  <input
                    type="text"
                    value={footerYoutube}
                    onChange={e => setFooterYoutube(e.target.value)}
                    placeholder="https://youtube.com/@cheesebites"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save Footer & Social Channels</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB: KITCHEN, STORE & DELIVERY CMS */}
      {/* ======================================================== */}
      {activeTab === 'store' && (
        <form onSubmit={handleSaveStore} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-500" />
                  <span>Kitchen Availability & Operating Controls</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Manage live kitchen ordering status, delivery charges, and contact lines.
                </p>
              </div>

              <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto">
                <span className="text-xs font-black uppercase text-gray-700">
                  {storeOpen ? '🟢 Kitchen Open for Orders' : '🔴 Kitchen Temporarily Closed'}
                </span>
                <input
                  type="checkbox"
                  checked={storeOpen}
                  onChange={e => setStoreOpen(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </label>
            </div>

            {!storeOpen && (
              <div className="space-y-1.5 bg-red-50 p-4 rounded-2xl border border-red-200">
                <label className="text-xs font-black uppercase text-red-800">Closed Notification Message (Shown on Site)</label>
                <input
                  type="text"
                  value={storeClosedNotice}
                  onChange={e => setStoreClosedNotice(e.target.value)}
                  placeholder="e.g. Kitchen is temporarily closed for preparation. We resume taking orders shortly!"
                  className="w-full px-4 py-2.5 bg-white border border-red-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> Call to Order Hotline
                </label>
                <input
                  type="text"
                  value={storePhone}
                  onChange={e => setStorePhone(e.target.value)}
                  placeholder="0337-1500150"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Direct Link
                </label>
                <input
                  type="text"
                  value={storeWhatsapp}
                  onChange={e => setStoreWhatsapp(e.target.value)}
                  placeholder="https://wa.me/923371500150"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Operating & Delivery Hours
                </label>
                <input
                  type="text"
                  value={storeHours}
                  onChange={e => setStoreHours(e.target.value)}
                  placeholder="11:00 AM - 4:00 AM"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                <label className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Physical Branch Address
                </label>
                <input
                  type="text"
                  value={storeAddress}
                  onChange={e => setStoreAddress(e.target.value)}
                  placeholder="17 Meel Stop, Japan Dam Road, Islamabad"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Standard Delivery Fee (Rs.)</label>
                <input
                  type="number"
                  value={storeDeliveryFee}
                  onChange={e => setStoreDeliveryFee(Number(e.target.value))}
                  placeholder="150"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Free Delivery Order Threshold (Rs.)</label>
                <input
                  type="number"
                  value={storeFreeThreshold}
                  onChange={e => setStoreFreeThreshold(Number(e.target.value))}
                  placeholder="2000"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Minimum Order Amount (Rs.)</label>
                <input
                  type="number"
                  value={storeMinOrder}
                  onChange={e => setStoreMinOrder(Number(e.target.value))}
                  placeholder="300"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Operations</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB: MASTER JSON BACKUP & RESTORE */}
      {/* ======================================================== */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                <Save className="w-5 h-5 text-amber-500" />
                <span>Complete Website CMS Backup & Data Migration</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                One-click complete backup of all products, deals, logos, banners, hours, and text.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExportAllJSON}
                className="bg-gray-900 hover:bg-gray-800 text-white font-black px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Full Website JSON</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAllJSON}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-gray-200"
              >
                {copyStatus ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copyStatus ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset the entire website (Menu, Deals, Logo, Banners, Hours) back to factory defaults?')) {
                    resetToDefaultMenu();
                    resetSiteSettings();
                    showFeedback('Catalog and site settings reset to original defaults!');
                  }
                }}
                className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-red-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Factory Defaults</span>
              </button>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-black uppercase text-gray-700 block">
                Paste JSON Backup to Restore Entire Website:
              </label>
              <textarea
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder='Paste exported JSON backup containing {"brand": ..., "hero": ..., "menuItems": ...} here...'
                rows={6}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono focus:outline-none focus:border-amber-500"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleImportJSON}
                  disabled={!jsonInput.trim()}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-black px-6 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow"
                >
                  <Upload className="w-4 h-4" />
                  <span>Restore & Apply Live</span>
                </button>
                {jsonMessage && (
                  <span className={`text-xs font-bold ${jsonMessage.startsWith('Success') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {jsonMessage}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD PRODUCT */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Add New Product</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Cheesy Supreme Pizza"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {['Pizza', 'Burgers', 'Sandwiches', 'Roll Paratha', 'Pasta', 'Fried Chicken', 'Fries', 'Deals'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Base Price (Rs.)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {newCategory === 'Pizza' && (
                <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="text-xs font-black uppercase text-gray-700 block">Pizza Size Pricing:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Small', 'Medium', 'Large', 'X-Large'].map(sizeName => {
                      const current = newSizes.find(s => s.name === sizeName)?.price || 690;
                      return (
                        <div key={sizeName} className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-500">{sizeName}</label>
                          <input
                            type="number"
                            value={current}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setNewSizes(prev => {
                                const filtered = prev.filter(s => s.name !== sizeName);
                                return [...filtered, { name: sizeName, price: val }].sort((a, b) => a.price - b.price);
                              });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Description</label>
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Ingredients, toppings, or special flavours..."
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_IMAGES.slice(0, 6).map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setNewImage(p.url)}
                      className="text-[10px] bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 font-bold px-2 py-0.5 rounded border border-gray-200"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsPopular}
                    onChange={e => setNewIsPopular(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">Popular Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsSpecial}
                    onChange={e => setNewIsSpecial(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">Chef Special</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-6 py-2 rounded-xl text-xs uppercase shadow"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT PRODUCT */}
      {/* ======================================================== */}
      {editingItem && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Edit Product</h2>
              <button onClick={() => setEditingItem(null)} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Category</label>
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {['Pizza', 'Burgers', 'Sandwiches', 'Roll Paratha', 'Pasta', 'Fried Chicken', 'Fries', 'Deals'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Base Price (Rs.)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {editCategory === 'Pizza' && (
                <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="text-xs font-black uppercase text-gray-700 block">Pizza Size Pricing:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Small', 'Medium', 'Large', 'X-Large'].map(sizeName => {
                      const current = editSizes.find(s => s.name === sizeName)?.price || 0;
                      return (
                        <div key={sizeName} className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-500">{sizeName}</label>
                          <input
                            type="number"
                            value={current}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setEditSizes(prev => {
                                const filtered = prev.filter(s => s.name !== sizeName);
                                return [...filtered, { name: sizeName, price: val }].sort((a, b) => a.price - b.price);
                              });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Description</label>
                <textarea
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={editImage}
                  onChange={e => setEditImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_IMAGES.slice(0, 6).map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setEditImage(p.url)}
                      className="text-[10px] bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 font-bold px-2 py-0.5 rounded border border-gray-200"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsPopular}
                    onChange={e => setEditIsPopular(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">Popular Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsSpecial}
                    onChange={e => setEditIsSpecial(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">Chef Special</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-6 py-2 rounded-xl text-xs uppercase shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD DEAL */}
      {/* ======================================================== */}
      {isAddDealModalOpen && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Add New Deal</h2>
              <button onClick={() => setIsAddDealModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDealSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Deal #</label>
                  <input
                    type="number"
                    value={newDealNumber}
                    onChange={e => setNewDealNumber(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Deal Title</label>
                  <input
                    type="text"
                    value={newDealName}
                    onChange={e => setNewDealName(e.target.value)}
                    placeholder="e.g. Mega Family Feast"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Category</label>
                  <select
                    value={newDealCategory}
                    onChange={e => setNewDealCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {['Solo Era', 'Hits Different', 'Squad Goals', 'The Big Flex', 'Duo Pizza Deals'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Price (Rs.)</label>
                  <input
                    type="number"
                    value={newDealPrice}
                    onChange={e => setNewDealPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Included Items (comma separated)</label>
                <input
                  type="text"
                  value={newDealContentsStr}
                  onChange={e => setNewDealContentsStr(e.target.value)}
                  placeholder="e.g. 1 Large Pizza, 2 Zinger Burgers, 1.5L Pepsi"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={newDealImage}
                  onChange={e => setNewDealImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDealIsPopular}
                    onChange={e => setNewDealIsPopular(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">Popular Deal Badge</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddDealModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-6 py-2 rounded-xl text-xs uppercase shadow"
                >
                  Add Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT DEAL */}
      {/* ======================================================== */}
      {editingDeal && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Edit Deal #{editingDeal.dealNumber}</h2>
              <button onClick={() => setEditingDeal(null)} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditDeal} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Deal #</label>
                  <input
                    type="number"
                    value={editDealNumber}
                    onChange={e => setEditDealNumber(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Deal Title</label>
                  <input
                    type="text"
                    value={editDealName}
                    onChange={e => setEditDealName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Category</label>
                  <select
                    value={editDealCategory}
                    onChange={e => setEditDealCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {['Solo Era', 'Hits Different', 'Squad Goals', 'The Big Flex', 'Duo Pizza Deals'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-gray-700">Price (Rs.)</label>
                  <input
                    type="number"
                    value={editDealPrice}
                    onChange={e => setEditDealPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Included Items (comma separated)</label>
                <input
                  type="text"
                  value={editDealContentsStr}
                  onChange={e => setEditDealContentsStr(e.target.value)}
                  placeholder="e.g. 1 Medium Pizza, 2 Zinger Burgers, 1.5L Pepsi"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={editDealImage}
                  onChange={e => setEditDealImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editDealIsPopular}
                    onChange={e => setEditDealIsPopular(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">Popular Deal Badge</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingDeal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-6 py-2 rounded-xl text-xs uppercase shadow"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCMS;
