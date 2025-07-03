import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsCharts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedChart, setSelectedChart] = useState('users');

  const userGrowthData = [
    { name: 'Jan', clients: 120, trainers: 15, total: 135 },
    { name: 'Feb', clients: 145, trainers: 18, total: 163 },
    { name: 'Mar', clients: 180, trainers: 22, total: 202 },
    { name: 'Apr', clients: 220, trainers: 28, total: 248 },
    { name: 'May', clients: 265, trainers: 32, total: 297 },
    { name: 'Jun', clients: 310, trainers: 38, total: 348 }
  ];

  const sessionData = [
    { name: 'Mon', completed: 45, cancelled: 8, total: 53 },
    { name: 'Tue', completed: 52, cancelled: 6, total: 58 },
    { name: 'Wed', completed: 48, cancelled: 12, total: 60 },
    { name: 'Thu', completed: 61, cancelled: 4, total: 65 },
    { name: 'Fri', completed: 55, cancelled: 9, total: 64 },
    { name: 'Sat', completed: 38, cancelled: 5, total: 43 },
    { name: 'Sun', completed: 42, cancelled: 7, total: 49 }
  ];

  const revenueData = [
    { name: 'Week 1', revenue: 12500, sessions: 125 },
    { name: 'Week 2', revenue: 15200, sessions: 152 },
    { name: 'Week 3', revenue: 18900, sessions: 189 },
    { name: 'Week 4', revenue: 16800, sessions: 168 }
  ];

  const specialtyDistribution = [
    { name: 'Yoga', value: 35, color: '#6B8E6B' },
    { name: 'Personal Training', value: 28, color: '#8B7355' },
    { name: 'Nutrition', value: 18, color: '#4A6741' },
    { name: 'Meditation', value: 12, color: '#48BB78' },
    { name: 'Other', value: 7, color: '#ED8936' }
  ];

  const chartOptions = [
    { id: 'users', label: 'User Growth', icon: 'Users' },
    { id: 'sessions', label: 'Session Analytics', icon: 'Calendar' },
    { id: 'revenue', label: 'Revenue Trends', icon: 'DollarSign' },
    { id: 'specialty', label: 'Specialty Distribution', icon: 'PieChart' }
  ];

  const periodOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'users':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-background)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="clients" fill="var(--color-primary)" name="Clients" />
              <Bar dataKey="trainers" fill="var(--color-accent)" name="Trainers" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'sessions':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-background)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="completed" fill="var(--color-success)" name="Completed" />
              <Bar dataKey="cancelled" fill="var(--color-error)" name="Cancelled" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-background)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'specialty':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={specialtyDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {specialtyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-background)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getChartInsights = () => {
    switch (selectedChart) {
      case 'users':
        return [
          { label: 'Total Users', value: '348', change: '+15.2%' },
          { label: 'Client Growth', value: '310', change: '+12.8%' },
          { label: 'Trainer Growth', value: '38', change: '+18.7%' }
        ];
      case 'sessions':
        return [
          { label: 'Completion Rate', value: '87.2%', change: '+2.1%' },
          { label: 'Weekly Sessions', value: '392', change: '+8.5%' },
          { label: 'Cancellation Rate', value: '12.8%', change: '-1.2%' }
        ];
      case 'revenue':
        return [
          { label: 'Monthly Revenue', value: '$63,400', change: '+24.3%' },
          { label: 'Avg Session Value', value: '$95', change: '+5.2%' },
          { label: 'Revenue per User', value: '$182', change: '+12.1%' }
        ];
      case 'specialty':
        return [
          { label: 'Top Specialty', value: 'Yoga (35%)', change: '+2.1%' },
          { label: 'Fastest Growing', value: 'Nutrition', change: '+28.5%' },
          { label: 'Total Specialties', value: '12', change: '+2' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="bg-background border border-border rounded-card">
      {/* Header */}
      <div className="p-6 border-b border-border-light">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Analytics Dashboard</h3>
            <p className="text-sm text-text-secondary mt-1">Platform performance insights and trends</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-border rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Chart Selection */}
        <div className="flex flex-wrap gap-2 mt-4">
          {chartOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedChart(option.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-medium transition-colors ${
                selectedChart === option.id
                  ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
              }`}
            >
              <Icon name={option.icon} size={16} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Chart */}
          <div className="xl:col-span-3">
            <div className="bg-surface-50 rounded-button p-4">
              {renderChart()}
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-text-primary">Key Insights</h4>
            {getChartInsights().map((insight, index) => (
              <div key={index} className="bg-surface-50 rounded-button p-4">
                <div className="text-xs text-text-secondary mb-1">{insight.label}</div>
                <div className="text-lg font-heading font-semibold text-text-primary">{insight.value}</div>
                <div className="flex items-center mt-1">
                  <Icon 
                    name={insight.change.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                    className={insight.change.startsWith('+') ? 'text-success-600' : 'text-error-600'} 
                  />
                  <span className={`text-xs font-medium ml-1 ${
                    insight.change.startsWith('+') ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {insight.change}
                  </span>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border-light">
              <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Settings"
                  iconPosition="left"
                >
                  Configure Alerts
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;