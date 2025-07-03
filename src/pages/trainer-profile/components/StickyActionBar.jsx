import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyActionBar = ({ trainer, onBookSession, onMessage, onToggleFavorite, isFavorite }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = 400; // Approximate height of hero section
      
      // Show sticky bar when scrolled past hero
      setIsVisible(currentScrollY > heroHeight);
      
      // Detect scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border-light shadow-lg transition-transform duration-300 ${
      isScrollingUp ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Trainer Quick Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-200 flex-shrink-0">
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            
            <div className="min-w-0">
              <h4 className="font-medium text-text-primary truncate">
                {trainer.name}
              </h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={
                        i < Math.floor(trainer.rating)
                          ? 'text-warning fill-current' :'text-surface-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-text-secondary">
                  {trainer.rating} • ${trainer.priceRange.min}-{trainer.priceRange.max}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Favorite Button */}
            <button
              onClick={onToggleFavorite}
              className="p-2 rounded-full hover:bg-surface-100 transition-colors micro-interaction"
            >
              <Icon
                name="Heart"
                size={18}
                className={isFavorite ? 'text-error fill-current' : 'text-text-muted'}
              />
            </button>

            {/* Message Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onMessage}
              iconName="MessageCircle"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Message
            </Button>

            {/* Book Session Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={onBookSession}
              iconName="Calendar"
              iconPosition="left"
            >
              Book Session
            </Button>
          </div>
        </div>

        {/* Mobile-only expanded actions */}
        <div className="sm:hidden mt-3 pt-3 border-t border-border-light">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onMessage}
              iconName="MessageCircle"
              iconPosition="left"
              fullWidth
            >
              Message
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: `${trainer.name} - Wellness Professional`,
                    text: `Check out ${trainer.name}'s wellness services`,
                    url: window.location.href
                  });
                }
              }}
              iconName="Share"
              iconPosition="left"
              fullWidth
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyActionBar;