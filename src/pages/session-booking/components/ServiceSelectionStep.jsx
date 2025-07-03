import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceSelectionStep = ({ trainer, selectedService, onServiceSelect, onNext }) => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 1,
      name: "Individual Yoga Session",
      description: "Personalized one-on-one yoga practice tailored to your specific needs and goals. Perfect for beginners or those seeking focused attention.",
      duration: 60,
      price: 85,
      category: "Yoga",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      features: ["Personalized instruction", "Flexible scheduling", "Progress tracking", "Custom sequences"],
      difficulty: "All levels",
      maxParticipants: 1
    },
    {
      id: 2,
      name: "Mindfulness Meditation",
      description: "Guided meditation session focusing on breath awareness, body scanning, and present moment mindfulness techniques.",
      duration: 45,
      price: 65,
      category: "Meditation",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?w=400&h=300&fit=crop",
      features: ["Guided meditation", "Breathing techniques", "Stress reduction", "Mental clarity"],
      difficulty: "Beginner friendly",
      maxParticipants: 1
    },
    {
      id: 3,
      name: "Nutrition Consultation",
      description: "Comprehensive nutritional assessment with personalized meal planning and dietary recommendations based on your health goals.",
      duration: 90,
      price: 120,
      category: "Nutrition",
      image: "https://images.pixabay.com/photo/2017/05/11/19/44/fresh-fruits-2305192_1280.jpg?w=400&h=300&fit=crop",
      features: ["Dietary assessment", "Meal planning", "Supplement guidance", "Follow-up support"],
      difficulty: "All levels",
      maxParticipants: 1
    },
    {
      id: 4,
      name: "Group Yoga Class",
      description: "Dynamic group yoga session combining traditional poses with modern flow sequences. Great for building community and motivation.",
      duration: 75,
      price: 45,
      category: "Yoga",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      features: ["Group energy", "Social connection", "Varied sequences", "Cost effective"],
      difficulty: "Intermediate",
      maxParticipants: 8
    },
    {
      id: 5,
      name: "Wellness Coaching Session",
      description: "Holistic wellness coaching covering lifestyle, stress management, and goal setting for overall well-being improvement.",
      duration: 60,
      price: 95,
      category: "Coaching",
      image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?w=400&h=300&fit=crop",
      features: ["Goal setting", "Lifestyle assessment", "Action planning", "Accountability"],
      difficulty: "All levels",
      maxParticipants: 1
    }
  ];

  const handleServiceSelect = (service) => {
    onServiceSelect(service);
  };

  const toggleServiceExpansion = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner friendly':
        return 'text-success-600 bg-success-50';
      case 'intermediate':
        return 'text-warning-600 bg-warning-50';
      case 'advanced':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-text-secondary bg-surface-100';
    }
  };

  return (
    <div className="service-selection-step">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Choose Your Service
        </h2>
        <p className="text-text-secondary font-body">
          Select the wellness service that best fits your needs with {trainer?.name || 'your trainer'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card breathing-card border rounded-card transition-all duration-200 cursor-pointer ${
              selectedService?.id === service.id
                ? 'border-primary-500 bg-primary-50 shadow-lg'
                : 'border-border hover:border-border-strong bg-background'
            }`}
            onClick={() => handleServiceSelect(service)}
          >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden rounded-t-card">
              <Image
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-background/90 backdrop-blur-sm text-text-primary px-2 py-1 rounded-button text-xs font-medium">
                  {service.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-button text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
                  {service.difficulty}
                </span>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-text-primary mb-1">
                    {service.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>
                        {service.maxParticipants === 1 ? 'Individual' : `Up to ${service.maxParticipants}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-heading font-semibold text-text-primary">
                    ${service.price}
                  </div>
                  <div className="text-xs text-text-secondary">per session</div>
                </div>
              </div>

              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-surface-100 text-text-secondary px-2 py-1 rounded-button text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleServiceExpansion(service.id);
                      }}
                      className="text-primary-600 text-xs hover:text-primary-700 micro-interaction"
                    >
                      +{service.features.length - 3} more
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Features */}
              {expandedService === service.id && (
                <div className="mb-4 p-3 bg-surface-50 rounded-button">
                  <h4 className="text-sm font-medium text-text-primary mb-2">All Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-background text-text-secondary px-2 py-1 rounded-button text-xs border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Selection Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedService?.id === service.id && (
                    <div className="flex items-center space-x-2 text-primary-600">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleServiceExpansion(service.id);
                  }}
                  className="text-text-secondary hover:text-text-primary micro-interaction"
                >
                  <Icon 
                    name={expandedService === service.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Service Summary */}
      {selectedService && (
        <div className="bg-primary-50 border border-primary-200 rounded-card p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-button flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-medium text-primary-800">
                {selectedService.name} Selected
              </h4>
              <p className="text-primary-700 text-sm">
                {formatDuration(selectedService.duration)} • ${selectedService.price}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!selectedService}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Continue to Date & Time
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelectionStep;