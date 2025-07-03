import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const BookingSuccessStep = ({ bookingDetails, onReturnToDashboard }) => {
  const [isAddingToCalendar, setIsAddingToCalendar] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddToCalendar = () => {
    setIsAddingToCalendar(true);
    
    // Mock calendar integration
    setTimeout(() => {
      setCalendarAdded(true);
      setIsAddingToCalendar(false);
    }, 1500);
  };

  const handleMessageTrainer = () => {
    // Navigate to messaging interface
    console.log('Opening trainer message interface');
  };

  const handleDownloadReceipt = () => {
    // Mock receipt download
    console.log('Downloading receipt for booking:', bookingDetails.bookingId);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="booking-success-step">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-success-600" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-text-secondary font-body max-w-md mx-auto">
          Your wellness session has been successfully booked. You'll receive a confirmation email shortly.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-background border border-border rounded-card p-6 shadow-soft">
          {/* Booking Reference */}
          <div className="text-center mb-6 p-4 bg-primary-50 rounded-button">
            <p className="text-sm text-primary-700 font-medium mb-1">Booking Reference</p>
            <p className="text-xl font-heading font-semibold text-primary-800">
              {bookingDetails.bookingId}
            </p>
          </div>

          {/* Session Details */}
          <div className="space-y-6">
            {/* Trainer Info */}
            <div className="flex items-center space-x-4 p-4 bg-surface-50 rounded-button">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center overflow-hidden">
                <Icon name="User" size={24} className="text-primary-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-medium text-text-primary">
                  Sarah Johnson
                </h3>
                <p className="text-text-secondary text-sm">
                  Certified Yoga Instructor
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm text-text-secondary">4.9 (127 reviews)</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMessageTrainer}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Message
              </Button>
            </div>

            {/* Session Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Service
                  </label>
                  <p className="text-text-primary font-medium">
                    {bookingDetails.service?.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Duration
                  </label>
                  <p className="text-text-primary font-medium">
                    {formatDuration(bookingDetails.service?.duration)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Total Paid
                  </label>
                  <p className="text-text-primary font-medium text-lg">
                    ${bookingDetails.total}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Date
                  </label>
                  <p className="text-text-primary font-medium">
                    {bookingDetails.dateTime?.date?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Time
                  </label>
                  <p className="text-text-primary font-medium">
                    {bookingDetails.dateTime?.time && formatTime(bookingDetails.dateTime.time)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Payment Method
                  </label>
                  <p className="text-text-primary font-medium">
                    •••• •••• •••• {bookingDetails.paymentMethod?.lastFour}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {bookingDetails.specialRequests && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Special Requests
                </label>
                <div className="p-3 bg-surface-50 rounded-button">
                  <p className="text-text-primary text-sm">
                    {bookingDetails.specialRequests}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="primary"
            onClick={handleAddToCalendar}
            disabled={isAddingToCalendar || calendarAdded}
            iconName={calendarAdded ? "Check" : isAddingToCalendar ? undefined : "Calendar"}
            iconPosition="left"
            className="w-full"
          >
            {isAddingToCalendar ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                <span>Adding...</span>
              </div>
            ) : calendarAdded ? (
              'Added to Calendar'
            ) : (
              'Add to Calendar'
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDownloadReceipt}
            iconName="Download"
            iconPosition="left"
            className="w-full"
          >
            Download Receipt
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 pt-4">
          <Button
            variant="ghost"
            onClick={onReturnToDashboard}
            iconName="LayoutDashboard"
            iconPosition="left"
          >
            Return to Dashboard
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/trainer-discovery'}
            iconName="Search"
            iconPosition="left"
          >
            Book Another Session
          </Button>
        </div>
      </div>

      {/* Important Information */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-warning-50 border border-warning-200 rounded-card p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-warning-800 mb-2">
                Important Reminders
              </h4>
              <ul className="text-sm text-warning-700 space-y-1">
                <li>• You'll receive a confirmation email with session details</li>
                <li>• Your trainer will contact you 24 hours before the session</li>
                <li>• Free cancellation up to 24 hours before your session</li>
                <li>• Please arrive 5 minutes early for your session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="text-center mt-8 pt-6 border-t border-border-light">
        <p className="text-sm text-text-secondary mb-3">
          Need help or have questions about your booking?
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Live Chat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            iconPosition="left"
          >
            Call Support
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Mail"
            iconPosition="left"
          >
            Email Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessStep;