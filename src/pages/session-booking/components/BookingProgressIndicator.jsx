import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') {
      return 'Check';
    }
    return step.icon;
  };

  return (
    <div className="booking-progress-indicator">
      {/* Mobile Progress Bar */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-surface-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium text-text-primary">
            {steps[currentStep]?.title}
          </p>
          <p className="text-xs text-text-secondary">
            {steps[currentStep]?.description}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          
          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                  ${status === 'completed' 
                    ? 'bg-success text-success-foreground' 
                    : status === 'active' ?'bg-primary text-primary-foreground' :'bg-surface-200 text-text-muted'
                  }
                `}>
                  <Icon 
                    name={getStepIcon(step, status)} 
                    size={16} 
                  />
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    status === 'active' ?'text-primary-700' 
                      : status === 'completed' ?'text-success-700' :'text-text-secondary'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-text-muted mt-1 max-w-24">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-colors duration-200
                  ${index < currentStep ? 'bg-success' : 'bg-surface-300'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Navigation Breadcrumb */}
      <div className="hidden lg:flex items-center space-x-2 text-sm text-text-secondary mb-6">
        <span>Home</span>
        <Icon name="ChevronRight" size={12} />
        <span>Trainer Profile</span>
        <Icon name="ChevronRight" size={12} />
        <span className="text-text-primary font-medium">Book Session</span>
        {currentStep > 0 && (
          <>
            <Icon name="ChevronRight" size={12} />
            <span className="text-primary-600 font-medium">
              {steps[currentStep]?.title}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingProgressIndicator;