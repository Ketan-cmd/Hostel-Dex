import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Ticket, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tickets } = useApp();

  const userTickets = tickets.filter(ticket => ticket.studentId === user?.id);
  const openTickets = userTickets.filter(ticket => ticket.status === 'open');
  const inProgressTickets = userTickets.filter(ticket => ticket.status === 'in-progress');
  const resolvedTickets = userTickets.filter(ticket => ticket.status === 'resolved');
  const urgentTickets = userTickets.filter(ticket => ticket.priority === 'urgent');

  const stats = [
    {
      name: 'Total Tickets',
      value: userTickets.length,
      icon: Ticket,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Open Tickets',
      value: openTickets.length,
      icon: AlertCircle,
      color: 'bg-yellow-500',
      change: '+2%',
      changeType: 'increase'
    },
    {
      name: 'In Progress',
      value: inProgressTickets.length,
      icon: Clock,
      color: 'bg-orange-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Resolved',
      value: resolvedTickets.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+15%',
      changeType: 'increase'
    },
  ];

  const recentTickets = userTickets.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100 dark:text-blue-200">
          Here's what's happening with your hostel tickets today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tickets</h3>
        </div>
        <div className="p-6">
          {recentTickets.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No tickets found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Start by submitting your first ticket
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {ticket.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Room {ticket.roomNumber}, Block {ticket.blockNumber}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Ticket className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900 dark:text-white">Submit New Ticket</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Report a new issue</p>
          </button>
          <button className="p-4 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900 dark:text-white">Track Tickets</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">View ticket progress</p>
          </button>
          <button className="p-4 text-left bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            <AlertCircle className="h-6 w-6 text-yellow-600 mb-2" />
            <h4 className="font-medium text-gray-900 dark:text-white">Urgent Issues</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">View urgent tickets</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'resolved': return 'bg-green-100 text-green-800';
    case 'closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-orange-600';
    case 'urgent': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export default Dashboard;