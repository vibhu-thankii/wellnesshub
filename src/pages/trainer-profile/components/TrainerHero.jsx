import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrainerHero = ({ trainer, onBookSession, onMessage, onToggleFavorite, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="trainer-hero bg-gradient-to-br from-primary-50 to-surface-100 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-surface-200 breathing-card">
              <Image
                src={trainer.profileImage}
                alt={`${trainer.name} - Wellness Professional`}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            {/* Verification Badge */}
            {trainer.isVerified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-background">
                <Icon name="CheckCircle" size={16} className="text-success-foreground" />
              </div>
            )}
          </div>

          {/* Trainer Information */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-2">
                  {trainer.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {trainer.credentials.map((credential, index) => (
                    <span
                      key={index}
                      className="bg-accent-100 text-accent-700 px-2 py-1 rounded-button text-xs font-medium"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={onToggleFavorite}
                className="p-2 rounded-full hover:bg-surface-200 transition-colors micro-interaction"
              >
                <Icon
                  name="Heart"
                  size={20}
                  className={isFavorite ? 'text-error fill-current' : 'text-text-muted'}
                />
              </button>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {trainer.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-button text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Rating and Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={
                        i < Math.floor(trainer.rating)
                          ? 'text-warning fill-current' :'text-surface-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {trainer.rating}
                </span>
                <span className="text-sm text-text-secondary">
                  ({trainer.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} className="text-text-muted" />
                <span className="text-sm text-text-secondary">
                  {trainer.totalSessions} sessions completed
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} className="text-text-muted" />
                <span className="text-sm text-text-secondary">
                  {trainer.location}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                onClick={onBookSession}
                iconName="Calendar"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Book Session
              </Button>
              
              <Button
                variant="outline"
                onClick={onMessage}
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Message
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Usually responds within {trainer.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border-light">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {trainer.experienceYears}+
            </div>
            <div className="text-sm text-text-secondary">Years Experience</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {trainer.clientRetention}%
            </div>
            <div className="text-sm text-text-secondary">Client Retention</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              ${trainer.priceRange.min}-{trainer.priceRange.max}
            </div>
            <div className="text-sm text-text-secondary">Price Range</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {trainer.languages.join(', ')}
            </div>
            <div className="text-sm text-text-secondary">Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerHero;