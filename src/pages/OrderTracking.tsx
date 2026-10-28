import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, CheckCircle2, Truck, ChefHat, PackageCheck, AlertCircle, RefreshCw, PhoneCall } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import type { OrderStatus } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, refreshOrderFromSupabase } = useOrders();
  const { t, dir } = useLanguage();
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const order = orderId ? getOrderById(orderId) : undefined;

  // Poll Supabase for live order status updates from POS staff
  useEffect(() => {
    if (!orderId) return;

    let isMounted = true;
    const fetchStatus = async () => {
      if (isMounted) setIsRefreshing(true);
      await refreshOrderFromSupabase(orderId);
      if (isMounted) {
        setLastRefreshed(new Date().toLocaleTimeString());
        setIsRefreshing(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000); // Live fast poll every 3 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [orderId]);

  const statuses: { key: OrderStatus; label: string; icon: React.ReactNode; description: string }[] = [
    { key: 'Pending', label: t('status.pending'), icon: <Clock className="w-5 h-5" />, description: t('status.pendingDesc') },
    { key: 'Confirmed', label: t('status.confirmed'), icon: <PackageCheck className="w-5 h-5" />, description: t('status.confirmedDesc') },
    { key: 'Preparing', label: t('status.preparing'), icon: <ChefHat className="w-5 h-5" />, description: t('status.preparingDesc') },
    { key: 'Ready', label: t('status.ready'), icon: <CheckCircle2 className="w-5 h-5" />, description: t('status.readyDesc') },
    { key: 'Out for Delivery', label: t('status.outForDelivery'), icon: <Truck className="w-5 h-5" />, description: t('status.outForDeliveryDesc') },
    { key: 'Delivered', label: t('status.delivered'), icon: <CheckCircle2 className="w-5 h-5" />, description: t('status.deliveredDesc') },
  ];

  const getStatusIndex = (st?: OrderStatus) => {
    if (!st) return 0;
    if (st === 'Cancelled') return -1;
    return statuses.findIndex(s => s.key === st);
  };

  const currentIndex = getStatusIndex(order?.status);

  const handleManualRefresh = async () => {
    if (!orderId) return;
    setIsRefreshing(true);
    await refreshOrderFromSupabase(orderId);
    setLastRefreshed(new Date().toLocaleTimeString());
    setIsRefreshing(false);
  };

  if (!order) {
    return (
      <div dir={dir} className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white uppercase">{t('tracking.orderNotFound')}</h2>
        <p className="text-sm text-gray-400">{t('tracking.couldNotFind')}: {orderId}</p>
        <Link to="/" className="inline-block bg-amber-500 text-gray-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase">
          {t('tracking.backHome')}
        </Link>
      </div>
    );
  }

  return (
    <div dir={dir} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-[#07070b]">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0c0d14] via-[#121320] to-[#0c0d14] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-amber-400 tracking-widest block">
            {t('tracking.liveTracking')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase">
            {t('tracking.order')} #{order.orderNumber}
          </h1>
          <p className="text-xs text-gray-300 font-medium mt-1">
            {t('tracking.createdAt')} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {t('tracking.estDelivery')}: {order.estimatedDeliveryMinutes} {t('tracking.mins')}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="bg-gray-900 hover:bg-gray-800 text-amber-400 px-3.5 py-2.5 rounded-xl text-xs font-black border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? t('tracking.refreshing') : `${t('tracking.updated')} ${lastRefreshed}`}</span>
          </button>
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 px-4 py-2.5 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t('tracking.callHotline')}</span>
          </a>
        </div>
      </div>

      {/* Current Status Highlight Banner */}
      {order.status === 'Cancelled' ? (
        <div className="bg-red-950/60 border border-red-500/40 p-6 rounded-3xl text-red-300 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 shrink-0 text-red-400" />
          <div>
            <h3 className="font-extrabold text-base uppercase">{t('tracking.cancelled')}</h3>
            <p className="text-xs font-medium mt-0.5">{t('tracking.cancelledDesc')} {RESTAURANT_INFO.phone} {t('tracking.forAssistance')}</p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-3xl flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Cheese Bites Logo" className="w-12 h-12 object-contain shrink-0 rounded-xl border border-amber-500/30" />
            <div>
              <span className="text-[11px] font-black uppercase text-amber-400 block">{t('tracking.currentStatus')}</span>
              <span className="text-2xl font-black text-white uppercase font-sans">{order.status}</span>
            </div>
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 text-xs font-black uppercase px-4 py-2 rounded-xl shadow-md">
            {t('tracking.livePOS')}
          </span>
        </div>
      )}

      {/* Visual Timeline Stepper */}
      {order.status !== 'Cancelled' && (
        <div className="bg-gray-900/90 rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-xl space-y-8 text-white">
          <h3 className="text-lg font-black uppercase tracking-tight">{t('tracking.timeline')}</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-6 bottom-6 w-1 bg-gray-800 hidden md:block" />

            <div className="space-y-8">
              {statuses.map((st, index) => {
                const isPassed = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={st.key} className="flex items-start space-x-4 relative">
                    {/* Status Circle Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all shrink-0 z-10 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 shadow-[0_0_25px_rgba(245,158,11,0.6)] ring-4 ring-amber-500/20 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-gray-950 shadow-md'
                          : 'bg-gray-950 text-gray-600 border border-gray-800'
                      }`}
                    >
                      {st.icon}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-base font-black uppercase ${isCurrent ? 'text-amber-400' : isPassed ? 'text-white' : 'text-gray-500'}`}>
                          {st.label}
                        </h4>
                        {isCurrent && (
                          <span className="bg-amber-500 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase animate-pulse">
                            {t('tracking.inProgress')}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs font-medium mt-0.5 ${isPassed ? 'text-amber-100/80' : 'text-gray-500'}`}>
                        {st.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Items Summary Card */}
      <div className="bg-gray-900/90 rounded-3xl p-6 border border-gray-800 shadow-xl space-y-4 text-white">
        <h4 className="text-sm font-black uppercase border-b border-gray-800 pb-2">
          {t('tracking.orderInfo')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div>
            <span className="text-gray-400 block font-black uppercase">{t('tracking.customer')}</span>
            <span className="text-white font-black">{order.customerName} ({order.customerPhone})</span>
          </div>
          <div>
            <span className="text-gray-400 block font-black uppercase">{t('tracking.deliveryLocation')}</span>
            <span className="text-white font-black">{order.deliveryAddress}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-black uppercase">{t('tracking.paymentInfo')}</span>
            <span className="text-amber-400 font-black">{order.paymentMethod}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 block font-black uppercase">{t('tracking.itemsLabel')}</span>
            <span className="text-amber-300 font-bold">
              {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
