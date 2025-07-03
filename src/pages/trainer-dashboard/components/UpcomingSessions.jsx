import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UpcomingSessions = () => {
  const [selectedSession, setSelectedSession] = useState(null);

  const upcomingSessions = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      sessionType: "Yoga Session",
      time: "10:00 AM - 11:00 AM",
      date: "Today",
      duration: "60 min",
      status: "confirmed",
      notes: "First-time client, focus on basic poses and breathing techniques",
      sessionPrep: "Prepare beginner-friendly sequence, have props ready",
      clientGoals: "Stress relief and flexibility improvement"
    },
    {
      id: 2,
      clientName: "Michael Chen",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      sessionType: "Nutrition Consultation",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      duration: "60 min",
      status: "confirmed",
      notes: "Follow-up session, review meal plan progress",
      sessionPrep: "Review previous session notes, prepare updated meal suggestions",
      clientGoals: "Weight management and energy optimization"
    },
    {
      id: 3,
      clientName: "Emma Rodriguez",
      clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      sessionType: "Meditation Session",
      time: "6:00 PM - 6:30 PM",
      date: "Today",
      duration: "30 min",
      status: "confirmed",
      notes: "Regular client, working on anxiety management",
      sessionPrep: "Prepare guided meditation for anxiety relief",
      clientGoals: "Anxiety reduction and mindfulness practice"
    },
    {
      id: 4,
      clientName: "David Wilson",
      clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      sessionType: "Fitness Training",
      time: "9:00 AM - 10:00 AM",
      date: "Tomorrow",
      duration: "60 min",
      status: "confirmed",
      notes: "Strength training focus, recovering from minor injury",
      sessionPrep: "Plan modified workout routine, avoid shoulder exercises",
      clientGoals: "Strength building and injury recovery"
    }
  ];

  const handleStartSession = (sessionId) => {
    console.log(`Starting session ${sessionId}`);
    // Mock session start functionality
  };

  const handleViewClient = (sessionId) => {
    console.log(`Viewing client details for session ${sessionId}`);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      confirmed: "bg-success-100 text-success-700",
      pending: "bg-warning-100 text-warning-700",
      cancelled: "bg-error-100 text-error-700"
    };
    return statusColors[status] || statusColors.confirmed;
  };

  return (
    <div className="upcoming-sessions">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Today's Schedule
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          onClick={() => console.log('View full calendar')}
        >
          View Calendar
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="breathing-card bg-background border border-border rounded-card p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={session.clientAvatar}
                  alt={session.clientName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-text-primary">
                    {session.clientName}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {session.sessionType}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-button text-xs font-medium ${getStatusColor(session.status)}`}>
                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-text-muted" />
                <span className="text-sm text-text-secondary">
                  {session.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-text-muted" />
                <span className="text-sm text-text-secondary">
                  {session.date}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Timer" size={16} className="text-text-muted" />
                <span className="text-sm text-text-secondary">
                  {session.duration}
                </span>
              </div>
            </div>

            {session.notes && (
              <div className="bg-surface-50 rounded-button p-3 mb-3">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">Notes: </span>
                  {session.notes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  onClick={() => handleViewClient(session.id)}
                >
                  View Client
                </Button>
                <button
                  onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                  className="text-sm text-primary-600 hover:text-primary-700 underline micro-interaction"
                >
                  {selectedSession === session.id ? 'Hide Details' : 'Session Prep'}
                </button>
              </div>
              
              {session.date === 'Today' && (
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Video"
                  iconPosition="left"
                  onClick={() => handleStartSession(session.id)}
                >
                  Start Session
                </Button>
              )}
            </div>

            {selectedSession === session.id && (
              <div className="mt-4 pt-4 border-t border-border-light">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">Session Preparation</h5>
                    <p className="text-sm text-text-secondary">
                      {session.sessionPrep}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">Client Goals</h5>
                    <p className="text-sm text-text-secondary">
                      {session.clientGoals}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;