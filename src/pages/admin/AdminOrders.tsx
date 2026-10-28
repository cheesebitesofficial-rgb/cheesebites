import React, { useState } from 'react';
import { RefreshCw, Trash2, Plus, Settings, User, CheckCircle, MessageSquare, Utensils, X } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { supabaseApi } from '../../lib/supabase';
import type { OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, createOrder, deleteOrder, deleteAllOrders, togglePaymentStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const [dbUrl, setDbUrl] = useState(() => localStorage.getItem('cb_supabase_url') || '');
  const [dbKey, setDbKey] = useState(() => localStorage.getItem('cb_supabase_key') || '');
  const [posEndpoint, setPosEndpoint] = useState(() => localStorage.getItem('cb_pos_endpoint') || '');

  // New order modal form state
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newItemName, setNewItemName] = useState('Cheese Pizza (Medium)');
  const [newItemCategory] = useState('Pizza');
  const [newItemSize, setNewItemSize] = useState('Medium');
  const [newItemPrice, setNewItemPrice] = useState(700);
  const [newDeliveryFee, setNewDeliveryFee] = useState(150);

  const isSupabaseConfigured = supabaseApi.isConfigured();

  const handleSaveConfig = () => {
    if (dbUrl.trim()) localStorage.setItem('cb_supabase_url', dbUrl.trim());
    if (dbKey.trim()) localStorage.setItem('cb_supabase_key', dbKey.trim());
    if (posEndpoint.trim()) localStorage.setItem('cb_pos_endpoint', posEndpoint.trim());
    else localStorage.removeItem('cb_pos_endpoint');
    setShowConfigModal(false);
    window.location.reload();
  };

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustPhone.trim()) return;

    createOrder({
      customerName: newCustName.trim(),
      customerPhone: newCustPhone.trim(),
      deliveryAddress: newAddress.trim() || 'Dine-in / Takeaway',
      orderNotes: newNotes.trim() || 'Please extra napkins and ketchup sachets.',
      orderType: 'Delivery',
      paymentMethod: 'Cash on Delivery',
      items: [
        {
          cartItemId: `item-${Date.now()}`,
          itemId: `custom-${Date.now()}`,
          name: newItemName.trim(),
          category: newItemCategory,
          price: Number(newItemPrice),
          quantity: 1,
          selectedSize: newItemSize,
          image: '/images/hero-pizza-user.jpg',
        },
      ],
      subtotal: Number(newItemPrice),
      deliveryFee: Number(newDeliveryFee),
      total: Number(newItemPrice) + Number(newDeliveryFee),
    });

    setShowNewOrderModal(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewAddress('');
    setNewNotes('');
  };

  const filteredOrders = orders.filter(ord => {
    if (filterStatus === 'All') return true;
    return ord.status === filterStatus;
  });

  const getMinutesAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins <= 0) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
      case 'Confirmed':
        return 'bg-amber-500 text-gray-950 font-black';
      case 'Preparing':
        return 'bg-blue-600 text-white font-black';
      case 'Ready':
        return 'bg-emerald-500 text-gray-950 font-black';
      case 'Out for Delivery':
        return 'bg-pink-600 text-white font-black';
      case 'Delivered':
        return 'bg-teal-500 text-gray-950 font-black';
      case 'Cancelled':
        return 'bg-red-600 text-white font-black';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 p-4 sm:p-6 font-sans space-y-6">
      
      {/* HEADER SECTION MATCHING REFERENCE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍕</span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
              WEBSITE ONLINE ORDERS
            </h1>
          </div>
          <p className="text-xs text-amber-400/90 font-bold mt-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            Synchronized live with Cheese Bites Supabase Cloud Database & POS Terminal
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 border ${
            isSupabaseConfigured 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{isSupabaseConfigured ? 'ONLINE SYNC: LIVE ACTIVE' : 'LOCAL POS SYNC: ACTIVE'}</span>
          </div>

          <button
            onClick={() => setShowNewOrderModal(true)}
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Order</span>
          </button>

          <button
            onClick={() => setShowConfigModal(true)}
            className="bg-[#141a29] hover:bg-[#1c2438] text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs uppercase flex items-center gap-2 border border-gray-800 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Database Settings</span>
          </button>
        </div>
      </div>

      {/* FILTER & ACTIONS BAR MATCHING REFERENCE */}
      <div className="bg-[#111622] p-4 rounded-2xl border border-gray-800/80 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase flex items-center gap-2 shadow-md transition-all shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Orders</span>
          </button>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#0b0e17] border border-gray-700/80 text-white text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete ALL orders from POS order history?')) {
              deleteAllOrders();
            }
          }}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-bold px-4 py-2.5 rounded-xl text-xs uppercase flex items-center gap-2 border border-red-500/30 transition-all self-end sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete All Orders</span>
        </button>
      </div>

      {/* ORDERS DISPLAY LIST MATCHING REFERENCE CARD DESIGN */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#111622] rounded-3xl border border-gray-800 p-12 text-center space-y-3">
            <Utensils className="w-12 h-12 text-gray-600 mx-auto" />
            <p className="text-base font-bold text-gray-400">No orders found matching status filter.</p>
            <p className="text-xs text-gray-500">Click "+ New Order" to create a test order or change status filters.</p>
          </div>
        ) : (
          filteredOrders.map(ord => {
            const formattedTime = new Date(ord.createdAt).toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });

            const cleanPhone = (ord.customerPhone || '').replace(/\D/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('92') ? cleanPhone : '92' + cleanPhone.replace(/^0/, '')}`;

            return (
              <div
                key={ord.id}
                className="bg-[#111622] rounded-3xl border border-gray-800/90 shadow-2xl p-6 space-y-5 transition-all hover:border-amber-500/30"
              >
                
                {/* ORDER HEADER */}
                <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black text-amber-400 tracking-tight font-sans">
                      Order #{ord.orderNumber}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${getStatusBadgeStyle(ord.status)}`}>
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-amber-400/80 font-medium">
                      🕒 Placed: {formattedTime} • <span className="font-bold text-amber-400">{getMinutesAgo(ord.createdAt)}</span>
                    </span>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete Order #${ord.orderNumber}?`)) {
                          deleteOrder(ord.id);
                        }
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* CUSTOMER & PAYMENT INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Customer Name */}
                  <div className="bg-[#0b0e17] p-4 rounded-2xl border border-gray-800/70">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-1">CUSTOMER NAME</span>
                    <p className="text-sm font-black text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-400" />
                      <span>{ord.customerName || 'Online Customer'}</span>
                    </p>
                  </div>

                  {/* Phone Number with WhatsApp button */}
                  <div className="bg-[#0b0e17] p-4 rounded-2xl border border-gray-800/70 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-1">PHONE NUMBER</span>
                      <p className="text-sm font-mono font-extrabold text-white">{ord.customerPhone || '0300-0000000'}</p>
                    </div>
                    {ord.customerPhone && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-gray-950 flex items-center justify-center transition-all"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Payment Status */}
                  <div className="bg-[#0b0e17] p-4 rounded-2xl border border-gray-800/70">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-1">PAYMENT STATUS</span>
                    <button
                      onClick={() => togglePaymentStatus(ord.id)}
                      className={`mt-1 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 border transition-all ${
                        ord.paymentMethod?.includes('Paid')
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{ord.paymentMethod?.includes('Paid') ? 'Paid (Click to toggle)' : 'Pending (Click to toggle)'}</span>
                    </button>
                  </div>
                </div>

                {/* ADDRESS & SPECIAL INSTRUCTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0b0e17] p-4 rounded-2xl border border-gray-800/70">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-1">DELIVERY ADDRESS</span>
                    <p className="text-xs font-medium text-gray-300 leading-relaxed">
                      {ord.deliveryAddress || 'Customer Takeaway / Dine-in'}
                    </p>
                  </div>

                  <div className="bg-[#0b0e17] p-4 rounded-2xl border border-gray-800/70">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-1">SPECIAL INSTRUCTIONS / NOTES</span>
                    <p className="text-xs font-medium text-amber-300/90 italic leading-relaxed">
                      {ord.orderNotes || 'No special instructions provided.'}
                    </p>
                  </div>
                </div>

                {/* ITEMS TABLE MATCHING REFERENCE */}
                <div className="bg-[#0b0e17] rounded-2xl border border-gray-800/90 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-wider">
                          <th className="py-3 px-4">ITEM NAME</th>
                          <th className="py-3 px-4">CATEGORY</th>
                          <th className="py-3 px-4">SIZE / OPTIONS</th>
                          <th className="py-3 px-4 text-right">PRICE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60 text-xs font-medium text-gray-200">
                        {ord.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-900/50">
                            <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                              <span>🍴</span>
                              <span>{item.name}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-gray-800 text-amber-400 font-black px-2 py-0.5 rounded text-[10px] uppercase border border-amber-500/20">
                                {item.category || 'PIZZAS'}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-amber-300">
                              {item.selectedSize || 'Standard'} (x{item.quantity})
                            </td>
                            <td className="py-3 px-4 font-black text-white text-right">
                              Rs. {item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FOOTER & STATUS CONTROLS MATCHING REFERENCE */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-gray-800/80">
                  <div>
                    <span className="text-xs text-gray-400 font-bold block">
                      Subtotal: <span className="text-white">Rs. {ord.subtotal}</span> | Delivery: <span className="text-white">Rs. {ord.deliveryFee}</span>
                    </span>
                    <p className="text-xl font-black text-amber-400 font-sans mt-0.5">
                      Grand Total: Rs. {ord.total}
                    </p>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 mr-1">Update Status:</span>

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-amber-500 hover:bg-amber-400 text-gray-950 shadow-md transition-all"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all"
                    >
                      Preparing
                    </button>

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Ready')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-emerald-500 hover:bg-emerald-400 text-gray-950 shadow-md transition-all"
                    >
                      Ready
                    </button>

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Out for Delivery')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-pink-600 hover:bg-pink-500 text-white shadow-md transition-all"
                    >
                      Out for Delivery
                    </button>

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Delivered')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-teal-500 hover:bg-teal-400 text-gray-950 shadow-md transition-all"
                    >
                      Delivered
                    </button>

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Cancelled')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-red-600 hover:bg-red-500 text-white shadow-md transition-all"
                    >
                      Cancel
                    </button>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* NEW ORDER MODAL */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border border-gray-800 max-w-lg w-full p-6 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-black text-white uppercase">Create New Website / POS Order</h3>
              <button onClick={() => setShowNewOrderModal(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newCustName}
                    onChange={e => setNewCustName(e.target.value)}
                    placeholder="e.g. Hira Afzal"
                    className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newCustPhone}
                    onChange={e => setNewCustPhone(e.target.value)}
                    placeholder="e.g. 03245502471"
                    className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Delivery Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  placeholder="House 4 street 6 AKM road 17 meel stop..."
                  className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Special Notes / Instructions</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  placeholder="Please extra napkins and ketchup sachets."
                  className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Item Name</label>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Size / Option</label>
                  <input
                    type="text"
                    value={newItemSize}
                    onChange={e => setNewItemSize(e.target.value)}
                    className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Item Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={e => setNewItemPrice(Number(e.target.value))}
                    className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Delivery Fee (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={newDeliveryFee}
                    onChange={e => setNewDeliveryFee(Number(e.target.value))}
                    className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="w-1/2 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black rounded-xl text-xs uppercase shadow-lg shadow-amber-500/20"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DATABASE CONFIG MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border border-gray-800 max-w-md w-full p-6 rounded-3xl space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Supabase Cloud Database Connection</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Enter your Supabase URL and Anon Key to enable live sync across POS terminals & online customer devices.
            </p>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Supabase URL</label>
              <input 
                type="text"
                value={dbUrl}
                onChange={e => setDbUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Anon API Key</label>
              <input 
                type="text"
                value={dbKey}
                onChange={e => setDbKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
                className="w-full bg-[#0b0e17] border border-gray-800 p-2.5 rounded-xl text-xs font-mono text-white"
              />
            </div>
            <div className="pt-2 border-t border-gray-800">
              <label className="text-[10px] font-black uppercase text-amber-400 block mb-1">Your Local POS Webhook Endpoint (Optional)</label>
              <input 
                type="text"
                value={posEndpoint}
                onChange={e => setPosEndpoint(e.target.value)}
                placeholder="http://localhost:5050/api/online-order"
                className="w-full bg-[#0b0e17] border border-amber-500/30 p-2.5 rounded-xl text-xs font-mono text-white"
              />
              <span className="text-[10px] text-gray-500 block mt-1">
                Forwards HTTP POST order JSON directly to your desktop POS application.
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleSaveConfig}
                className="flex-1 py-3 bg-amber-500 text-gray-950 font-black rounded-xl text-xs uppercase shadow-md"
              >
                Save & Connect
              </button>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="py-3 px-4 bg-gray-800 text-gray-300 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
