import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "client",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "trainer",
      status: "active",
      joinDate: "2023-11-20",
      lastActive: "2024-01-19",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.rodriguez@email.com",
      role: "client",
      status: "inactive",
      joinDate: "2023-12-05",
      lastActive: "2024-01-10",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      role: "trainer",
      status: "pending",
      joinDate: "2024-01-18",
      lastActive: "2024-01-18",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Park",
      email: "lisa.park@email.com",
      role: "client",
      status: "active",
      joinDate: "2023-10-12",
      lastActive: "2024-01-20",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
  };

  const handleStatusChange = (userId, newStatus) => {
    console.log(`Changing user ${userId} status to ${newStatus}`);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success-100 text-success-700', label: 'Active' },
      inactive: { color: 'bg-surface-300 text-text-muted', label: 'Inactive' },
      pending: { color: 'bg-warning-100 text-warning-700', label: 'Pending' },
      suspended: { color: 'bg-error-100 text-error-700', label: 'Suspended' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 rounded-button text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      client: { color: 'bg-primary-100 text-primary-700', label: 'Client' },
      trainer: { color: 'bg-accent-100 text-accent-700', label: 'Trainer' },
      admin: { color: 'bg-error-100 text-error-700', label: 'Admin' }
    };
    
    const config = roleConfig[role] || roleConfig.client;
    return (
      <span className={`px-2 py-1 rounded-button text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-background border border-border rounded-card">
      {/* Table Header */}
      <div className="p-6 border-b border-border-light">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">User Management</h3>
            <p className="text-sm text-text-secondary mt-1">Manage all platform users and their permissions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:w-64"
            />
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-border rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Roles</option>
              <option value="client">Clients</option>
              <option value="trainer">Trainers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center space-x-3 mt-4 p-3 bg-primary-50 border border-primary-200 rounded-button">
            <span className="text-sm font-medium text-primary-700">
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('activate')}
                iconName="CheckCircle"
                iconPosition="left"
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('deactivate')}
                iconName="XCircle"
                iconPosition="left"
              >
                Deactivate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('export')}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-50 border-b border-border-light">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border-light">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{user.name}</div>
                      <div className="text-sm text-text-secondary">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {new Date(user.lastActive).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-text-secondary hover:text-primary-600 micro-interaction">
                      <Icon name="Edit" size={16} />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-text-primary micro-interaction">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-error-600 micro-interaction">
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {filteredUsers.length} of {users.length} users
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

export default UserManagementTable;