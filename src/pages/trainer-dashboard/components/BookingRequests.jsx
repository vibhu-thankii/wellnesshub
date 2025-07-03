import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      clientName: "Jessica Martinez",
      clientAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      sessionType: "Yoga Session",
      preferredDate: "March 15, 2024",
      preferredTime: "10:00 AM",
      duration: "60 min",
      message: "Hi! I\'m new to yoga and would love to start with some basic poses. I have some flexibility issues and would appreciate a gentle approach.",
      clientExperience: "Beginner",
      requestedAt: "2 hours ago",
      rate: "$75"
    },
    {
      id: 2,
      clientName: "Robert Kim",
      clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      sessionType: "Nutrition Consultation",
      preferredDate: "March 16, 2024",
      preferredTime: "2:00 PM",
      duration: "45 min",
      message: "Looking for help with meal planning for weight loss. I work long hours and need practical solutions for healthy eating.",
      clientExperience: "Intermediate",
      requestedAt: "4 hours ago",
      rate: "$90"
    },
    {
      id: 3,
      clientName: "Amanda Foster",
      clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      sessionType: "Meditation Session",
      preferredDate: "March 17, 2024",
      preferredTime: "7:00 PM",
      duration: "30 min",
      message: "I\'ve been dealing with anxiety and stress from work. I\'d like to learn meditation techniques that I can practice daily.",
      clientExperience: "Beginner",
      requestedAt: "1 day ago",
      rate: "$50"
    },
    {
      id: 4,
      clientName: "Thomas Anderson",
      clientAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      sessionType: "Fitness Training",
      preferredDate: "March 18, 2024",
      preferredTime: "6:00 AM",
      duration: "60 min",
      message: "Looking to build strength and improve overall fitness. I have some experience with weightlifting but want professional guidance.",
      clientExperience: "Intermediate",
      requestedAt: "1 day ago",
      rate: "$80"
    }
  ]);

  const handleAcceptRequest = (requestId) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    console.log(`Accepted request ${requestId}`);
    // Mock acceptance logic
  };

  const handleDeclineRequest = (requestId) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    console.log(`Declined request ${requestId}`);
    // Mock decline logic
  };

  const getExperienceColor = (experience) => {
    const colors = {
      Beginner: "bg-success-100 text-success-700",
      Intermediate: "bg-warning-100 text-warning-700",
      Advanced: "bg-error-100 text-error-700"
    };
    return colors[experience] || colors.Beginner;
  };

  return (
    <div className="booking-requests">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Booking Requests
          {requests.length > 0 && (
            <span className="ml-2 bg-warning text-warning-foreground text-sm rounded-full px-2 py-0.5 font-medium">
              {requests.length}
            </span>
          )}
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={() => console.log('Filter requests')}
        >
          Filter
        </Button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-text-muted" />
          </div>
          <h4 className="text-lg font-medium text-text-primary mb-2">
            No Pending Requests
          </h4>
          <p className="text-text-secondary">
            New booking requests will appear here for your review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="breathing-card bg-background border border-border rounded-card p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={request.clientAvatar}
                    alt={request.clientName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-text-primary">
                      {request.clientName}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {request.sessionType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-text-primary">
                    {request.rate}
                  </p>
                  <p className="text-xs text-text-muted">
                    {request.requestedAt}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">
                    {request.preferredDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">
                    {request.preferredTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Timer" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">
                    {request.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-text-secondary">Experience Level:</span>
                <span className={`px-2 py-1 rounded-button text-xs font-medium ${getExperienceColor(request.clientExperience)}`}>
                  {request.clientExperience}
                </span>
              </div>

              {request.message && (
                <div className="bg-surface-50 rounded-button p-3 mb-4">
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">Message: </span>
                    {request.message}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  onClick={() => console.log(`View client profile ${request.id}`)}
                >
                  View Profile
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    onClick={() => handleDeclineRequest(request.id)}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Check"
                    iconPosition="left"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;