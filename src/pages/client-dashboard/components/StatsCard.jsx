import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, unit, icon, trend, color = 'primary' }) => {
  const getColorClasses = () => {
    const colorMap = {
      primary: 'bg-primary-50 border-primary-200 text-primary-700',
      success: 'bg-success-50 border-success-200 text-success-700',
      warning: 'bg-warning-50 border-warning-200 text-warning-700',
      accent: 'bg-accent-50 border-accent-200 text-accent-700'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-text-muted';
  };

  return (
    <div className={`rounded-card p-4 border ${getColorClasses()} breathing-card`}>
      <div className="flex items-center justify-between mb-2">
        <Icon name={icon} size={20} className="text-current" />
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon 
              name={trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus'} 
              size={14} 
            />
            <span className="text-xs font-medium">
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-1">
        <div className="flex items-baseline space-x-1">
          <span className="text-xl font-heading font-bold text-text-primary">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-text-secondary">{unit}</span>
          )}
        </div>
      </div>
      
      <p className="text-xs text-current opacity-80">
        {title}
      </p>
    </div>
  );
};

export default StatsCard;