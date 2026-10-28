import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#07070b] min-h-screen"
      dir={dir}
    >
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#0c0d14] via-[#151624] to-[#0c0d14] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-amber-500/30 text-center max-w-4xl mx-auto space-y-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase px-4 py-2 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Sparkles className="w-4 h-4" />
            <span>{t('about.storyBadge')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-sans text-white">
            {t('about.fresh')} <span className="text-gold-gradient">{t('about.delicious')}</span>
          </h1>
          <p className="text-amber-100/90 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            {t('about.heroDesc')}
          </p>
        </div>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> {t('about.heritageLabel')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-sans">{t('about.passionTitle')}</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {t('about.para1')}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {t('about.para2')}
          </p>
          <div className="pt-2 flex items-center space-x-6">
            <div className="bg-[#0c0d14] p-4 rounded-2xl border border-amber-500/25">
              <span className="text-3xl font-black text-amber-400 block font-mono">20+</span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{t('about.valueCombos')}</span>
            </div>
            <div className="bg-[#0c0d14] p-4 rounded-2xl border border-amber-500/25">
              <span className="text-3xl font-black text-amber-400 block font-mono">100%</span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{t('about.realMozzarella')}</span>
            </div>
            <div className="bg-[#0c0d14] p-4 rounded-2xl border border-amber-500/25">
              <span className="text-3xl font-black text-amber-400 block font-mono">17 Hrs</span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{t('about.dailyDelivery')}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/crown-crust-pull.jpg"
            alt="Cheese Bites Kitchen & Pizza"
            className="w-full h-96 object-cover rounded-3xl shadow-2xl border-2 border-amber-500/40 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-gray-950 rounded-3xl p-8 sm:p-12 shadow-[0_0_35px_rgba(245,158,11,0.5)] text-center space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black uppercase font-sans">{t('about.readyTitle')}</h2>
        <p className="text-sm font-extrabold text-gray-950 max-w-xl mx-auto leading-relaxed">
          {t('about.readyDesc')}
        </p>
        <Link
          to="/menu"
          className="inline-block bg-gray-950 hover:bg-gray-900 text-amber-400 font-black px-9 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          {t('about.orderOnlineNow')}
        </Link>
      </div>
    </motion.div>
  );
};
