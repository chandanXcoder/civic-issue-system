import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckCircleIcon,
  MapPinIcon,
  CameraIcon,
  ChartBarIcon,
  UsersIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MapPinIcon,
      title: 'Location-Based Reporting',
      description: 'Report issues with precise GPS location and address details for accurate resolution.'
    },
    {
      icon: CameraIcon,
      title: 'Photo Evidence',
      description: 'Upload photos to provide visual evidence and help workers understand the issue better.'
    },
    {
      icon: ChartBarIcon,
      title: 'Real-time Tracking',
      description: 'Track the status of your reported issues from submission to resolution in real-time.'
    },
    {
      icon: UsersIcon,
      title: 'Community Engagement',
      description: 'Upvote important issues and provide feedback to help prioritize community needs.'
    },
    {
      icon: ClockIcon,
      title: 'Quick Response',
      description: 'Get faster response times with our streamlined issue management and assignment system.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Verified Resolution',
      description: 'Confirm issue resolution with ratings and feedback to ensure quality service delivery.'
    }
  ];

  const stats = [
    { label: 'Issues Reported', value: '10,000+' },
    { label: 'Issues Resolved', value: '8,500+' },
    { label: 'Active Users', value: '5,000+' },
    { label: 'Response Time', value: '< 24h' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Report Civic Issues
              <span className="block text-secondary-400">Get Them Fixed</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              A comprehensive platform for citizens to report civic issues and for government 
              administrators to manage and resolve them efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/report"
                    className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Report New Issue
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  >
                    View Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive solution for civic issue management with 
              modern technology and user-friendly interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to report and track civic issues in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Report Issue
              </h3>
              <p className="text-gray-600">
                Take a photo, add description, and mark the location of the civic issue.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Assigned
              </h3>
              <p className="text-gray-600">
                Our team reviews and assigns the issue to the appropriate department or worker.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor the progress and get notified when your issue is resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are actively improving their communities 
            by reporting and tracking civic issues.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Start Reporting Issues
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
