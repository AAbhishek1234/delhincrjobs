import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const JobList = ({ onView }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "jobs"));
      const jobList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800">{job.title}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{job.company}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{job.location}</td>
              <td className="px-6 py-4 text-sm space-x-3">
                <button
                  onClick={() => onView(job)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 hover:text-red-800 font-medium transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                No jobs available at the moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
