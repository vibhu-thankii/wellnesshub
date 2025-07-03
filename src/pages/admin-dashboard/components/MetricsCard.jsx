import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    const colors = {
      primary: 'bg-primary-50 text-primary-700 border-primary-200',
      success: 'bg-success-50 text-success-700 border-success-200',
      warning: 'bg-warning-50 text-warning-700 border-warning-200',
      error: 'bg-error-50 text-error-700 border-error-200'
    };
    return colors[color] || colors.primary;
  };

  const getIconColor = () => {
    const colors = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="breathing-card bg-background border border-border rounded-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-heading font-bold text-text-primary">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={changeType === 'increase' ? 'text-success-600' : 'text-error-600'} 
              />
              <span className={`text-sm font-medium ml-1 ${
                changeType === 'increase' ? 'text-success-600' : 'text-error-600'
              }`}>
                {change}
              </span>
              <span className="text-sm text-text-muted ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-button flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} className={getIconColor()} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;