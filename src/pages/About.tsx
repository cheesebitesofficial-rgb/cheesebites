import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/common/SEO';

export const AboutPage: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <div className="bg-[#07070b] text-gray-100 font-sans selection:bg-amber-400 selection:text-black overflow-hidden" dir={dir}>
      <SEO
        title="About Cheese Bites | Our Food Story"
        description="Learn the story of Cheese Bites in Islamabad: fresh dough daily, 100% real mozzarella cheese, and passionate culinary craftsmanship in every bite."
        canonicalPath="/about"
      />
      {/* ═══════════════════════════════════════════════════════════════
          PREMIUM ABOUT HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#090a10] via-[#07070b] to-[#0a0a0f]">
        {/* Subtle Warm Orange Glows in background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[550px] h-[550px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ═══════════════════════════════════════════
              LEFT COLUMN: Typography & Story
          ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-5 text-left space-y-6 sm:space-y-7"
          >
            {/* Outlined Orange Label */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/60 bg-amber-500/10 text-amber-400 font-black text-[11px] sm:text-xs tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                ABOUT CHEESE BITES
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-black uppercase tracking-tight leading-[1.08] text-white">
              Good Food.{' '}
              <span className="block sm:inline">Great Taste.</span>
              <span className="block mt-2 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                  Unforgettable Cravings.
                </span>
                {/* Subtle Orange Underline */}
                <span className="absolute -bottom-2 left-0 w-36 sm:w-48 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-transparent rounded-full shadow-[0_0_10px_#f59e0b]" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium pt-2 max-w-xl">
              At Cheese Bites, every bite brings together delicious flavors, quality ingredients and a love for great food.
            </p>
          </motion.div>

          {/* ═══════════════════════════════════════════
              RIGHT COLUMN: Main Visual Focus (Cheesy Pizza)
          ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end items-center relative"
          >
            {/* Ambient Pizza Warm Glow */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Pizza Image Frame */}
            <div className="relative w-full max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden border border-amber-500/25 bg-[#0c0d14]/90 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.15)] group hover:border-amber-400/50 transition-all duration-500">
              <img
                src="/images/about/about-pizza.jpg"
                alt="Cheese Bites Cheesy Pizza"
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out filter brightness-[1.02] contrast-[1.05]"
                loading="eager"
                decoding="async"
              />

              {/* Natural Vignette & Warm Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070b]/80 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />

              {/* Discreet Brand Stamp */}
              <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7">
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-amber-400 uppercase bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30">
                  Signature Cheesy Pizza
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;
