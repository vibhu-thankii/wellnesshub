import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import TrainerHero from './components/TrainerHero';
import TrainerTabs from './components/TrainerTabs';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import AvailabilitySection from './components/AvailabilitySection';
import ReviewsSection from './components/ReviewsSection';
import StickyActionBar from './components/StickyActionBar';
import BookingModal from './components/BookingModal';

const TrainerProfile = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const navigate = useNavigate();
  const { trainerId } = useParams();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Check if trainer is in favorites
    const favorites = JSON.parse(localStorage.getItem('favoriteTrainers') || '[]');
    setIsFavorite(favorites.includes(trainerId || 'trainer-1'));
  }, [trainerId]);

  // Mock trainer data
  const trainerData = {
    id: 'trainer-1',
    name: 'Dr. Sarah Chen',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    isVerified: true,
    credentials: ['PhD Nutrition', 'RYT-500', 'Certified Wellness Coach'],
    specialties: ['Yoga', 'Mindfulness', 'Nutrition Counseling', 'Stress Management'],
    rating: 4.9,
    reviewCount: 127,
    totalSessions: 1250,
    location: 'San Francisco, CA',
    responseTime: '2 hours',
    experienceYears: 8,
    clientRetention: 92,
    priceRange: { min: 75, max: 150 },
    languages: ['English', 'Mandarin'],
    languageDetails: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Mandarin', proficiency: 'Fluent' },
      { language: 'Spanish', proficiency: 'Conversational' }
    ],
    sessionFormats: [
      { type: 'One-on-One Sessions', available: true },
      { type: 'Group Classes', available: true },
      { type: 'Online Sessions', available: true },
      { type: 'In-Person Sessions', available: true },
      { type: 'Workshop Series', available: false }
    ],
    biography: `With over 8 years of experience in holistic wellness, I specialize in helping individuals achieve balance through integrated approaches combining yoga, mindfulness, and nutritional guidance. My journey began after experiencing burnout in corporate life, leading me to discover the transformative power of mindful living.`,
    philosophy: `I believe that true wellness comes from understanding the interconnection between mind, body, and spirit. My approach is personalized, compassionate, and rooted in evidence-based practices that honor both ancient wisdom and modern science.`,
    approach: `My wellness philosophy centers on sustainable, personalized approaches that honor your unique journey. I combine traditional practices with modern insights to create transformative experiences that last beyond our sessions together.`,
    qualifications: [
      {
        title: 'PhD in Nutritional Sciences',
        institution: 'Stanford University',
        year: '2018',
        verified: true
      },
      {
        title: 'Registered Yoga Teacher (RYT-500)',
        institution: 'Yoga Alliance',
        year: '2019',
        verified: true
      },
      {
        title: 'Certified Wellness Coach',
        institution: 'International Coach Federation',
        year: '2020',
        verified: true
      },
      {
        title: 'Mindfulness-Based Stress Reduction Instructor',
        institution: 'UC San Diego Center for Mindfulness',
        year: '2021',
        verified: true
      }
    ],
    expertiseAreas: [
      { name: 'Hatha Yoga', experience: '8 years', icon: 'Activity' },
      { name: 'Meditation & Mindfulness', experience: '6 years', icon: 'Brain' },
      { name: 'Nutritional Counseling', experience: '5 years', icon: 'Apple' },
      { name: 'Stress Management', experience: '7 years', icon: 'Heart' },
      { name: 'Sleep Optimization', experience: '4 years', icon: 'Moon' },
      { name: 'Anxiety Support', experience: '6 years', icon: 'Shield' }
    ],
    services: [
      {
        id: 'service-1',
        name: 'Personal Yoga Session',
        description: 'Customized one-on-one yoga practice tailored to your specific needs, goals, and physical abilities. Perfect for beginners or those seeking personalized attention.',
        duration: 60,
        price: 120,
        type: 'Individual',
        isOnline: true,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        features: [
          'Personalized sequence design',
          'Posture alignment guidance',
          'Breathing technique instruction',
          'Take-home practice materials'
        ],
        tags: ['Beginner Friendly', 'Customizable', 'Alignment Focus'],
        rating: 4.9,
        reviewCount: 45,
        sessionsCompleted: 180,
        isPopular: true
      },
      {
        id: 'service-2',
        name: 'Mindfulness & Meditation',
        description: 'Learn practical mindfulness techniques and meditation practices to reduce stress, improve focus, and cultivate inner peace in your daily life.',
        duration: 45,
        price: 90,
        type: 'Individual',
        isOnline: true,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        features: [
          'Guided meditation sessions',
          'Mindfulness technique training',
          'Stress reduction strategies',
          'Daily practice planning'
        ],
        tags: ['Stress Relief', 'Mental Clarity', 'Beginner Friendly'],
        rating: 4.8,
        reviewCount: 32,
        sessionsCompleted: 95,
        isPopular: false
      },
      {
        id: 'service-3',
        name: 'Holistic Nutrition Consultation',
        description: 'Comprehensive nutritional assessment and personalized meal planning based on your health goals, dietary preferences, and lifestyle needs.',
        duration: 90,
        price: 150,
        type: 'Individual',
        isOnline: true,
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
        features: [
          'Complete nutritional assessment',
          'Personalized meal planning',
          'Supplement recommendations',
          'Follow-up support materials'
        ],
        tags: ['Nutrition', 'Meal Planning', 'Health Goals'],
        rating: 4.9,
        reviewCount: 28,
        sessionsCompleted: 67,
        isPopular: false
      },
      {
        id: 'service-4',
        name: 'Wellness Integration Session',
        description: 'Comprehensive session combining yoga, mindfulness, and nutritional guidance for a complete wellness experience tailored to your needs.',
        duration: 120,
        price: 180,
        type: 'Individual',
        isOnline: true,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        features: [
          'Multi-modal approach',
          'Personalized wellness plan',
          'Integrated practice design',
          'Comprehensive resource packet'
        ],
        tags: ['Comprehensive', 'Holistic', 'Premium'],
        rating: 5.0,
        reviewCount: 15,
        sessionsCompleted: 42,
        isPopular: true
      }
    ]
  };

  // Mock availability data
  const availabilityData = {
    timezone: 'PST (UTC-8)',
    weeklySchedule: {
      monday: [
        { startTime: '09:00', duration: 60, available: true },
        { startTime: '10:30', duration: 60, available: false },
        { startTime: '14:00', duration: 90, available: true },
        { startTime: '16:00', duration: 60, available: true }
      ],
      tuesday: [
        { startTime: '08:00', duration: 60, available: true },
        { startTime: '10:00', duration: 90, available: true },
        { startTime: '15:00', duration: 60, available: false },
        { startTime: '17:00', duration: 60, available: true }
      ],
      wednesday: [
        { startTime: '09:00', duration: 60, available: true },
        { startTime: '11:00', duration: 60, available: true },
        { startTime: '14:30', duration: 90, available: true },
        { startTime: '16:30', duration: 60, available: false }
      ],
      thursday: [
        { startTime: '08:30', duration: 60, available: true },
        { startTime: '10:00', duration: 60, available: true },
        { startTime: '13:00', duration: 90, available: true },
        { startTime: '15:30', duration: 60, available: true }
      ],
      friday: [
        { startTime: '09:00', duration: 60, available: false },
        { startTime: '11:00', duration: 60, available: true },
        { startTime: '14:00', duration: 60, available: true },
        { startTime: '16:00', duration: 90, available: true }
      ],
      saturday: [
        { startTime: '10:00', duration: 90, available: true },
        { startTime: '12:00', duration: 60, available: true },
        { startTime: '14:00', duration: 60, available: false }
      ],
      sunday: [
        { startTime: '10:00', duration: 60, available: true },
        { startTime: '15:00', duration: 90, available: true }
      ]
    }
  };

  // Mock reviews data
  const reviewsData = [
    {
      clientName: 'Emily Rodriguez',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2024-01-15',
      serviceName: 'Personal Yoga Session',
      comment: `Dr. Chen is absolutely amazing! Her personalized approach helped me overcome my back pain issues while building strength and flexibility. She's incredibly knowledgeable and creates such a safe, supportive environment. I've been working with her for 6 months now and the transformation has been remarkable.`,
      verified: true,
      helpfulCount: 12,
      trainerResponse: {
        date: '2024-01-16',
        message: `Thank you so much, Emily! It's been wonderful witnessing your progress and dedication. Your commitment to the practice has been inspiring, and I'm thrilled to see how much stronger and more confident you've become.`
      }
    },
    {
      clientName: 'Michael Thompson',clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',rating: 5,date: '2024-01-10',serviceName: 'Mindfulness & Meditation',
      comment: `The mindfulness sessions with Dr. Chen have been life-changing. As someone who struggled with anxiety and stress from work, her techniques have given me practical tools I use daily. She explains everything clearly and makes meditation accessible even for beginners.`,
      verified: true,
      helpfulCount: 8,
      trainerResponse: null
    },
    {
      clientName: 'Lisa Park',clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',rating: 4,date: '2024-01-05',serviceName: 'Holistic Nutrition Consultation',comment: `Dr. Chen's nutrition guidance has been incredibly helpful. She took the time to understand my dietary restrictions and health goals, creating a realistic plan that I can actually stick to. The meal planning resources are fantastic and have made healthy eating so much easier.`,
      verified: true,
      helpfulCount: 6,
      trainerResponse: {
        date: '2024-01-06',
        message: `I'm so glad the nutrition plan is working well for you, Lisa! Remember, sustainable changes take time, and you're doing great. Feel free to reach out if you need any adjustments to the meal plans.`
      }
    },
    {
      clientName: 'David Kim',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2023-12-28',
      serviceName: 'Wellness Integration Session',
      comment: `The comprehensive wellness session exceeded my expectations. Dr. Chen seamlessly integrated yoga, mindfulness, and nutrition guidance into a cohesive experience. Her holistic approach addresses all aspects of wellbeing, and I left feeling energized and with a clear action plan.`,
      verified: true,
      helpfulCount: 15,
      trainerResponse: null
    },
    {
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2023-12-20',
      serviceName: 'Personal Yoga Session',
      comment: `I've been practicing yoga for years, but Dr. Chen's expertise took my practice to the next level. Her attention to alignment and breathing techniques has improved not just my poses but my overall sense of wellbeing. Highly recommend for practitioners of all levels.`,
      verified: true,
      helpfulCount: 9,
      trainerResponse: {
        date: '2023-12-21',
        message: `Thank you, Sarah! Your dedication to refining your practice has been wonderful to witness. It's practitioners like you who remind me why I love teaching yoga.`
      }
    },
    {
      clientName: 'Jennifer Martinez',clientAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',rating: 4,date: '2023-12-15',serviceName: 'Mindfulness & Meditation',comment: `Dr. Chen's meditation sessions have helped me develop a consistent practice. Her guided meditations are soothing and her explanations of mindfulness principles are clear and practical. I've noticed significant improvements in my stress levels and sleep quality.`,
      verified: true,
      helpfulCount: 7,
      trainerResponse: null
    }
  ];

  const ratingDistribution = {
    5: 89,
    4: 28,
    3: 8,
    2: 2,
    1: 0
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTrainers') || '[]');
    const trainerId = trainerData.id;
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== trainerId);
      localStorage.setItem('favoriteTrainers', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(trainerId);
      localStorage.setItem('favoriteTrainers', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  const handleBookSession = (service = null) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleMessage = () => {
    // Navigate to messaging or open message modal
    navigate('/messages', { state: { trainerId: trainerData.id, trainerName: trainerData.name } });
  };

  const handleSelectTimeSlot = (date, slot) => {
    setSelectedTimeSlot({ date, time: slot.startTime, duration: slot.duration });
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    // Mock booking confirmation
    console.log('Booking confirmed:', bookingData);
    
    // Navigate to session booking page with booking data
    navigate('/session-booking', { 
      state: { 
        bookingData,
        trainer: trainerData 
      } 
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection trainer={trainerData} />;
      case 'services':
        return <ServicesSection services={trainerData.services} onBookService={handleBookSession} />;
      case 'availability':
        return <AvailabilitySection availability={availabilityData} onSelectTimeSlot={handleSelectTimeSlot} />;
      case 'reviews':
        return (
          <ReviewsSection 
            reviews={reviewsData} 
            overallRating={trainerData.rating}
            ratingDistribution={ratingDistribution}
          />
        );
      default:
        return <AboutSection trainer={trainerData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{trainerData.name} - Wellness Professional | WellnessHub</title>
        <meta 
          name="description" 
          content={`Book wellness sessions with ${trainerData.name}. Specializing in ${trainerData.specialties.join(', ')}. Rated ${trainerData.rating}/5 with ${trainerData.reviewCount} reviews.`} 
        />
        <meta name="keywords" content={`wellness, ${trainerData.specialties.join(', ')}, ${trainerData.name}, booking`} />
      </Helmet>

      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-surface-50 border-b border-border-light mt-16">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/client-dashboard')}
              className="text-text-secondary hover:text-text-primary micro-interaction"
            >
              Home
            </button>
            <Icon name="ChevronRight" size={14} className="text-text-muted" />
            <button
              onClick={() => navigate('/trainer-discovery')}
              className="text-text-secondary hover:text-text-primary micro-interaction"
            >
              Find Trainers
            </button>
            <Icon name="ChevronRight" size={14} className="text-text-muted" />
            <span className="text-text-primary font-medium">{trainerData.name}</span>
          </nav>
        </div>
      </div>

      {/* Trainer Hero Section */}
      <TrainerHero
        trainer={trainerData}
        onBookSession={() => handleBookSession()}
        onMessage={handleMessage}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Tab Navigation */}
      <TrainerTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        reviewCount={reviewsData.length}
        servicesCount={trainerData.services.length}
      />

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderTabContent()}
      </div>

      {/* Sticky Action Bar */}
      <StickyActionBar
        trainer={trainerData}
        onBookSession={() => handleBookSession()}
        onMessage={handleMessage}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        trainer={trainerData}
        selectedService={selectedService}
        selectedTimeSlot={selectedTimeSlot}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default TrainerProfile;