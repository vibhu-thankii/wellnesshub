import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userRole, setUserRole] = useState('client');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Mock role detection based on current path
    const path = location.pathname;
    if (path.includes('trainer-dashboard')) {
      setUserRole('trainer');
    } else if (path.includes('admin-dashboard')) {
      setUserRole('admin');
    } else {
      setUserRole('client');
    }
  }, [location.pathname]);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const getNavigationItems = () => {
    const baseItems = {
      client: [
        { label: 'Dashboard', path: '/client-dashboard', icon: 'LayoutDashboard' },
        { label: 'Find Trainers', path: '/trainer-discovery', icon: 'Search' },
        { label: 'My Sessions', path: '/session-booking', icon: 'Calendar' },
        { label: 'Community', path: '/community', icon: 'Users' },
        { label: 'Profile', path: '/profile', icon: 'User' }
      ],
      trainer: [
        { label: 'Dashboard', path: '/trainer-dashboard', icon: 'LayoutDashboard' },
        { label: 'My Clients', path: '/clients', icon: 'Users' },
        { label: 'Schedule', path: '/schedule', icon: 'Calendar' },
        { label: 'Community', path: '/community', icon: 'MessageCircle' },
        { label: 'Profile', path: '/trainer-profile', icon: 'User' }
      ],
      admin: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
        { label: 'User Management', path: '/users', icon: 'Users' },
        { label: 'Content Moderation', path: '/moderation', icon: 'Shield' },
        { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
        { label: 'Settings', path: '/settings', icon: 'Settings' }
      ]
    };
    return baseItems[userRole] || baseItems.client;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/client-dashboard')}
              className="flex items-center space-x-3 micro-interaction"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" opacity="0.6" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-semibold text-text-primary">
                  WellnessHub
                </h1>
                <p className="text-xs text-text-secondary font-caption">
                  Your wellness journey
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {getNavigationItems().map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-medium transition-all duration-200 micro-interaction ${
                  isActivePath(item.path)
                    ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-surface-100 border border-border rounded-button px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <Icon
                name="ChevronDown"
                size={14}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors micro-interaction">
              <Icon name="Bell" size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <button className="flex items-center space-x-2 p-2 rounded-button hover:bg-surface-100 transition-colors micro-interaction">
              <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-700" />
              </div>
              <Icon name="ChevronDown" size={14} className="text-text-secondary hidden sm:block" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors micro-interaction"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border-light">
          <div className="px-4 py-3 space-y-1">
            {getNavigationItems().map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-button text-left transition-all duration-200 micro-interaction ${
                  isActivePath(item.path)
                    ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-border-light mt-3">
              <div className="flex items-center space-x-3 px-3 py-2">
                <Icon name="Globe" size={18} className="text-text-secondary" />
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="flex-1 bg-surface-100 border border-border rounded-button px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;