import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Star, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <div className="bg-[#07070b] min-h-screen" dir={dir}>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0e09] via-[#1a1507] to-[#0f0e09] border-b border-amber-500/20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
                About Cheese Bites
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]"
            >
              Good Food.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Great Taste.
              </span>
              <br />
              Unforgettable Cravings.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Made with passion. Served with love. Every bite a memory.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — Two-column
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Our Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
              We Craft Every Meal{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                With Heart
              </span>
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                At Cheese Bites, we believe every meal should be a delicious experience. From cheesy favourites to crispy bites and flavour-packed meals, we bring together great taste, freshness and quality in every order.
              </p>
              <p>
                Whether you're sharing a meal with friends, enjoying family time, or satisfying your cravings, Cheese Bites is here to make every bite worth it.
              </p>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 rounded-2xl px-5 py-3">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span className="text-amber-300 font-black text-sm uppercase tracking-wide">
                Made for Your Cravings.
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { value: '20+',    label: 'Value Combos' },
                { value: '100%',   label: 'Real Mozzarella' },
                { value: '17 Hrs', label: 'Daily Service' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#0d0d12] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-3 sm:p-4 text-center transition-colors duration-300"
                >
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 block font-mono">{value}</span>
                  <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider leading-tight">{label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-950 font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-wider shadow-[0_8px_30px_rgba(245,158,11,0.4)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Explore Our Menu
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* RIGHT: Food Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-orange-500/5 rounded-3xl blur-2xl pointer-events-none" />

            {/* Top: Big cheeseburger */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/5 mb-4">
              <img
                src="/images/about/about-cheeseburger.jpg"
                alt="Juicy Cheeseburger"
                className="w-full h-64 sm:h-72 object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4">
                <span className="text-white font-black text-xs uppercase tracking-widest opacity-90">Signature Cheeseburger</span>
              </div>
            </div>

            {/* Bottom row: fries + wings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-white/5">
                <img
                  src="/images/about/about-cheesy-fries.jpg"
                  alt="Loaded Cheesy Fries"
                  className="w-full h-40 sm:h-48 object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3">
                  <span className="text-white font-black text-[10px] uppercase tracking-wider opacity-90">Cheesy Fries</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-white/5">
                <img
                  src="/images/about/about-chicken-wings.jpg"
                  alt="Crispy Chicken Wings"
                  className="w-full h-40 sm:h-48 object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3">
                  <span className="text-white font-black text-[10px] uppercase tracking-wider opacity-90">Crispy Wings</span>
                </div>
              </div>
            </div>

            {/* Decorative glows */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-orange-600/15 rounded-full blur-xl pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US — Feature cards
      ═══════════════════════════════════════════ */}
      <div className="border-t border-white/5 bg-[#09090f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { emoji: '🍕', title: 'Fresh Every Day',     desc: 'Dough, toppings and sauces prepared fresh daily.' },
              { emoji: '🧀', title: 'Real Cheese',         desc: '100% real mozzarella on every pizza and burger.' },
              { emoji: '⚡', title: 'Fast Delivery',       desc: 'Hot food delivered straight to your doorstep.' },
              { emoji: '❤️', title: 'Made with Passion',  desc: 'Every recipe crafted to satisfy your cravings.' },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-[#0d0d14] border border-amber-500/15 hover:border-amber-500/35 rounded-2xl p-6 space-y-3 group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] hover:-translate-y-1"
              >
                <span className="text-3xl">{emoji}</span>
                <h3 className="font-black text-white uppercase text-sm tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PIZZA SPOTLIGHT — Full-width banner
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
        >
          <img
            src="/images/about/about-pizza.jpg"
            alt="Cheese Bites Signature Pizza"
            className="w-full h-56 sm:h-80 object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center">
            <div className="px-8 sm:px-14 space-y-3 max-w-xl">
              <span className="text-xs text-amber-400 font-black uppercase tracking-widest">Our Signature</span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
                Flavour-Packed Pizzas
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  You'll Crave Again
                </span>
              </h3>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(245,158,11,0.5)]"
              >
                View Full Menu <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};
