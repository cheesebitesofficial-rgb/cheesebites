import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthUser } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const LOCAL_STORAGE_KEY = 'cheese_bites_admin_session_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state to localStorage', e);
    }
  }, [user]);

  const login = (username: string, password: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Default admin & staff credentials
    if ((cleanUser === 'admin' && cleanPass === 'cheesebites123') || (cleanUser === 'admin' && cleanPass === 'admin123')) {
      const authUser: AuthUser = {
        username: 'admin',
        name: 'Manager / Head Cashier',
        role: 'admin',
      };
      setUser(authUser);
      return true;
    } else if (cleanUser === 'staff' && (cleanPass === 'staff123' || cleanPass === 'cheesebites123')) {
      const authUser: AuthUser = {
        username: 'staff',
        name: 'POS Terminal Staff',
        role: 'staff',
      };
      setUser(authUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
