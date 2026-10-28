import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock, ChefHat, CheckCircle2, DollarSign, Eye, ArrowRight } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import type { OrderStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const preparingOrders = orders.filter(o => o.status === 'Preparing').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;

  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Preparing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Ready':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase">Restaurant Admin Dashboard</h1>
          <p className="text-xs text-gray-500 font-bold mt-1">Live order activity and operational metrics</p>
        </div>
        <Link
          to="/admin/orders"
          className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold px-5 py-2.5 rounded-2xl text-xs uppercase flex items-center gap-1.5 shadow-md self-start"
        >
          <span>Manage All Orders</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-black uppercase">Total Orders</span>
            <ShoppingCart className="w-5 h-5 text-gray-900" />
          </div>
          <span className="text-3xl font-black text-gray-900 block">{totalOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-black uppercase">Pending</span>
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-amber-600 block">{pendingOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-xs font-black uppercase">Preparing</span>
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-purple-600 block">{preparingOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-black uppercase">Delivered</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-emerald-600 block">{completedOrders}</span>
        </div>

        <div className="bg-gray-950 text-white p-5 rounded-3xl border border-amber-500/30 shadow-md space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-black uppercase">Sales Volume</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black text-amber-400 block">Rs. {totalSales}</span>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900 uppercase">Recent incoming Orders</h2>
          <Link to="/admin/orders" className="text-xs font-bold text-amber-600 hover:underline">
            View All ({orders.length})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Items</th>
                <th className="pb-3 px-3">Total</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {recentOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-black text-gray-900">
                    #{ord.orderNumber}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-extrabold text-gray-900 block">{ord.customerName}</span>
                    <span className="text-[10px] text-gray-500">{ord.customerPhone}</span>
                  </td>
                  <td className="py-3 px-3 max-w-xs truncate">
                    {ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                  </td>
                  <td className="py-3 px-3 font-black text-gray-900">
                    Rs. {ord.total}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-extrabold text-gray-900">{ord.orderType}</span>
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={ord.status}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-black border focus:outline-none cursor-pointer ${getStatusBadge(ord.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      to={`/admin/orders/${ord.id}`}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl inline-block transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
