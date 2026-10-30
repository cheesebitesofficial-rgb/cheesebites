import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-50 flex flex-col items-center gap-2">
      {/* 1. Scroll to Top Button - Positioned ABOVE WhatsApp, sleek & compact */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-75 pointer-events-none h-0 overflow-hidden m-0 p-0'
        }`}
      >
        {/* Glow effect on hover */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-75 blur-xs transition-opacity duration-300 pointer-events-none" />
        
        {/* Compact Themed Button Body */}
        <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 rounded-full flex items-center justify-center text-gray-950 shadow-[0_2px_12px_rgba(245,158,11,0.5)] group-hover:shadow-[0_4px_18px_rgba(245,158,11,0.8)] group-hover:scale-105 active:scale-90 transition-all duration-200 border border-amber-200/90">
          <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-950 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth={3} />
        </div>
      </button>

      {/* 2. Floating WhatsApp Button - Positioned UNDER (below) the arrow */}
      <a
        href="https://wa.me/923371500150"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group block"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping pointer-events-none" />
        <span className="absolute -inset-1 rounded-full bg-green-400/20 animate-pulse pointer-events-none" />
        
        {/* Main WhatsApp button */}
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.75)] hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer">
          <WhatsAppIcon />
        </div>

        {/* Online dot indicator */}
        <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 rounded-full border-2 border-gray-950 shadow-sm" />
      </a>
    </div>
  );
};
