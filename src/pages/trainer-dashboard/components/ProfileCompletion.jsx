import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [completedItems, setCompletedItems] = useState([
    'basic-info',
    'profile-photo',
    'services'
  ]);

  const checklistItems = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Name, contact details, and location',
      icon: 'User',
      completed: true,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'profile-photo',
      title: 'Profile Photo',
      description: 'Professional headshot for your profile',
      icon: 'Camera',
      completed: true,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'bio',
      title: 'Professional Bio',
      description: 'Tell clients about your background and approach',
      icon: 'FileText',
      completed: false,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'certifications',
      title: 'Certifications & Qualifications',
      description: 'Upload your professional certifications',
      icon: 'Award',
      completed: false,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'services',
      title: 'Services & Pricing',
      description: 'Define your service offerings and rates',
      icon: 'DollarSign',
      completed: true,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'availability',
      title: 'Availability Schedule',
      description: 'Set your working hours and availability',
      icon: 'Calendar',
      completed: false,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'portfolio',
      title: 'Portfolio & Gallery',
      description: 'Showcase your work with photos and videos',
      icon: 'Image',
      completed: false,
      action: () => navigate('/trainer-profile')
    },
    {
      id: 'payment',
      title: 'Payment Information',
      description: 'Bank details for receiving payments',
      icon: 'CreditCard',
      completed: false,
      action: () => navigate('/trainer-profile')
    }
  ];

  const completionPercentage = Math.round((completedItems.length / checklistItems.length) * 100);

  const handleCompleteItem = (itemId) => {
    if (!completedItems.includes(itemId)) {
      setCompletedItems(prev => [...prev, itemId]);
    }
    const item = checklistItems.find(item => item.id === itemId);
    if (item && item.action) {
      item.action();
    }
  };

  const getProgressColor = () => {
    if (completionPercentage >= 80) return 'success';
    if (completionPercentage >= 50) return 'warning';
    return 'error';
  };

  const getProgressColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-error text-error-foreground'
    };
    return colorMap[color] || colorMap.error;
  };

  const getProgressBarColor = (color) => {
    const colorMap = {
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error'
    };
    return colorMap[color] || colorMap.error;
  };

  return (
    <div className="profile-completion breathing-card bg-background border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Profile Completion
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Complete your profile to attract more clients
          </p>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-3 py-1 rounded-button text-sm font-medium ${getProgressColorClasses(getProgressColor())}`}>
            {completionPercentage}% Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-surface-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ease-out ${getProgressBarColor(getProgressColor())}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-2">
          <span>Getting Started</span>
          <span>Professional Profile</span>
        </div>
      </div>

      {/* Completion Message */}
      {completionPercentage === 100 ? (
        <div className="bg-success-50 border border-success-200 rounded-button p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-success-800">Profile Complete!</h4>
              <p className="text-sm text-success-700">
                Your profile is now optimized to attract clients.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary-50 border border-primary-200 rounded-button p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Target" size={16} className="text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-primary-800">
                {checklistItems.length - completedItems.length} items remaining
              </h4>
              <p className="text-sm text-primary-700">
                Complete your profile to increase client bookings by up to 3x.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklistItems.map((item) => {
          const isCompleted = completedItems.includes(item.id);
          
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-button border transition-all duration-200 ${
                isCompleted
                  ? 'bg-success-50 border-success-200' :'bg-surface-50 border-border hover:bg-surface-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-button flex items-center justify-center ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : 'bg-surface-200 text-text-muted'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={item.icon} size={16} />
                  )}
                </div>
                <div>
                  <h4 className={`font-medium ${
                    isCompleted ? 'text-success-800' : 'text-text-primary'
                  }`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm ${
                    isCompleted ? 'text-success-700' : 'text-text-secondary'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
              
              {!isCompleted && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => handleCompleteItem(item.id)}
                >
                  Complete
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      {completionPercentage < 100 && (
        <div className="mt-6 pt-6 border-t border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Ready to boost your profile?
              </p>
              <p className="text-xs text-text-secondary">
                Complete profiles get 3x more client inquiries
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => navigate('/trainer-profile')}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletion;