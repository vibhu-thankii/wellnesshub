import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [notifications, setNotifications] = useState({
    users: 5,
    content: 12,
    reports: 3,
    system: 1
  });

  const quickActionItems = [
    {
      id: 'add-user',
      title: 'Add New User',
      description: 'Create a new client or trainer account',
      icon: 'UserPlus',
      color: 'primary',
      action: () => console.log('Add new user')
    },
    {
      id: 'review-content',
      title: 'Review Content',
      description: 'Moderate flagged posts and comments',
      icon: 'Shield',
      color: 'warning',
      badge: notifications.content,
      action: () => console.log('Review content')
    },
    {
      id: 'approve-trainers',
      title: 'Approve Trainers',
      description: 'Review pending trainer applications',
      icon: 'CheckCircle',
      color: 'success',
      badge: notifications.users,
      action: () => console.log('Approve trainers')
    },
    {
      id: 'system-health',
      title: 'System Health',
      description: 'Check platform status and performance',
      icon: 'Activity',
      color: 'info',
      badge: notifications.system,
      action: () => console.log('System health')
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Generate reports and analytics',
      icon: 'Download',
      color: 'secondary',
      action: () => console.log('Export data')
    },
    {
      id: 'send-announcement',
      title: 'Send Announcement',
      description: 'Broadcast message to all users',
      icon: 'Megaphone',
      color: 'accent',
      action: () => console.log('Send announcement')
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server CPU usage is at 85%. Consider scaling resources.',
      timestamp: '5 minutes ago',
      action: 'View Details'
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2:00 AM EST.',
      timestamp: '1 hour ago',
      action: 'Reschedule'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully.',
      timestamp: '2 hours ago',
      action: 'View Logs'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 hover:bg-primary-100 border-primary-200 text-primary-700',
      success: 'bg-success-50 hover:bg-success-100 border-success-200 text-success-700',
      warning: 'bg-warning-50 hover:bg-warning-100 border-warning-200 text-warning-700',
      error: 'bg-error-50 hover:bg-error-100 border-error-200 text-error-700',
      info: 'bg-primary-50 hover:bg-primary-100 border-primary-200 text-primary-700',
      secondary: 'bg-secondary-50 hover:bg-secondary-100 border-secondary-200 text-secondary-700',
      accent: 'bg-accent-50 hover:bg-accent-100 border-accent-200 text-accent-700'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconColor = (color) => {
    const colorMap = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600',
      info: 'text-primary-600',
      secondary: 'text-secondary-600',
      accent: 'text-accent-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getAlertIcon = (type) => {
    const iconMap = {
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle',
      error: 'XCircle'
    };
    return iconMap[type] || 'Info';
  };

  const getAlertColor = (type) => {
    const colorMap = {
      warning: 'text-warning-600',
      info: 'text-primary-600',
      success: 'text-success-600',
      error: 'text-error-600'
    };
    return colorMap[type] || 'text-primary-600';
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-background border border-border rounded-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Quick Actions</h3>
          <Button variant="outline" size="sm" iconName="Settings">
            Customize
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`relative p-4 border rounded-button text-left transition-all duration-200 micro-interaction ${getColorClasses(item.color)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-button flex items-center justify-center bg-background border border-border-light`}>
                  <Icon name={item.icon} size={20} className={getIconColor(item.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary mb-1">{item.title}</h4>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
              
              {item.badge && (
                <div className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {item.badge > 9 ? '9+' : item.badge}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-background border border-border rounded-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">System Alerts</h3>
          <Button variant="outline" size="sm" iconName="Bell">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 border border-border rounded-button hover:bg-surface-50 transition-colors"
            >
              <Icon 
                name={getAlertIcon(alert.type)} 
                size={20} 
                className={getAlertColor(alert.type)} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-text-primary">{alert.title}</h4>
                  <span className="text-xs text-text-muted">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
                <button className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-2 micro-interaction">
                  {alert.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Status */}
      <div className="bg-background border border-border rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Platform Status</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-success-50 border border-success-200 rounded-button">
            <Icon name="Server" size={24} className="text-success-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-success-700">API Status</div>
            <div className="text-xs text-success-600">Operational</div>
          </div>
          
          <div className="text-center p-3 bg-success-50 border border-success-200 rounded-button">
            <Icon name="Database" size={24} className="text-success-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-success-700">Database</div>
            <div className="text-xs text-success-600">Healthy</div>
          </div>
          
          <div className="text-center p-3 bg-warning-50 border border-warning-200 rounded-button">
            <Icon name="Zap" size={24} className="text-warning-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-warning-700">Performance</div>
            <div className="text-xs text-warning-600">Degraded</div>
          </div>
          
          <div className="text-center p-3 bg-success-50 border border-success-200 rounded-button">
            <Icon name="Shield" size={24} className="text-success-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-success-700">Security</div>
            <div className="text-xs text-success-600">Secure</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;