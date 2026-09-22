import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (email?: string, password?: string, role?: UserRole) => void;
  loginAs: (role: 'admin' | 'coordinator') => void;
  loginWithCredentials: (email: string, role?: 'admin' | 'coordinator') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCoordinator: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'college_events_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const loginAs = (role: 'admin' | 'coordinator') => {
    if (role === 'admin') {
      setUser({
        role: 'admin',
        name: 'Dean / Administrator',
        email: 'admin@college.edu',
        department: 'Campus Administration',
      });
    } else {
      setUser({
        role: 'coordinator',
        name: 'Campus Event Coordinator',
        email: 'coordinator@college.edu',
        department: 'Student Activities Council',
      });
    }
  };

  const loginWithCredentials = (email: string, preferredRole?: 'admin' | 'coordinator'): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.includes('admin') || preferredRole === 'admin') {
      loginAs('admin');
      return true;
    } else {
      loginAs('coordinator');
      return true;
    }
  };

  const login = (email?: string, _password?: string, role?: UserRole) => {
    if (role === 'admin' || (email && email.toLowerCase().includes('admin'))) {
      loginAs('admin');
    } else {
      loginAs('coordinator');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAs,
        loginWithCredentials,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isCoordinator: user?.role === 'coordinator',
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
