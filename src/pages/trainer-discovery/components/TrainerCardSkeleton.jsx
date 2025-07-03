import React from 'react';

const TrainerCardSkeleton = () => {
  return (
    <div className="trainer-card-skeleton bg-background border border-border rounded-card p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative mb-4">
        <div className="w-full h-48 bg-surface-200 rounded-button skeleton-shimmer" />
        <div className="absolute top-3 right-3 w-8 h-8 bg-surface-300 rounded-full" />
        <div className="absolute bottom-3 left-3 w-24 h-6 bg-surface-300 rounded-button" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        {/* Name and Title */}
        <div className="space-y-2">
          <div className="h-5 bg-surface-200 rounded w-3/4 skeleton-shimmer" />
          <div className="h-4 bg-surface-200 rounded w-1/2 skeleton-shimmer" />
        </div>

        {/* Specialties */}
        <div className="flex space-x-2">
          <div className="h-6 bg-surface-200 rounded-button w-16 skeleton-shimmer" />
          <div className="h-6 bg-surface-200 rounded-button w-20 skeleton-shimmer" />
          <div className="h-6 bg-surface-200 rounded-button w-12 skeleton-shimmer" />
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-surface-200 rounded skeleton-shimmer" />
            ))}
          </div>
          <div className="h-4 bg-surface-200 rounded w-16 skeleton-shimmer" />
        </div>

        {/* Experience and Location */}
        <div className="flex justify-between">
          <div className="h-4 bg-surface-200 rounded w-20 skeleton-shimmer" />
          <div className="h-4 bg-surface-200 rounded w-24 skeleton-shimmer" />
        </div>

        {/* Pricing */}
        <div className="flex justify-between items-center">
          <div className="h-6 bg-surface-200 rounded w-16 skeleton-shimmer" />
          <div className="h-5 bg-surface-200 rounded w-20 skeleton-shimmer" />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <div className="h-9 bg-surface-200 rounded-button flex-1 skeleton-shimmer" />
          <div className="h-9 bg-surface-200 rounded-button flex-1 skeleton-shimmer" />
        </div>

        {/* Quick Stats */}
        <div className="flex justify-between pt-2 border-t border-border-light">
          <div className="h-3 bg-surface-200 rounded w-12 skeleton-shimmer" />
          <div className="h-3 bg-surface-200 rounded w-16 skeleton-shimmer" />
          <div className="h-3 bg-surface-200 rounded w-14 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default TrainerCardSkeleton;