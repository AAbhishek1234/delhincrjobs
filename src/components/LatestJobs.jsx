import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../pages/LoderContext"; // confirm this path

const JobsListing = ({ filteredJobs = [] }) => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Show loader on mount
  useEffect(() => {
    showLoader();
    return () => hideLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide loader after receiving data
  useEffect(() => {
    if (!initialLoadDone && Array.isArray(filteredJobs)) {
      hideLoader();
      setInitialLoadDone(true);
    }
  }, [filteredJobs, initialLoadDone, hideLoader]);

  const approvedJobs = Array.isArray(filteredJobs)
    ? filteredJobs.filter(
        (job) => job?.approved === true || job?.status === "approved"
      )
    : [];

  const jobsToShow = approvedJobs.length > 0 ? approvedJobs : filteredJobs;

  if (!Array.isArray(filteredJobs)) return null;

  return (
    <div className="mb-12">
      {/* Heading Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Latest Jobs Available in Delhi NCR
        </h2>
        <div className="text-sm text-gray-500">
          Updated on{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsToShow.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                {/* 🆕 Posted date on top */}
                <p className="text-sm text-gray-500 mb-2">
                  Posted on{" "}
                  {job.postedDate
                    ? new Date(job.postedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>

                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {job.location}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 font-medium">{job.company}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Skills required:</span>{" "}
                    {job.requirements}
                  </p>
                </div>
              </div>

              <button
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() =>
                  navigate(`/jobdetails/${job.id}`, { state: { job } })
                }
              >
                View Details to Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Jobs Message */}
      {jobsToShow.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600">
            Try changing the filters or check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobsListing;
