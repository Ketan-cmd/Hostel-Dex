import React from 'react';
import { useApp } from '../context/AppContext';
import { Ticket, Users, AlertCircle, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { tickets } = useApp();

  const openTickets = tickets.filter(ticket => ticket.status === 'open');
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress');
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved');
  const urgentTickets = tickets.filter(ticket => ticket.priority === 'urgent');

  const stats = [
    {
      name: 'Total Tickets',
      value: tickets.length,
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

  const recentTickets = tickets.slice(0, 5);

  // Group tickets by issue type
  const ticketsByType = tickets.reduce((acc, ticket) => {
    acc[ticket.issueType] = (acc[ticket.issueType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const issueTypeData = Object.entries(ticketsByType).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: Math.round((count / tickets.length) * 100)
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-indigo-100 dark:text-indigo-200">
          Manage and track all hostel maintenance tickets from here.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
            ) : (
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {ticket.studentName} - Room {ticket.roomNumber}, Block {ticket.blockNumber}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {ticket.issueType.replace('-', ' ')}
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

        {/* Issue Types Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Issues by Type</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {issueTypeData.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.count}</span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Tickets */}
      {urgentTickets.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Urgent Tickets</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {urgentTickets.length}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {urgentTickets.map((ticket) => (
               <div key={ticket.id} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <div className="flex-1">
                   <h4 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {ticket.studentName} - Room {ticket.roomNumber}, Block {ticket.blockNumber}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                     <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                     <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {ticket.issueType.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className="text-xs font-medium text-red-600">
                      URGENT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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

export default AdminDashboard;