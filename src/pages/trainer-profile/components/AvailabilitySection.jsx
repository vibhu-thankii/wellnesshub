import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilitySection = ({ availability, onSelectTimeSlot }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(0);

  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isDateSelected = (date) => {
    return selectedDate.toDateString() === date.toDateString();
  };

  const getAvailabilityForDate = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return availability.weeklySchedule[dayName] || [];
  };

  const weekDates = getWeekDates(selectedWeek);
  const selectedDateAvailability = getAvailabilityForDate(selectedDate);

  return (
    <div className="availability-section space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Available Time Slots
        </h3>
        <div className="text-sm text-text-secondary">
          Timezone: {availability.timezone}
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-surface-50 rounded-button p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedWeek(selectedWeek - 1)}
          iconName="ChevronLeft"
          iconPosition="left"
          disabled={selectedWeek <= 0}
        >
          Previous Week
        </Button>
        
        <div className="text-sm font-medium text-text-primary">
          {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {' '}
          {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedWeek(selectedWeek + 1)}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next Week
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const dayAvailability = getAvailabilityForDate(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isPast = date < new Date().setHours(0, 0, 0, 0);
          const hasSlots = dayAvailability.length > 0;
          
          return (
            <button
              key={index}
              onClick={() => !isPast && setSelectedDate(date)}
              disabled={isPast || !hasSlots}
              className={`p-3 rounded-button text-center transition-all duration-200 micro-interaction ${
                isDateSelected(date)
                  ? 'bg-primary text-primary-foreground'
                  : hasSlots && !isPast
                  ? 'bg-background border border-border-light hover:bg-surface-100' :'bg-surface-100 text-text-muted cursor-not-allowed'
              } ${isToday ? 'ring-2 ring-accent' : ''}`}
            >
              <div className="text-xs font-medium mb-1">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm font-semibold">
                {date.getDate()}
              </div>
              {hasSlots && !isPast && (
                <div className="text-xs mt-1 opacity-75">
                  {dayAvailability.length} slots
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Time Slots for Selected Date */}
      <div>
        <h4 className="text-md font-heading font-semibold text-text-primary mb-4">
          Available Times for {formatDate(selectedDate)}
        </h4>
        
        {selectedDateAvailability.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {selectedDateAvailability.map((slot, index) => (
              <button
                key={index}
                onClick={() => onSelectTimeSlot(selectedDate, slot)}
                className={`p-3 rounded-button text-center transition-all duration-200 micro-interaction ${
                  slot.available
                    ? 'bg-success-50 border border-success-200 text-success-700 hover:bg-success-100' :'bg-surface-100 border border-border-light text-text-muted cursor-not-allowed'
                }`}
                disabled={!slot.available}
              >
                <div className="font-medium">
                  {formatTime(slot.startTime)}
                </div>
                <div className="text-xs mt-1">
                  {slot.duration} min
                </div>
                {!slot.available && (
                  <div className="text-xs text-error mt-1">
                    Booked
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-surface-50 rounded-button">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">
              No available time slots for this date
            </p>
            <p className="text-sm text-text-muted mt-1">
              Try selecting a different date
            </p>
          </div>
        )}
      </div>

      {/* Booking Notes */}
      <div className="bg-accent-50 border border-accent-200 rounded-card p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-accent-700 mb-2">Booking Information</h5>
            <ul className="text-sm text-accent-600 space-y-1">
              <li>• Sessions can be cancelled up to 24 hours in advance</li>
              <li>• Online sessions will include a video call link</li>
              <li>• Please arrive 5 minutes early for your session</li>
              <li>• Rescheduling is available with 12 hours notice</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Book Section */}
      <div className="bg-primary-50 border border-primary-200 rounded-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-heading font-semibold text-primary-700 mb-1">
              Can't find a suitable time?
            </h4>
            <p className="text-primary-600 text-sm">
              Send a custom booking request with your preferred times
            </p>
          </div>
          <Button
            variant="primary"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Request Custom Time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySection;