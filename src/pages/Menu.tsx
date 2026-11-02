import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, RefreshCw, UtensilsCrossed, FileText, Flame, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/common/ProductCard';
import { DealCard } from '../components/common/DealCard';
import { ProductDetailsModal } from '../components/common/ProductDetailsModal';
import { SpecialOffersSection } from '../components/common/SpecialOffersSection';
import type { MenuItem, DealItem } from '../types';

type DisplayItem = 
  | { type: 'product'; data: MenuItem }
  | { type: 'deal'; data: DealItem };

export const MenuPage: React.FC = () => {
  const { menuItems, deals } = useMenu();
  const { t, dir } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [viewFlyer, setViewFlyer] = useState<'menu' | 'deals' | null>(null);

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  
  // Reset to page 1 whenever category, search query or items per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, itemsPerPage]);

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

  // Filter products
  const filteredProducts = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Deals' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Deals';
    const matchesSearch = searchQuery === '' ||
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contents.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Build combined items list
  const combinedItems: DisplayItem[] = [
    ...(activeCategory === 'Deals' ? [] : filteredProducts.map(p => ({ type: 'product' as const, data: p }))),
    ...(activeCategory === 'Pizza' || activeCategory === 'Burgers' || activeCategory === 'Sandwiches' || activeCategory === 'Roll Paratha' || activeCategory === 'Pasta' || activeCategory === 'Fried Chicken' || activeCategory === 'Fries' ? [] : filteredDeals.map(d => ({ type: 'deal' as const, data: d }))),
  ];

  const totalResults = combinedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const currentItems = combinedItems.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
    const el = document.getElementById('menu-items-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-12 space-y-5 sm:space-y-10 bg-[#07070b] min-h-screen"
      dir={dir}
    >
      
      {/* Quick Access: Printed Cards */}
      <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
        <button
          onClick={() => setViewFlyer('menu')}
          className="inline-flex items-center gap-1.5 bg-[#0c0d14] hover:bg-gray-800 text-amber-400 border border-amber-500/30 text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all hover:scale-105 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Menu Card</span>
        </button>
        <button
          onClick={() => setViewFlyer('deals')}
          className="inline-flex items-center gap-1.5 bg-[#0c0d14] hover:bg-gray-800 text-amber-400 border border-amber-500/30 text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all hover:scale-105 cursor-pointer"
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>View Deals Card</span>
        </button>
      </div>

      {/* Special Promotional Pizza Offers */}
      <SpecialOffersSection />

      {/* Controls Bar: Search & Category Tabs */}
      <div className="space-y-4 sm:space-y-6">
        
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder={t('menu.searchPlaceholder')}
            className="w-full bg-[#0c0d14]/90 border border-amber-500/25 text-white text-sm rounded-2xl pl-11 pr-10 py-3.5 sm:py-4 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 shadow-lg transition-all"
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

        {/* Category Pill Tabs - Edge to edge on mobile */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(cat => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
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

      {/* Active Filter & Pagination Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4 text-xs font-black uppercase tracking-wider text-slate-400">
        <div className="flex items-center gap-4">
          <span>
            {totalResults > 0 
              ? `Showing ${startIndex + 1}–${endIndex} of ${totalResults} items`
              : `0 items found`
            }
          </span>
          {(activeCategory !== 'All' || searchQuery !== '') && (
            <button
              onClick={clearFilters}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-gray-900 px-3.5 py-1.5 rounded-xl border border-amber-500/30 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t('menu.clearFilters')}
            </button>
          )}
        </div>

        {/* Items Per Page Selector (8 or 12) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">Show per page:</span>
          {[8, 12].map(num => (
            <button
              key={num}
              onClick={() => setItemsPerPage(num)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                itemsPerPage === num
                  ? 'bg-amber-500 text-gray-950 shadow-md font-bold'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
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

      {/* Main Paginated Menu Items Grid */}
      {currentItems.length > 0 && (
        <div id="menu-items-grid" className="space-y-8 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map(item => {
              if (item.type === 'product') {
                return (
                  <ProductCard
                    key={item.data.id}
                    product={item.data}
                    onQuickView={prod => setSelectedProduct(prod)}
                  />
                );
              } else {
                return (
                  <DealCard
                    key={item.data.id}
                    deal={item.data}
                  />
                );
              }
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-8 border-t border-gray-800/80 w-full">
              {/* Previous Page Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-900 border border-amber-500/20 text-xs font-black uppercase text-amber-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-800 hover:border-amber-400 transition-all cursor-pointer shadow-md shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Page Number Buttons - Scrollable or wrap on mobile */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-full overflow-x-auto py-1 px-1 scrollbar-none">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-gray-950 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105'
                          : 'bg-gray-900/90 text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-900 border border-amber-500/20 text-xs font-black uppercase text-amber-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-800 hover:border-amber-400 transition-all cursor-pointer shadow-md shrink-0"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Customization Quick View Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Lightbox Modal for Original Printed Menu / Deals Card */}
      {viewFlyer && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setViewFlyer(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#0c0d14] rounded-3xl border-2 border-amber-500/40 p-4 sm:p-6 overflow-hidden flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.3)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide font-sans">
                  {viewFlyer === 'menu' ? 'Official Cheese Bites Menu Card' : 'Official Cheese Bites Deals Card'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewFlyer(viewFlyer === 'menu' ? 'deals' : 'menu')}
                  className="text-xs font-black uppercase bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/30 cursor-pointer transition-colors"
                >
                  Switch to {viewFlyer === 'menu' ? 'Deals' : 'Menu'}
                </button>
                <button
                  onClick={() => setViewFlyer(null)}
                  className="text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 p-2 rounded-full cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto mt-3 rounded-2xl bg-[#07070b] p-2 flex items-center justify-center border border-gray-800/80">
              <img
                src={viewFlyer === 'menu' ? '/images/real/menu-original-flyer.jpg' : '/images/real/deals-original-flyer.jpg'}
                alt="Cheese Bites Official Printed Flyer"
                className="w-full h-auto object-contain max-h-[72vh] rounded-xl shadow-2xl"
              />
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400 font-medium shrink-0">
              📍 17 Meel Stop Japan Dam Road ISB | Delivery: 11:00 AM - 4:00 AM | Call: 0337-1500150
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default MenuPage;
