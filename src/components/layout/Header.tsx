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
    <header className="sticky top-0 z-50 py-1.5 px-2.5 sm:py-3 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`rounded-full px-3 py-2 sm:px-5 sm:py-3 transition-all duration-300 flex items-center justify-between border ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-2xl border-amber-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)]' 
            : 'bg-white/90 backdrop-blur-xl border-amber-300/40 shadow-md'
        }`}>
          
          {/* Brand Favicon Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-[2px] shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/logo.png"
                alt="Cheese Bites Logo"
                className="w-full h-full object-cover rounded-full bg-white"
                decoding="async"
              />
            </div>
            <span className="text-sm sm:text-lg md:text-2xl font-black tracking-tight text-gray-900 uppercase font-sans whitespace-nowrap">
              CHEESE <span className="text-amber-500 font-extrabold">BITES</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-500 relative py-1 ${
                  isActive(link.path) ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-amber-400/40 bg-amber-50 text-[11px] sm:text-xs font-black text-amber-700 hover:bg-amber-100 transition-all active:scale-95 cursor-pointer"
              title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
            >
              {isUrdu ? 'ENG' : 'اردو'}
            </button>

            {/* Search Input (Desktop) */}
            <div className="hidden lg:flex items-center bg-[#f7f3e8] border border-amber-300 rounded-full px-3.5 py-1.5 shadow-xs">
              <Search className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0" />
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  className="bg-transparent text-xs text-gray-800 placeholder-gray-500 focus:outline-none w-44"
                />
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-1.5 rounded-full hover:scale-105 transition-transform cursor-pointer" aria-label="Search">
                  <ArrowRight className="w-3 h-3 font-bold" />
                </button>
              </form>
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 sm:p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-gray-800 rounded-full transition-all active:scale-95 shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Glowing Orange Pill CTA (Tablet/Desktop) */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-white px-5 sm:px-6 py-2.5 rounded-full font-black text-xs tracking-wider uppercase shadow-[0_4px_15px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300 active:scale-95 group"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('nav.orderOnline')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 sm:p-2.5 bg-amber-50 text-gray-800 rounded-full border border-amber-300 active:scale-95 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-amber-600" /> : <Menu className="w-4.5 h-4.5 text-amber-600" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with overlay */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          />
          <div className="fixed top-14 left-2.5 right-2.5 z-50 md:hidden max-h-[85vh] overflow-y-auto bg-white/98 backdrop-blur-2xl border border-amber-300 rounded-3xl p-4 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full bg-[#f8f5ed] border border-amber-300 text-xs text-gray-900 placeholder-gray-500 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
              />
              <Search className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex flex-col gap-1.5">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    isActive(link.path)
                      ? 'bg-amber-500 text-white font-black shadow-md shadow-amber-500/30'
                      : 'text-gray-800 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-amber-100">
              <Link
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('nav.orderOnlineNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
