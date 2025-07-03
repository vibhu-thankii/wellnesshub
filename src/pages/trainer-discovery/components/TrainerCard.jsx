import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrainerCard = ({ trainer, onFavorite, isFavorited }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/trainer-profile', { state: { trainerId: trainer.id } });
  };

  const handleBookNow = async () => {
    setIsLoading(true);
    // Simulate booking process
    setTimeout(() => {
      navigate('/session-booking', { state: { trainerId: trainer.id } });
      setIsLoading(false);
    }, 1000);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onFavorite(trainer.id);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success-600 bg-success-50';
      case 'busy': return 'text-warning-600 bg-warning-50';
      case 'offline': return 'text-text-muted bg-surface-200';
      default: return 'text-text-muted bg-surface-200';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available Today';
      case 'busy': return 'Limited Availability';
      case 'offline': return 'Offline';
      default: return 'Check Schedule';
    }
  };

  return (
    <div className="trainer-card bg-background border border-border rounded-card p-4 breathing-card cursor-pointer"
         onClick={handleViewProfile}>
      {/* Header with Image and Favorite */}
      <div className="relative mb-4">
        <div className="relative w-full h-48 rounded-button overflow-hidden">
          <Image
            src={trainer.profileImage}
            alt={`${trainer.name} - Wellness Professional`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 micro-interaction ${
            isFavorited 
              ? 'bg-error text-error-foreground' 
              : 'bg-background/80 text-text-secondary hover:bg-background hover:text-error'
          }`}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isFavorited ? 'fill-current' : ''} 
          />
        </button>

        {/* Availability Badge */}
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-button text-xs font-medium ${getAvailabilityColor(trainer.availability)}`}>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              trainer.availability === 'available' ? 'bg-success-500' :
              trainer.availability === 'busy' ? 'bg-warning-500' : 'bg-surface-400'
            }`} />
            <span>{getAvailabilityText(trainer.availability)}</span>
          </div>
        </div>
      </div>

      {/* Trainer Info */}
      <div className="space-y-3">
        {/* Name and Verification */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-text-primary text-lg truncate">
              {trainer.name}
            </h3>
            <p className="text-sm text-text-secondary font-body mt-1">
              {trainer.title}
            </p>
          </div>
          {trainer.isVerified && (
            <div className="flex-shrink-0 ml-2">
              <div className="flex items-center space-x-1 bg-success-50 text-success-700 px-2 py-1 rounded-button">
                <Icon name="CheckCircle" size={12} />
                <span className="text-xs font-medium">Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1">
          {trainer.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-button"
            >
              {specialty}
            </span>
          ))}
          {trainer.specialties.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-surface-100 text-text-muted text-xs font-medium rounded-button">
              +{trainer.specialties.length - 3} more
            </span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(trainer.rating) ? 'text-warning fill-current' : 'text-surface-300'}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {trainer.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-text-secondary">
            ({trainer.reviewCount} reviews)
          </span>
        </div>

        {/* Experience and Location */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>{trainer.experience} years exp.</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{trainer.location}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-lg font-heading font-semibold text-text-primary">
              ${trainer.hourlyRate}
            </span>
            <span className="text-sm text-text-secondary">/hour</span>
          </div>
          {trainer.originalRate && trainer.originalRate > trainer.hourlyRate && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-muted line-through">
                ${trainer.originalRate}
              </span>
              <span className="text-xs bg-success-50 text-success-700 px-2 py-1 rounded-button font-medium">
                Save ${trainer.originalRate - trainer.hourlyRate}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
            iconName="User"
            iconPosition="left"
            className="flex-1"
          >
            View Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleBookNow();
            }}
            loading={isLoading}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Book Now
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border-light text-xs text-text-muted">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{trainer.totalClients} clients</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{trainer.sessionsCompleted} sessions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Responds in {trainer.responseTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;