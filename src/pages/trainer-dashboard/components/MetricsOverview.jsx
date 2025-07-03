import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = () => {
  const metrics = [
    {
      id: 1,
      title: "Today\'s Sessions",
      value: "6",
      change: "+2 from yesterday",
      changeType: "positive",
      icon: "Calendar",
      color: "primary"
    },
    {
      id: 2,
      title: "Pending Requests",
      value: "4",
      change: "2 new today",
      changeType: "neutral",
      icon: "Clock",
      color: "warning"
    },
    {
      id: 3,
      title: "This Week\'s Revenue",
      value: "$1,240",
      change: "+18% from last week",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      id: 4,
      title: "Active Clients",
      value: "28",
      change: "+3 this month",
      changeType: "positive",
      icon: "Users",
      color: "accent"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary-100 text-primary-700 border-primary-200",
      warning: "bg-warning-100 text-warning-700 border-warning-200",
      success: "bg-success-100 text-success-700 border-success-200",
      accent: "bg-accent-100 text-accent-700 border-accent-200"
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      primary: "text-primary-600",
      warning: "text-warning-600",
      success: "text-success-600",
      accent: "text-accent-600"
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="metrics-overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`breathing-card border rounded-card p-4 ${getColorClasses(metric.color)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {metric.value}
                </p>
                <p className={`text-xs font-caption ${
                  metric.changeType === 'positive' ?'text-success-600' 
                    : metric.changeType === 'negative' ?'text-error-600' :'text-text-muted'
                }`}>
                  {metric.change}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-button flex items-center justify-center ${getColorClasses(metric.color)}`}>
                <Icon 
                  name={metric.icon} 
                  size={20} 
                  className={getIconColorClasses(metric.color)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsOverview;