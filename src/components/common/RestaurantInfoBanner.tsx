import React from 'react';
import { Clock, Phone, MapPin, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/menuData';

export const RestaurantInfoBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-[#FF6B00]/15 to-amber-500/10 border-y border-amber-500/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Delivery Timing */}
          <div className="flex items-center gap-4 bg-gray-950/80 border border-amber-500/20 p-4 rounded-2xl shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-400 flex items-center justify-center text-gray-950 shrink-0 shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <Clock className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Delivery Timing</span>
              <p className="text-base font-black text-white">{RESTAURANT_INFO.deliveryTiming}</p>
            </div>
          </div>

          {/* 2. Order Number */}
          <a 
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex items-center gap-4 bg-gray-950/80 border border-amber-500/20 p-4 rounded-2xl shadow-lg hover:border-amber-400/50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-gray-950 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Order Hotline</span>
              <p className="text-base font-black text-white group-hover:text-amber-400 transition-colors">{RESTAURANT_INFO.phone}</p>
            </div>
          </a>

          {/* 3. Address */}
          <div className="flex items-center gap-4 bg-gray-950/80 border border-amber-500/20 p-4 rounded-2xl shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-red-400 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <MapPin className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Location</span>
              <p className="text-sm font-bold text-white leading-tight">{RESTAURANT_INFO.address}</p>
            </div>
          </div>

        </div>

        {/* Closing Message */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-black tracking-wider uppercase shadow-inner">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>{RESTAURANT_INFO.closingMessage}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

