import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import NextSessionCard from './components/NextSessionCard';
import WellnessProgressCard from './components/WellnessProgressCard';
import FavoriteTrainerCard from './components/FavoriteTrainerCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import QuickActionButton from './components/QuickActionButton';
import AIAssistantChat from './components/AIAssistantChat';
import StatsCard from './components/StatsCard';

const ClientDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data
  const nextSession = {
    id: 1,
    type: "Mindful Yoga Session",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    trainer: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  };

  const wellnessData = [
    {
      type: 'weight',
      value: 68.5,
      unit: 'kg',
      trend: -2.3,
      aiInsight: "Great progress! You\'ve maintained a healthy weight loss trend over the past month.",
      color: 'success'
    },
    {
      type: 'mood',
      value: 8.2,
      unit: '/10',
      trend: 15.4,
      aiInsight: "Your mood scores have improved significantly. Keep up with your meditation practice!",
      color: 'warning'
    },
    {
      type: 'sleep',
      value: 7.8,
      unit: 'hrs',
      trend: 8.7,
      aiInsight: "Excellent sleep quality this week. Your bedtime routine is working well.",
      color: 'accent'
    },
    {
      type: 'steps',
      value: 8420,
      unit: 'steps',
      trend: 12.1,
      aiInsight: "You\'re consistently hitting your daily step goals. Consider increasing your target!",
      color: 'primary'
    }
  ];

  const favoriteTrainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Yoga & Mindfulness",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 127,
      isOnline: true,
      nextAvailable: null
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Nutrition Coaching",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 89,
      isOnline: false,
      nextAvailable: "Tomorrow 2PM"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      specialty: "Pilates & Strength",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 156,
      isOnline: true,
      nextAvailable: null
    }
  ];

  const activityFeed = [
    {
      id: 1,
      type: 'session_completed',
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      content: 'Completed a 60-minute Mindful Yoga session with Sarah Johnson. Feeling energized and centered!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likeCount: 12,
      commentCount: 3,
      isLiked: true,
      comments: [
        {
          user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
          content: 'So proud of your progress! Keep it up! 🧘‍♀️'
        }
      ]
    },
    {
      id: 2,
      type: 'achievement',
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      content: 'Unlocked a new achievement: 30-Day Consistency Streak!',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      achievement: {
        title: '30-Day Streak Master',
        description: 'Completed wellness activities for 30 consecutive days'
      },
      likeCount: 24,
      commentCount: 8,
      isLiked: false,
      comments: []
    },
    {
      id: 3,
      type: 'community_post',
      user: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      content: 'Just finished an amazing meditation session at sunrise. The peace and clarity I feel right now is incredible. Starting the day with mindfulness makes such a difference! 🌅',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      likeCount: 18,
      commentCount: 5,
      isLiked: true,
      comments: []
    }
  ];

  const quickStats = [
    { title: 'Sessions This Month', value: 12, icon: 'Calendar', trend: 20, color: 'primary' },
    { title: 'Favorite Trainers', value: 3, icon: 'Heart', color: 'success' },
    { title: 'Community Posts', value: 8, icon: 'MessageSquare', trend: 33, color: 'warning' },
    { title: 'Achievements', value: 15, icon: 'Award', trend: 7, color: 'accent' }
  ];

  const handlePullToRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleJoinSession = (sessionId) => {
    navigate(`/session-booking?join=${sessionId}`);
  };

  const handleBookSession = (trainerId) => {
    navigate(`/session-booking?trainer=${trainerId}`);
  };

  const handleViewProfile = (trainerId) => {
    navigate(`/trainer-profile/${trainerId}`);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'find_trainers': navigate('/trainer-discovery');
        break;
      case 'schedule_session': navigate('/session-booking');
        break;
      case 'track_progress': navigate('/progress');
        break;
      case 'community': navigate('/community');
        break;
      default:
        break;
    }
  };

  const handleLikeActivity = (activityId) => {
    console.log('Liked activity:', activityId);
  };

  const handleCommentActivity = (activityId, comment) => {
    console.log('Comment on activity:', activityId, comment);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Pull-to-Refresh Indicator */}
      {refreshing && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-primary text-primary-foreground text-center py-2">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="RefreshCw" size={16} className="animate-spin" />
            <span className="text-sm">Refreshing...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Welcome back!
              </h1>
              <p className="text-text-secondary mt-1">
                Continue your wellness journey today
              </p>
            </div>
            <button
              onClick={handlePullToRefresh}
              className="p-2 text-text-secondary hover:text-text-primary micro-interaction lg:hidden"
            >
              <Icon name="RefreshCw" size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Sidebar - Quick Stats */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Quick Stats
              </h3>
              {quickStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  color={stat.color}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Next Session */}
            <NextSessionCard
              session={nextSession}
              onJoinSession={handleJoinSession}
            />

            {/* Wellness Progress */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                My Wellness
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {wellnessData.map((data, index) => (
                  <WellnessProgressCard
                    key={index}
                    type={data.type}
                    value={data.value}
                    unit={data.unit}
                    trend={data.trend}
                    aiInsight={data.aiInsight}
                    color={data.color}
                  />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <ActivityFeedItem
                    key={activity.id}
                    activity={activity}
                    onLike={handleLikeActivity}
                    onComment={handleCommentActivity}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Favorite Trainers */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Favorite Trainers
                </h3>
                <div className="space-y-3">
                  {favoriteTrainers.map((trainer) => (
                    <FavoriteTrainerCard
                      key={trainer.id}
                      trainer={trainer}
                      onBookSession={handleBookSession}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <QuickActionButton
                    action="find_trainers"
                    onClick={() => handleQuickAction('find_trainers')}
                  />
                  <QuickActionButton
                    action="schedule_session"
                    onClick={() => handleQuickAction('schedule_session')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Next Session */}
          <NextSessionCard
            session={nextSession}
            onJoinSession={handleJoinSession}
          />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              action="find_trainers"
              onClick={() => handleQuickAction('find_trainers')}
            />
            <QuickActionButton
              action="schedule_session"
              onClick={() => handleQuickAction('schedule_session')}
            />
            <QuickActionButton
              action="track_progress"
              onClick={() => handleQuickAction('track_progress')}
            />
            <QuickActionButton
              action="community"
              onClick={() => handleQuickAction('community')}
            />
          </div>

          {/* Wellness Progress */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              My Wellness
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {wellnessData.slice(0, 2).map((data, index) => (
                <WellnessProgressCard
                  key={index}
                  type={data.type}
                  value={data.value}
                  unit={data.unit}
                  trend={data.trend}
                  aiInsight={data.aiInsight}
                  color={data.color}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {wellnessData.slice(2).map((data, index) => (
                <WellnessProgressCard
                  key={index + 2}
                  type={data.type}
                  value={data.value}
                  unit={data.unit}
                  trend={data.trend}
                  aiInsight={data.aiInsight}
                  color={data.color}
                />
              ))}
            </div>
          </div>

          {/* Favorite Trainers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Favorite Trainers
              </h3>
              <Button
                variant="text"
                size="sm"
                onClick={() => navigate('/trainer-discovery')}
                iconName="ChevronRight"
                iconPosition="right"
              >
                View All
              </Button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {favoriteTrainers.map((trainer) => (
                <FavoriteTrainerCard
                  key={trainer.id}
                  trainer={trainer}
                  onBookSession={handleBookSession}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <ActivityFeedItem
                  key={activity.id}
                  activity={activity}
                  onLike={handleLikeActivity}
                  onComment={handleCommentActivity}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Chat */}
      <AIAssistantChat
        isOpen={isAIChatOpen}
        onToggle={() => setIsAIChatOpen(!isAIChatOpen)}
      />
    </div>
  );
};

export default ClientDashboard;