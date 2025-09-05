import React from 'react';
import { useParams } from 'react-router-dom';

const IssueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Issue Details</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Issue #{id}
            </h2>
            <p className="text-gray-600 mb-6">
              Detailed view of the issue with status, comments, and resolution progress.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>Coming Soon:</strong> Issue details, upvoting, and feedback features will be implemented in Phase 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
