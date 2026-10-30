import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '../context/MenuContext';
import { DealCard } from '../components/common/DealCard';
import { RestaurantInfoBanner } from '../components/common/RestaurantInfoBanner';
import type { DealCategory } from '../types';
import { Sparkles, Users, User, Flame, Crown, Pizza, FileText, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DealsPage: React.FC = () => {
  const { deals } = useMenu();
  const { t, dir } = useLanguage();
  const [viewFlyer, setViewFlyer] = useState<boolean>(false);

  const sections: { title: DealCategory; subtitle: string; icon: React.ReactNode; badgeColor: string }[] = [
    {
      title: 'Solo Era',
      subtitle: t('deals.soloEraDesc'),
      icon: <User className="w-5 h-5 text-amber-400" />,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    },
    {
      title: 'Hits Different',
      subtitle: t('deals.hitsDifferentDesc'),
      icon: <Flame className="w-5 h-5 text-red-400" />,
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
    },
    {
      title: 'Squad Goals',
      subtitle: t('deals.squadGoalsDesc'),
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    },
    {
      title: 'The Big Flex',
      subtitle: t('deals.theBigFlexDesc'),
      icon: <Crown className="w-5 h-5 text-purple-400" />,
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    },
    {
      title: 'Duo Pizza Deals',
      subtitle: t('deals.duoPizzaDesc'),
      icon: <Pizza className="w-5 h-5 text-orange-400" />,
      badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      dir={dir}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#07070b] min-h-screen"
    >
      {/* Page Hero Header */}
      <div className="relative bg-gradient-to-br from-[#0c0d14] via-[#151624] to-[#0c0d14] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-amber-500/30 text-center max-w-4xl mx-auto space-y-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase px-4 py-2 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Sparkles className="w-4 h-4" />
            <span>{t('deals.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-sans text-white">
            {t('deals.title')} <span className="text-gold-gradient">{t('deals.titleHighlight')}</span>
          </h1>
          <p className="text-amber-100/90 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            {t('deals.description')}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setViewFlyer(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Official Printed Deals Flyer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tier Pill Navigation */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {sections.map((section) => (
          <a
            key={section.title}
            href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-5 py-2.5 rounded-2xl bg-[#0c0d14] border border-amber-500/25 hover:border-amber-400/60 text-amber-300 hover:text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 shadow-md"
          >
            {section.icon}
            <span>{section.title}</span>
          </a>
        ))}
      </div>

      {/* Sections rendering */}
      {sections.map((section) => {
        const sectionDeals = deals.filter((d) => d.category === section.title);
        const sectionId = section.title.toLowerCase().replace(/\s+/g, '-');
        return (
          <div key={section.title} id={sectionId} className="space-y-6 pt-4 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
              <div>
                <div className={`inline-flex items-center gap-2 border px-3.5 py-1 rounded-full text-xs font-black uppercase mb-1.5 ${section.badgeColor}`}>
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
                  {section.title} {t('deals.dealsLabel')}
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-medium max-w-sm">
                {section.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sectionDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Official Restaurant Information Banner */}
      <RestaurantInfoBanner />

      {/* Lightbox Modal for Original Printed Deals Card */}
      {viewFlyer && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setViewFlyer(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#0c0d14] rounded-3xl border-2 border-amber-500/40 p-4 sm:p-6 overflow-hidden flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.3)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide font-sans">
                  Official Cheese Bites Deals Card
                </h3>
              </div>
              <button
                onClick={() => setViewFlyer(false)}
                className="text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 p-2 rounded-full cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto mt-3 rounded-2xl bg-[#07070b] p-2 flex items-center justify-center border border-gray-800/80">
              <img
                src="/images/real/deals-original-flyer.jpg"
                alt="Cheese Bites Official Deals Flyer"
                className="w-full h-auto object-contain max-h-[72vh] rounded-xl shadow-2xl"
              />
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400 font-medium shrink-0">
              📍 17 Meel Stop Japan Dam Road ISB | Delivery: 11:00 AM - 4:00 AM | Order: 0337-1500150
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};
