import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NextSessionCard = ({ session, onJoinSession }) => {
  if (!session) {
    return (
      <div className="bg-surface-100 rounded-card p-6 border border-border-light">
        <div className="text-center">
          <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-3" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            No Upcoming Sessions
          </h3>
          <p className="text-text-secondary mb-4">
            Schedule your next wellness session to continue your journey
          </p>
          <Button variant="primary" iconName="Plus" iconPosition="left">
            Book Session
          </Button>
        </div>
      </div>
    );
  }

  const getTimeUntilSession = () => {
    const now = new Date();
    const sessionTime = new Date(session.scheduledAt);
    const diffMs = sessionTime - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMins}m`;
    }
    return `${diffMins}m`;
  };

  const isSessionSoon = () => {
    const now = new Date();
    const sessionTime = new Date(session.scheduledAt);
    const diffMs = sessionTime - now;
    return diffMs <= 30 * 60 * 1000; // 30 minutes
  };

  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-card p-6 border border-primary-200 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            Next Session
          </span>
        </div>
        <div className={`px-2 py-1 rounded-button text-xs font-medium ${
          isSessionSoon() 
            ? 'bg-warning-100 text-warning-700' :'bg-success-100 text-success-700'
        }`}>
          {isSessionSoon() ? 'Starting Soon' : `In ${getTimeUntilSession()}`}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <Image
            src={session.trainer.avatar}
            alt={session.trainer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <div className="w-2 h-2 bg-success-foreground rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {session.type}
          </h3>
          <p className="text-text-secondary text-sm">
            with {session.trainer.name}
          </p>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} className="text-text-muted" />
              <span className="text-xs text-text-secondary">
                {new Date(session.scheduledAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-text-muted" />
              <span className="text-xs text-text-secondary">
                {new Date(session.scheduledAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="primary"
          onClick={() => onJoinSession(session.id)}
          iconName="Video"
          iconPosition="left"
          className="flex-1"
          disabled={!isSessionSoon()}
        >
          {isSessionSoon() ? 'Join Session' : 'Join Soon'}
        </Button>
        <Button
          variant="outline"
          iconName="MessageCircle"
          iconPosition="left"
        >
          Message
        </Button>
      </div>
    </div>
  );
};

export default NextSessionCard;