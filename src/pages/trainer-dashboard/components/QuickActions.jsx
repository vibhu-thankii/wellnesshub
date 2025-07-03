import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Update Availability",
      description: "Manage your schedule",
      icon: "Calendar",
      action: () => navigate('/trainer-profile'),
      variant: "primary"
    },
    {
      id: 2,
      title: "Manage Services",
      description: "Edit offerings & rates",
      icon: "Settings",
      action: () => navigate('/trainer-profile'),
      variant: "outline"
    },
    {
      id: 3,
      title: "View Messages",
      description: "Client communications",
      icon: "MessageCircle",
      action: () => console.log('View messages'),
      variant: "outline",
      badge: 3
    },
    {
      id: 4,
      title: "Profile Settings",
      description: "Update your profile",
      icon: "User",
      action: () => navigate('/trainer-profile'),
      variant: "outline"
    }
  ];

  return (
    <div className="quick-actions bg-surface-50 rounded-card p-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="w-full flex items-center justify-between p-3 rounded-button hover:bg-surface-100 transition-all duration-200 micro-interaction group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-button flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <Icon 
                  name={action.icon} 
                  size={18} 
                  className="text-primary-600"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-text-primary">
                  {action.title}
                </p>
                <p className="text-xs text-text-secondary">
                  {action.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {action.badge && (
                <span className="bg-error text-error-foreground text-xs rounded-full px-2 py-0.5 font-medium">
                  {action.badge}
                </span>
              )}
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-muted group-hover:text-text-secondary transition-colors"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;