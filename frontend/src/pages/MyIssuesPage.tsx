import React from 'react';

const MyIssuesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Issues</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Reported Issues
          </h2>
          <p className="text-gray-600 mb-6">
            Track the status and progress of all your reported civic issues.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Coming Soon:</strong> Issue tracking, status updates, and filtering features will be implemented in Phase 3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIssuesPage;
