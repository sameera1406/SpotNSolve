import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { isAuthenticated, profile, logout, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const userNavItems = [
    { path: '/home', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/report', label: 'Report' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/gamification', label: 'Gamification' },
    { path: '/contact', label: 'Contact' }
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Admin Dashboard' },
    { path: '/features', label: 'Features' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/gamification', label: 'Analytics' },
    { path: '/contact', label: 'Contact' }
  ];

  const navItems = role === 'admin' ? adminNavItems : userNavItems;

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={role === 'admin' ? '/admin' : '/home'} className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Spot & Solve
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-700 text-sm">
              Welcome, <span className="font-semibold text-blue-600">{profile?.username}</span>
              {role === 'admin' && <span className="ml-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Admin</span>}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="px-3 text-gray-700 text-sm mb-2">
                Welcome, <span className="font-semibold text-blue-600">{profile?.username}</span>
                {role === 'admin' && <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Admin</span>}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;