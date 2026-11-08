import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Star, ChevronRight } from 'lucide-react';
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
          SECTION 1: HERO SECTION (Clean Two-Column Design)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#090a10] via-[#07070b] to-[#0a0a0f]">
        {/* Subtle Warm Orange Glows in background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[550px] h-[550px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Typography & Story */}
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

          {/* RIGHT COLUMN: Main Visual Focus (Cheesy Pizza) */}
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
                width="640"
                height="480"
              />

              {/* Natural Vignette & Warm Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070b]/80 via-black/15 to-transparent pointer-events-none" />

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

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: OUR STORY & CRAFT (Two-column with 3 HD food photos)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 border-t border-amber-500/15 bg-gradient-to-b from-[#07070b] via-[#0b0c12] to-[#07070b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: Text & Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Our Story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-tight">
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

              {/* Stat badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { value: '20+',    label: 'Value Combos' },
                  { value: '100%',   label: 'Real Mozzarella' },
                  { value: '17 Hrs', label: 'Daily Service' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-[#0c0d14] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-3 sm:p-4 text-center transition-colors duration-300 shadow-md"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 block font-mono">{value}</span>
                    <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-950 font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-wider shadow-[0_8px_30px_rgba(245,158,11,0.4)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Explore Our Menu
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT: Authentic Food Showcase Grid (Cheeseburger, Cheesy Fries, Chicken Wings) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative space-y-4"
            >
              {/* Glow Accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-orange-500/5 rounded-3xl blur-2xl pointer-events-none" />

              {/* Large Signature Cheeseburger Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-amber-500/20 group hover:border-amber-400/50 transition-all duration-500">
                <img
                  src="/images/about/about-cheeseburger.jpg"
                  alt="Cheese Bites Signature Cheeseburger"
                  className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="300"
                />
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-white font-black text-xs uppercase tracking-widest opacity-95">Signature Cheeseburger</span>
                </div>
              </div>

              {/* Bottom Row: Cheesy Fries + Crispy Wings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-amber-500/20 group hover:border-amber-400/50 transition-all duration-500">
                  <img
                    src="/images/about/about-cheesy-fries.jpg"
                    alt="Cheese Bites Loaded Cheesy Fries"
                    className="w-full h-40 sm:h-48 object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="200"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-white font-black text-[10px] uppercase tracking-wider opacity-95">Cheesy Fries</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-amber-500/20 group hover:border-amber-400/50 transition-all duration-500">
                  <img
                    src="/images/about/about-chicken-wings.jpg"
                    alt="Cheese Bites Crispy Chicken Wings"
                    className="w-full h-40 sm:h-48 object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="200"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-white font-black text-[10px] uppercase tracking-wider opacity-95">Crispy Wings</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: WHY CHOOSE US (4 Feature Cards matching homepage)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 border-t border-amber-500/15 bg-[#09090f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">Our Commitment</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Why Choose <span className="text-gold-gradient">Cheese Bites</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              We focus on premium ingredients, fresh preparations, and an unmatched taste in every order.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { emoji: '🍕', title: 'Fresh Every Day',     desc: 'Dough, toppings and sauces prepared fresh daily with care.' },
              { emoji: '🧀', title: 'Real Cheese',         desc: '100% real mozzarella on every pizza and loaded cheesy burger.' },
              { emoji: '⚡', title: 'Fast Delivery',       desc: 'Hot, mouth-watering food delivered straight to your doorstep.' },
              { emoji: '❤️', title: 'Made with Passion',  desc: 'Every recipe is authentically crafted to satisfy cravings.' },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-[#0c0d14] border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-6 space-y-3 group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.18)] hover:-translate-y-1"
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
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: PIZZA SPOTLIGHT & CLOSING CTA BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.95)] border border-amber-500/30"
        >
          <img
            src="/images/about/about-pizza.jpg"
            alt="Cheese Bites Flavour-Packed Signature Pizza"
            className="w-full min-h-[360px] sm:h-80 md:h-[420px] object-cover object-center filter brightness-[0.85]"
            loading="lazy"
            decoding="async"
            width="1200"
            height="420"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 sm:via-black/60 to-transparent flex items-center">
            <div className="px-6 sm:px-14 py-10 sm:py-16 md:py-20 space-y-4 sm:space-y-5 max-w-xl">
              <div className="pt-2 sm:pt-4">
                <span className="text-xs text-amber-400 font-black uppercase tracking-widest block">
                  Our Signature
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-tight">
                Flavour-Packed Pizzas
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  You'll Crave Again
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Experience generous toppings, molten cheese, and crisp golden crusts freshly made to order.
              </p>
              <div className="pt-3 sm:pt-5 pb-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 font-black text-xs px-7 py-3.5 rounded-xl uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(245,158,11,0.5)] cursor-pointer"
                >
                  <span>View Full Menu</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;
