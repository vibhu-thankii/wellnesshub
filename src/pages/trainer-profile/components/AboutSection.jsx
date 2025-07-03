import React from 'react';
import Icon from '../../../components/AppIcon';


const AboutSection = ({ trainer }) => {
  return (
    <div className="about-section space-y-8">
      {/* Biography */}
      <div className="bg-surface-50 rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          About {trainer.name}
        </h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-text-secondary leading-relaxed mb-4">
            {trainer.biography}
          </p>
          <p className="text-text-secondary leading-relaxed">
            {trainer.philosophy}
          </p>
        </div>
      </div>

      {/* Qualifications */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Qualifications & Certifications
        </h3>
        <div className="grid gap-4">
          {trainer.qualifications.map((qualification, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-background border border-border-light rounded-button breathing-card"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <Icon name="Award" size={20} className="text-success-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary">
                    {qualification.title}
                  </h4>
                  {qualification.verified && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-1">
                  {qualification.institution}
                </p>
                <p className="text-xs text-text-muted">
                  Obtained: {qualification.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization Areas */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Areas of Expertise
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {trainer.expertiseAreas.map((area, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-4 bg-background border border-border-light rounded-button"
            >
              <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                <Icon name={area.icon} size={16} className="text-accent-600" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm">
                  {area.name}
                </h4>
                <p className="text-xs text-text-secondary">
                  {area.experience} experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Approach */}
      <div className="bg-primary-50 border border-primary-200 rounded-card p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary-700 mb-2">
              My Approach to Wellness
            </h3>
            <p className="text-primary-600 leading-relaxed">
              {trainer.approach}
            </p>
          </div>
        </div>
      </div>

      {/* Languages & Availability */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Languages
          </h3>
          <div className="space-y-2">
            {trainer.languageDetails.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-text-primary">{lang.language}</span>
                <span className="text-sm text-text-secondary bg-surface-100 px-2 py-1 rounded-button">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Session Formats
          </h3>
          <div className="space-y-2">
            {trainer.sessionFormats.map((format, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon
                  name={format.available ? "CheckCircle" : "XCircle"}
                  size={16}
                  className={format.available ? "text-success" : "text-surface-300"}
                />
                <span className={`text-sm ${format.available ? 'text-text-primary' : 'text-text-muted'}`}>
                  {format.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;