import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const weeklyData = [
    { name: 'Mon', revenue: 240, sessions: 3 },
    { name: 'Tue', revenue: 180, sessions: 2 },
    { name: 'Wed', revenue: 320, sessions: 4 },
    { name: 'Thu', revenue: 280, sessions: 3 },
    { name: 'Fri', revenue: 400, sessions: 5 },
    { name: 'Sat', revenue: 360, sessions: 4 },
    { name: 'Sun', revenue: 200, sessions: 2 }
  ];

  const monthlyData = [
    { name: 'Week 1', revenue: 1200, sessions: 15 },
    { name: 'Week 2', revenue: 1450, sessions: 18 },
    { name: 'Week 3', revenue: 1680, sessions: 21 },
    { name: 'Week 4', revenue: 1320, sessions: 16 }
  ];

  const serviceBreakdown = [
    { name: 'Yoga Sessions', value: 45, revenue: 3375, color: '#6B8E6B' },
    { name: 'Nutrition Consultation', value: 25, revenue: 2250, color: '#8B7355' },
    { name: 'Meditation Sessions', value: 20, revenue: 1000, color: '#4A6741' },
    { name: 'Fitness Training', value: 10, revenue: 800, color: '#48BB78' }
  ];

  const revenueStats = {
    totalRevenue: "$7,425",
    thisMonth: "$2,180",
    lastMonth: "$1,845",
    growth: "+18.2%",
    pendingPayouts: "$1,240",
    completedSessions: 68,
    averageSessionRate: "$109"
  };

  const payoutSchedule = [
    {
      id: 1,
      period: "March 1-7, 2024",
      amount: "$1,240",
      status: "pending",
      payoutDate: "March 15, 2024",
      sessions: 12
    },
    {
      id: 2,
      period: "Feb 22-28, 2024",
      amount: "$980",
      status: "completed",
      payoutDate: "March 8, 2024",
      sessions: 9
    },
    {
      id: 3,
      period: "Feb 15-21, 2024",
      amount: "$1,560",
      status: "completed",
      payoutDate: "March 1, 2024",
      sessions: 15
    }
  ];

  const getChartData = () => {
    return selectedPeriod === 'week' ? weeklyData : monthlyData;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-warning-100 text-warning-700",
      completed: "bg-success-100 text-success-700",
      processing: "bg-primary-100 text-primary-700"
    };
    return colors[status] || colors.pending;
  };

  const handleExportReport = () => {
    console.log('Exporting revenue report...');
    // Mock export functionality
  };

  return (
    <div className="revenue-tracking">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Revenue Analytics
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex bg-surface-100 rounded-button p-1">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1 text-sm rounded-button transition-all duration-200 ${
                selectedPeriod === 'week' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1 text-sm rounded-button transition-all duration-200 ${
                selectedPeriod === 'month' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Month
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={handleExportReport}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="breathing-card bg-background border border-border rounded-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">Total Revenue</p>
              <p className="text-xl font-heading font-bold text-text-primary">
                {revenueStats.totalRevenue}
              </p>
            </div>
            <div className="w-10 h-10 bg-success-100 rounded-button flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success-600" />
            </div>
          </div>
        </div>

        <div className="breathing-card bg-background border border-border rounded-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">This Month</p>
              <p className="text-xl font-heading font-bold text-text-primary">
                {revenueStats.thisMonth}
              </p>
              <p className="text-xs text-success-600 font-medium">
                {revenueStats.growth}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-button flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary-600" />
            </div>
          </div>
        </div>

        <div className="breathing-card bg-background border border-border rounded-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">Pending Payouts</p>
              <p className="text-xl font-heading font-bold text-text-primary">
                {revenueStats.pendingPayouts}
              </p>
            </div>
            <div className="w-10 h-10 bg-warning-100 rounded-button flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning-600" />
            </div>
          </div>
        </div>

        <div className="breathing-card bg-background border border-border rounded-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">Avg. Session Rate</p>
              <p className="text-xl font-heading font-bold text-text-primary">
                {revenueStats.averageSessionRate}
              </p>
            </div>
            <div className="w-10 h-10 bg-accent-100 rounded-button flex items-center justify-center">
              <Icon name="Target" size={20} className="text-accent-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="breathing-card bg-background border border-border rounded-card p-4">
          <h4 className="font-medium text-text-primary mb-4">
            Revenue Trend ({selectedPeriod === 'week' ? 'This Week' : 'This Month'})
          </h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="breathing-card bg-background border border-border rounded-card p-4">
          <h4 className="font-medium text-text-primary mb-4">Revenue by Service</h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}%`,
                    `${props.payload.name}: $${props.payload.revenue}`
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {serviceBreakdown.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
                <span className="text-xs text-text-secondary">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout Schedule */}
      <div className="breathing-card bg-background border border-border rounded-card p-4">
        <h4 className="font-medium text-text-primary mb-4">Payout Schedule</h4>
        <div className="space-y-3">
          {payoutSchedule.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-3 bg-surface-50 rounded-button"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-button flex items-center justify-center">
                  <Icon name="Calendar" size={16} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{payout.period}</p>
                  <p className="text-sm text-text-secondary">
                    {payout.sessions} sessions • Payout: {payout.payoutDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-text-primary">
                  {payout.amount}
                </span>
                <span className={`px-2 py-1 rounded-button text-xs font-medium ${getStatusColor(payout.status)}`}>
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueTracking;