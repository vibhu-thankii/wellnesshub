import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, filterCount, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'specialty', value: 'yoga', label: 'Yoga', count: 45 },
    { type: 'specialty', value: 'pilates', label: 'Pilates', count: 32 },
    { type: 'specialty', value: 'meditation', label: 'Meditation', count: 28 },
    { type: 'specialty', value: 'nutrition', label: 'Nutrition Counseling', count: 38 },
    { type: 'specialty', value: 'fitness', label: 'Personal Training', count: 52 },
    { type: 'specialty', value: 'therapy', label: 'Wellness Therapy', count: 24 },
    { type: 'trainer', value: 'sarah-johnson', label: 'Sarah Johnson - Yoga Instructor', count: null },
    { type: 'trainer', value: 'michael-chen', label: 'Michael Chen - Nutritionist', count: null },
    { type: 'trainer', value: 'emma-davis', label: 'Emma Davis - Mindfulness Coach', count: null },
    { type: 'location', value: 'new-york', label: 'New York, NY', count: 89 },
    { type: 'location', value: 'los-angeles', label: 'Los Angeles, CA', count: 67 },
    { type: 'location', value: 'chicago', label: 'Chicago, IL', count: 43 }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.label.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 8));
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.label);
    handleSearch(suggestion.label);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'specialty': return 'Tag';
      case 'trainer': return 'User';
      case 'location': return 'MapPin';
      default: return 'Search';
    }
  };

  const getSuggestionTypeLabel = (type) => {
    switch (type) {
      case 'specialty': return 'Specialty';
      case 'trainer': return 'Trainer';
      case 'location': return 'Location';
      default: return '';
    }
  };

  return (
    <div className="search-bar relative w-full max-w-2xl mx-auto">
      <div className="relative" ref={searchRef}>
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon name="Search" size={20} className="text-text-muted" />
          </div>
          
          <Input
            type="search"
            placeholder="Search trainers, specialties, or locations..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-20 py-4 text-base bg-background border-2 border-border focus:border-primary-500 rounded-button shadow-soft"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
            {/* Filter Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterToggle}
              iconName="Filter"
              iconPosition="left"
              className="relative"
            >
              <span className="hidden sm:inline">Filters</span>
              {filterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {filterCount > 9 ? '9+' : filterCount}
                </span>
              )}
            </Button>
            
            {/* Search Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSearch()}
              iconName="Search"
              className="px-3"
            />
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-button shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-text-secondary">Searching...</span>
                </div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.value}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-100 transition-colors duration-200 text-left micro-interaction"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getSuggestionIcon(suggestion.type)} 
                        size={16} 
                        className="text-text-muted" 
                      />
                      <div>
                        <div className="text-sm text-text-primary font-medium">
                          {suggestion.label}
                        </div>
                        <div className="text-xs text-text-muted">
                          {getSuggestionTypeLabel(suggestion.type)}
                        </div>
                      </div>
                    </div>
                    {suggestion.count && (
                      <span className="text-xs text-text-muted bg-surface-200 px-2 py-1 rounded-button">
                        {suggestion.count} available
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : query.length > 0 ? (
              <div className="p-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="Search" size={24} className="text-text-muted" />
                  <p className="text-sm text-text-secondary">
                    No suggestions found for "{query}"
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch()}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Search anyway
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-text-secondary font-medium">Popular:</span>
        {['Yoga', 'Nutrition', 'Meditation', 'Fitness'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleSearch(tag)}
            className="inline-flex items-center px-3 py-1 bg-surface-100 hover:bg-surface-200 text-text-secondary hover:text-text-primary text-sm rounded-button transition-colors duration-200 micro-interaction"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;