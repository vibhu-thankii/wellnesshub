import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';
import TrainerCardSkeleton from './TrainerCardSkeleton';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrainerGrid = ({ 
  trainers, 
  isLoading, 
  hasMore, 
  onLoadMore, 
  favorites, 
  onFavorite,
  searchQuery,
  activeFilters 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  // Skeleton cards for initial loading
  const renderSkeletonCards = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <TrainerCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  // Empty state when no trainers found
  const renderEmptyState = () => {
    const hasActiveFilters = Object.values(activeFilters).some(value => 
      Array.isArray(value) ? value.length > 0 : value && value !== '' && value !== 0
    );

    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-text-muted" />
          </div>
          
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            {hasActiveFilters ? 'No trainers match your criteria' : 'No trainers found'}
          </h3>
          
          <p className="text-text-secondary font-body mb-6">
            {hasActiveFilters 
              ? 'Try adjusting your filters or search terms to find more trainers.'
              : searchQuery 
                ? `We couldn't find any trainers matching "${searchQuery}". Try a different search term.`
                : 'Start by searching for trainers or browse by specialty.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Clear All Filters
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => window.history.back()}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Go Back
            </Button>
          </div>

          {/* Popular Suggestions */}
          <div className="mt-8">
            <p className="text-sm text-text-secondary mb-3">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Yoga', 'Nutrition', 'Meditation', 'Fitness', 'Therapy'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => window.location.href = `/trainer-discovery?search=${suggestion}`}
                  className="px-3 py-1 bg-surface-100 hover:bg-surface-200 text-text-secondary hover:text-text-primary text-sm rounded-button transition-colors duration-200 micro-interaction"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="trainer-grid">
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Loading State */}
        {isLoading && trainers.length === 0 && renderSkeletonCards()}
        
        {/* Trainer Cards */}
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            isFavorited={favorites.includes(trainer.id)}
            onFavorite={onFavorite}
          />
        ))}
        
        {/* Loading More Skeletons */}
        {loadingMore && Array.from({ length: 4 }, (_, index) => (
          <TrainerCardSkeleton key={`loading-more-${index}`} />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && trainers.length === 0 && renderEmptyState()}

      {/* Load More Section */}
      {!isLoading && trainers.length > 0 && (
        <div className="mt-12 text-center">
          {hasMore ? (
            <div className="space-y-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                loading={loadingMore}
                iconName="ChevronDown"
                iconPosition="right"
                className="px-8"
              >
                Load More Trainers
              </Button>
              <p className="text-sm text-text-secondary">
                Showing {trainers.length} trainers
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-text-secondary">
                <Icon name="CheckCircle" size={20} className="text-success-600" />
                <span className="text-sm font-medium">You've seen all available trainers</span>
              </div>
              <p className="text-sm text-text-muted">
                Try adjusting your search or filters to discover more professionals
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      {!isLoading && trainers.length > 0 && (
        <div className="mt-8 p-4 bg-surface-50 rounded-button border border-border-light">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-text-muted" />
              <span className="text-text-secondary">
                Found {trainers.length} trainer{trainers.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-text-muted">
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span>{favorites.length} favorited</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Filter" size={14} />
                <span>
                  {Object.values(activeFilters).flat().filter(Boolean).length} filters
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerGrid;