import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ reviews, overallRating, ratingDistribution }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAll, setShowAll] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  const filteredReviews = reviews.filter(review => 
    filterRating === 'all' || review.rating === parseInt(filterRating)
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpfulCount - a.helpfulCount;
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'recent':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 6);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-warning fill-current' : 'text-surface-300'}
      />
    ));
  };

  return (
    <div className="reviews-section space-y-6">
      {/* Reviews Overview */}
      <div className="bg-surface-50 rounded-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="text-4xl font-heading font-bold text-text-primary mb-2">
              {overallRating}
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
              {renderStars(Math.floor(overallRating))}
            </div>
            <p className="text-sm text-text-secondary">
              Based on {reviews.length} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 lg:max-w-md lg:ml-8">
            <h4 className="font-medium text-text-primary mb-3">Rating Distribution</h4>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm text-text-secondary">{rating}</span>
                    <Icon name="Star" size={12} className="text-warning" />
                  </div>
                  <div className="flex-1 bg-surface-200 rounded-full h-2">
                    <div
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 bg-background border border-border-light rounded-button p-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="text-sm font-medium text-text-primary mr-2">Filter:</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-surface-100 border border-border rounded-button px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-primary mr-2">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-100 border border-border rounded-button px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="text-sm text-text-secondary">
          Showing {displayedReviews.length} of {filteredReviews.length} reviews
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <div
            key={index}
            className="bg-background border border-border-light rounded-card p-6 breathing-card"
          >
            <div className="flex items-start space-x-4">
              {/* Reviewer Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-200">
                  <Image
                    src={review.clientAvatar}
                    alt={review.clientName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-text-primary">
                      {review.clientName}
                    </h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-text-secondary">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  
                  {review.verified && (
                    <div className="flex items-center space-x-1 bg-success-100 text-success-700 px-2 py-1 rounded-button text-xs">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Service Information */}
                {review.serviceName && (
                  <div className="bg-surface-50 rounded-button px-3 py-1 mb-3 inline-block">
                    <span className="text-sm text-text-secondary">
                      Service: {review.serviceName}
                    </span>
                  </div>
                )}

                {/* Review Text */}
                <p className="text-text-secondary leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Review Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-text-primary micro-interaction">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review.helpfulCount})</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-text-primary micro-interaction">
                      <Icon name="MessageCircle" size={14} />
                      <span>Reply</span>
                    </button>
                  </div>
                  
                  <button className="text-sm text-text-muted hover:text-text-secondary micro-interaction">
                    <Icon name="Flag" size={14} />
                  </button>
                </div>

                {/* Trainer Response */}
                {review.trainerResponse && (
                  <div className="mt-4 bg-primary-50 border border-primary-200 rounded-button p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="MessageSquare" size={14} className="text-primary-600" />
                      <span className="text-sm font-medium text-primary-700">
                        Response from Trainer
                      </span>
                      <span className="text-xs text-primary-600">
                        {formatDate(review.trainerResponse.date)}
                      </span>
                    </div>
                    <p className="text-sm text-primary-600">
                      {review.trainerResponse.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {!showAll && filteredReviews.length > 6 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Show All Reviews ({filteredReviews.length - 6} more)
          </Button>
        </div>
      )}

      {/* No Reviews State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12 bg-surface-50 rounded-card">
          <Icon name="MessageSquare" size={48} className="text-text-muted mx-auto mb-4" />
          <h4 className="text-lg font-heading font-semibold text-text-primary mb-2">
            No Reviews Found
          </h4>
          <p className="text-text-secondary">
            {filterRating === 'all' ?'This trainer hasn\'t received any reviews yet.'
              : `No reviews found for ${filterRating} star rating.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;