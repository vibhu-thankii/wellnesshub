import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BookingFlowNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Determine current step based on URL or booking state
    const path = location.pathname;
    if (path.includes('trainer-profile')) {
      setCurrentStep(1);
    } else if (path.includes('session-booking')) {
      setCurrentStep(2);
    } else if (path.includes('booking-confirmation')) {
      setCurrentStep(4);
    }
  }, [location.pathname]);

  const bookingSteps = [
    {
      id: 1,
      label: 'Select Trainer',
      description: 'Choose your wellness professional',
      icon: 'UserCheck',
      path: '/trainer-profile',
      required: true
    },
    {
      id: 2,
      label: 'Choose Service',
      description: 'Select session type and duration',
      icon: 'Calendar',
      path: '/session-booking',
      required: true
    },
    {
      id: 3,
      label: 'Schedule Time',
      description: 'Pick your preferred date and time',
      icon: 'Clock',
      path: '/session-booking?step=schedule',
      required: true
    },
    {
      id: 4,
      label: 'Confirmation',
      description: 'Review and confirm your booking',
      icon: 'CheckCircle',
      path: '/booking-confirmation',
      required: false
    }
  ];

  const handleStepNavigation = (stepId) => {
    const step = bookingSteps.find(s => s.id === stepId);
    if (step && (stepId <= currentStep + 1 || completedSteps.includes(stepId))) {
      navigate(step.path);
      setCurrentStep(stepId);
    }
  };

  const handleNextStep = () => {
    if (currentStep < bookingSteps.length) {
      const nextStep = currentStep + 1;
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(nextStep);
      
      const nextStepData = bookingSteps.find(s => s.id === nextStep);
      if (nextStepData) {
        navigate(nextStepData.path);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      
      const prevStepData = bookingSteps.find(s => s.id === prevStep);
      if (prevStepData) {
        navigate(prevStepData.path);
      }
    }
  };

  const isStepAccessible = (stepId) => {
    return stepId <= currentStep + 1 || completedSteps.includes(stepId);
  };

  const isStepCompleted = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const isStepActive = (stepId) => {
    return stepId === currentStep;
  };

  const getStepStatus = (step) => {
    if (isStepCompleted(step.id)) return 'completed';
    if (isStepActive(step.id)) return 'active';
    if (isStepAccessible(step.id)) return 'accessible';
    return 'disabled';
  };

  return (
    <div className="booking-flow-navigation bg-surface-50 border-b border-border-light">
      {/* Progress Header */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Book Your Session
            </h2>
            <p className="text-sm text-text-secondary font-body mt-1">
              Step {currentStep} of {bookingSteps.length}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-32 bg-surface-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / bookingSteps.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-text-secondary font-mono">
              {Math.round((currentStep / bookingSteps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Desktop Step Navigation */}
        <div className="hidden lg:flex items-center justify-between">
          {bookingSteps.map((step, index) => {
            const status = getStepStatus(step);
            
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepNavigation(step.id)}
                  disabled={status === 'disabled'}
                  className={`group flex flex-col items-center p-4 rounded-button transition-all duration-200 micro-interaction ${
                    status === 'active' ?'bg-primary-100 text-primary-700' 
                      : status === 'completed' ?'bg-success-100 text-success-700 hover:bg-success-200'
                      : status === 'accessible' ?'text-text-secondary hover:text-text-primary hover:bg-surface-100' :'text-text-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-200 ${
                    status === 'active' ?'bg-primary text-primary-foreground'
                      : status === 'completed' ?'bg-success text-success-foreground'
                      : status === 'accessible' ?'bg-surface-200 group-hover:bg-surface-300' :'bg-surface-200'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium">{step.label}</div>
                    <div className="text-xs text-text-muted mt-1 max-w-24">
                      {step.description}
                    </div>
                  </div>
                </button>
                
                {index < bookingSteps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition-colors duration-200 ${
                    completedSteps.includes(step.id) ? 'bg-success' : 'bg-surface-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {bookingSteps.map((step) => {
              const status = getStepStatus(step);
              
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepNavigation(step.id)}
                  disabled={status === 'disabled'}
                  className={`flex items-center space-x-3 p-3 rounded-button whitespace-nowrap transition-all duration-200 micro-interaction ${
                    status === 'active' ?'bg-primary-100 text-primary-700' 
                      : status === 'completed' ?'bg-success-100 text-success-700'
                      : status === 'accessible' ?'text-text-secondary hover:text-text-primary hover:bg-surface-100' :'text-text-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                    status === 'active' ?'bg-primary text-primary-foreground'
                      : status === 'completed' ?'bg-success text-success-foreground' :'bg-surface-200'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      <Icon name={step.icon} size={14} />
                    )}
                  </div>
                  
                  <div className="text-left">
                    <div className="text-sm font-medium">{step.label}</div>
                    <div className="text-xs text-text-muted">{step.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-light">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary font-caption">
              {bookingSteps.find(s => s.id === currentStep)?.label}
            </span>
          </div>
          
          <Button
            variant="primary"
            onClick={handleNextStep}
            disabled={currentStep === bookingSteps.length}
            iconName="ChevronRight"
            iconPosition="right"
          >
            {currentStep === bookingSteps.length ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlowNavigation;