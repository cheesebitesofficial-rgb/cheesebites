import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { t, toggleLang, isUrdu } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.menu'), path: '/menu' },
    { name: t('nav.deals'), path: '/deals' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between border ${
          scrolled 
            ? 'bg-[#07070b]/90 backdrop-blur-2xl border-amber-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.9)]' 
            : 'bg-[#0a0a0f]/80 backdrop-blur-xl border-amber-500/25 shadow-2xl'
        }`}>
          
          {/* Brand Favicon Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/logo.png"
                alt="Cheese Bites Logo"
                className="w-full h-full object-cover rounded-full bg-[#07070b]"
              />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
              CHEESE <span className="text-amber-400 font-extrabold">BITES</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-400 relative py-1 ${
                  isActive(link.path) ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border border-amber-500/30 bg-gray-900/90 text-xs font-black text-amber-400 hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
              title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
            >
              {t('lang.switch')}
            </button>

            {/* Search Input */}
            <div className="hidden lg:flex items-center bg-[#14151f] border border-orange-500/40 rounded-full px-3.5 py-1.5 shadow-md">
              <span className="text-orange-400 text-xs mr-2">📍</span>
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  className="bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none w-44"
                />
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 p-1.5 rounded-full hover:scale-105 transition-transform cursor-pointer">
                  <Search className="w-3.5 h-3.5 font-bold" />
                </button>
              </form>
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 bg-gray-900/90 hover:bg-gray-800 border border-amber-500/30 text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-950 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Glowing Orange Pill CTA */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 px-6 py-2.5 rounded-full font-black text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] hover:scale-105 transition-all duration-300 active:scale-95 group"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('nav.orderOnline')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-gray-900 text-slate-300 rounded-full border border-amber-500/30"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-[#07070b]/95 backdrop-blur-2xl border border-amber-500/40 rounded-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'مینو میں تلاش کریں...' : 'Search menu, pizza, zingers...'}
              className="w-full bg-gray-900 border border-amber-500/30 text-xs text-white placeholder-gray-400 rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  isActive(link.path)
                    ? 'bg-amber-500 text-gray-950 font-black shadow-lg shadow-amber-500/30'
                    : 'text-slate-300 hover:bg-gray-900 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-amber-400 bg-gray-900 border border-amber-500/30 text-center"
            >
              🌐 {t('lang.switch')}
            </button>
          </div>

          <div className="pt-2 border-t border-gray-900">
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('nav.orderOnlineNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
