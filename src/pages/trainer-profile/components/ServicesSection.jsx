import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ServicesSection = ({ services, onBookService }) => {
  return (
    <div className="services-section space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Services Offered
        </h3>
        <span className="text-sm text-text-secondary">
          {services.length} services available
        </span>
      </div>

      <div className="grid gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card bg-background border border-border-light rounded-card p-6 breathing-card"
          >
            <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Service Image */}
              <div className="flex-shrink-0">
                <div className="w-full lg:w-32 h-48 lg:h-32 rounded-button overflow-hidden bg-surface-100">
                  <Image
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-text-primary mb-1">
                      {service.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{service.type}</span>
                      </div>
                      {service.isOnline && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Video" size={14} />
                          <span>Online Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right mt-2 sm:mt-0">
                    <div className="text-2xl font-heading font-semibold text-text-primary">
                      ${service.price}
                    </div>
                    <div className="text-sm text-text-secondary">per session</div>
                  </div>
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-text-primary mb-2">
                      What's Included:
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-accent-100 text-accent-700 px-2 py-1 rounded-button text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    onClick={() => onBookService(service)}
                    iconName="Calendar"
                    iconPosition="left"
                    className="flex-1 sm:flex-none"
                  >
                    Book This Service
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {/* Handle learn more */}}
                    iconName="Info"
                    iconPosition="left"
                    className="flex-1 sm:flex-none"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Service Stats */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning" />
                      <span>{service.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={14} />
                      <span>{service.reviewCount} reviews</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{service.sessionsCompleted} completed</span>
                    </div>
                  </div>
                  
                  {service.isPopular && (
                    <span className="bg-warning-100 text-warning-700 px-2 py-1 rounded-button text-xs font-medium">
                      Most Popular
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package Deals */}
      <div className="bg-primary-50 border border-primary-200 rounded-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Gift" size={20} className="text-primary-600" />
          <h4 className="text-lg font-heading font-semibold text-primary-700">
            Package Deals
          </h4>
        </div>
        <p className="text-primary-600 mb-4">
          Save money with our multi-session packages. Perfect for ongoing wellness journeys.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-background border border-primary-200 rounded-button p-4">
            <h5 className="font-medium text-text-primary mb-1">5-Session Package</h5>
            <p className="text-sm text-text-secondary mb-2">Save 10% on any service</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-primary-700">15% OFF</span>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
          <div className="bg-background border border-primary-200 rounded-button p-4">
            <h5 className="font-medium text-text-primary mb-1">10-Session Package</h5>
            <p className="text-sm text-text-secondary mb-2">Save 20% on any service</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-primary-700">20% OFF</span>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;