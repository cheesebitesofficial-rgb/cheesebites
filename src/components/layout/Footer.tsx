import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/menuData';
import { useLanguage } from '../../context/LanguageContext';

// Social media links — update these with your actual URLs
const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/cheesebites.pk',
  facebook: 'https://facebook.com/cheesebites.pk',
  tiktok: 'https://tiktok.com/@cheesebites.pk',
  youtube: 'https://youtube.com/@cheesebites',
  whatsapp: 'https://wa.me/923371500150',
};

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

export const Footer: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 pt-16 pb-12" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-900">
          
          {/* Brand & Slogan */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Cheese Bites Logo"
                className="w-12 h-12 object-contain rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-500/20"
              />
              <span className="text-2xl font-black text-white uppercase tracking-tight font-sans">
                Cheese <span className="text-amber-400">Bites</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="pt-2">
              <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/20">
                {t('footer.thanks')}
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="pt-3">
              <h5 className="text-xs font-black uppercase text-gray-500 mb-3">{t('footer.followUs')}</h5>
              <div className="flex items-center gap-3">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Instagram">
                  <InstagramIcon />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Facebook">
                  <FacebookIcon />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="TikTok">
                  <TikTokIcon />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="YouTube">
                  <YouTubeIcon />
                </a>

              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-extrabold text-base tracking-wide uppercase mb-4 border-l-4 border-amber-500 pl-3">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">{t('footer.homePage')}</Link></li>
              <li><Link to="/menu" className="hover:text-amber-400 transition-colors">{t('footer.fullMenu')}</Link></li>
              <li><Link to="/deals" className="hover:text-amber-400 transition-colors">{t('footer.combos')}</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">{t('footer.contactDelivery')}</Link></li>
              <li><Link to="/cart" className="hover:text-amber-400 transition-colors">{t('footer.viewCart')}</Link></li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h4 className="text-white font-extrabold text-base tracking-wide uppercase mb-4 border-l-4 border-amber-500 pl-3">
              {t('footer.specialties')}
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/menu?category=Pizza" className="hover:text-amber-400 transition-colors">Special Stuffed Crust Pizza</Link></li>
              <li><Link to="/menu?category=Burgers" className="hover:text-amber-400 transition-colors">Crispy Double Zinger Burger</Link></li>
              <li><Link to="/deals" className="hover:text-amber-400 transition-colors">Solo Era & Squad Goals Deals</Link></li>
              <li><Link to="/menu?category=Pasta" className="hover:text-amber-400 transition-colors">Creamy Alfredo & Baked Pasta</Link></li>
              <li><Link to="/menu?category=Roll%20Paratha" className="hover:text-amber-400 transition-colors">Hot Zinger & Kabab Roll</Link></li>
              <li><Link to="/menu?category=Fries" className="hover:text-amber-400 transition-colors">Loaded Cheese Fries</Link></li>
            </ul>
          </div>

          {/* Restaurant Info */}
          <div>
            <h4 className="text-white font-extrabold text-base tracking-wide uppercase mb-4 border-l-4 border-amber-500 pl-3">
              {t('footer.orderHotline')}
            </h4>
            <div className="space-y-3.5 text-sm">
              <a 
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-start gap-3 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-white hover:border-amber-500 transition-colors group"
              >
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block text-xs text-amber-400 font-bold uppercase">{t('footer.callToOrder')}</span>
                  <span className="text-lg font-black tracking-wider text-amber-300">{RESTAURANT_INFO.phone}</span>
                </div>
              </a>


              <div className="flex items-start gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-400 font-bold uppercase">{t('footer.deliveryHours')}</span>
                  <span className="font-bold text-white">{RESTAURANT_INFO.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-400 font-bold uppercase">{t('footer.storeLocation')}</span>
                  <span className="font-bold text-white leading-tight block">{RESTAURANT_INFO.address}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1 text-gray-400">
              {t('footer.madeWith')} <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> {t('footer.forLovers')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
