import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TrainerApplications = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'

  const applications = [
    {
      id: 1,
      name: "Dr. Amanda Wilson",
      email: "amanda.wilson@email.com",
      specialty: "Yoga & Meditation",
      experience: "8 years",
      submitDate: "2024-01-18",
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      bio: `Certified yoga instructor with 8 years of experience in Hatha and Vinyasa yoga. Specialized in mindfulness meditation and stress reduction techniques. Holds RYT-500 certification from Yoga Alliance.`,
      qualifications: [
        "RYT-500 Yoga Alliance Certification",
        "Mindfulness-Based Stress Reduction (MBSR)",
        "Bachelor\'s in Exercise Science"
      ],
      documents: [
        { name: "Yoga Alliance Certificate", type: "pdf", verified: true },
        { name: "ID Verification", type: "image", verified: true },
        { name: "Insurance Certificate", type: "pdf", verified: false }
      ],
      hourlyRate: "$75",
      availability: "Weekdays 9AM-6PM, Weekends 10AM-4PM"
    },
    {
      id: 2,
      name: "Marcus Thompson",
      email: "marcus.thompson@email.com",
      specialty: "Personal Training",
      experience: "5 years",
      submitDate: "2024-01-17",
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      bio: `NASM certified personal trainer specializing in strength training and functional fitness. Experience working with clients of all fitness levels, from beginners to athletes.`,
      qualifications: [
        "NASM Certified Personal Trainer",
        "Corrective Exercise Specialist",
        "Youth Exercise Specialist"
      ],
      documents: [
        { name: "NASM Certificate", type: "pdf", verified: true },
        { name: "CPR Certification", type: "pdf", verified: true },
        { name: "ID Verification", type: "image", verified: true }
      ],
      hourlyRate: "$85",
      availability: "Monday-Friday 6AM-8PM"
    },
    {
      id: 3,
      name: "Sarah Kim",
      email: "sarah.kim@email.com",
      specialty: "Nutrition Counseling",
      experience: "6 years",
      submitDate: "2024-01-16",
      status: "under_review",
      avatar: "https://images.unsplash.com/photo-1594824388853-e0c2d2e9e8e0?w=150&h=150&fit=crop&crop=face",
      bio: `Registered Dietitian with expertise in plant-based nutrition and weight management. Passionate about helping clients develop sustainable healthy eating habits.`,
      qualifications: [
        "Registered Dietitian Nutritionist (RDN)",
        "Certified Diabetes Educator",
        "Master\'s in Nutrition Science"
      ],
      documents: [
        { name: "RDN License", type: "pdf", verified: true },
        { name: "Master\'s Degree", type: "pdf", verified: true },
        { name: "ID Verification", type: "image", verified: false }
      ],
      hourlyRate: "$90",
      availability: "Tuesday-Saturday 10AM-7PM"
    }
  ];

  const handleApplicationAction = (applicationId, action) => {
    console.log(`${action} application ${applicationId}`);
    if (action === 'approve') {
      // Handle approval logic
    } else if (action === 'reject') {
      // Handle rejection logic
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setViewMode('detail');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning-100 text-warning-700', label: 'Pending Review' },
      under_review: { color: 'bg-primary-100 text-primary-700', label: 'Under Review' },
      approved: { color: 'bg-success-100 text-success-700', label: 'Approved' },
      rejected: { color: 'bg-error-100 text-error-700', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 rounded-button text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (viewMode === 'detail' && selectedApplication) {
    return (
      <div className="bg-background border border-border rounded-card">
        {/* Detail Header */}
        <div className="p-6 border-b border-border-light">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('list')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Applications
              </Button>
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Application Review
                </h3>
                <p className="text-sm text-text-secondary">
                  Submitted on {new Date(selectedApplication.submitDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            {getStatusBadge(selectedApplication.status)}
          </div>
        </div>

        {/* Application Detail */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applicant Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={selectedApplication.avatar}
                    alt={selectedApplication.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-heading font-semibold text-text-primary">
                    {selectedApplication.name}
                  </h4>
                  <p className="text-text-secondary">{selectedApplication.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-text-secondary">
                      <strong>Specialty:</strong> {selectedApplication.specialty}
                    </span>
                    <span className="text-sm text-text-secondary">
                      <strong>Experience:</strong> {selectedApplication.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h5 className="text-sm font-medium text-text-primary mb-2">Professional Bio</h5>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {selectedApplication.bio}
                </p>
              </div>

              {/* Qualifications */}
              <div>
                <h5 className="text-sm font-medium text-text-primary mb-3">Qualifications</h5>
                <div className="space-y-2">
                  {selectedApplication.qualifications.map((qual, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success-600" />
                      <span className="text-sm text-text-secondary">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h5 className="text-sm font-medium text-text-primary mb-3">Submitted Documents</h5>
                <div className="space-y-3">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-button">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={doc.type === 'pdf' ? 'FileText' : 'Image'} 
                          size={20} 
                          className="text-text-muted" 
                        />
                        <span className="text-sm text-text-primary">{doc.name}</span>
                        {doc.verified && (
                          <Icon name="CheckCircle" size={16} className="text-success-600" />
                        )}
                      </div>
                      <Button variant="outline" size="sm" iconName="Eye">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="space-y-6">
              <div className="bg-surface-50 border border-border rounded-button p-4">
                <h5 className="text-sm font-medium text-text-primary mb-3">Application Details</h5>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-text-secondary">Hourly Rate</span>
                    <p className="text-sm font-medium text-text-primary">{selectedApplication.hourlyRate}</p>
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary">Availability</span>
                    <p className="text-sm font-medium text-text-primary">{selectedApplication.availability}</p>
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary">Application Status</span>
                    <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="success"
                  fullWidth
                  onClick={() => handleApplicationAction(selectedApplication.id, 'approve')}
                  iconName="CheckCircle"
                  iconPosition="left"
                >
                  Approve Application
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => handleApplicationAction(selectedApplication.id, 'reject')}
                  iconName="XCircle"
                  iconPosition="left"
                >
                  Reject Application
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Request More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-card">
      {/* Header */}
      <div className="p-6 border-b border-border-light">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Trainer Applications</h3>
            <p className="text-sm text-text-secondary mt-1">Review and approve new trainer applications</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {applications.filter(app => app.status === 'pending').length} pending review
            </span>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="divide-y divide-border-light">
        {applications.map((application) => (
          <div key={application.id} className="p-6 hover:bg-surface-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={application.avatar}
                    alt={application.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-text-primary">{application.name}</h4>
                  <p className="text-sm text-text-secondary">{application.specialty}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-text-muted">
                      {application.experience} experience
                    </span>
                    <span className="text-xs text-text-muted">
                      Applied {new Date(application.submitDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStatusBadge(application.status)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewApplication(application)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Review
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border-light bg-surface-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {applications.length} applications
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft">
              Previous
            </Button>
            <Button variant="outline" size="sm" iconName="ChevronRight">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerApplications;