import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, UtensilsCrossed, ArrowLeft, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Order Management', path: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Menu & Products', path: '/admin/products', icon: <UtensilsCrossed className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-gray-950 text-white shrink-0 border-r border-gray-900 flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-gray-900 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Cheese Bites Logo"
                className="w-10 h-10 object-contain rounded-xl border border-amber-500/30"
              />
              <div>
                <span className="font-black text-base text-white tracking-tight uppercase block leading-none">
                  CHEESE BITES
                </span>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block mt-0.5">
                  ADMIN POS PORTAL
                </span>
              </div>
            </Link>
          </div>

          {/* User Badge */}
          {user && (
            <div className="px-4 pt-4 pb-2">
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-3 flex items-center space-x-3">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">{user.role} active</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map(item => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase transition-all ${
                    active
                      ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-900 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-800 transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Customer Site</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-4 py-2.5 rounded-xl text-xs font-bold border border-red-500/20 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of POS</span>
          </button>

          <div className="text-[10px] text-center text-gray-500 font-semibold pt-1">
            System Online • Local Sync Ready
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

