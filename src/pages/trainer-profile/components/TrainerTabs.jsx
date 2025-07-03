import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TrainerTabs = ({ activeTab, onTabChange, reviewCount, servicesCount }) => {
  const tabs = [
    {
      id: 'about',
      label: 'About',
      icon: 'User',
      count: null
    },
    {
      id: 'services',
      label: 'Services',
      icon: 'Briefcase',
      count: servicesCount
    },
    {
      id: 'availability',
      label: 'Availability',
      icon: 'Calendar',
      count: null
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'Star',
      count: reviewCount
    }
  ];

  return (
    <div className="trainer-tabs bg-background border-b border-border-light sticky top-16 z-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Desktop Tabs */}
        <div className="hidden sm:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-200 micro-interaction ${
                activeTab === tab.id
                  ? 'border-primary text-primary-700 bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong'
              }`}
            >
              <Icon
                name={tab.icon}
                size={16}
                className={activeTab === tab.id ? 'text-primary-600' : 'text-text-muted'}
              />
              <span className="font-medium">{tab.label}</span>
              {tab.count && (
                <span className="bg-surface-200 text-text-secondary text-xs rounded-full px-2 py-0.5 font-medium">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Tabs */}
        <div className="sm:hidden">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center p-3 rounded-button transition-all duration-200 micro-interaction ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
              >
                <Icon
                  name={tab.icon}
                  size={18}
                  className={activeTab === tab.id ? 'text-primary-600' : 'text-text-muted'}
                />
                <span className="text-xs font-medium mt-1">{tab.label}</span>
                {tab.count && (
                  <span className="text-xs text-text-muted mt-0.5">({tab.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerTabs;