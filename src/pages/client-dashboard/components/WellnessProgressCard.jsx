import React from 'react';
import Icon from '../../../components/AppIcon';

const WellnessProgressCard = ({ type, value, unit, trend, aiInsight, color = 'primary' }) => {
  const getIcon = () => {
    switch (type) {
      case 'weight':
        return 'Scale';
      case 'mood':
        return 'Smile';
      case 'sleep':
        return 'Moon';
      case 'steps':
        return 'Footprints';
      case 'water':
        return 'Droplets';
      default:
        return 'Activity';
    }
  };

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (type === 'weight') {
      return trend < 0 ? 'text-success' : trend > 0 ? 'text-warning' : 'text-text-muted';
    }
    return trend > 0 ? 'text-success' : trend < 0 ? 'text-warning' : 'text-text-muted';
  };

  const getColorClasses = () => {
    const colorMap = {
      primary: 'bg-primary-50 border-primary-200 text-primary-700',
      success: 'bg-success-50 border-success-200 text-success-700',
      warning: 'bg-warning-50 border-warning-200 text-warning-700',
      accent: 'bg-accent-50 border-accent-200 text-accent-700'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className={`rounded-card p-4 border ${getColorClasses()} breathing-card`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getIcon()} size={20} className="text-current" />
          <span className="text-sm font-medium capitalize">{type}</span>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={14} />
          <span className="text-xs font-medium">
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-heading font-bold text-text-primary">
            {value}
          </span>
          <span className="text-sm text-text-secondary">{unit}</span>
        </div>
      </div>

      {aiInsight && (
        <div className="bg-background rounded-button p-3 border border-border-light">
          <div className="flex items-start space-x-2">
            <Icon name="Sparkles" size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">
              {aiInsight}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessProgressCard;