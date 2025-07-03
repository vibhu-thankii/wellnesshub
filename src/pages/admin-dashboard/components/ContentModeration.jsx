import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ContentModeration = () => {
  const [selectedTab, setSelectedTab] = useState('flagged');
  const [selectedItems, setSelectedItems] = useState([]);

  const flaggedContent = [
    {
      id: 1,
      type: 'post',
      content: `Just completed an amazing yoga session! The instructor was incredible and really helped me find my inner peace. Highly recommend trying this studio if you're in the area. #yoga #wellness #mindfulness`,
      author: "Sarah Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      reportedBy: "Anonymous User",
      reason: "Inappropriate content",
      reportDate: "2024-01-20",
      status: "pending",
      severity: "low"
    },
    {
      id: 2,
      type: 'comment',
      content: "This trainer is absolutely terrible and unprofessional. Don\'t waste your money!",
      author: "Mike Chen",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      reportedBy: "Emma Rodriguez",
      reason: "Harassment/Bullying",
      reportDate: "2024-01-19",
      status: "pending",
      severity: "high"
    },
    {
      id: 3,
      type: 'post',
      content: "Check out my new supplement line! Get 50% off with code WELLNESS50. DM me for details!",
      author: "Lisa Park",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      reportedBy: "David Thompson",
      reason: "Spam/Commercial",
      reportDate: "2024-01-18",
      status: "under_review",
      severity: "medium"
    }
  ];

  const reportedUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      reportCount: 3,
      lastReport: "2024-01-20",
      reasons: ["Inappropriate behavior", "Spam", "Harassment"],
      status: "active"
    },
    {
      id: 2,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      reportCount: 5,
      lastReport: "2024-01-19",
      reasons: ["Harassment", "Fake profile", "Inappropriate content"],
      status: "suspended"
    }
  ];

  const handleContentAction = (contentId, action) => {
    console.log(`${action} content ${contentId}`);
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems);
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      low: { color: 'bg-success-100 text-success-700', label: 'Low' },
      medium: { color: 'bg-warning-100 text-warning-700', label: 'Medium' },
      high: { color: 'bg-error-100 text-error-700', label: 'High' }
    };
    
    const config = severityConfig[severity] || severityConfig.low;
    return (
      <span className={`px-2 py-1 rounded-button text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning-100 text-warning-700', label: 'Pending' },
      under_review: { color: 'bg-primary-100 text-primary-700', label: 'Under Review' },
      resolved: { color: 'bg-success-100 text-success-700', label: 'Resolved' },
      dismissed: { color: 'bg-surface-300 text-text-muted', label: 'Dismissed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-button text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-background border border-border rounded-card">
      {/* Header */}
      <div className="p-6 border-b border-border-light">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Content Moderation</h3>
            <p className="text-sm text-text-secondary mt-1">Review flagged content and reported users</p>
          </div>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-primary-700">
                {selectedItems.length} selected
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                  iconName="CheckCircle"
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleBulkAction('remove')}
                  iconName="Trash2"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4">
          <button
            onClick={() => setSelectedTab('flagged')}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              selectedTab === 'flagged' ?'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
            }`}
          >
            Flagged Content ({flaggedContent.length})
          </button>
          <button
            onClick={() => setSelectedTab('users')}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              selectedTab === 'users' ?'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
            }`}
          >
            Reported Users ({reportedUsers.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'flagged' && (
          <div className="space-y-4">
            {flaggedContent.map((item) => (
              <div key={item.id} className="border border-border rounded-button p-4 hover:bg-surface-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-1"
                  />
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={item.authorAvatar}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-text-primary">{item.author}</span>
                      <span className="text-xs text-text-muted">
                        {item.type === 'post' ? 'Post' : 'Comment'}
                      </span>
                      {getSeverityBadge(item.severity)}
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="bg-surface-100 rounded-button p-3 mb-3">
                      <p className="text-sm text-text-primary">{item.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-text-secondary">
                        <span className="font-medium">Reported by:</span> {item.reportedBy} • 
                        <span className="font-medium"> Reason:</span> {item.reason} • 
                        <span className="font-medium"> Date:</span> {new Date(item.reportDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleContentAction(item.id, 'approve')}
                          iconName="CheckCircle"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleContentAction(item.id, 'remove')}
                          iconName="Trash2"
                        >
                          Remove
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContentAction(item.id, 'warn')}
                          iconName="AlertTriangle"
                        >
                          Warn User
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'users' && (
          <div className="space-y-4">
            {reportedUsers.map((user) => (
              <div key={user.id} className="border border-border rounded-button p-4 hover:bg-surface-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{user.name}</h4>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-error-600 font-medium">
                          {user.reportCount} reports
                        </span>
                        <span className="text-xs text-text-muted">
                          Last: {new Date(user.lastReport).toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-button ${
                          user.status === 'active' ?'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'suspend')}
                      iconName="Ban"
                    >
                      Suspend
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'ban')}
                      iconName="UserX"
                    >
                      Ban
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border-light">
                  <div className="text-xs text-text-secondary">
                    <span className="font-medium">Common reasons:</span> {user.reasons.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModeration;