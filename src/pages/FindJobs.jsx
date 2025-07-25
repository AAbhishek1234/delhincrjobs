import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";


// Hook to get query params
const useQuery = () => new URLSearchParams(useLocation().search);

const FindJob = () => {
  const queryParams = useQuery();
  const location = useLocation();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // optional: read directly (not required but left for clarity)
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const jobCategories = [
    "Technology",
    "Marketing",
    "Design",
    "Finance",
    "Sales",
    "Human Resources",
    "Operations",
    "Customer Service",
    "Healthcare",
    "Education",
  ];

  useEffect(() => {
    const categoryFromURL = queryParams.get("category") || "";
    setCategoryFilter(categoryFromURL);
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsRef = collection(db, "jobs");

        // First, try the preferred model: status == "approved"
        const qStatus = query(jobsRef, where("status", "==", "approved"));
        const snapStatus = await getDocs(qStatus);

        let jobDocs = snapStatus.docs;

        // If no jobs found, try the legacy model
        if (jobDocs.length === 0) {
          const qApproved = query(jobsRef, where("approved", "==", true));
          const snapApproved = await getDocs(qApproved);
          jobDocs = snapApproved.docs;
        }

        const jobsData = jobDocs.map((d) => ({ id: d.id, ...d.data() }));
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching approved jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const jobLocation = job.location || "";
    const jobCategory = job.category || "";

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      company.includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "" || jobLocation === locationFilter;

    const matchesCategory =
      categoryFilter === "" || jobCategory === categoryFilter;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <>
     <Helmet>
        <title>Find Jobs in Delhi NCR | Browse Latest Openings</title>
        <meta
          name="description"
          content="Search and apply for the latest jobs in Delhi, Noida, and Gurgaon. Browse job categories and filter by company, location, or role. Start your career with JobsInDelhiNCR."
        />
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {filteredJobs.length} Jobs Found
          </h2>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Search by job title or company"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
              </select>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => {
                  const selected = e.target.value;
                  setCategoryFilter(selected);

                  const params = new URLSearchParams(location.search);
                  if (selected) {
                    params.set("category", selected);
                  } else {
                    params.delete("category");
                  }

                  navigate({
                    pathname: "/findjobs",
                    search: params.toString(),
                  });
                }}
              >
                <option value="">All Categories</option>
                {jobCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Posted date at top */}
                <p className="text-sm text-gray-500 mb-2">
                  Posted on{" "}
                  {job.postedDate
                    ? new Date(job.postedDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
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

                <p className="text-gray-600 font-medium">{job.company}</p>

                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-medium">Skills Required:</span>{" "}
                  {job.requirements}
                </p>

                <button
                  onClick={() =>
                    navigate(`/jobdetails/${job.id}`, { state: { job } })
                  }
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View Details to Apply
                </button>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Try changing the filters or come back later.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindJob;
