import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
      joinDate: "Jan 15, 2024",
      totalSessions: 12,
      lastSession: "2 days ago",
      status: "active",
      nextSession: "March 15, 10:00 AM",
      preferredServices: ["Yoga", "Meditation"],
      notes: "Prefers morning sessions, working on flexibility goals"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      email: "michael.chen@email.com",
      joinDate: "Feb 3, 2024",
      totalSessions: 8,
      lastSession: "1 week ago",
      status: "active",
      nextSession: "March 16, 2:00 PM",
      preferredServices: ["Nutrition", "Fitness"],
      notes: "Weight management goals, busy schedule"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      email: "emma.rodriguez@email.com",
      joinDate: "Dec 20, 2023",
      totalSessions: 24,
      lastSession: "Yesterday",
      status: "active",
      nextSession: "March 14, 6:00 PM",
      preferredServices: ["Meditation", "Yoga"],
      notes: "Regular client, anxiety management focus"
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      email: "david.wilson@email.com",
      joinDate: "Jan 28, 2024",
      totalSessions: 6,
      lastSession: "3 days ago",
      status: "active",
      nextSession: "March 17, 9:00 AM",
      preferredServices: ["Fitness", "Nutrition"],
      notes: "Strength training, recovering from injury"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      email: "lisa.thompson@email.com",
      joinDate: "Nov 15, 2023",
      totalSessions: 18,
      lastSession: "2 weeks ago",
      status: "inactive",
      nextSession: null,
      preferredServices: ["Yoga", "Meditation"],
      notes: "On break, planning to return next month"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Clients', count: clients.length },
    { value: 'active', label: 'Active', count: clients.filter(c => c.status === 'active').length },
    { value: 'inactive', label: 'Inactive', count: clients.filter(c => c.status === 'inactive').length },
    { value: 'new', label: 'New This Month', count: clients.filter(c => new Date(c.joinDate).getMonth() === new Date().getMonth()).length }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && client.status === 'active') ||
                         (selectedFilter === 'inactive' && client.status === 'inactive') ||
                         (selectedFilter === 'new' && new Date(client.joinDate).getMonth() === new Date().getMonth());
    
    return matchesSearch && matchesFilter;
  });

  const handleScheduleSession = (clientId) => {
    console.log(`Scheduling session for client ${clientId}`);
  };

  const handleSendMessage = (clientId) => {
    console.log(`Sending message to client ${clientId}`);
  };

  const handleViewHistory = (clientId) => {
    console.log(`Viewing history for client ${clientId}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-success-100 text-success-700",
      inactive: "bg-surface-300 text-text-muted"
    };
    return colors[status] || colors.active;
  };

  return (
    <div className="client-management">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Client Management
        </h3>
        <Button
          variant="primary"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => console.log('Add new client')}
        >
          Add Client
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-medium whitespace-nowrap transition-all duration-200 micro-interaction ${
                selectedFilter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-100 text-text-secondary hover:text-text-primary hover:bg-surface-200'
              }`}
            >
              <span>{option.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedFilter === option.value
                  ? 'bg-primary-200 text-primary-800' :'bg-surface-200 text-text-muted'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {filteredClients.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-text-muted" />
            </div>
            <h4 className="text-lg font-medium text-text-primary mb-2">
              No Clients Found
            </h4>
            <p className="text-text-secondary">
              {searchTerm ? 'Try adjusting your search terms.' : 'Your clients will appear here.'}
            </p>
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="breathing-card bg-background border border-border rounded-card p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-text-primary text-lg">
                      {client.name}
                    </h4>
                    <p className="text-sm text-text-secondary mb-1">
                      {client.email}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-button text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                      <span className="text-xs text-text-muted">
                        Joined {client.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    onClick={() => handleSendMessage(client.id)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="History"
                    onClick={() => handleViewHistory(client.id)}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Calendar"
                    onClick={() => handleScheduleSession(client.id)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-text-muted" />
                  <div>
                    <p className="text-xs text-text-secondary">Total Sessions</p>
                    <p className="text-sm font-medium text-text-primary">
                      {client.totalSessions}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-muted" />
                  <div>
                    <p className="text-xs text-text-secondary">Last Session</p>
                    <p className="text-sm font-medium text-text-primary">
                      {client.lastSession}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="CalendarCheck" size={16} className="text-text-muted" />
                  <div>
                    <p className="text-xs text-text-secondary">Next Session</p>
                    <p className="text-sm font-medium text-text-primary">
                      {client.nextSession || 'Not scheduled'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={16} className="text-text-muted" />
                  <div>
                    <p className="text-xs text-text-secondary">Preferred Services</p>
                    <p className="text-sm font-medium text-text-primary">
                      {client.preferredServices.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {client.notes && (
                <div className="bg-surface-50 rounded-button p-3">
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">Notes: </span>
                    {client.notes}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientManagement;