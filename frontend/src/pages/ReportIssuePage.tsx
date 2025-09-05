import React from 'react';

const ReportIssuePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Report New Issue</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Issue Reporting Form
            </h2>
            <p className="text-gray-600 mb-6">
              This form will allow you to report civic issues with photos, location, and detailed descriptions.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>Coming Soon:</strong> Photo upload, geolocation, and category selection features will be implemented in Phase 2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;
