import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MobileFilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onApplyFilters, 
  onClearFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    specialty: true,
    price: false,
    rating: false,
    availability: false,
    experience: false,
    sessionType: false
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
    setLocalFilters(prev => {
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
    setLocalFilters(prev => {
      const newRange = [...(prev.priceRange || [0, 200])];
      newRange[index] = parseInt(value) || 0;
      return { ...prev, priceRange: newRange };
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      specialty: [],
      priceRange: [0, 200],
      availability: '',
      rating: 0,
      location: '',
      experience: '',
      sessionType: []
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(localFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value && value !== '' && value !== 0) {
        count += 1;
      }
    });
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-filter-modal fixed inset-0 z-[1100] bg-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light bg-surface-50">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Filter Trainers
            </h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 font-medium">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary micro-interaction"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Location Search */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Location
              </label>
              <Input
                type="text"
                placeholder="Enter city or zip code"
                value={localFilters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Specialty */}
            <div>
              <button
                onClick={() => toggleSection('specialty')}
                className="flex items-center justify-between w-full p-3 bg-surface-100 rounded-button text-left micro-interaction"
              >
                <span className="text-sm font-medium text-text-primary">Specialty</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-muted transition-transform duration-200 ${
                    expandedSections.specialty ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSections.specialty && (
                <div className="mt-3 space-y-2">
                  {filterOptions.specialty.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between p-3 border border-border rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={(localFilters.specialty || []).includes(option.value)}
                          onChange={() => handleFilterChange('specialty', option.value, true)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-text-primary">{option.label}</span>
                      </div>
                      <span className="text-xs text-text-muted bg-surface-200 px-2 py-1 rounded-button">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full p-3 bg-surface-100 rounded-button text-left micro-interaction"
              >
                <span className="text-sm font-medium text-text-primary">Price Range</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-muted transition-transform duration-200 ${
                    expandedSections.price ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSections.price && (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">Minimum</label>
                      <Input
                        type="number"
                        placeholder="$0"
                        value={(localFilters.priceRange || [0, 200])[0]}
                        onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">Maximum</label>
                      <Input
                        type="number"
                        placeholder="$200"
                        value={(localFilters.priceRange || [0, 200])[1]}
                        onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-text-secondary">
                    ${(localFilters.priceRange || [0, 200])[0]} - ${(localFilters.priceRange || [0, 200])[1]} per session
                  </div>
                </div>
              )}
            </div>

            {/* Rating */}
            <div>
              <button
                onClick={() => toggleSection('rating')}
                className="flex items-center justify-between w-full p-3 bg-surface-100 rounded-button text-left micro-interaction"
              >
                <span className="text-sm font-medium text-text-primary">Minimum Rating</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-muted transition-transform duration-200 ${
                    expandedSections.rating ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSections.rating && (
                <div className="mt-3 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-3 p-3 border border-border rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={(localFilters.rating || 0) === rating}
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
              )}
            </div>

            {/* Availability */}
            <div>
              <button
                onClick={() => toggleSection('availability')}
                className="flex items-center justify-between w-full p-3 bg-surface-100 rounded-button text-left micro-interaction"
              >
                <span className="text-sm font-medium text-text-primary">Availability</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-muted transition-transform duration-200 ${
                    expandedSections.availability ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSections.availability && (
                <div className="mt-3 space-y-2">
                  {filterOptions.availability.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 p-3 border border-border rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                    >
                      <input
                        type="radio"
                        name="availability"
                        checked={(localFilters.availability || '') === option.value}
                        onChange={() => handleFilterChange('availability', option.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-primary">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Session Type */}
            <div>
              <button
                onClick={() => toggleSection('sessionType')}
                className="flex items-center justify-between w-full p-3 bg-surface-100 rounded-button text-left micro-interaction"
              >
                <span className="text-sm font-medium text-text-primary">Session Type</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-muted transition-transform duration-200 ${
                    expandedSections.sessionType ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSections.sessionType && (
                <div className="mt-3 space-y-2">
                  {filterOptions.sessionType.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between p-3 border border-border rounded-button hover:bg-surface-100 cursor-pointer micro-interaction"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={(localFilters.sessionType || []).includes(option.value)}
                          onChange={() => handleFilterChange('sessionType', option.value, true)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-text-primary">{option.label}</span>
                      </div>
                      <span className="text-xs text-text-muted bg-surface-200 px-2 py-1 rounded-button">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-light bg-surface-50">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-1"
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              onClick={handleApply}
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
  );
};

export default MobileFilterModal;