import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, User, KeyRound, AlertCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve redirect location if user was redirected from a protected route
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      setLoading(false);

      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid username or password. Please check your credentials.');
      }
    }, 400);
  };

  const handleFillDemo = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-amber-400 bg-gray-900/80 hover:bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Customer Site</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-gray-900 border border-amber-500/30 rounded-3xl shadow-xl shadow-amber-500/10 mb-4">
            <img
              src="/logo.png"
              alt="Cheese Bites Logo"
              className="w-16 h-16 object-contain rounded-2xl border border-amber-500/40"
            />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            Cheese <span className="text-amber-400">Bites</span> POS
          </h2>
          <p className="mt-2 text-xs font-extrabold text-amber-400/80 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Restricted Staff & POS Access
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 relative">
            
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 font-medium leading-relaxed">{error}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div>
                <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-2">
                  Staff Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-amber-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter staff username"
                    className="block w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-2">
                  Access Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-amber-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="block w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-2xl text-xs font-black uppercase tracking-wider text-gray-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Login to POS Terminal
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Fill Helper */}
            <div className="mt-8 pt-6 border-t border-gray-800/80">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Quick Staff Credentials
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo('admin', 'cheesebites123')}
                  className="px-3 py-2 bg-gray-950 hover:bg-gray-800 border border-amber-500/30 rounded-xl text-[11px] font-bold text-amber-400 text-left transition-colors"
                >
                  <span className="block font-black text-white">Admin / Manager</span>
                  <span className="text-[10px] text-gray-400 font-mono">admin / cheesebites123</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('staff', 'staff123')}
                  className="px-3 py-2 bg-gray-950 hover:bg-gray-800 border border-gray-800 rounded-xl text-[11px] font-bold text-gray-300 text-left transition-colors"
                >
                  <span className="block font-black text-white">POS Cashier</span>
                  <span className="text-[10px] text-gray-400 font-mono">staff / staff123</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-[11px] text-gray-500 font-semibold">
          Protected System • Authorized Cheese Bites Staff Only
        </p>
      </div>
    </div>
  );
};
