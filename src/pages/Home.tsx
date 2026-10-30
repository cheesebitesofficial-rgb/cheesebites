import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, ShoppingBag, Sparkles, ChevronRight, CheckCircle2, ArrowRight, UtensilsCrossed } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useMenu } from '../context/MenuContext';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/common/ProductCard';
import { DealCard } from '../components/common/DealCard';
import { ProductDetailsModal } from '../components/common/ProductDetailsModal';
import { RestaurantInfoBanner } from '../components/common/RestaurantInfoBanner';
import { SpecialOffersSection } from '../components/common/SpecialOffersSection';
import { useScrollObserver } from '../hooks/useScrollObserver';
import type { MenuItem, Category } from '../types';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const { menuItems, deals } = useMenu();
  const { t, dir } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const navigate = useNavigate();

  // GSAP & Lenis Scroll Refs for Hero Scroll Animation
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Scroll Observers for reveal animations
  const categoryReveal = useScrollObserver();
  const bestSellersReveal = useScrollObserver();
  const campaignReveal = useScrollObserver();
  const storyReveal = useScrollObserver();
  const reviewsReveal = useScrollObserver();
  const finalCtaReveal = useScrollObserver();

  // Initialize Lenis & GSAP Scroll Parallax & Reel Animations for Single Cheese Pizza Hero
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animationFrame = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    if (heroSectionRef.current) {
      const ctx = gsap.context(() => {
        // Entrance text animations
        gsap.from('.hero-content h1', { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
        gsap.from('.hero-content a, .hero-content button', { y: 20, opacity: 0, duration: 0.8, delay: 0.4, stagger: 0.1 });
      }, heroSectionRef);

      return () => {
        cancelAnimationFrame(animationFrame);
        lenis.destroy();
        ctx.revert();
      };
    }
  }, []);

  // Filter best seller items
  const bestSellers = menuItems.filter(item => item.isPopular || item.isSpecial).slice(0, 6);

  // Active Menu Category Filter for Home Menu Section
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('All');
  const homeCategories = [
    'All',
    'Pizza',
    'Burgers',
    'Sandwiches',
    'Roll Paratha',
    'Pasta',
    'Fried Chicken',
    'Fries',
    'Deals',
  ];

  const displayedHomeProducts = menuItems.filter(
    item => activeMenuCategory === 'All' || item.category === activeMenuCategory
  );
  const displayedHomeDeals = deals.filter(
    () => activeMenuCategory === 'All' || activeMenuCategory === 'Deals'
  );

  // The Big Flex Campaign Deal (Deal 20)
  const bigFlexDeal = deals.find(d => d.dealNumber === 20) || deals.find(d => d.category === 'The Big Flex') || deals[deals.length - 1];

  // Category data mapping (inside component for access to t())
  const categoryMap: { category: Category; image: string; tag: string }[] = [
    { category: 'Pizza', image: '/images/real/crown-crust-pizza.jpg', tag: t('cat.tag.pizza') },
    { category: 'Burgers', image: '/images/real/burgers-trio.jpg', tag: t('cat.tag.burgers') },
    { category: 'Deals', image: '/images/real/deals-flyer-full.jpg', tag: t('cat.tag.deals') },
    { category: 'Roll Paratha', image: '/images/real/roll-paratha-trio.jpg', tag: t('cat.tag.rollParatha') },
    { category: 'Pasta', image: '/images/real/pasta-bowl.jpg', tag: t('cat.tag.pasta') },
    { category: 'Fried Chicken', image: '/images/real/fried-chicken-platter.jpg', tag: t('cat.tag.friedChicken') },
    { category: 'Fries', image: '/images/real/fries-loaded-masala.jpg', tag: t('cat.tag.fries') },
    { category: 'Sandwiches', image: '/images/real/sandwich-grill.jpg', tag: t('cat.tag.sandwiches') },
  ];

  return (
    <div dir={dir} className="space-y-12 sm:space-y-16 pb-20 overflow-x-hidden bg-[#0a0a0a] text-gray-100 font-sans">
      
      {/* ============================================================ */}
      {/* HERO SECTION MATCHING REFERENCE DESIGN */}
      {/* ============================================================ */}
      <section
        ref={heroSectionRef}
        className="hero-wrapper hero relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0a] text-white pt-24 pb-16 lg:pt-16 lg:pb-16"
      >
        {/* Dark Ambient Radial Glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0d14] via-[#0a0a0a] to-[#0c0d14] z-0" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

        <div className="hero-content relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full space-y-12">
          
          {/* TOP HERO GRID (2 COLUMNS: LEFT COPY + RIGHT PIZZA WITH FLOATING CARDS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4">
            
            {/* LEFT COLUMN: HEADLINE, DESCRIPTION & BUTTONS */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-7 flex flex-col items-center lg:items-start justify-center">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(255,107,0,0.3)] bg-black/60 backdrop-blur-md">
                <Flame className="w-4 h-4 text-[#FF6B00] fill-[#FF6B00] animate-pulse" />
                <span>{t('home.badge')}</span>
              </div>

              {/* Main Headline matching reference */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white drop-shadow-lg font-sans">
                {t('home.headline1')} <br />
                <span className="text-[#FF6B00] font-sans">{t('home.headline2')}</span>
              </h1>

              {/* Subtitle Paragraph matching reference */}
              <p className="text-amber-100/90 text-sm sm:text-base max-w-lg font-medium leading-relaxed drop-shadow-md">
                {t('home.subtitle')}
              </p>

              {/* Dual Action Buttons matching reference styling */}
              <div className="flex items-center justify-center lg:justify-start gap-5 pt-2 w-full sm:w-auto">
                <Link
                  to="/menu"
                  className="px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#FF5500] hover:to-[#FF7700] shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('home.orderNow')}</span>
                </Link>

                <Link
                  to="/menu"
                  className="px-6 py-4 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center gap-2.5 group transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                >
                  <span>{t('home.seeMenu')}</span>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-gray-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                </Link>
              </div>

            </div>

            {/* RIGHT COLUMN: PIZZA DISPLAY WITH FLOATING CARDS MATCHING REFERENCE */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              
              {/* Golden Ambient Glow Behind Pizza */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#FF6B00]/30 to-amber-500/30 rounded-full blur-3xl opacity-80 pointer-events-none" />

              {/* Main Pizza Container */}
              <div
                className="relative group cursor-pointer transition-transform duration-300 transform-gpu"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${y * -14}deg) rotateY(${x * 14}deg) scale3d(1.03, 1.03, 1.03)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                }}
              >
                {/* Pizza Main Image */}
                <img
                  src="/images/hero-pizza-user.jpg"
                  alt="Fresh Baked Crown Crust Pizza"
                  className="w-full max-w-[480px] h-[340px] sm:h-[420px] object-cover object-center rounded-3xl border-2 border-orange-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                />

                {/* FLOATING CARD 1: TOP LEFT OVERLAY */}
                <div
                  onClick={() => navigate('/menu')}
                  className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 text-gray-950 p-2.5 sm:p-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/60 flex items-center gap-3 backdrop-blur-md hover:scale-105 transition-transform duration-300 z-20 cursor-pointer"
                >
                  <img
                    src="/images/hero-pizza-user.jpg"
                    alt="Cheese Pizza"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-amber-400/50"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-gray-950 leading-tight">{t('home.cheesePizza')}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black text-amber-500 flex items-center gap-0.5">★ 4.9</span>
                      <span className="text-xs font-mono font-black text-orange-600">Rs. 400</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center font-black text-xs shadow-md ml-1">
                    +
                  </div>
                </div>

                {/* FLOATING CARD 2: BOTTOM RIGHT OVERLAY */}
                <div
                  onClick={() => navigate('/menu')}
                  className="absolute -bottom-4 -right-4 sm:-right-8 bg-white/95 text-gray-950 p-2.5 sm:p-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/60 flex items-center gap-3 backdrop-blur-md hover:scale-105 transition-transform duration-300 z-20 cursor-pointer"
                >
                  <img
                    src="/images/hero-pizza-user.jpg"
                    alt="Crown Crust Pizza"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-amber-400/50"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-gray-950 leading-tight">{t('home.crownCrust')}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black text-amber-500 flex items-center gap-0.5">★ 5.0</span>
                      <span className="text-xs font-mono font-black text-orange-600">Rs. 600</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center font-black text-xs shadow-md ml-1">
                    +
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* BOTTOM HERO FEATURE PILLARS MATCHING REFERENCE DESIGN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-800/80 w-full">
            
            {/* Pillar 1: Fast Delivery */}
            <div className="flex items-center gap-4 bg-[#0e0f18]/80 border border-gray-800 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B00] to-amber-400 flex items-center justify-center text-gray-950 shrink-0 shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                <span className="text-xl">🛵</span>
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{t('home.fastDelivery')}</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">{t('home.fastDeliveryDesc')}</p>
              </div>
            </div>

            {/* Pillar 2: Guaranteed Quality */}
            <div className="flex items-center gap-4 bg-[#0e0f18]/80 border border-gray-800 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B00] to-amber-400 flex items-center justify-center text-gray-950 shrink-0 shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                <span className="text-xl">👑</span>
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{t('home.qualityGuaranteed')}</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">{t('home.qualityDesc')}</p>
              </div>
            </div>

            {/* Pillar 3: Track Order */}
            <div className="flex items-center gap-4 bg-[#0e0f18]/80 border border-gray-800 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B00] to-amber-400 flex items-center justify-center text-gray-950 shrink-0 shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                <span className="text-xl">📍</span>
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{t('home.trackOrder')}</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">{t('home.trackOrderDesc')}</p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Official Restaurant Information Banner */}
      <RestaurantInfoBanner />

      {/* ============================================================ */}
      {/* CATEGORY EXPLORER SECTION */}
      {/* ============================================================ */}
      <section ref={categoryReveal.ref} className="bg-[#120d08] py-20 border-t border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800/80 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FFB703] block">{t('home.menuLabel')}</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wider mt-1 font-sans">
                {t('home.browseCategories')}
              </h2>
            </div>
            <Link 
              to="/menu" 
              className="text-[#FFB703] hover:text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 bg-transparent hover:bg-[#FFB703] px-6 py-3.5 rounded-full border border-[#FFB703] transition-all hover:scale-105 shadow-md cursor-pointer"
            >
              <span>{t('home.exploreFullMenu')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryMap.map(cat => {
              const itemCount = cat.category === 'Deals' 
                ? deals.length 
                : menuItems.filter(i => i.category === cat.category).length;

              return (
                <div
                  key={cat.category}
                  onClick={() => navigate(`/menu?category=${encodeURIComponent(cat.category)}`)}
                  className="category-card group"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    e.currentTarget.style.transform = `perspective(1000px) translateY(-8px) scale(1.02) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.category}
                    loading="lazy"
                  />
                  
                  <div className="items-badge">
                    {itemCount} {t('home.items')}
                  </div>

                  <div className="card-content space-y-1">
                    <span className="text-[10px] font-bold text-[#FFB703] uppercase tracking-widest block">
                      {cat.tag}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase group-hover:text-[#FFB703] transition-colors tracking-tight">
                      {cat.category}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED ADVERTISING CAMPAIGN ("THE BIG FLEX") */}
      {/* ============================================================ */}
      <section ref={campaignReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c0d14] via-amber-950/30 to-[#0c0d14] border-2 border-amber-500/40 p-8 sm:p-14 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4" /> {t('home.featuredDeal')}
              </div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-none font-sans">
                {t('home.theBig')} <span className="text-amber-400">{t('home.flex')}</span>
              </h2>

              <p className="text-amber-100/90 text-sm sm:text-base font-medium leading-relaxed">
                {t('home.bigFlexDesc')}
              </p>

              {/* Meal Contents Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {bigFlexDeal?.contents.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5 bg-gray-950/90 p-3.5 rounded-2xl border border-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-black text-white">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-5">
                <div>
                  <span className="text-slate-400 text-xs line-through font-bold block font-sans">Rs. {bigFlexDeal ? Math.round(bigFlexDeal.price * 1.3) : 3200}</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-sans tracking-tight">
                    Rs. {bigFlexDeal?.price}
                  </div>
                </div>

                <Link
                  to="/menu"
                  className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider text-gray-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('home.claimDeal')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl group">
                <img
                  src={bigFlexDeal?.image || '/images/real/deal-20.jpg'}
                  alt={bigFlexDeal?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-amber-400 text-gray-950 font-black text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                  {t('home.saveHuge')}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BEST SELLERS HIGHLIGHT GRID */}
      {/* ============================================================ */}
      <section ref={bestSellersReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 block">{t('home.mostCraved')}</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1 font-sans">
              {t('home.bestSellers')}
            </h2>
          </div>
          <Link 
            to="/menu" 
            className="text-amber-400 hover:text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-2 bg-gray-900/90 px-5 py-3 rounded-2xl border border-amber-500/30 transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            <span>{t('home.viewCompleteMenu')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onQuickView={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. SPECIAL PROMOTIONAL PIZZA OFFERS */}
      {/* ============================================================ */}
      <SpecialOffersSection />

      {/* ============================================================ */}
      {/* COMPLETE MENU EXPLORER SECTION (HOME PAGE) */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-wider mb-2 border border-amber-500/20">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Full Restaurant Selection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
              Explore Our <span className="text-[#FF6B00]">Complete Menu</span>
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-amber-400 hover:text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-2 bg-gray-900 px-5 py-3 rounded-2xl border border-amber-500/30 transition-all hover:scale-105 shadow-md cursor-pointer shrink-0"
          >
            <span>Open Dedicated Menu Page</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
          {homeCategories.map(cat => {
            const isSelected = activeMenuCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveMenuCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-gray-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
                    : 'bg-[#0c0d14] text-slate-300 hover:bg-gray-800 hover:text-white border border-amber-500/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {activeMenuCategory !== 'Deals' && displayedHomeProducts.length > 0 && (
          <div className="space-y-4">
            {activeMenuCategory === 'All' && (
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-sans">
                Signature Pizzas & Fast Food Dishes
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedHomeProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={prod => setSelectedProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Deals Grid */}
        {(activeMenuCategory === 'All' || activeMenuCategory === 'Deals') && displayedHomeDeals.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-sans">
                All 20 Combo Deals & Feasts
              </h3>
              <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
                Deals 1 to 20
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedHomeDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* STORY & HERITAGE BANNER */}
      {/* ============================================================ */}
      <section ref={storyReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-dark border border-amber-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 block">{t('home.qualityCommitment')}</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
              {t('home.craftedWith')} <span className="text-gold-gradient">{t('home.realCheese')}</span>
            </h2>
            <p className="text-amber-100/80 text-sm sm:text-base font-medium leading-relaxed">
              {t('home.storyDesc')}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-center border-t border-white/10 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-black text-amber-400">100%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t('home.realMozzarella')}</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-black text-amber-400">20+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t('home.gourmetDeals')}</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-black text-amber-400">30 Min</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t('home.expressDelivery')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CUSTOMER REVIEWS SLIDER / HIGHLIGHTS */}
      {/* ============================================================ */}
      <section ref={reviewsReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 block">{t('home.realCustomerStories')}</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            {t('home.whatFoodiesSay')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: t('home.reviewer1'), review: t('home.review1'), rating: 5, date: t('home.2daysAgo') },
            { name: t('home.reviewer2'), review: t('home.review2'), rating: 5, date: t('home.1weekAgo') },
            { name: t('home.reviewer3'), review: t('home.review3'), rating: 5, date: t('home.3daysAgo') },
          ].map((rev, idx) => (
            <div key={idx} className="glass-dark p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-xl hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <span className="text-[10px] font-bold text-slate-500">{rev.date}</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed font-sans">
                "{rev.review}"
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-black text-white">{rev.name}</span>
                <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest">{t('home.verifiedBuyer')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section ref={finalCtaReveal.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 sm:p-14 text-center space-y-6 shadow-[0_20px_50px_rgba(245,158,11,0.4)] text-gray-950 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gray-950/80 block">{t('home.hungryYet')}</span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none font-sans">
              {t('home.orderCheeseBites')}
            </h2>
            <p className="text-gray-950/90 text-sm sm:text-base font-bold">
              {t('home.ctaDesc')}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-10 py-4.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-900 shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{t('home.exploreMenuOrder')}</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/deals"
              className="w-full sm:w-auto px-9 py-4.5 rounded-full text-xs font-black uppercase tracking-wider text-gray-950 bg-white/30 hover:bg-white/40 border border-gray-950/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('home.viewSpecialDeals')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
