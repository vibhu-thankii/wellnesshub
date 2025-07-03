import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BookingModal = ({ isOpen, onClose, trainer, selectedService, selectedTimeSlot, onConfirmBooking }) => {
  const [bookingData, setBookingData] = useState({
    serviceId: selectedService?.id || '',
    date: selectedTimeSlot?.date || '',
    time: selectedTimeSlot?.time || '',
    sessionType: 'online',
    notes: '',
    contactPreference: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onConfirmBooking({
        ...bookingData,
        trainerId: trainer.id,
        trainerName: trainer.name,
        serviceName: selectedService?.name,
        price: selectedService?.price
      });
      onClose();
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Book Session with {trainer.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary rounded-button hover:bg-surface-100 micro-interaction"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Booking Summary */}
          <div className="bg-primary-50 border border-primary-200 rounded-button p-4">
            <h3 className="font-medium text-primary-700 mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-600">Service:</span>
                <span className="text-primary-700 font-medium">
                  {selectedService?.name || 'Select a service'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-600">Date:</span>
                <span className="text-primary-700 font-medium">
                  {bookingData.date ? formatDate(bookingData.date) : 'Select a date'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-600">Time:</span>
                <span className="text-primary-700 font-medium">
                  {bookingData.time ? formatTime(bookingData.time) : 'Select a time'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-600">Duration:</span>
                <span className="text-primary-700 font-medium">
                  {selectedService?.duration || 0} minutes
                </span>
              </div>
              <div className="flex justify-between border-t border-primary-200 pt-2 mt-2">
                <span className="text-primary-600 font-medium">Total:</span>
                <span className="text-primary-700 font-semibold text-lg">
                  ${selectedService?.price || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Service *
            </label>
            <select
              value={bookingData.serviceId}
              onChange={(e) => handleInputChange('serviceId', e.target.value)}
              required
              className="w-full bg-background border border-border rounded-button px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Choose a service...</option>
              {trainer.services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price} ({service.duration} min)
                </option>
              ))}
            </select>
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Session Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-3 p-3 border border-border rounded-button cursor-pointer hover:bg-surface-50 micro-interaction">
                <input
                  type="radio"
                  name="sessionType"
                  value="online"
                  checked={bookingData.sessionType === 'online'}
                  onChange={(e) => handleInputChange('sessionType', e.target.value)}
                  className="text-primary focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2">
                  <Icon name="Video" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">Online Session</span>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-border rounded-button cursor-pointer hover:bg-surface-50 micro-interaction">
                <input
                  type="radio"
                  name="sessionType"
                  value="in-person"
                  checked={bookingData.sessionType === 'in-person'}
                  onChange={(e) => handleInputChange('sessionType', e.target.value)}
                  className="text-primary focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">In-Person</span>
                </div>
              </label>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Special Notes or Requests
            </label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any specific goals, health conditions, or preferences you'd like to share..."
              rows={4}
              className="w-full bg-background border border-border rounded-button px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          {/* Contact Preference */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-3 p-3 border border-border rounded-button cursor-pointer hover:bg-surface-50 micro-interaction">
                <input
                  type="radio"
                  name="contactPreference"
                  value="email"
                  checked={bookingData.contactPreference === 'email'}
                  onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                  className="text-primary focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">Email</span>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-border rounded-button cursor-pointer hover:bg-surface-50 micro-interaction">
                <input
                  type="radio"
                  name="contactPreference"
                  value="phone"
                  checked={bookingData.contactPreference === 'phone'}
                  onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                  className="text-primary focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">Phone</span>
                </div>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-surface-50 rounded-button p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 text-primary focus:ring-primary-500"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                  Cancellation Policy
                </a>
                . I understand that sessions can be cancelled up to 24 hours in advance.
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-light">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;