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
  EyeOff
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import type { MenuItem, Category, DealItem, DealCategory, SizeOption } from '../../types';

// Preset high quality Cheese Bites assets for instant selection
const PRESET_IMAGES = [
  { label: 'Crown Crust Pizza', url: '/images/real/crown-crust-pizza.jpg' },
  { label: 'Behari Kabab Pizza', url: '/images/menu/behari-kabab-pizza.jpg' },
  { label: 'Malai Boti Pizza', url: '/images/menu/chicken-tikka-pizza.jpg' },
  { label: 'Pepperoni Pizza', url: '/images/menu/pepperoni-passion-pizza.jpg' },
  { label: 'Fajita Sicilian', url: '/images/menu/chicken-fajita-pizza.jpg' },
  { label: 'Cheese Lover Pizza', url: '/images/menu/cheese-lovers-pizza.jpg' },
  { label: 'Zinger Burger', url: '/images/menu/zinger-burger.jpg' },
  { label: 'Tower Burger', url: '/images/menu/tower-burger.jpg' },
  { label: 'Deal 15 (Pizza + 2 Zingers)', url: '/images/real/deal-15.jpg' },
  { label: 'Deal 12 (Solo Pizza)', url: '/images/real/deal-12.jpg' },
  { label: 'Deal 1 (Pizza + Drink)', url: '/images/real/deal-1.jpg' },
  { label: 'Alfredo Pasta', url: '/images/menu/creamy-alfredo-pasta.jpg' },
  { label: 'Crispy Fries', url: '/images/menu/loaded-cheese-fries.jpg' },
  { label: 'Fried Chicken', url: '/images/menu/crispy-fried-chicken.jpg' },
];

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
    announcement,
    storeInfo,
    updateAnnouncement,
    updateStoreInfo,
    resetSiteSettings,
  } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<'dishes' | 'deals' | 'site' | 'backup'>('dishes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copyStatus, setCopyStatus] = useState(false);
  const [saveBannerStatus, setSaveBannerStatus] = useState(false);

  // Announcement Form State
  const [bannerEnabled, setBannerEnabled] = useState(announcement.enabled);
  const [bannerBadge, setBannerBadge] = useState(announcement.badge);
  const [bannerText, setBannerText] = useState(announcement.text);
  const [bannerLinkText, setBannerLinkText] = useState(announcement.linkText || '');
  const [bannerLinkUrl, setBannerLinkUrl] = useState(announcement.linkUrl || '');

  // Store Info Form State
  const [storeOpen, setStoreOpen] = useState(storeInfo.isOpen);
  const [storePhone, setStorePhone] = useState(storeInfo.phone);
  const [storeWhatsapp, setStoreWhatsapp] = useState(storeInfo.whatsapp);
  const [storeHours, setStoreHours] = useState(storeInfo.hours);
  const [storeAddress, setStoreAddress] = useState(storeInfo.address);
  const [storeDeliveryFee, setStoreDeliveryFee] = useState(storeInfo.deliveryFee);
  const [storeFreeThreshold, setStoreFreeThreshold] = useState(storeInfo.freeDeliveryThreshold);
  const [storeMinOrder, setStoreMinOrder] = useState(storeInfo.minOrder);

  // Edit Product Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<Category>('Pizza');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editIsPopular, setEditIsPopular] = useState(false);
  const [editIsSpecial, setEditIsSpecial] = useState(false);
  const [editSizes, setEditSizes] = useState<SizeOption[]>([]);

  // Add Product Modal State
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

  // Edit Deal Modal State
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);
  const [editDealNumber, setEditDealNumber] = useState<number>(1);
  const [editDealName, setEditDealName] = useState('');
  const [editDealPrice, setEditDealPrice] = useState<number>(0);
  const [editDealCategory, setEditDealCategory] = useState<DealCategory>('Solo Era');
  const [editDealContentsStr, setEditDealContentsStr] = useState('');
  const [editDealImage, setEditDealImage] = useState('');
  const [editDealIsPopular, setEditDealIsPopular] = useState(false);

  // Add Deal Modal State
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [newDealNumber, setNewDealNumber] = useState<number>(deals.length + 1);
  const [newDealName, setNewDealName] = useState('');
  const [newDealPrice, setNewDealPrice] = useState<number>(1200);
  const [newDealCategory, setNewDealCategory] = useState<DealCategory>('Solo Era');
  const [newDealContentsStr, setNewDealContentsStr] = useState('');
  const [newDealImage, setNewDealImage] = useState('/images/real/deal-15.jpg');
  const [newDealIsPopular, setNewDealIsPopular] = useState(false);

  // JSON Import State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonMessage, setJsonMessage] = useState('');

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

  // Handlers for Product Edit
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

  const handleSaveEdit = (e: React.FormEvent) => {
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
  };

  // Handlers for Deal Edit
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
      const contentsArray = editDealContentsStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

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
    }
  };

  const handleAddDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealName.trim()) return;

    const contentsArray = newDealContentsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

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
  };

  // Save Site & Banner Settings
  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      enabled: bannerEnabled,
      badge: bannerBadge.trim(),
      text: bannerText.trim(),
      linkText: bannerLinkText.trim(),
      linkUrl: bannerLinkUrl.trim(),
    });

    updateStoreInfo({
      isOpen: storeOpen,
      phone: storePhone.trim(),
      whatsapp: storeWhatsapp.trim(),
      hours: storeHours.trim(),
      address: storeAddress.trim(),
      deliveryFee: Number(storeDeliveryFee),
      freeDeliveryThreshold: Number(storeFreeThreshold),
      minOrder: Number(storeMinOrder),
    });

    setSaveBannerStatus(true);
    setTimeout(() => setSaveBannerStatus(false), 2500);
  };

  // JSON Export / Backup
  const handleExportJSON = () => {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      menuItems,
      deals,
      announcement,
      storeInfo,
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cheesebites_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    const fullBackup = {
      menuItems,
      deals,
    };
    navigator.clipboard.writeText(JSON.stringify(fullBackup, null, 2));
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.menuItems || parsed.deals) {
        setFullMenu(parsed.menuItems || [], parsed.deals || []);
        setJsonMessage('Success! Menu items & deals imported successfully.');
        setJsonInput('');
      } else if (Array.isArray(parsed)) {
        setFullMenu(parsed, deals);
        setJsonMessage('Success! Imported products catalog successfully.');
        setJsonInput('');
      } else {
        setJsonMessage('Error: JSON does not contain valid menuItems or deals structure.');
      }
    } catch (err: any) {
      setJsonMessage(`Invalid JSON format: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Top Banner / CMS Header */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Layers className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-black tracking-widest text-amber-400">Website Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-2">
            Cheese Bites Content CMS
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
            Live menu catalog, deals, banner notices, operating hours and price controls.
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
            <span>Open Live Site</span>
          </a>

          <button
            onClick={handleExportJSON}
            className="bg-gray-800 hover:bg-gray-700 text-amber-300 font-extrabold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-amber-500/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Backup JSON</span>
          </button>

          {activeTab === 'dishes' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish</span>
            </button>
          )}

          {activeTab === 'deals' && (
            <button
              onClick={() => setIsAddDealModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Deal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 bg-white p-2 rounded-2xl shadow-sm gap-2">
        <button
          onClick={() => setActiveTab('dishes')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
            activeTab === 'dishes'
              ? 'bg-amber-500 text-gray-950 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Dishes & Pizzas ({menuItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
            activeTab === 'deals'
              ? 'bg-amber-500 text-gray-950 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Deals & Combos ({deals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('site')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
            activeTab === 'site'
              ? 'bg-amber-500 text-gray-950 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Announcements & Store Info</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
            activeTab === 'backup'
              ? 'bg-amber-500 text-gray-950 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>Data Sync & JSON</span>
        </button>
      </div>

      {/* ======================= TAB 1: DISHES & MENU ======================= */}
      {activeTab === 'dishes' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
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

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              {['All', 'Pizza', 'Burgers', 'Sandwiches', 'Roll Paratha', 'Pasta', 'Fried Chicken', 'Fries'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gray-950 text-amber-400'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
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
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover ${!isAvailable ? 'grayscale opacity-60' : ''}`}
                    />
                    
                    {/* Category pill */}
                    <span className="absolute top-2 left-2 bg-gray-950/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {item.category}
                    </span>

                    {/* Stock status overlay */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Badges */}
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

                  {/* Info */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-black text-gray-900 text-sm leading-snug line-clamp-1">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{item.description || 'Authentic Cheese Bites recipe.'}</p>
                    
                    {/* Sizes / Price breakdown */}
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

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => toggleItemAvailability(item.id)}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      }`}
                      title={isAvailable ? 'Click to mark as Out of Stock' : 'Click to mark as In Stock'}
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

      {/* ======================= TAB 2: DEALS ======================= */}
      {activeTab === 'deals' && (
        <div className="space-y-6">
          {/* Search */}
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
          </div>

          {/* Deals Grid */}
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

      {/* ======================= TAB 3: ANNOUNCEMENTS & STORE INFO ======================= */}
      {activeTab === 'site' && (
        <form onSubmit={handleSaveSiteSettings} className="space-y-6">
          
          {/* Section 1: Live Announcement Marquee Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-500" />
                  <span>Top Website Announcement Banner</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Displays a prominent notice at the very top of all public website pages.
                </p>
              </div>

              {/* Banner Toggle Switch */}
              <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto">
                <span className="text-xs font-black uppercase text-gray-700">
                  {bannerEnabled ? 'Banner Active' : 'Banner Hidden'}
                </span>
                <input
                  type="checkbox"
                  checked={bannerEnabled}
                  onChange={e => setBannerEnabled(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Live Banner Preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-gray-400 block tracking-wider">Live Preview:</span>
              <div className="bg-amber-500 text-gray-950 py-2.5 px-4 rounded-2xl flex items-center justify-between text-xs font-black shadow-md">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="bg-gray-950 text-amber-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase shrink-0">
                    {bannerBadge || 'NOTICE'}
                  </span>
                  <span className="truncate">{bannerText || 'Enter announcement message...'}</span>
                </div>
                {bannerLinkText && (
                  <span className="underline ml-3 shrink-0 text-gray-950">{bannerLinkText} &rarr;</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Badge Label</label>
                <input
                  type="text"
                  value={bannerBadge}
                  onChange={e => setBannerBadge(e.target.value)}
                  placeholder="e.g. SPECIAL OFFER, HOT DEAL, NOTICE"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Announcement Text</label>
                <input
                  type="text"
                  value={bannerText}
                  onChange={e => setBannerText(e.target.value)}
                  placeholder="e.g. Free Delivery on all Orders above Rs. 2,000! Freshly baked, extra cheesy."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Optional Button Text</label>
                <input
                  type="text"
                  value={bannerLinkText}
                  onChange={e => setBannerLinkText(e.target.value)}
                  placeholder="e.g. Order Menu, View Deals"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700">Button Link Target</label>
                <input
                  type="text"
                  value={bannerLinkUrl}
                  onChange={e => setBannerLinkUrl(e.target.value)}
                  placeholder="e.g. /menu, /deals, or tel:0337-1500150"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Store Status & Operating Info */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-500" />
                  <span>Store Status & Delivery Controls</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Manage store availability, contact numbers, hours, and delivery charges.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> Call to Order Phone
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
                  <Phone className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Number / Link
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

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Branch Address
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
                <label className="text-xs font-black uppercase text-gray-700">Free Delivery Threshold (Rs.)</label>
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
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-8 py-3 rounded-2xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Changes Live</span>
            </button>

            {saveBannerStatus && (
              <span className="text-emerald-600 font-extrabold text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Changes saved and published to website!
              </span>
            )}
          </div>
        </form>
      )}

      {/* ======================= TAB 4: BACKUP & DATA SYNC ======================= */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                <Save className="w-5 h-5 text-amber-500" />
                <span>Catalog Backup & Import</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Export current products and deals to JSON or paste updated data to restore instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="bg-gray-900 hover:bg-gray-800 text-white font-black px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Backup File</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJSON}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-gray-200"
              >
                {copyStatus ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copyStatus ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all menu items, deals, and settings back to original defaults?')) {
                    resetToDefaultMenu();
                    resetSiteSettings();
                    alert('Catalog reset to defaults!');
                  }
                }}
                className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-2 border border-red-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Factory Defaults</span>
              </button>
            </div>

            {/* Paste JSON Import */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-black uppercase text-gray-700 block">
                Paste JSON to Import:
              </label>
              <textarea
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder='Paste JSON containing {"menuItems": [...], "deals": [...]} here...'
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
                  <span>Import & Apply</span>
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

      {/* ======================= MODAL: EDIT PRODUCT ======================= */}
      {editingItem && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Edit Product</h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
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

              {/* Pizza Sizes if applicable */}
              {editCategory === 'Pizza' && (
                <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="text-xs font-black uppercase text-gray-700 block">
                    Pizza Size Prices:
                  </span>
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
                
                {/* Image presets */}
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

      {/* ======================= MODAL: ADD PRODUCT ======================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Add New Product</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl"
              >
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
                  <span className="text-xs font-black uppercase text-gray-700 block">
                    Pizza Size Pricing:
                  </span>
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

      {/* ======================= MODAL: EDIT DEAL ======================= */}
      {editingDeal && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Edit Deal #{editingDeal.dealNumber}</h2>
              <button
                onClick={() => setEditingDeal(null)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl"
              >
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

      {/* ======================= MODAL: ADD DEAL ======================= */}
      {isAddDealModalOpen && (
        <div className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900 uppercase">Add New Deal</h2>
              <button
                onClick={() => setIsAddDealModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-xl"
              >
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

    </div>
  );
};

export default AdminCMS;
