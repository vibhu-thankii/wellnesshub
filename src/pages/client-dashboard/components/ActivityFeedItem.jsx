import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeedItem = ({ activity, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const getActivityIcon = () => {
    switch (activity.type) {
      case 'session_completed':
        return 'CheckCircle';
      case 'achievement':
        return 'Award';
      case 'community_post':
        return 'MessageSquare';
      case 'progress_update':
        return 'TrendingUp';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'session_completed':
        return 'text-success';
      case 'achievement':
        return 'text-warning';
      case 'community_post':
        return 'text-primary';
      case 'progress_update':
        return 'text-accent';
      default:
        return 'text-text-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment(activity.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-background rounded-card p-4 border border-border-light breathing-card">
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <Image
            src={activity.user.avatar}
            alt={activity.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-background flex items-center justify-center ${getActivityColor()}`}>
            <Icon name={getActivityIcon()} size={12} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-text-primary">
              {activity.user.name}
            </span>
            <span className="text-xs text-text-secondary">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </div>
          
          <p className="text-sm text-text-secondary mb-2 leading-relaxed">
            {activity.content}
          </p>
          
          {activity.image && (
            <div className="mb-3 rounded-button overflow-hidden">
              <Image
                src={activity.image}
                alt="Activity image"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {activity.achievement && (
            <div className="bg-warning-50 border border-warning-200 rounded-button p-3 mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" size={16} className="text-warning-600" />
                <span className="text-sm font-medium text-warning-700">
                  {activity.achievement.title}
                </span>
              </div>
              <p className="text-xs text-warning-600 mt-1">
                {activity.achievement.description}
              </p>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(activity.id)}
              className={`flex items-center space-x-1 text-sm micro-interaction ${
                activity.isLiked ? 'text-error' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon 
                name="Heart" 
                size={16} 
                className={activity.isLiked ? 'fill-current' : ''} 
              />
              <span>{activity.likeCount}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-sm text-text-muted hover:text-text-secondary micro-interaction"
            >
              <Icon name="MessageCircle" size={16} />
              <span>{activity.commentCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-text-muted hover:text-text-secondary micro-interaction">
              <Icon name="Share" size={16} />
              <span>Share</span>
            </button>
          </div>
          
          {showComments && (
            <div className="mt-3 pt-3 border-t border-border-light">
              <div className="space-y-2 mb-3">
                {activity.comments?.slice(0, 2).map((comment, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Image
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-surface-100 rounded-button px-3 py-2">
                        <span className="text-xs font-medium text-text-primary">
                          {comment.user.name}
                        </span>
                        <p className="text-xs text-text-secondary mt-1">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                  alt="Your avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 bg-surface-100 border border-border rounded-button px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    iconName="Send"
                  >
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItem;