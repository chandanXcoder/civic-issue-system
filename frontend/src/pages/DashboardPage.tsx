import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  ClipboardDocumentListIcon, 
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const stats = [
    { label: 'Total Issues', value: '12', icon: ClipboardDocumentListIcon, color: 'blue' },
    { label: 'Resolved', value: '8', icon: CheckCircleIcon, color: 'green' },
    { label: 'In Progress', value: '3', icon: ClockIcon, color: 'yellow' },
    { label: 'Pending', value: '1', icon: MapPinIcon, color: 'red' }
  ];

  const recentIssues = [
    {
      id: '1',
      title: 'Pothole on Main Street',
      category: 'pothole',
      status: 'resolved',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Broken Street Light',
      category: 'streetlight',
      status: 'in-progress',
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      title: 'Garbage Collection Issue',
      category: 'waste',
      status: 'pending',
      createdAt: '2024-01-13T09:20:00Z'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your reported issues.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/report"
              className="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <PlusIcon className="w-5 h-5 text-primary-600 mr-3" />
              <span className="text-primary-700 font-medium">Report New Issue</span>
            </Link>
            <Link
              to="/my-issues"
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ClipboardDocumentListIcon className="w-5 h-5 text-gray-600 mr-3" />
              <span className="text-gray-700 font-medium">View My Issues</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h2>
          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{issue.title}</p>
                  <p className="text-sm text-gray-600 capitalize">{issue.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {issue.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to="/my-issues"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all issues →
            </Link>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Issue Map</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Interactive map will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
