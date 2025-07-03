import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingConfirmationStep = ({ 
  trainer, 
  selectedService, 
  selectedDateTime, 
  onConfirm, 
  onBack 
}) => {
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const savedPaymentMethods = [
    {
      id: 1,
      type: 'visa',
      lastFour: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8888',
      expiryDate: '09/26',
      isDefault: false
    }
  ];

  const calculateTotal = () => {
    const servicePrice = selectedService?.price || 0;
    const processingFee = Math.round(servicePrice * 0.029); // 2.9% processing fee
    const total = servicePrice + processingFee;
    
    return {
      servicePrice,
      processingFee,
      total
    };
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowAddPayment(false);
  };

  const handleAddNewPayment = () => {
    // Mock adding new payment method
    const newMethod = {
      id: Date.now(),
      type: 'visa',
      lastFour: newPaymentMethod.cardNumber.slice(-4),
      expiryDate: newPaymentMethod.expiryDate,
      isDefault: false
    };
    
    setSelectedPaymentMethod(newMethod);
    setShowAddPayment(false);
    setNewPaymentMethod({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
  };

  const handleConfirmBooking = async () => {
    if (!selectedPaymentMethod || !agreeToTerms) return;
    
    setIsProcessing(true);
    
    // Mock booking process
    setTimeout(() => {
      onConfirm({
        service: selectedService,
        dateTime: selectedDateTime,
        paymentMethod: selectedPaymentMethod,
        specialRequests,
        total: calculateTotal().total,
        bookingId: `WH-${Date.now()}`
      });
      setIsProcessing(false);
    }, 2000);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const pricing = calculateTotal();

  return (
    <div className="booking-confirmation-step">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-text-secondary font-body">
          Review your session details and complete your booking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Summary */}
          <div className="bg-background border border-border rounded-card p-6">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Booking Summary
            </h3>
            
            <div className="space-y-4">
              {/* Trainer Info */}
              <div className="flex items-center space-x-4 p-4 bg-surface-50 rounded-button">
                <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center overflow-hidden">
                  {trainer?.avatar ? (
                    <Image
                      src={trainer.avatar}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={24} className="text-primary-700" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-medium text-text-primary">
                    {trainer?.name || 'Sarah Johnson'}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {trainer?.specialty || 'Certified Yoga Instructor'}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm text-text-secondary">
                      {trainer?.rating || '4.9'} ({trainer?.reviewCount || '127'} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Service</label>
                  <p className="text-text-primary font-medium">{selectedService?.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Duration</label>
                  <p className="text-text-primary font-medium">
                    {selectedService?.duration >= 60 
                      ? `${Math.floor(selectedService.duration / 60)}h ${selectedService.duration % 60 > 0 ? `${selectedService.duration % 60}m` : ''}`
                      : `${selectedService?.duration}m`
                    }
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Date</label>
                  <p className="text-text-primary font-medium">
                    {selectedDateTime?.date?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Time</label>
                  <p className="text-text-primary font-medium">
                    {selectedDateTime?.time && formatTime(selectedDateTime.time)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-background border border-border rounded-card p-6">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Special Requests
            </h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-secondary">
                Any specific needs or preferences? (Optional)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Let your trainer know about any injuries, preferences, or special requirements..."
                className="w-full p-3 border border-border rounded-button text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={4}
              />
              <p className="text-xs text-text-muted">
                Your trainer will review this information before the session
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-background border border-border rounded-card p-6">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Payment Method
            </h3>
            
            <div className="space-y-3">
              {/* Saved Payment Methods */}
              {savedPaymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center space-x-3 p-4 border rounded-button cursor-pointer transition-all duration-200 micro-interaction ${
                    selectedPaymentMethod?.id === method.id
                      ? 'border-primary-500 bg-primary-50' :'border-border hover:border-border-strong'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedPaymentMethod?.id === method.id}
                    onChange={() => handlePaymentMethodSelect(method)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <Icon name={getPaymentMethodIcon(method.type)} size={20} className="text-text-secondary" />
                    <div className="flex-1">
                      <p className="text-text-primary font-medium">
                        •••• •••• •••• {method.lastFour}
                      </p>
                      <p className="text-text-secondary text-sm">
                        Expires {method.expiryDate}
                      </p>
                    </div>
                    {method.isDefault && (
                      <span className="bg-success-100 text-success-700 px-2 py-1 rounded-button text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>
                </label>
              ))}

              {/* Add New Payment Method */}
              {!showAddPayment ? (
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="flex items-center space-x-3 p-4 border border-dashed border-border-strong rounded-button text-text-secondary hover:text-text-primary hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 micro-interaction w-full"
                >
                  <Icon name="Plus" size={20} />
                  <span>Add new payment method</span>
                </button>
              ) : (
                <div className="p-4 border border-border rounded-button bg-surface-50">
                  <h4 className="font-medium text-text-primary mb-3">Add New Card</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <Input
                        type="text"
                        placeholder="Cardholder Name"
                        value={newPaymentMethod.cardholderName}
                        onChange={(e) => setNewPaymentMethod(prev => ({
                          ...prev,
                          cardholderName: e.target.value
                        }))}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        type="text"
                        placeholder="Card Number"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => setNewPaymentMethod(prev => ({
                          ...prev,
                          cardNumber: e.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={newPaymentMethod.expiryDate}
                        onChange={(e) => setNewPaymentMethod(prev => ({
                          ...prev,
                          expiryDate: e.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="CVV"
                        value={newPaymentMethod.cvv}
                        onChange={(e) => setNewPaymentMethod(prev => ({
                          ...prev,
                          cvv: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddNewPayment}
                      disabled={!newPaymentMethod.cardNumber || !newPaymentMethod.expiryDate || !newPaymentMethod.cvv}
                    >
                      Add Card
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddPayment(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-background border border-border rounded-card p-6">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Terms & Conditions
            </h3>
            
            <div className="space-y-4">
              <div className="bg-surface-50 p-4 rounded-button text-sm text-text-secondary">
                <h4 className="font-medium text-text-primary mb-2">Cancellation Policy</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Free cancellation up to 24 hours before the session</li>
                  <li>50% refund for cancellations within 24 hours</li>
                  <li>No refund for no-shows or same-day cancellations</li>
                </ul>
              </div>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-0.5"
                />
                <span className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                    Cancellation Policy
                  </a>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar - Pricing Summary */}
        <div className="lg:col-span-1">
          <div className="bg-background border border-border rounded-card p-6 sticky top-24">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Pricing Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Service fee</span>
                <span className="text-text-primary font-medium">${pricing.servicePrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Processing fee</span>
                <span className="text-text-primary font-medium">${pricing.processingFee}</span>
              </div>
              <div className="border-t border-border-light pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-heading font-medium text-text-primary">Total</span>
                  <span className="text-lg font-heading font-semibold text-text-primary">${pricing.total}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                variant="primary"
                onClick={handleConfirmBooking}
                disabled={!selectedPaymentMethod || !agreeToTerms || isProcessing}
                className="w-full"
                iconName={isProcessing ? undefined : "CreditCard"}
                iconPosition="left"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Confirm & Pay'
                )}
              </Button>
              
              <p className="text-xs text-text-muted text-center">
                Your payment is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ChevronLeft"
          iconPosition="left"
          disabled={isProcessing}
        >
          Back to Date & Time
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmationStep;