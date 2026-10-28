import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, RefreshCw, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/common/ProductCard';
import { DealCard } from '../components/common/DealCard';
import { ProductDetailsModal } from '../components/common/ProductDetailsModal';
import type { MenuItem } from '../types';

export const MenuPage: React.FC = () => {
  const { menuItems, deals } = useMenu();
  const { t, dir } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Sync state with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const categories = [
    'All',
    'Pizza',
    'Burgers',
    'Sandwiches',
    'Roll Paratha',
    'Pasta',
    'Fried Chicken',
    'Fries',
    'Deals',
  ];

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim() === '') {
      newParams.delete('search');
    } else {
      newParams.set('search', val.trim());
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  // Filter items
  const filteredProducts = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Deals' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredDeals = deals.filter(deal => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Deals';
    const matchesSearch = searchQuery === '' ||
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contents.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalResults = (activeCategory === 'Deals' ? 0 : filteredProducts.length) + 
                       (activeCategory === 'Pizza' || activeCategory === 'Burgers' || activeCategory === 'Sandwiches' || activeCategory === 'Roll Paratha' || activeCategory === 'Pasta' || activeCategory === 'Fried Chicken' || activeCategory === 'Fries' ? 0 : filteredDeals.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-[#07070b] min-h-screen"
      dir={dir}
    >
      
      {/* Page Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0c0d14] via-[#151624] to-[#0c0d14] text-white p-8 sm:p-14 shadow-2xl border border-amber-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5" /> {t('menu.onlineSelection')}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-sans text-white">
            {t('menu.ourComplete')} <span className="text-gold-gradient">{t('menu.menuTitle')}</span>
          </h1>
          <p className="text-amber-100/90 text-sm sm:text-base font-medium leading-relaxed">
            {t('menu.description')}
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Category Tabs */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder={t('menu.searchPlaceholder')}
            className="w-full bg-[#0c0d14]/90 border border-amber-500/25 text-white text-sm rounded-2xl pl-11 pr-10 py-4 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 shadow-lg transition-all"
          />
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white font-bold text-xs bg-gray-800 p-1.5 rounded-full cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-gray-950 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105'
                    : 'bg-[#0c0d14] text-slate-300 hover:bg-gray-800 hover:text-white border border-amber-500/20'
                }`}
              >
                {cat === 'All' ? t('menu.all') : cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Active Filter Info */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 text-xs font-black uppercase tracking-wider text-slate-400">
        <span>{t('menu.showing')} {totalResults} {t('menu.menuOptions')}</span>
        {(activeCategory !== 'All' || searchQuery !== '') && (
          <button
            onClick={clearFilters}
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-gray-900 px-3.5 py-1.5 rounded-xl border border-amber-500/30 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> {t('menu.clearFilters')}
          </button>
        )}
      </div>

      {/* Zero Results Empty State */}
      {totalResults === 0 && (
        <div className="bg-[#0c0d14] rounded-3xl p-12 text-center border border-amber-500/20 max-w-md mx-auto my-12 space-y-4">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
            <UtensilsCrossed className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-xl font-black text-white uppercase">{t('menu.noItems')}</h3>
          <p className="text-xs text-gray-400 font-medium">
            {t('menu.noItemsDesc')} "{searchQuery}". {t('menu.trySearching')}
          </p>
          <button
            onClick={clearFilters}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase shadow-md cursor-pointer"
          >
            {t('menu.resetSearch')}
          </button>
        </div>
      )}

      {/* Product Items Grid */}
      {activeCategory !== 'Deals' && filteredProducts.length > 0 && (
        <div className="space-y-4">
          {activeCategory === 'All' && (
            <h2 className="text-2xl font-black text-white uppercase tracking-tight font-sans">{t('menu.individualDishes')}</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={prod => setSelectedProduct(prod)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Deals Section Grid */}
      {(activeCategory === 'All' || activeCategory === 'Deals') && filteredDeals.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight font-sans">{t('menu.specialComboDeals')}</h2>
            <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              {t('menu.dealsRange')}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      )}

      {/* Customization Quick View Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </motion.div>
  );
};

export default MenuPage;
