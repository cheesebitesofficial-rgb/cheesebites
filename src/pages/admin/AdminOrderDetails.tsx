import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, ExternalLink } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import type { OrderStatus } from '../../types';

export const AdminOrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, updateOrderStatus } = useOrders();

  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-black text-gray-900">Order Not Found</h2>
        <Link to="/admin/orders" className="text-xs font-bold text-amber-600 underline">
          Back to Orders List
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <Link to="/admin/orders" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase">
              Order #{order.orderNumber}
            </h1>
            <span className="text-xs text-gray-500 font-bold">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/tracking/${order.id}`}
            target="_blank"
            className="bg-gray-950 text-amber-400 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border border-amber-400/30"
          >
            <span>Customer Track View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handlePrint}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Status Control Card */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase text-amber-700 block">Current Order Status</span>
          <span className="text-xl font-black text-gray-900 uppercase">{order.status}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-700">Update Status:</span>
          <select
            value={order.status}
            onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
            className="bg-white border border-amber-500 text-gray-900 font-black text-xs px-4 py-2 rounded-xl focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Customer & Delivery Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black uppercase text-gray-900 border-b border-gray-100 pb-2">
          Customer Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div>
            <span className="text-gray-400 font-extrabold uppercase block">Customer Name</span>
            <span className="text-sm font-black text-gray-900">{order.customerName || 'Online Customer'}</span>
          </div>

          <div>
            <span className="text-gray-400 font-extrabold uppercase block">Phone Hotline</span>
            <span className="text-sm font-black text-gray-900 font-mono">{order.customerPhone || 'Phone N/A'}</span>
          </div>

          <div>
            <span className="text-gray-400 font-extrabold uppercase block">Order Type</span>
            <span className="text-sm font-black text-amber-600">{order.orderType}</span>
          </div>

          <div>
            <span className="text-gray-400 font-extrabold uppercase block">Payment Method</span>
            <span className="text-sm font-black text-gray-900">{order.paymentMethod}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-gray-400 font-extrabold uppercase block">Delivery Address</span>
            <span className="text-sm font-bold text-gray-900">{order.deliveryAddress}</span>
          </div>

          {order.orderNotes && (
            <div className="sm:col-span-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <span className="text-amber-800 font-black uppercase block">Kitchen / Delivery Notes</span>
              <span className="text-xs font-bold text-amber-900">{order.orderNotes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Items Summary Table */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black uppercase text-gray-900 border-b border-gray-100 pb-2">
          Itemized Order Contents
        </h3>

        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.cartItemId} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl text-xs font-medium">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                <div>
                  <h4 className="font-extrabold text-gray-900 text-sm">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Qty: {item.quantity}</span>
                    {item.selectedSize && (
                      <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                        Size: {item.selectedSize}
                      </span>
                    )}
                  </div>
                  {item.extraToppings && item.extraToppings.length > 0 && (
                    <span className="text-[10px] text-amber-800 font-bold block mt-0.5">
                      Toppings: {item.extraToppings.map(t => t.name).join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-gray-900 block">Rs. {item.price * item.quantity}</span>
                <span className="text-[10px] text-gray-400 font-bold">Rs. {item.price} each</span>
              </div>
            </div>
          ))}
        </div>

        {/* Calculation Summary */}
        <div className="pt-4 border-t border-gray-100 space-y-2 text-xs font-medium text-gray-600 max-w-xs ml-auto">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">Rs. {order.subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery Fee</span>
            <span className="font-bold text-gray-900">Rs. {order.deliveryFee}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-sm font-black text-gray-900">
            <span>Total Payable</span>
            <span className="text-amber-600">Rs. {order.total}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
