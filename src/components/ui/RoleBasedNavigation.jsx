import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userRole, setUserRole] = useState('client');
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Role detection based on current path
    const path = location.pathname;
    if (path.includes('trainer-dashboard') || path.includes('trainer-profile')) {
      setUserRole('trainer');
    } else if (path.includes('admin-dashboard')) {
      setUserRole('admin');
    } else {
      setUserRole('client');
    }
  }, [location.pathname]);

  const getNavigationConfig = () => {
    const configs = {
      client: {
        primary: [
          { 
            label: 'Dashboard', 
            path: '/client-dashboard', 
            icon: 'LayoutDashboard',
            description: 'Your wellness overview'
          },
          { 
            label: 'Find Trainers', 
            path: '/trainer-discovery', 
            icon: 'Search',
            description: 'Discover wellness professionals'
          },
          { 
            label: 'My Sessions', 
            path: '/session-booking', 
            icon: 'Calendar',
            description: 'Manage your bookings',
            badge: 2
          }
        ],
        secondary: [
          { label: 'Community', path: '/community', icon: 'Users' },
          { label: 'Progress', path: '/progress', icon: 'TrendingUp' },
          { label: 'Profile', path: '/profile', icon: 'User' }
        ]
      },
      trainer: [
        { 
          label: 'Dashboard', 
          path: '/trainer-dashboard', 
          icon: 'LayoutDashboard',
          description: 'Practice overview'
        },
        { 
          label: 'My Profile', 
          path: '/trainer-profile', 
          icon: 'User',
          description: 'Professional profile'
        },
        { 
          label: 'Client Sessions', 
          path: '/trainer-sessions', 
          icon: 'Calendar',
          description: 'Manage appointments',
          badge: 5
        },
        { 
          label: 'Community', 
          path: '/community', 
          icon: 'MessageCircle',
          description: 'Connect with clients'
        }
      ],
      admin: [
        { 
          label: 'Dashboard', 
          path: '/admin-dashboard', 
          icon: 'LayoutDashboard',
          description: 'Platform overview'
        },
        { 
          label: 'User Management', 
          path: '/admin-users', 
          icon: 'Users',
          description: 'Manage all users'
        },
        { 
          label: 'Content Moderation', 
          path: '/admin-moderation', 
          icon: 'Shield',
          description: 'Review content',
          badge: 12
        },
        { 
          label: 'Analytics', 
          path: '/admin-analytics', 
          icon: 'BarChart3',
          description: 'Platform insights'
        }
      ]
    };
    return configs[userRole] || configs.client;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const getRoleDisplayName = () => {
    const roleNames = {
      client: 'Client Portal',
      trainer: 'Trainer Hub',
      admin: 'Admin Console'
    };
    return roleNames[userRole];
  };

  const navigationConfig = getNavigationConfig();
  const isPrimarySecondaryStructure = userRole === 'client';

  return (
    <nav className="role-based-navigation bg-surface-50 border-r border-border-light min-h-screen">
      {/* Role Header */}
      <div className="p-4 border-b border-border-light">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-medium text-text-primary text-sm">
              {getRoleDisplayName()}
            </h2>
            <p className="text-xs text-text-secondary font-caption mt-1">
              {userRole === 'client' && 'Your wellness journey'}
              {userRole === 'trainer' && 'Professional tools'}
              {userRole === 'admin' && 'Platform management'}
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-1 text-text-secondary hover:text-text-primary transition-colors micro-interaction"
          >
            <Icon name={isExpanded ? "ChevronLeft" : "ChevronRight"} size={16} />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className={`p-4 space-y-6 ${!isExpanded ? 'hidden lg:block' : 'block'}`}>
        {isPrimarySecondaryStructure ? (
          <>
            {/* Primary Navigation */}
            <div>
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3 font-caption">
                Primary
              </h3>
              <div className="space-y-1">
                {navigationConfig.primary.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`group w-full flex items-center justify-between p-3 rounded-button text-left transition-all duration-200 micro-interaction ${
                      isActivePath(item.path)
                        ? 'bg-primary-100 text-primary-700 shadow-soft'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={item.icon} 
                        size={18} 
                        className={isActivePath(item.path) ? 'text-primary-600' : 'text-text-muted group-hover:text-text-secondary'}
                      />
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-text-muted mt-0.5">{item.description}</div>
                        )}
                      </div>
                    </div>
                    {item.badge && (
                      <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Navigation */}
            <div>
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3 font-caption">
                More
              </h3>
              <div className="space-y-1">
                {navigationConfig.secondary.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`group w-full flex items-center space-x-3 p-3 rounded-button text-left transition-all duration-200 micro-interaction ${
                      isActivePath(item.path)
                        ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                    }`}
                  >
                    <Icon 
                      name={item.icon} 
                      size={16} 
                      className={isActivePath(item.path) ? 'text-primary-600' : 'text-text-muted group-hover:text-text-secondary'}
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Single Level Navigation for Trainer/Admin */
          <div className="space-y-1">
            {navigationConfig.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`group w-full flex items-center justify-between p-3 rounded-button text-left transition-all duration-200 micro-interaction ${
                  isActivePath(item.path)
                    ? 'bg-primary-100 text-primary-700 shadow-soft'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    className={isActivePath(item.path) ? 'text-primary-600' : 'text-text-muted group-hover:text-text-secondary'}
                  />
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-text-muted mt-0.5">{item.description}</div>
                    )}
                  </div>
                </div>
                {item.badge && (
                  <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Role Switch Indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-surface-200 rounded-button p-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              userRole === 'client' ? 'bg-success' : 
              userRole === 'trainer' ? 'bg-warning' : 'bg-error'
            }`} />
            <span className="text-xs text-text-secondary font-caption">
              Active as {userRole}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RoleBasedNavigation;