import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummaryCard = ({ 
  trainer, 
  selectedService, 
  selectedDateTime, 
  isVisible = true 
}) => {
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const calculateTotal = () => {
    if (!selectedService?.price) return 0;
    const servicePrice = selectedService.price;
    const processingFee = Math.round(servicePrice * 0.029);
    return servicePrice + processingFee;
  };

  if (!isVisible) return null;

  return (
    <div className="booking-summary-card bg-background border border-border rounded-card p-6 sticky top-24">
      <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
        Booking Summary
      </h3>

      {/* Trainer Info */}
      <div className="flex items-center space-x-3 mb-4 p-3 bg-surface-50 rounded-button">
        <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center overflow-hidden">
          {trainer?.avatar ? (
            <Image
              src={trainer.avatar}
              alt={trainer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="User" size={20} className="text-primary-700" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary truncate">
            {trainer?.name || 'Sarah Johnson'}
          </h4>
          <p className="text-sm text-text-secondary truncate">
            {trainer?.specialty || 'Certified Yoga Instructor'}
          </p>
        </div>
      </div>

      {/* Service Details */}
      <div className="space-y-3 mb-4">
        {selectedService && (
          <div className="p-3 border border-border rounded-button">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-text-primary text-sm">
                {selectedService.name}
              </h4>
              <span className="text-lg font-semibold text-text-primary">
                ${selectedService.price}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{formatDuration(selectedService.duration)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Tag" size={12} />
                <span>{selectedService.category}</span>
              </div>
            </div>
          </div>
        )}

        {selectedDateTime && (
          <div className="p-3 border border-border rounded-button">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Calendar" size={14} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                Session Date & Time
              </span>
            </div>
            <div className="text-sm text-text-secondary">
              <p>
                {selectedDateTime.date?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="font-medium text-text-primary">
                {formatTime(selectedDateTime.time)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      {selectedService && (
        <div className="border-t border-border-light pt-4">
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Service fee</span>
              <span className="text-text-primary">${selectedService.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Processing fee</span>
              <span className="text-text-primary">
                ${Math.round(selectedService.price * 0.029)}
              </span>
            </div>
          </div>
          <div className="border-t border-border-light pt-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-medium text-text-primary">Total</span>
              <span className="text-xl font-heading font-semibold text-text-primary">
                ${calculateTotal()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-button">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} className="text-success-600" />
          <span className="text-xs text-success-700 font-medium">
            Secure booking with 24h cancellation
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;