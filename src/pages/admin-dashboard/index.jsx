import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AdminToolsNavigation from '../../components/ui/AdminToolsNavigation';
import MetricsCard from './components/MetricsCard';
import UserManagementTable from './components/UserManagementTable';
import TrainerApplications from './components/TrainerApplications';
import ContentModeration from './components/ContentModeration';
import AnalyticsCharts from './components/AnalyticsCharts';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Simulate data loading
    setTimeout(() => {
      setDashboardData({
        totalUsers: 2847,
        activeTrainers: 156,
        monthlyRevenue: 89420,
        platformGrowth: 24.5,
        pendingApplications: 12,
        flaggedContent: 8,
        systemHealth: 'good'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const metricsData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Active Trainers',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'success'
    },
    {
      title: 'Monthly Revenue',
      value: '$89,420',
      change: '+24.3%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'warning'
    },
    {
      title: 'Platform Growth',
      value: '24.5%',
      change: '+3.1%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'success'
    }
  ];

  const tabContent = {
    overview: {
      title: 'Platform Overview',
      description: 'Executive summary and key performance indicators'
    },
    users: {
      title: 'User Management',
      description: 'Manage clients, trainers, and user accounts'
    },
    applications: {
      title: 'Trainer Applications',
      description: 'Review and approve new trainer applications'
    },
    moderation: {
      title: 'Content Moderation',
      description: 'Review flagged content and reported users'
    },
    analytics: {
      title: 'Analytics & Reports',
      description: 'Platform insights and performance metrics'
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleExportData = () => {
    console.log('Exporting dashboard data...');
    // Mock export functionality
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>

            {/* Quick Actions and Analytics */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <AnalyticsCharts />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>
          </div>
        );

      case 'users':
        return <UserManagementTable />;

      case 'applications':
        return <TrainerApplications />;

      case 'moderation':
        return <ContentModeration />;

      case 'analytics':
        return <AnalyticsCharts />;

      default:
        return (
          <div className="text-center py-12">
            <Icon name="AlertCircle" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              Content Not Available
            </h3>
            <p className="text-text-secondary">
              The requested section is currently under development.
            </p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Header />
        <AdminToolsNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <AdminToolsNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                {tabContent[activeTab]?.title || 'Admin Dashboard'}
              </h1>
              <p className="text-text-secondary mt-1">
                {tabContent[activeTab]?.description || 'Platform management and oversight'}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
              >
                Export Data
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/admin-dashboard/settings')}
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mt-6 border-b border-border-light">
            {Object.entries(tabContent).map(([key, content]) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`px-4 py-2 border-b-2 font-medium text-sm transition-all duration-200 micro-interaction ${
                  activeTab === key
                    ? 'border-primary text-primary-700 bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong'
                }`}
              >
                {content.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border-light">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-text-secondary">
              <p>&copy; {new Date().getFullYear()} WellnessHub Admin Console. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <button className="hover:text-text-primary micro-interaction">
                System Status
              </button>
              <button className="hover:text-text-primary micro-interaction">
                Documentation
              </button>
              <button className="hover:text-text-primary micro-interaction">
                Support
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;