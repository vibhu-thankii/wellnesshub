import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterNavigation from '../../components/ui/FilterNavigation';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import TrainerGrid from './components/TrainerGrid';
import MobileFilterModal from './components/MobileFilterModal';
import Icon from '../../components/AppIcon';

const TrainerDiscovery = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [favorites, setFavorites] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialty: [],
    priceRange: [0, 200],
    availability: '',
    rating: 0,
    location: '',
    experience: '',
    sessionType: []
  });
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mock trainers data
  const mockTrainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Certified Yoga Instructor & Mindfulness Coach",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      specialties: ["Yoga", "Meditation", "Mindfulness"],
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 85,
      originalRate: 95,
      experience: 8,
      location: "New York, NY",
      availability: "available",
      isVerified: true,
      totalClients: 234,
      sessionsCompleted: 1456,
      responseTime: "2 hours"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Holistic Nutritionist & Wellness Expert",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Nutrition", "Weight Management", "Detox"],
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 120,
      experience: 12,
      location: "Los Angeles, CA",
      availability: "busy",
      isVerified: true,
      totalClients: 189,
      sessionsCompleted: 892,
      responseTime: "1 hour"
    },
    {
      id: 3,
      name: "Emma Davis",
      title: "Pilates Instructor & Movement Therapist",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialties: ["Pilates", "Movement Therapy", "Rehabilitation"],
      rating: 4.7,
      reviewCount: 156,
      hourlyRate: 95,
      experience: 6,
      location: "Chicago, IL",
      availability: "available",
      isVerified: true,
      totalClients: 167,
      sessionsCompleted: 743,
      responseTime: "30 minutes"
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Personal Trainer & Fitness Coach",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Fitness", "Strength Training", "HIIT"],
      rating: 4.6,
      reviewCount: 203,
      hourlyRate: 75,
      experience: 5,
      location: "Miami, FL",
      availability: "available",
      isVerified: false,
      totalClients: 298,
      sessionsCompleted: 1234,
      responseTime: "4 hours"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Massage Therapist & Wellness Practitioner",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      specialties: ["Massage Therapy", "Aromatherapy", "Stress Relief"],
      rating: 4.9,
      reviewCount: 78,
      hourlyRate: 110,
      experience: 10,
      location: "Seattle, WA",
      availability: "offline",
      isVerified: true,
      totalClients: 145,
      sessionsCompleted: 567,
      responseTime: "6 hours"
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Medical Astrologer & Spiritual Guide",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Medical Astrology", "Spiritual Guidance", "Energy Healing"],
      rating: 4.5,
      reviewCount: 92,
      hourlyRate: 150,
      experience: 15,
      location: "Austin, TX",
      availability: "busy",
      isVerified: true,
      totalClients: 87,
      sessionsCompleted: 456,
      responseTime: "12 hours"
    },
    {
      id: 7,
      name: "Maria Garcia",
      title: "Mindfulness Coach & Meditation Teacher",
      profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      specialties: ["Mindfulness", "Meditation", "Stress Management"],
      rating: 4.8,
      reviewCount: 134,
      hourlyRate: 90,
      experience: 7,
      location: "Denver, CO",
      availability: "available",
      isVerified: true,
      totalClients: 201,
      sessionsCompleted: 876,
      responseTime: "1 hour"
    },
    {
      id: 8,
      name: "Robert Kim",
      title: "Wellness Therapist & Life Coach",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Wellness Therapy", "Life Coaching", "Goal Setting"],
      rating: 4.7,
      reviewCount: 167,
      hourlyRate: 105,
      experience: 9,
      location: "Portland, OR",
      availability: "available",
      isVerified: true,
      totalClients: 178,
      sessionsCompleted: 923,
      responseTime: "3 hours"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Initialize from URL params
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    
    // Load initial data
    loadTrainers();
    
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteTrainers') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [trainers, filters, currentSort, searchQuery]);

  const loadTrainers = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrainers(mockTrainers);
      setIsLoading(false);
    }, 1000);
  };

  const loadMoreTrainers = async () => {
    // Simulate loading more trainers
    setTimeout(() => {
      const additionalTrainers = mockTrainers.map(trainer => ({
        ...trainer,
        id: trainer.id + 100,
        name: trainer.name + " (Extended)"
      }));
      setTrainers(prev => [...prev, ...additionalTrainers]);
      setHasMore(false);
    }, 1000);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...trainers];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(trainer =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        trainer.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.specialty.length > 0) {
      filtered = filtered.filter(trainer =>
        trainer.specialties.some(specialty =>
          filters.specialty.some(filterSpecialty =>
            specialty.toLowerCase().includes(filterSpecialty.toLowerCase())
          )
        )
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(trainer =>
        trainer.hourlyRate >= filters.priceRange[0] &&
        trainer.hourlyRate <= filters.priceRange[1]
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(trainer => trainer.rating >= filters.rating);
    }

    if (filters.location) {
      filtered = filtered.filter(trainer =>
        trainer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.availability) {
      if (filters.availability === 'available') {
        filtered = filtered.filter(trainer => trainer.availability === 'available');
      }
    }

    if (filters.experience) {
      const [min, max] = filters.experience.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(trainer => 
          trainer.experience >= min && trainer.experience <= max
        );
      } else {
        filtered = filtered.filter(trainer => trainer.experience >= min);
      }
    }

    // Apply sorting
    switch (currentSort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'experience':
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'availability':
        filtered.sort((a, b) => {
          const availabilityOrder = { 'available': 0, 'busy': 1, 'offline': 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        });
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredTrainers(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => {
      if (Array.isArray(prev[filterType])) {
        return {
          ...prev,
          [filterType]: prev[filterType].filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: Array.isArray(prev[filterType]) ? [] : ''
        };
      }
    });
  };

  const handleClearAllFilters = () => {
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
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  const handleFavorite = (trainerId) => {
    const newFavorites = favorites.includes(trainerId)
      ? favorites.filter(id => id !== trainerId)
      : [...favorites, trainerId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTrainers', JSON.stringify(newFavorites));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value && value !== '' && value !== 0) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <div className="trainer-discovery min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <div className="pt-16">
        {/* Search Section */}
        <div className="bg-surface-50 border-b border-border-light py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
              <button
                onClick={() => navigate('/client-dashboard')}
                className="hover:text-text-primary transition-colors micro-interaction"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={14} />
              <span className="text-text-primary font-medium">Find Trainers</span>
            </div>

            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
                Discover Your Perfect Wellness Professional
              </h1>
              <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
                Connect with certified trainers, nutritionists, and wellness experts who can guide you on your journey to better health and wellbeing.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setShowMobileFilters(true)}
              filterCount={getActiveFilterCount()}
              initialQuery={searchQuery}
            />
          </div>
        </div>

        {/* Filter Chips */}
        <FilterChips
          activeFilters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <FilterNavigation />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort and Results */}
              <div className="mb-6">
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                  resultCount={filteredTrainers.length}
                />
              </div>

              {/* Trainer Grid */}
              <TrainerGrid
                trainers={filteredTrainers}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMoreTrainers}
                favorites={favorites}
                onFavorite={handleFavorite}
                searchQuery={searchQuery}
                activeFilters={filters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={() => {}}
        onClearFilters={handleClearAllFilters}
      />
    </div>
  );
};

export default TrainerDiscovery;