import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const FilterNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialty: [],
    priceRange: [0, 200],
    availability: '',
    rating: 0,
    location: '',
    experience: '',
    sessionType: []
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [resultCount, setResultCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Initialize filters from URL params
    const urlFilters = {};
    searchParams.forEach((value, key) => {
      if (key.includes('[]')) {
        const cleanKey = key.replace('[]', '');
        urlFilters[cleanKey] = value.split(',');
      } else {
        urlFilters[key] = value;
      }
    });
    
    setFilters(prev => ({ ...prev, ...urlFilters }));
    setAppliedFilters(urlFilters);
  }, [searchParams]);

  const filterOptions = {
    specialty: [
      { value: 'yoga', label: 'Yoga', count: 45 },
      { value: 'pilates', label: 'Pilates', count: 32 },
      { value: 'meditation', label: 'Meditation', count: 28 },
      { value: 'nutrition', label: 'Nutrition', count: 38 },
      { value: 'fitness', label: 'Personal Training', count: 52 },
      { value: 'therapy', label: 'Wellness Therapy', count: 24 },
      { value: 'massage', label: 'Massage Therapy', count: 19 }
    ],
    availability: [
      { value: 'morning', label: 'Morning (6AM - 12PM)' },
      { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
      { value: 'evening', label: 'Evening (6PM - 10PM)' },
      { value: 'weekend', label: 'Weekends' },
      { value: 'flexible', label: 'Flexible Schedule' }
    ],
    experience: [
      { value: '1-2', label: '1-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '5-10', label: '5-10 years' },
      { value: '10+', label: '10+ years' }
    ],
    sessionType: [
      { value: 'individual', label: 'Individual Sessions', count: 89 },
      { value: 'group', label: 'Group Sessions', count: 67 },
      { value: 'online', label: 'Online Sessions', count: 124 },
      { value: 'in-person', label: 'In-Person Sessions', count: 98 }
    ]
  };

  const handleFilterChange = (filterType, value, isMultiple = false) => {
    setFilters(prev => {
      if (isMultiple) {
        const currentValues = prev[filterType] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      } else {
        return { ...prev, [filterType]: value };
      }
    });
  };

  const handlePriceRangeChange = (index, value) => {
    setFilters(prev => {
      const newRange = [...prev.priceRange];
      newRange[index] = parseInt(value);
      return { ...prev, priceRange: newRange };
    });
  };

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        newSearchParams.set(`${key}[]`, value.join(','));
      } else if (value && !Array.isArray(value)) {
        newSearchParams.set(key, value.toString());
      }
    });
    
    setSearchParams(newSearchParams);
    setAppliedFilters(filters);
    setIsOpen(false);
    
    // Mock result count update
    setResultCount(Math.floor(Math.random() * 50) + 10);
  };

  const clearFilters = () => {
    const clearedFilters = {
      specialty: [],
      priceRange: [0, 200],
      availability: '',
      rating: 0,
      location: '',
      experience: '',
      sessionType: []
    };
    
    setFilters(clearedFilters);
    setAppliedFilters({});
    setSearchParams(new URLSearchParams());
    setResultCount(0);
  };

  const removeFilter = (filterType, value = null) => {
    setFilters(prev => {
      if (Array.isArray(prev[filterType]) && value) {
        return { ...prev, [filterType]: prev[filterType].filter(v => v !== value) };
      } else {
        return { ...prev, [filterType]: Array.isArray(prev[filterType]) ? [] : '' };
      }
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value && value !== '' && value !== 0) {
        count += 1;
      }
    });
    return count;
  };

  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(appliedFilters).forEach(([filterType, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          const option = filterOptions[filterType]?.find(opt => opt.value === v);
          if (option) {
            chips.push({
              type: filterType,
              value: v,
              label: option.label,
              removable: true
            });
          }
        });
      } else if (value && value !== '' && value !== 0) {
        let label = value;
        if (filterType === 'rating') {
          label = `${value}+ Stars`;
        } else if (filterType === 'priceRange') {
          label = `$${value[0]} - $${value[1]}`;
        }
        
        chips.push({
          type: filterType,
          value: value,
          label: label,
          removable: true
        });
      }
    });
    
    return chips;
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden sticky top-16 z-[999] bg-background border-b border-border-light p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            iconName="Filter"
            iconPosition="left"
            className="flex-1 mr-3"
          >
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Button>
          
          <div className="text-sm text-text-secondary font-caption">
            {resultCount > 0 ? `${resultCount} trainers` : 'Search trainers'}
          </div>
        </div>
        
        {/* Active Filter Chips */}
        {getFilterChips().length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {getFilterChips().map((chip, index) => (
              <div
                key={`${chip.type}-${chip.value}-${index}`}
                className="flex items-center space-x-1 bg-primary-100 text-primary-700 px-2 py-1 rounded-button text-xs"
              >
                <span>{chip.label}</span>
                <button
                  onClick={() => removeFilter(chip.type, chip.value)}
                  className="text-primary-600 hover:text-primary-800 micro-interaction"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs text-text-secondary hover:text-text-primary underline micro-interaction"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-surface-50 border-r border-border-light min-h-screen p-6">
        <div className="sticky top-24">
          {/* Filter Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Filter Trainers
            </h3>
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-text-secondary hover:text-text-primary underline micro-interaction"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Results Count */}
          {resultCount > 0 && (
            <div className="bg-success-50 border border-success-200 rounded-button p-3 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success-600" />
                <span className="text-sm text-success-700 font-medium">
                  {resultCount} trainers match your criteria
                </span>
              </div>
            </div>
          )}

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Location Search */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Location
              </label>
              <Input
                type="text"
                placeholder="Enter city or zip code"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Specialty
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.specialty.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between p-2 rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.specialty.includes(option.value)}
                        onChange={() => handleFilterChange('specialty', option.value, true)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-primary">{option.label}</span>
                    </div>
                    <span className="text-xs text-text-muted bg-surface-200 px-2 py-0.5 rounded-full">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Price Range (per session)
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-text-muted">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="text-xs text-text-secondary">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Minimum Rating
              </label>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center space-x-3 p-2 rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange('rating', rating)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < rating ? 'text-warning fill-current' : 'text-surface-300'}
                        />
                      ))}
                      <span className="text-sm text-text-primary ml-2">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Availability
              </label>
              <div className="space-y-2">
                {filterOptions.availability.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 p-2 rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                  >
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.availability === option.value}
                      onChange={() => handleFilterChange('availability', option.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Session Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Session Type
              </label>
              <div className="space-y-2">
                {filterOptions.sessionType.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between p-2 rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.sessionType.includes(option.value)}
                        onChange={() => handleFilterChange('sessionType', option.value, true)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-primary">{option.label}</span>
                    </div>
                    <span className="text-xs text-text-muted bg-surface-200 px-2 py-0.5 rounded-full">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-8 pt-6 border-t border-border-light">
            <Button
              variant="primary"
              onClick={applyFilters}
              className="w-full"
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[1100] bg-background">
          <div className="flex flex-col h-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-light">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Filter Trainers
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary micro-interaction"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Same filter sections as desktop, but optimized for mobile */}
              <div className="space-y-6">
                {/* Location Search */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Location
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter city or zip code"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Specialty - Mobile Optimized */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Specialty
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.specialty.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 p-3 border border-border rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                      >
                        <input
                          type="checkbox"
                          checked={filters.specialty.includes(option.value)}
                          onChange={() => handleFilterChange('specialty', option.value, true)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-text-primary block truncate">{option.label}</span>
                          <span className="text-xs text-text-muted">{option.count} available</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range - Mobile Optimized */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Price Range (per session)
                  </label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-text-secondary mb-1">Minimum</label>
                        <Input
                          type="number"
                          placeholder="$0"
                          value={filters.priceRange[0]}
                          onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-secondary mb-1">Maximum</label>
                        <Input
                          type="number"
                          placeholder="$200"
                          value={filters.priceRange[1]}
                          onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating - Mobile Optimized */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Minimum Rating
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-3 p-3 border border-border rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                        />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={i < rating ? 'text-warning fill-current' : 'text-surface-300'}
                            />
                          ))}
                          <span className="text-sm text-text-primary ml-2">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border-light bg-surface-50">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button
                  variant="primary"
                  onClick={applyFilters}
                  className="flex-1"
                  iconName="Search"
                  iconPosition="left"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterNavigation;