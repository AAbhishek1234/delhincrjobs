import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobTitle, setSelectedJobTitle] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const q = query(collection(db, "applications"), orderBy("submittedAt", "desc"));
      const snapshot = await getDocs(q);
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(apps);
      setFilteredApps(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
    if (jobTitle === "All") {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter((app) => app.jobTitle === jobTitle));
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Job", "Experience", "Date"];
    const rows = filteredApps.map((app) => [
      app.fullName,
      app.email,
      app.phone,
      app.jobTitle,
      app.experience,
      app.submittedAt?.toDate().toLocaleDateString() || "",
    ]);

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const jobTitles = ["All", ...new Set(applications.map((app) => app.jobTitle))];

  if (loading) return <p className="text-center">Loading applications...</p>;

  return (
    <div className="mt-10 bg-white rounded-lg shadow overflow-x-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Job Applications</h2>
        <div className="flex space-x-4 items-center">
          <select
            value={selectedJobTitle}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            {jobTitles.map((title, i) => (
              <option key={i} value={title}>{title}</option>
            ))}
          </select>
          <button
            onClick={handleExportCSV}
            disabled={filteredApps.length === 0}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <p className="p-6 text-gray-500 text-center">No applications found.</p>
      ) : (
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Job</th>
              <th className="py-3 px-4 text-left">Experience</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Resume</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{app.fullName}</td>
                <td className="py-3 px-4">{app.email}</td>
                <td className="py-3 px-4">{app.phone}</td>
                <td className="py-3 px-4">{app.jobTitle}</td>
                <td className="py-3 px-4">{app.experience}</td>
                <td className="py-3 px-4">
                  {app.submittedAt?.toDate().toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {app.resumeUrl ? (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Not uploaded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationList;
