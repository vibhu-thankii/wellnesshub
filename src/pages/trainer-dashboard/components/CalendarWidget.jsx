import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const sessions = [
    {
      id: 1,
      title: "Yoga Session - Sarah Johnson",
      date: new Date(2024, 2, 14),
      time: "10:00 AM",
      duration: 60,
      type: "yoga",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Nutrition Consultation - Michael Chen",
      date: new Date(2024, 2, 14),
      time: "2:00 PM",
      duration: 60,
      type: "nutrition",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Meditation Session - Emma Rodriguez",
      date: new Date(2024, 2, 14),
      time: "6:00 PM",
      duration: 30,
      type: "meditation",
      status: "confirmed"
    },
    {
      id: 4,
      title: "Fitness Training - David Wilson",
      date: new Date(2024, 2, 15),
      time: "9:00 AM",
      duration: 60,
      type: "fitness",
      status: "confirmed"
    },
    {
      id: 5,
      title: "Yoga Session - Amanda Foster",
      date: new Date(2024, 2, 15),
      time: "11:00 AM",
      duration: 60,
      type: "yoga",
      status: "pending"
    }
  ];

  const availabilityBlocks = [
    { day: 'Monday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Tuesday', slots: ['10:00 AM', '1:00 PM', '3:00 PM', '6:00 PM'] },
    { day: 'Wednesday', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
    { day: 'Thursday', slots: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'] },
    { day: 'Friday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Saturday', slots: ['10:00 AM', '12:00 PM', '2:00 PM'] },
    { day: 'Sunday', slots: ['10:00 AM', '2:00 PM'] }
  ];

  const getSessionTypeColor = (type) => {
    const colors = {
      yoga: 'bg-primary-100 text-primary-700 border-primary-200',
      nutrition: 'bg-secondary-100 text-secondary-700 border-secondary-200',
      meditation: 'bg-accent-100 text-accent-700 border-accent-200',
      fitness: 'bg-success-100 text-success-700 border-success-200'
    };
    return colors[type] || colors.yoga;
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-success-100 text-success-700',
      pending: 'bg-warning-100 text-warning-700',
      cancelled: 'bg-error-100 text-error-700'
    };
    return colors[status] || colors.confirmed;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getSessionsForDate = (date) => {
    return sessions.filter(session => 
      session.date.toDateString() === date.toDateString()
    );
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-widget">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Schedule Overview
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex bg-surface-100 rounded-button p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded-button transition-all duration-200 ${
                viewMode === 'week' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm rounded-button transition-all duration-200 ${
                viewMode === 'month' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Month
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => console.log('Open full calendar')}
          >
            Full Calendar
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 text-text-secondary hover:text-text-primary rounded-button hover:bg-surface-100 micro-interaction"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <h4 className="text-lg font-medium text-text-primary">
            {viewMode === 'week' 
              ? `Week of ${formatDate(getWeekDates()[0])}`
              : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            }
          </h4>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 text-text-secondary hover:text-text-primary rounded-button hover:bg-surface-100 micro-interaction"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
        >
          Today
        </Button>
      </div>

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="grid grid-cols-7 gap-2">
          {getWeekDates().map((date, index) => {
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = date.getDate();
            const isToday = date.toDateString() === new Date().toDateString();
            const daySessions = getSessionsForDate(date);

            return (
              <div
                key={index}
                className={`p-3 rounded-button border transition-all duration-200 ${
                  isToday
                    ? 'bg-primary-50 border-primary-200' :'bg-surface-50 border-border hover:bg-surface-100'
                }`}
              >
                <div className="text-center mb-2">
                  <p className={`text-xs font-medium ${
                    isToday ? 'text-primary-700' : 'text-text-secondary'
                  }`}>
                    {dayName}
                  </p>
                  <p className={`text-lg font-semibold ${
                    isToday ? 'text-primary-700' : 'text-text-primary'
                  }`}>
                    {dayNumber}
                  </p>
                </div>
                
                <div className="space-y-1">
                  {daySessions.slice(0, 3).map((session) => (
                    <div
                      key={session.id}
                      className={`p-2 rounded-button text-xs border ${getSessionTypeColor(session.type)}`}
                    >
                      <p className="font-medium truncate">{session.time}</p>
                      <p className="truncate opacity-80">
                        {session.title.split(' - ')[0]}
                      </p>
                    </div>
                  ))}
                  {daySessions.length > 3 && (
                    <div className="text-xs text-text-muted text-center py-1">
                      +{daySessions.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Today's Sessions */}
      <div className="mt-6">
        <h4 className="font-medium text-text-primary mb-3">Today's Sessions</h4>
        <div className="space-y-2">
          {sessions
            .filter(session => session.date.toDateString() === new Date().toDateString())
            .map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-surface-50 rounded-button hover:bg-surface-100 transition-colors micro-interaction"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    session.type === 'yoga' ? 'bg-primary' :
                    session.type === 'nutrition' ? 'bg-secondary' :
                    session.type === 'meditation' ? 'bg-accent' : 'bg-success'
                  }`} />
                  <div>
                    <p className="font-medium text-text-primary text-sm">
                      {session.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {session.time} • {session.duration} min
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-button text-xs font-medium ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Manage your schedule and availability
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              onClick={() => console.log('Manage availability')}
            >
              Availability
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => console.log('Block time')}
            >
              Block Time
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;