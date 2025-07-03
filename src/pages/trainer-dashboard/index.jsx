import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all dashboard components
import MetricsOverview from './components/MetricsOverview';
import QuickActions from './components/QuickActions';
import UpcomingSessions from './components/UpcomingSessions';
import BookingRequests from './components/BookingRequests';
import RevenueTracking from './components/RevenueTracking';
import ClientManagement from './components/ClientManagement';
import ProfileCompletion from './components/ProfileCompletion';
import CalendarWidget from './components/CalendarWidget';

const TrainerDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState({
    messages: 3,
    bookings: 4,
    payments: 1
  });
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Mock notification updates
    const interval = setInterval(() => {
      setNotifications(prev => ({
        ...prev,
        messages: Math.floor(Math.random() * 5),
        bookings: Math.floor(Math.random() * 6) + 1
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const dashboardTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Dashboard summary and key metrics'
    },
    {
      id: 'sessions',
      label: 'Sessions',
      icon: 'Calendar',
      description: 'Manage your upcoming and past sessions'
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: 'Users',
      description: 'Client management and communication'
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: 'DollarSign',
      description: 'Earnings and financial analytics'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: 'CalendarDays',
      description: 'Schedule and availability management'
    }
  ];

  const handleQuickSessionStart = () => {
    console.log('Starting quick session...');
    // Mock quick session functionality
  };

  const handleToggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <MetricsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <UpcomingSessions />
                <ProfileCompletion />
              </div>
              <div className="space-y-6">
                <QuickActions />
                <BookingRequests />
              </div>
            </div>
          </div>
        );
      case 'sessions':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UpcomingSessions />
            </div>
            <div>
              <BookingRequests />
            </div>
          </div>
        );
      case 'clients':
        return <ClientManagement />;
      case 'revenue':
        return <RevenueTracking />;
      case 'calendar':
        return <CalendarWidget />;
      default:
        return (
          <div className="space-y-6">
            <MetricsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <UpcomingSessions />
                <ProfileCompletion />
              </div>
              <div className="space-y-6">
                <QuickActions />
                <BookingRequests />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Trainer Status Bar */}
        <div className="bg-surface-50 border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-heading font-semibold text-text-primary">
                      Welcome back, Dr. Sarah
                    </h1>
                    <p className="text-sm text-text-secondary">
                      Certified Yoga Instructor & Wellness Coach
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}`} />
                  <span className="text-sm text-text-secondary">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                  <button
                    onClick={handleToggleOnlineStatus}
                    className="text-xs text-primary-600 hover:text-primary-700 underline micro-interaction"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="flex items-center space-x-2">
                  {notifications.messages > 0 && (
                    <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors micro-interaction">
                      <Icon name="MessageCircle" size={20} />
                      <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {notifications.messages}
                      </span>
                    </button>
                  )}
                  
                  {notifications.bookings > 0 && (
                    <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors micro-interaction">
                      <Icon name="Calendar" size={20} />
                      <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {notifications.bookings}
                      </span>
                    </button>
                  )}
                </div>

                {/* Quick Session Button */}
                <Button
                  variant="primary"
                  iconName="Video"
                  iconPosition="left"
                  onClick={handleQuickSessionStart}
                >
                  Quick Session
                </Button>

                {/* Profile Button */}
                <Button
                  variant="outline"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => navigate('/trainer-profile')}
                >
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-background border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 micro-interaction whitespace-nowrap ${
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
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <div className="flex flex-col space-y-2">
            <Button
              variant="primary"
              size="lg"
              iconName="Video"
              onClick={handleQuickSessionStart}
              className="rounded-full w-14 h-14 shadow-lg"
            />
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              onClick={() => console.log('Open messages')}
              className="rounded-full w-14 h-14 shadow-lg bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;