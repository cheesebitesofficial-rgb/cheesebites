import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  const { t, isUrdu } = useLanguage();

  const order = orderId ? getOrderById(orderId) : undefined;
  const dir = isUrdu ? 'rtl' : 'ltr';

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4" dir={dir}>
        <h2 className="text-2xl font-black text-white uppercase">{t('confirm.notFound')}</h2>
        <p className="text-sm text-gray-400">{isUrdu ? 'آرڈر کی تفصیلات نہیں مل سکیں۔' : "We couldn't locate the requested order details."}</p>
        <Link to="/" className="inline-block bg-amber-500 text-gray-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase">
          {isUrdu ? 'ہوم پیج پر واپس' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8" dir={dir}>
      
      {/* Confirmation Hero Card */}
      <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 border border-green-500/30 shadow-2xl text-center space-y-5 relative overflow-hidden">
        {/* Green WhatsApp Success Icon */}
        <div className="w-20 h-20 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          {/* Thank you message FIRST */}
          <h1 className="text-2xl sm:text-4xl font-black text-amber-400 uppercase tracking-tight">
            {t('confirm.thanks')}
          </h1>
          
          {/* Order sent confirmation */}
          <div className="bg-green-950/50 border border-green-500/30 rounded-2xl p-4 inline-block mx-auto">
            <p className="text-lg font-bold text-green-300 flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-400 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('confirm.title')}
            </p>
          </div>

          {/* Received message */}
          <p className="text-sm text-gray-300 font-medium max-w-md mx-auto leading-relaxed">
            {t('confirm.received')}
          </p>
          
          <p className="text-xs text-gray-500 font-medium">
            {t('confirm.whatsappNote')}
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="inline-block bg-gray-950 text-white px-6 py-3.5 rounded-2xl border border-amber-500/40">
          <span className="text-[10px] text-gray-400 font-black uppercase block">{t('confirm.orderNumber')}</span>
          <span className="text-3xl font-black text-amber-400 tracking-wider font-mono">
            #{order.orderNumber}
          </span>
        </div>

        {/* WhatsApp Contact Button */}
        <div className="pt-2">
          <a
            href="https://wa.me/923371500150"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-200 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>{isUrdu ? 'واٹس ایپ پر رابطہ کریں' : 'CONTACT US ON WHATSAPP'}</span>
          </a>
        </div>
      </div>

      {/* Order Details Breakdown Card */}
      <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6 text-white">
        <h3 className="text-lg font-black uppercase tracking-tight border-b border-gray-800 pb-3">
          {t('confirm.summary')}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-black uppercase block">{t('confirm.customerName')}</span>
            <span className="text-sm font-black text-white">{order.customerName}</span>
          </div>

          <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-black uppercase block">{t('confirm.phoneNumber')}</span>
            <span className="text-sm font-black text-amber-400 font-mono">{order.customerPhone}</span>
          </div>

          <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-black uppercase block">{t('confirm.orderType')}</span>
            <span className="text-sm font-black text-amber-400 uppercase">{order.orderType}</span>
          </div>

          <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-black uppercase block">{t('confirm.paymentMethod')}</span>
            <span className="text-sm font-black text-white">{order.paymentMethod}</span>
          </div>

          <div className="sm:col-span-2 bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-black uppercase block">{t('confirm.deliveryAddress')}</span>
            <span className="text-sm font-bold text-gray-200">{order.deliveryAddress}</span>
          </div>

          {order.orderNotes && (
            <div className="sm:col-span-2 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 space-y-1">
              <span className="text-amber-400 font-black uppercase block">{t('confirm.specialInstructions')}</span>
              <span className="text-xs font-bold text-amber-300">{order.orderNotes}</span>
            </div>
          )}
        </div>

        {/* Ordered Items Table */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
            {t('confirm.itemsOrdered')}
          </span>
          <div className="space-y-2">
            {order.items.map(item => (
              <div key={item.cartItemId} className="flex items-center justify-between p-3 bg-gray-950 rounded-xl text-xs font-bold border border-gray-800">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <span className="text-white block uppercase">{item.name} x {item.quantity}</span>
                    {item.selectedSize && <span className="text-[10px] text-amber-400 uppercase font-mono">Size: {item.selectedSize}</span>}
                  </div>
                </div>
                <span className="text-amber-400 font-black font-mono">Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-sm">
          <span className="font-extrabold text-gray-400 uppercase">{t('confirm.totalCharged')}</span>
          <span className="text-2xl font-black text-amber-400 font-mono">Rs. {order.total}</span>
        </div>
      </div>

      <div className="text-center">
        <Link to="/menu" className="text-xs font-black uppercase text-amber-400 hover:underline tracking-wider">
          {t('confirm.orderMore')}
        </Link>
      </div>

    </div>
  );
};
