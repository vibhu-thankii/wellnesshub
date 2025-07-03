import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoriteTrainerCard = ({ trainer, onBookSession, onViewProfile }) => {
  const getAvailabilityStatus = () => {
    if (trainer.isOnline) {
      return { status: 'online', color: 'success', text: 'Available Now' };
    } else if (trainer.nextAvailable) {
      return { status: 'scheduled', color: 'warning', text: `Next: ${trainer.nextAvailable}` };
    }
    return { status: 'offline', color: 'text-muted', text: 'Offline' };
  };

  const availability = getAvailabilityStatus();

  return (
    <div className="bg-background rounded-card p-4 border border-border-light breathing-card min-w-[280px] flex-shrink-0">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <Image
            src={trainer.avatar}
            alt={trainer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
            availability.status === 'online' ? 'bg-success' : 
            availability.status === 'scheduled' ? 'bg-warning' : 'bg-surface-300'
          }`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-text-primary truncate">
            {trainer.name}
          </h4>
          <p className="text-sm text-text-secondary truncate">
            {trainer.specialty}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span className="text-xs text-text-secondary">
              {trainer.rating} ({trainer.reviewCount})
            </span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className={`flex items-center space-x-1 text-xs ${
          availability.status === 'online' ? 'text-success' :
          availability.status === 'scheduled' ? 'text-warning' : 'text-text-muted'
        }`}>
          <Icon name="Clock" size={12} />
          <span>{availability.text}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onBookSession(trainer.id)}
          iconName="Calendar"
          iconPosition="left"
          className="flex-1"
          disabled={!trainer.isOnline && !trainer.nextAvailable}
        >
          Book
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(trainer.id)}
          iconName="User"
        >
        </Button>
      </div>
    </div>
  );
};

export default FavoriteTrainerCard;