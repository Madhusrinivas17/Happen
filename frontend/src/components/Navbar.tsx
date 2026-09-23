import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
  UserCheck,
  LogOut,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isCoordinator } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
    
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0b1120]/95 backdrop-blur-md text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Happen */}
        <Link
          to="/"
          id="navbar-brand-logo"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-95"
        >
          <BrandLogo size="md" />
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            to="/"
            id="nav-link-home"
            className={`transition-colors ${
              isActive('/') ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/events"
            id="nav-link-events"
            className={`transition-colors ${
              isActive('/events') ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Events
          </Link>
          <Link
            to="/events?category=Other"
            id="nav-link-clubs"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Clubs
          </Link>
          <a
            href="#about-section"
            onClick={(e) => {
              if (location.pathname !== '/') {
                navigate('/#about-section');
              }
            }}
            id="nav-link-about"
            className="text-slate-300 hover:text-white transition-colors"
          >
            About
          </a>
        </nav>

        {/* Right Section: Search icon & Login pill */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/events')}
            id="nav-search-button"
            className="rounded-full p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Search campus events"
          >
            <Search className="h-4 w-4" />
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    id="nav-admin-dashboard-btn"
                    className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors"
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <Link
                    to="/coordinator"
                    id="nav-admin-coord-view-btn"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    title="View Coordinator Portal"
                  >
                    <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Coordinator View</span>
                  </Link>
                </>
              )}

              {isCoordinator && (
                <Link
                  to="/coordinator"
                  id="nav-coord-dashboard-btn"
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Coordinator Dashboard</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                id="nav-logout-btn"
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              id="nav-login-btn"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => navigate('/events')}
            className="rounded-full p-2 text-slate-300 hover:bg-slate-800"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b1120] px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Events
          </Link>
          <Link
            to="/events?category=Other"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Clubs
          </Link>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-1 text-xs text-slate-400">
                  Signed in as: <span className="text-white font-semibold">{user.name}</span>
                </div>
                {isAdmin && (
                  <>
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white text-center"
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/coordinator"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 text-center"
                    >
                      Coordinator View
                    </Link>
                  </>
                )}
                {isCoordinator && (
                  <Link
                    to="/coordinator"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white text-center"
                  >
                    Coordinator Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-300 text-center hover:bg-slate-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-full bg-indigo-600 px-5 py-2 text-center text-xs font-semibold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
