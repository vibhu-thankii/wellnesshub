import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimeSelectionStep = ({ selectedService, selectedDateTime, onDateTimeSelect, onNext, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDateTime) {
      setSelectedDate(selectedDateTime.date);
      setSelectedTime(selectedDateTime.time);
    }
  }, [selectedDateTime]);

  useEffect(() => {
    // Mock availability data
    const mockAvailability = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Skip Sundays for this trainer
      if (date.getDay() !== 0) {
        const slots = [];
        const startHour = 9;
        const endHour = 18;
        
        for (let hour = startHour; hour < endHour; hour++) {
          // Random availability
          if (Math.random() > 0.3) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
          }
          if (Math.random() > 0.4) {
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
          }
        }
        
        mockAvailability[dateStr] = slots;
      }
    }
    
    setAvailableSlots(mockAvailability);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    
    const dateStr = date.toISOString().split('T')[0];
    return availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    
    // Load available times for selected date
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onDateTimeSelect({
      date: selectedDate,
      time: time,
      dateString: selectedDate.toLocaleDateString(),
      timeString: time
    });
  };

  const getAvailableTimesForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return availableSlots[dateStr] || [];
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="datetime-selection-step">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Select Date & Time
        </h2>
        <p className="text-text-secondary font-body">
          Choose your preferred date and time for {selectedService?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="calendar-section">
          <div className="bg-background border border-border rounded-card p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-medium text-text-primary">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-100 rounded-button micro-interaction"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-100 rounded-button micro-interaction"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-text-secondary py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                const isAvailable = isDateAvailable(date);
                const isSelected = selectedDate && date && 
                  selectedDate.toDateString() === date.toDateString();
                const isToday = date && 
                  date.toDateString() === new Date().toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => date && isAvailable && handleDateSelect(date)}
                    disabled={!date || !isAvailable}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-button transition-all duration-200 micro-interaction
                      ${!date ? 'invisible' : ''}
                      ${isSelected 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : isAvailable 
                        ? 'hover:bg-surface-100 text-text-primary' :'text-text-muted cursor-not-allowed opacity-50'
                      }
                      ${isToday && !isSelected ? 'ring-2 ring-primary-300' : ''}
                    `}
                  >
                    {date?.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-border-light">
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 border-2 border-primary-300 rounded-full"></div>
                    <span>Today</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-surface-300 rounded-full"></div>
                  <span>Unavailable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="time-slots-section">
          <div className="bg-background border border-border rounded-card p-4">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              Available Times
            </h3>

            {!selectedDate ? (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">
                  Please select a date to view available times
                </p>
              </div>
            ) : isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-text-secondary">Loading available times...</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-text-secondary">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {getAvailableTimesForDate(selectedDate).map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`
                        p-3 text-sm rounded-button border transition-all duration-200 micro-interaction
                        ${selectedTime === time
                          ? 'bg-primary text-primary-foreground border-primary shadow-soft'
                          : 'bg-background text-text-primary border-border hover:border-border-strong hover:bg-surface-50'
                        }
                      `}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>

                {getAvailableTimesForDate(selectedDate).length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="Clock" size={48} className="text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">
                      No available times for this date
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Selected DateTime Summary */}
      {selectedDate && selectedTime && (
        <div className="mt-6 bg-success-50 border border-success-200 rounded-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-100 rounded-button flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-success-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-medium text-success-800">
                Session Scheduled
              </h4>
              <p className="text-success-700 text-sm">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {formatTime(selectedTime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Back to Services
        </Button>

        <Button
          variant="primary"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelectionStep;