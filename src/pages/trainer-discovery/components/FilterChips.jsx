import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters).forEach(([filterType, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(v => {
          chips.push({
            type: filterType,
            value: v,
            label: getFilterLabel(filterType, v),
            removable: true
          });
        });
      } else if (value && value !== '' && value !== 0) {
        chips.push({
          type: filterType,
          value: value,
          label: getFilterLabel(filterType, value),
          removable: true
        });
      }
    });
    
    return chips;
  };

  const getFilterLabel = (type, value) => {
    const filterLabels = {
      specialty: {
        'yoga': 'Yoga',
        'pilates': 'Pilates',
        'meditation': 'Meditation',
        'nutrition': 'Nutrition',
        'fitness': 'Personal Training',
        'therapy': 'Wellness Therapy',
        'massage': 'Massage Therapy'
      },
      availability: {
        'morning': 'Morning',
        'afternoon': 'Afternoon',
        'evening': 'Evening',
        'weekend': 'Weekends',
        'flexible': 'Flexible'
      },
      experience: {
        '1-2': '1-2 years',
        '3-5': '3-5 years',
        '5-10': '5-10 years',
        '10+': '10+ years'
      },
      sessionType: {
        'individual': 'Individual',
        'group': 'Group',
        'online': 'Online',
        'in-person': 'In-Person'
      }
    };

    if (type === 'rating') {
      return `${value}+ Stars`;
    } else if (type === 'priceRange') {
      return Array.isArray(value) ? `$${value[0]} - $${value[1]}` : `$${value}`;
    } else if (type === 'location') {
      return value;
    } else if (filterLabels[type] && filterLabels[type][value]) {
      return filterLabels[type][value];
    }
    
    return value;
  };

  const handleRemoveFilter = (filterType, filterValue) => {
    onRemoveFilter(filterType, filterValue);
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="filter-chips bg-surface-50 border-y border-border-light py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <Icon name="Filter" size={16} className="text-text-muted flex-shrink-0" />
            <span className="text-sm text-text-secondary font-medium flex-shrink-0">
              Active Filters:
            </span>
            
            {/* Filter Chips Container */}
            <div className="flex flex-wrap gap-2 min-w-0 flex-1">
              {chips.map((chip, index) => (
                <div
                  key={`${chip.type}-${chip.value}-${index}`}
                  className="inline-flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-button text-sm font-medium max-w-xs"
                >
                  <span className="truncate">{chip.label}</span>
                  {chip.removable && (
                    <button
                      onClick={() => handleRemoveFilter(chip.type, chip.value)}
                      className="text-primary-600 hover:text-primary-800 transition-colors duration-200 micro-interaction flex-shrink-0"
                      aria-label={`Remove ${chip.label} filter`}
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Clear All Button */}
          <button
            onClick={onClearAll}
            className="flex items-center space-x-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 micro-interaction flex-shrink-0 ml-4"
          >
            <Icon name="X" size={14} />
            <span>Clear All</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-2 text-xs text-text-muted">
          {chips.length} filter{chips.length !== 1 ? 's' : ''} applied
        </div>
      </div>
    </div>
  );
};

export default FilterChips;