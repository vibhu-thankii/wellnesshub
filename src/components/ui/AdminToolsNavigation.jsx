import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminToolsNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState({
    users: 5,
    content: 12,
    reports: 3,
    system: 1
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Determine active tab from URL
    const path = location.pathname;
    if (path.includes('users')) {
      setActiveTab('users');
    } else if (path.includes('content')) {
      setActiveTab('content');
    } else if (path.includes('analytics')) {
      setActiveTab('analytics');
    } else if (path.includes('reports')) {
      setActiveTab('reports');
    } else if (path.includes('settings')) {
      setActiveTab('settings');
    } else {
      setActiveTab('overview');
    }
  }, [location.pathname]);

  const adminTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      path: '/admin-dashboard',
      description: 'Platform summary and key metrics',
      badge: null
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      path: '/admin-dashboard/users',
      description: 'Manage clients, trainers, and admins',
      badge: notifications.users
    },
    {
      id: 'content',
      label: 'Content Moderation',
      icon: 'Shield',
      path: '/admin-dashboard/content',
      description: 'Review and moderate platform content',
      badge: notifications.content
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/admin-dashboard/analytics',
      description: 'Platform insights and performance',
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'FileText',
      path: '/admin-dashboard/reports',
      description: 'Generate and view reports',
      badge: notifications.reports
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'Settings',
      path: '/admin-dashboard/settings',
      description: 'Platform configuration and settings',
      badge: notifications.system
    }
  ];

  const quickActions = [
    {
      label: 'Add New User',
      icon: 'UserPlus',
      action: () => navigate('/admin-dashboard/users/new'),
      variant: 'primary'
    },
    {
      label: 'Review Content',
      icon: 'Eye',
      action: () => navigate('/admin-dashboard/content/pending'),
      variant: 'warning',
      badge: notifications.content
    },
    {
      label: 'Export Data',
      icon: 'Download',
      action: () => handleExportData(),
      variant: 'outline'
    },
    {
      label: 'System Health',
      icon: 'Activity',
      action: () => navigate('/admin-dashboard/system'),
      variant: 'success'
    }
  ];

  const handleTabChange = (tabId) => {
    const tab = adminTabs.find(t => t.id === tabId);
    if (tab) {
      setActiveTab(tabId);
      navigate(tab.path);
    }
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting data...');
  };

  const getTotalNotifications = () => {
    return Object.values(notifications).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="admin-tools-navigation bg-surface-50 border-b border-border-light">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-error rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={18} className="text-error-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  Admin Console
                </h2>
                <p className="text-xs text-text-secondary font-caption">
                  Platform management and oversight
                </p>
              </div>
            </div>
            
            {getTotalNotifications() > 0 && (
              <div className="flex items-center space-x-2 bg-warning-50 border border-warning-200 rounded-button px-3 py-1">
                <Icon name="AlertTriangle" size={14} className="text-warning-600" />
                <span className="text-xs text-warning-700 font-medium">
                  {getTotalNotifications()} items need attention
                </span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                onClick={action.action}
                iconName={action.icon}
                iconPosition="left"
                className="relative"
              >
                {action.label}
                {action.badge && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {action.badge > 9 ? '9+' : action.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary micro-interaction"
          >
            <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center px-6 overflow-x-auto">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 micro-interaction whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary-700 bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong'
                }`}
              >
                <Icon 
                  name={tab.icon} 
                  size={16} 
                  className={activeTab === tab.id ? 'text-primary-600' : 'text-text-muted'}
                />
                <span className="font-medium text-sm">{tab.label}</span>
                
                {tab.badge && (
                  <span className="bg-error text-error-foreground text-xs rounded-full px-2 py-0.5 font-medium ml-1">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden px-4 py-3">
            <div className="grid grid-cols-2 gap-2">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex flex-col items-center p-3 rounded-button transition-all duration-200 micro-interaction ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon 
                      name={tab.icon} 
                      size={16} 
                      className={activeTab === tab.id ? 'text-primary-600' : 'text-text-muted'}
                    />
                    {tab.badge && (
                      <span className="bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                        {tab.badge > 9 ? '9+' : tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-xs text-center">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Description */}
          <div className="px-6 py-2 bg-surface-100 border-t border-border-light">
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary font-body">
                {adminTabs.find(tab => tab.id === activeTab)?.description}
              </p>
              
              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center space-x-2 text-xs text-text-muted font-caption">
                <span>Admin</span>
                <Icon name="ChevronRight" size={12} />
                <span className="text-text-secondary">
                  {adminTabs.find(tab => tab.id === activeTab)?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden px-4 py-3 border-t border-border-light bg-surface-100">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  onClick={action.action}
                  iconName={action.icon}
                  iconPosition="left"
                  className="relative text-xs"
                  fullWidth
                >
                  {action.label}
                  {action.badge && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {action.badge > 9 ? '9+' : action.badge}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminToolsNavigation;