import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionButton = ({ action, onClick, className = '' }) => {
  const getActionConfig = () => {
    switch (action) {
      case 'find_trainers':
        return {
          icon: 'Search',
          label: 'Find Trainers',
          description: 'Discover wellness professionals',
          variant: 'primary',
          color: 'bg-primary-50 border-primary-200 text-primary-700'
        };
      case 'schedule_session':
        return {
          icon: 'Calendar',
          label: 'Schedule Session',
          description: 'Book your next appointment',
          variant: 'success',
          color: 'bg-success-50 border-success-200 text-success-700'
        };
      case 'track_progress':
        return {
          icon: 'TrendingUp',
          label: 'Track Progress',
          description: 'Monitor your wellness journey',
          variant: 'accent',
          color: 'bg-accent-50 border-accent-200 text-accent-700'
        };
      case 'community':
        return {
          icon: 'Users',
          label: 'Community',
          description: 'Connect with others',
          variant: 'secondary',
          color: 'bg-secondary-50 border-secondary-200 text-secondary-700'
        };
      default:
        return {
          icon: 'Plus',
          label: 'Action',
          description: 'Quick action',
          variant: 'outline',
          color: 'bg-surface-100 border-border text-text-primary'
        };
    }
  };

  const config = getActionConfig();

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-card border ${config.color} breathing-card micro-interaction text-left ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-button bg-background border border-border-light flex items-center justify-center">
          <Icon name={config.icon} size={20} className="text-current" />
        </div>
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-current">
            {config.label}
          </h4>
          <p className="text-xs opacity-80 mt-1">
            {config.description}
          </p>
        </div>
        <Icon name="ChevronRight" size={16} className="text-current opacity-60" />
      </div>
    </button>
  );
};

export default QuickActionButton;