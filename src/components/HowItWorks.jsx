import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Apply For Jobs in 3 Easy Steps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-search text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            1. Find a Job
          </h3>
          <p className="text-gray-600">
            Browse through our extensive list of jobs in the Delhi NCR region. Use filters to narrow down your search.
          </p>
        </div>

        {/* Step 2 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-file-alt text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            2. Apply Directly
          </h3>
          <p className="text-gray-600">
            No registration needed. Simply fill out the application form and upload your resume.
          </p>
        </div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            3. Get Hired
          </h3>
          <p className="text-gray-600">
            Companies will review your application and contact you directly if you're a good fit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
