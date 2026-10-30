import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      setSubmitted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#07070b] min-h-screen"
      dir={dir}
    >
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">{t('contact.getInTouch')}</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
          {t('contact.contactTitle')} <span className="text-gold-gradient">{t('contact.location')}</span>
        </h1>
        <p className="text-sm text-slate-400 font-medium leading-relaxed">
          {t('contact.heroDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Official Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-[#0c0d14] text-white rounded-3xl p-6 shadow-2xl border border-amber-500/30 space-y-6">
            <h3 className="text-lg font-black uppercase text-amber-400 border-b border-gray-800 pb-3 font-sans">
              {t('contact.storeDetails')}
            </h3>

            <div className="space-y-4 text-xs font-medium">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-start space-x-3 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all block shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              >
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-amber-400 font-black uppercase block">{t('contact.orderHotline')}</span>
                  <span className="text-xl font-black text-amber-300 font-mono tracking-wider">{RESTAURANT_INFO.phone}</span>
                </div>
              </a>

              <div className="flex items-start space-x-3 p-4 bg-[#07070b] rounded-2xl border border-gray-800 text-slate-300">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase block">{t('contact.deliveryHours')}</span>
                  <span className="text-sm font-black text-white">{RESTAURANT_INFO.hours}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-[#07070b] rounded-2xl border border-gray-800 text-slate-300">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase block">{t('contact.restaurantAddress')}</span>
                  <span className="text-sm font-bold text-white leading-relaxed block">{RESTAURANT_INFO.address}</span>
                </div>
              </div>

              {/* Official Social Media Connect */}
              <div className="pt-2 border-t border-gray-800">
                <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider block mb-2.5">
                  Connect on Social Media
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61595736367068"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 bg-blue-600/15 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/cheesebites_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 bg-gradient-to-r from-purple-600/15 to-pink-600/15 hover:from-purple-600/30 hover:to-pink-600/30 border border-pink-500/30 text-pink-400 hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-2 bg-[#0c0d14] rounded-3xl p-8 border border-amber-500/20 shadow-xl space-y-6 text-white">
          <div className="flex items-center space-x-3 border-b border-gray-800 pb-4">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-black uppercase text-white font-sans">{t('contact.sendMessage')}</h3>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-8 rounded-2xl text-center space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-black text-xl uppercase font-sans">{t('contact.sentSuccess')}</h4>
              <p className="text-xs font-medium text-emerald-300 leading-relaxed">
                {t('contact.sentDesc')} {phone}.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase text-slate-300 block mb-1">{t('contact.yourName')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.enterName')}
                    className="w-full bg-[#07070b] border border-gray-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-slate-300 block mb-1">{t('contact.phoneNumber')}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('contact.enterPhone')}
                    className="w-full bg-[#07070b] border border-gray-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-300 block mb-1">{t('contact.yourMessage')}</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.howHelp')}
                  className="w-full bg-[#07070b] border border-gray-800 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-gray-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t('contact.sendBtn')}</span>
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};
