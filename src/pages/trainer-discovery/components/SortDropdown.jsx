import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange, resultCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'availability', label: 'Available Now', icon: 'Clock' },
    { value: 'experience', label: 'Most Experienced', icon: 'Award' },
    { value: 'reviews', label: 'Most Reviews', icon: 'MessageCircle' },
    { value: 'newest', label: 'Newest Members', icon: 'Calendar' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.icon : 'ArrowUpDown';
  };

  return (
    <div className="sort-dropdown flex items-center justify-between">
      {/* Results Count */}
      <div className="text-sm text-text-secondary font-body">
        {resultCount > 0 ? (
          <span>
            Showing <span className="font-medium text-text-primary">{resultCount}</span> trainers
          </span>
        ) : (
          <span>No trainers found</span>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-button hover:bg-surface-100 transition-colors duration-200 micro-interaction"
        >
          <Icon name={getCurrentSortIcon()} size={16} className="text-text-muted" />
          <span className="text-sm font-medium text-text-primary">
            {getCurrentSortLabel()}
          </span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-text-muted transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-button shadow-lg z-50 py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface-100 transition-colors duration-200 micro-interaction ${
                  currentSort === option.value 
                    ? 'bg-primary-50 text-primary-700' :'text-text-primary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={currentSort === option.value ? 'text-primary-600' : 'text-text-muted'} 
                />
                <span className="text-sm font-medium">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="text-primary-600 ml-auto" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;