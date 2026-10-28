import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import type { OrderType } from '../types';

// WhatsApp number in international format (Pakistan: 92 + number without leading 0)
const WHATSAPP_NUMBER = '923371500150';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, deliveryFee, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const { t, isUrdu } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Delivery');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalDeliveryFee = orderType === 'Takeaway' ? 0 : deliveryFee;
  const finalTotal = subtotal + finalDeliveryFee;

  const dir = isUrdu ? 'rtl' : 'ltr';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg(t('error.name'));
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMsg(t('error.phone'));
      return;
    }
    if (orderType === 'Delivery' && !deliveryAddress.trim()) {
      setErrorMsg(t('error.address'));
      return;
    }
    if (cart.length === 0) {
      setErrorMsg(t('cart.empty'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order locally (for tracking/history)
      const newOrder = createOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: orderType === 'Takeaway' ? 'Self Pickup at Store' : deliveryAddress.trim(),
        orderNotes: orderNotes.trim(),
        orderType,
        paymentMethod,
        items: cart,
        subtotal,
        deliveryFee: finalDeliveryFee,
        total: finalTotal,
      });

      // Format WhatsApp message
      const itemsList = cart.map(item => {
        let line = `• ${item.name} x${item.quantity} — Rs.${item.price * item.quantity}`;
        if (item.selectedSize) line += ` (${item.selectedSize})`;
        return line;
      }).join('\n');

      const whatsappMsg = [
        `🧀 *CHEESE BITES — NEW ORDER* 🧀`,
        `━━━━━━━━━━━━━━━━━━`,
        `📋 *Order#:* ${newOrder.orderNumber}`,
        `👤 *Name:* ${customerName.trim()}`,
        `📱 *Phone:* ${customerPhone.trim()}`,
        `🛵 *Type:* ${orderType}`,
        `💳 *Payment:* ${paymentMethod}`,
        orderType === 'Delivery' ? `📍 *Address:* ${deliveryAddress.trim()}` : `📍 *Pickup:* 17 Meel Stop ISB`,
        orderNotes.trim() ? `📝 *Notes:* ${orderNotes.trim()}` : '',
        ``,
        `🍕 *ORDER ITEMS:*`,
        itemsList,
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `💰 Subtotal: Rs.${subtotal}`,
        finalDeliveryFee > 0 ? `🚗 Delivery: Rs.${finalDeliveryFee}` : `🚗 Delivery: FREE`,
        ``,
        `💵 *TOTAL: Rs.${finalTotal}*`,
        `━━━━━━━━━━━━━━━━━━`,
        `🕐 ${new Date().toLocaleString('en-PK')}`,
      ].filter(Boolean).join('\n');

      const encodedMsg = encodeURIComponent(whatsappMsg);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      // Open WhatsApp
      window.open(waUrl, '_blank');

      clearCart();
      navigate(`/confirmation/${newOrder.id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg(t('error.failed'));
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4" dir={dir}>
        <h2 className="text-2xl font-black text-white uppercase">{t('checkout.noItems')}</h2>
        <Link to="/menu" className="inline-block bg-amber-500 text-gray-950 font-black px-6 py-3 rounded-xl uppercase">
          {t('checkout.backToMenu')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" dir={dir}>
      
      {/* Header */}
      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">{t('checkout.title')}</h1>
          <p className="text-xs text-amber-400 font-extrabold uppercase mt-1">{t('checkout.subtitle')}</p>
        </div>
        <Link to="/cart" className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 uppercase">
          <ArrowLeft className="w-4 h-4" /> {t('checkout.backToBasket')}
        </Link>
      </div>

      {/* WhatsApp Notice */}
      <div className="bg-green-950/60 border border-green-500/40 text-green-300 p-4 rounded-2xl text-sm font-bold flex items-center gap-3">
        <span className="text-2xl">📱</span>
        <span>{isUrdu ? 'آرڈر واٹس ایپ پر بھیجا جائے گا۔ براہ کرم اپنی معلومات درج کریں۔' : 'Your order will be sent via WhatsApp. Please fill in your details below.'}</span>
      </div>

      {errorMsg && (
        <div className="bg-red-950/60 border border-red-500/40 text-red-300 p-4 rounded-2xl text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Type Toggle */}
          <div className="bg-gray-900/90 rounded-3xl p-6 border border-gray-800 shadow-xl space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 block">
              1. {t('checkout.orderType')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderType('Delivery')}
                className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  orderType === 'Delivery'
                    ? 'border-amber-500 bg-amber-500/20 text-white font-black shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-2 ring-amber-500'
                    : 'border-gray-800 text-gray-400 hover:bg-gray-800 font-bold'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${orderType === 'Delivery' ? 'bg-amber-500 text-gray-950' : 'bg-gray-950 text-gray-400'}`}>
                  🛵
                </div>
                <div>
                  <span className="block text-sm font-black uppercase text-white">{t('checkout.delivery')}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{t('checkout.deliverySub')}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('Takeaway')}
                className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  orderType === 'Takeaway'
                    ? 'border-amber-500 bg-amber-500/20 text-white font-black shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-2 ring-amber-500'
                    : 'border-gray-800 text-gray-400 hover:bg-gray-800 font-bold'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${orderType === 'Takeaway' ? 'bg-amber-500 text-gray-950' : 'bg-gray-950 text-gray-400'}`}>
                  🛍️
                </div>
                <div>
                  <span className="block text-sm font-black uppercase text-white">{t('checkout.takeaway')}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{t('checkout.takeawaySub')}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-gray-900/90 rounded-3xl p-6 border border-gray-800 shadow-xl space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 block">
              2. {t('checkout.contactDetails')}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-gray-300 block mb-1">{t('checkout.fullName')} *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder={isUrdu ? 'مثال: علی احمد' : 'e.g. Ali Ahmed'}
                  className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-gray-300 block mb-1">{t('checkout.phone')} *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0333-1234567"
                  className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {orderType === 'Delivery' && (
              <div>
                <label className="text-xs font-black uppercase text-gray-300 block mb-1">{t('checkout.address')} *</label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder={isUrdu ? 'مکان نمبر، گلی، سیکٹر، اسلام آباد...' : 'House number, Street, Sector / Area, Islamabad...'}
                  className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-black uppercase text-gray-300 block mb-1">{t('checkout.notes')}</label>
              <input
                type="text"
                value={orderNotes}
                onChange={e => setOrderNotes(e.target.value)}
                placeholder={isUrdu ? 'مثال: مسالے دار بنائیں / زنگ بجائیں / ایکسٹرا کیچپ...' : 'e.g. Make it spicy / Ring bell / Extra ketchup...'}
                className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-900/90 rounded-3xl p-6 border border-gray-800 shadow-xl space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 block">
              3. {t('checkout.payment')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Cash on Delivery', 'Card on Delivery'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3.5 rounded-xl border text-left font-bold text-xs uppercase flex items-center justify-between transition-all ${
                    paymentMethod === method
                      ? 'border-amber-500 bg-amber-500 text-gray-950 font-black'
                      : 'border-gray-800 bg-gray-950 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span>💵 {method}</span>
                  {paymentMethod === method && <Check className="w-4 h-4 text-gray-950" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Summary Column */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-2xl border border-amber-500/30 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight border-b border-gray-800 pb-4">
              {t('checkout.review')} ({cart.length} {t('checkout.items')})
            </h3>

            {/* Small Cart Summary List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs text-gray-300 pb-2 border-b border-gray-800">
                  <div>
                    <span className="font-extrabold text-white block">{item.name} x {item.quantity}</span>
                    {item.selectedSize && <span className="text-[10px] text-amber-400 uppercase font-mono">{item.selectedSize}</span>}
                  </div>
                  <span className="font-black text-white font-mono">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2 border-t border-gray-800 text-xs font-medium">
              <div className="flex items-center justify-between text-gray-400">
                <span>{t('checkout.subtotal')}</span>
                <span className="text-white font-black font-mono">Rs. {subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>{t('checkout.deliveryCharge')}</span>
                {finalDeliveryFee === 0 ? (
                  <span className="text-emerald-400 font-black uppercase">{t('checkout.free')}</span>
                ) : (
                  <span className="text-white font-black font-mono">Rs. {finalDeliveryFee}</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-black text-gray-400 block">{t('checkout.totalPayable')}</span>
                <span className="text-3xl font-black text-amber-400 font-mono">Rs. {finalTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-200 active:scale-98 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>{isSubmitting ? t('checkout.placing') : t('checkout.placeOrder')}</span>
            </button>

          </div>
        </div>

      </form>

    </div>
  );
};
