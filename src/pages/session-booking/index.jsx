import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingFlowNavigation from '../../components/ui/BookingFlowNavigation';
import ServiceSelectionStep from './components/ServiceSelectionStep';
import DateTimeSelectionStep from './components/DateTimeSelectionStep';
import BookingConfirmationStep from './components/BookingConfirmationStep';
import BookingSuccessStep from './components/BookingSuccessStep';
import BookingProgressIndicator from './components/BookingProgressIndicator';
import BookingSummaryCard from './components/BookingSummaryCard';

const SessionBooking = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock trainer data - in real app, this would come from props or API
  const trainer = {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Certified Yoga Instructor & Mindfulness Coach",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    bio: "Passionate about helping people find balance and inner peace through yoga and mindfulness practices.",
    experience: "8+ years",
    certifications: ["RYT-500", "Mindfulness-Based Stress Reduction"]
  };

  const bookingSteps = [
    {
      title: "Select Service",
      description: "Choose your wellness service",
      icon: "ShoppingCart"
    },
    {
      title: "Date & Time",
      description: "Pick your preferred schedule",
      icon: "Calendar"
    },
    {
      title: "Confirmation",
      description: "Review and confirm booking",
      icon: "CreditCard"
    },
    {
      title: "Success",
      description: "Booking completed",
      icon: "CheckCircle"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if coming from trainer profile with pre-selected service
    const urlParams = new URLSearchParams(location.search);
    const serviceId = urlParams.get('service');
    const step = urlParams.get('step');
    
    if (step) {
      const stepIndex = parseInt(step);
      if (stepIndex >= 0 && stepIndex < bookingSteps.length) {
        setCurrentStep(stepIndex);
      }
    }
  }, [location.search]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleDateTimeSelect = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

  const handleNextStep = () => {
    if (currentStep < bookingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Update URL to reflect current step
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('step', (currentStep + 1).toString());
      window.history.pushState({}, '', newUrl);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // Update URL to reflect current step
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('step', (currentStep - 1).toString());
      window.history.pushState({}, '', newUrl);
    }
  };

  const handleBookingConfirm = (details) => {
    setIsLoading(true);
    
    // Mock booking confirmation process
    setTimeout(() => {
      setBookingDetails(details);
      setCurrentStep(3); // Move to success step
      setIsLoading(false);
      
      // Update URL
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('step', '3');
      window.history.pushState({}, '', newUrl);
    }, 2000);
  };

  const handleReturnToDashboard = () => {
    navigate('/client-dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ServiceSelectionStep
            trainer={trainer}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
            onNext={handleNextStep}
          />
        );
      case 1:
        return (
          <DateTimeSelectionStep
            selectedService={selectedService}
            selectedDateTime={selectedDateTime}
            onDateTimeSelect={handleDateTimeSelect}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 2:
        return (
          <BookingConfirmationStep
            trainer={trainer}
            selectedService={selectedService}
            selectedDateTime={selectedDateTime}
            onConfirm={handleBookingConfirm}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <BookingSuccessStep
            bookingDetails={bookingDetails}
            onReturnToDashboard={handleReturnToDashboard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      
      <div className="pt-16">
        <BookingFlowNavigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Indicator */}
          <BookingProgressIndicator
            currentStep={currentStep}
            totalSteps={bookingSteps.length}
            steps={bookingSteps}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Booking Flow */}
            <div className="lg:col-span-3">
              <div className="bg-background border border-border rounded-card p-6 lg:p-8">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                      Processing Your Booking
                    </h3>
                    <p className="text-text-secondary">
                      Please wait while we confirm your session...
                    </p>
                  </div>
                ) : (
                  renderCurrentStep()
                )}
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <BookingSummaryCard
                trainer={trainer}
                selectedService={selectedService}
                selectedDateTime={selectedDateTime}
                isVisible={currentStep < 3} // Hide on success step
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;