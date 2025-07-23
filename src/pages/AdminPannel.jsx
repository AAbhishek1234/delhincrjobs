
import React, { useState, useEffect, useCallback } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Telegram Config (from .env)
const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TG_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_TG_CHAT_ID;

async function sendTelegramNotification(job, globalJobId) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("[Telegram] Missing bot token or chat ID.");
    return;
  }

  const approveUrl = `${window.location.origin}/superadmin?job=${globalJobId}`;
  const text = [
    "🚀 New Job Posted!",
    `Title: ${job.title || "N/A"}`,
    `Company: ${job.company || "N/A"}`,
    `Location: ${job.location || "N/A"}`,
    "",
    `Review: ${approveUrl}`,
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });
  } catch (err) {
    console.error("[Telegram] Error:", err);
  }
}

const categoryOptions = [
  "Technology",
  "Marketing",
  "Finance",
  "Human Resources",
  "Design",
  "Sales",
  "Operations",
];

const CompanyDashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [applicationsMap, setApplicationsMap] = useState({});
  const [showForm, setShowForm] = useState(false);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    requirements: "",
    salary: "",
    experience: "",
    category: "",
    vacancies: "",
    description: "",
    qualifications: "",
    about: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        fetchJobs(u.uid);
        await fetchCompanyName(u.uid);
      } else {
        window.location.href = "/CompanyLogin";
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCompanyName = async (uid) => {
    try {
      const docRef = doc(db, "companies", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompanyName(data.companyName || "Company");
      } else {
        console.warn("No company document found for UID:", uid);
      }
    } catch (error) {
      console.error("Error fetching company name:", error);
    }
  };

  const fetchJobs = useCallback(async (uid) => {
    try {
      const jobCollection = collection(db, `companies/${uid}/jobs`);
      const snapshot = await getDocs(jobCollection);
      const jobsData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      const globalIds = jobsData
        .filter((j) => j.globalJobId)
        .map((j) => j.globalJobId);

      const globalSnapshots = await Promise.all(
        globalIds.map((id) => getDoc(doc(db, "jobs", id)))
      );

      const globalMap = {};
      globalSnapshots.forEach((snap, idx) => {
        if (snap.exists()) {
          globalMap[globalIds[idx]] = snap.data();
        }
      });

      const enrichedJobs = jobsData.map((job) => {
        if (job.globalJobId && globalMap[job.globalJobId]) {
          return {
            ...job,
            status: globalMap[job.globalJobId].status || job.status,
            approved: globalMap[job.globalJobId].approved ?? false,
          };
        }
        return job;
      });

      setJobs(enrichedJobs);
    } catch (err) {
      console.error("fetchJobs error:", err);
      alert("Failed to load your jobs.");
    }
  }, []);

  useEffect(() => {
    const fetchAllApplications = async () => {
      if (!user || jobs.length === 0) return;

      const appsRef = collection(db, "applications");
      const appsMap = {};

      for (const job of jobs) {
        const jobKey = job.globalJobId || job.id;
        const qApps = query(appsRef, where("jobId", "==", jobKey));
        const snap = await getDocs(qApps);
        appsMap[job.id] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      }

      setApplicationsMap(appsMap);
    };

    fetchAllApplications();
  }, [user, jobs]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not authenticated");

    const jobData = {
      ...newJob,
      postedDate: new Date().toISOString(),
      createdAt: serverTimestamp(),
      companyUid: user.uid,
      createdBy: user.uid,
      companyEmail: user.email,
      approved: false,
      status: "pending",
    };

    try {
      if (editingJob) {
        await updateDoc(doc(db, `companies/${user.uid}/jobs`, editingJob.id), jobData);
        if (editingJob.globalJobId) {
          await updateDoc(doc(db, "jobs", editingJob.globalJobId), jobData);
        }
        alert("✅ Job updated!");
      } else {
        const globalDocRef = await addDoc(collection(db, "jobs"), jobData);
        await addDoc(collection(db, `companies/${user.uid}/jobs`), {
          ...jobData,
          globalJobId: globalDocRef.id,
        });
        sendTelegramNotification(jobData, globalDocRef.id);
        alert("✅ Job posted! Awaiting approval.");
      }

      setNewJob({
        title: "",
        company: "",
        location: "",
        requirements: "",
        salary: "",
        experience: "",
        category: "",
        vacancies: "",
        description: "",
        qualifications: "",
        about: "",
      });

      setEditingJob(null);
      setShowForm(false);
      fetchJobs(user.uid);
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to post or update job.");
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const jobToDelete = jobs.find((job) => job.id === id);
      if (!jobToDelete) return alert("Job not found");

      await deleteDoc(doc(db, `companies/${user.uid}/jobs`, id));

      if (jobToDelete.globalJobId) {
        await deleteDoc(doc(db, "jobs", jobToDelete.globalJobId));
      }

      setJobs((prev) => prev.filter((job) => job.id !== id));
      alert("🗑️ Job deleted!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete job.");
    }
  };

  const handleEdit = (job) => {
    setNewJob({ ...job });
    setEditingJob(job);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/AdminLogin";
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Hello {companyName ? `! ${companyName}` : "!"}
        </h1>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded w-full sm:w-auto"
          >
            Logout
          </button>

          <button
            onClick={() => {
              setEditingJob(null);
              setNewJob({
                title: "",
                company: "",
                location: "",
                requirements: "",
                salary: "",
                experience: "",
                category: "",
                vacancies: "",
                description: "",
                qualifications: "",
                about: "",
              });
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-5 py-2 rounded w-full sm:w-auto"
          >
            ADD A NEW JOB
          </button>
        </div>
      </div>

      {(showForm || editingJob) && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            {editingJob ? "Edit Job" : "Add New Job"}
          </h2>

          <form onSubmit={handleAddJob} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "title", label: "Job Title/Role" },
              { key: "company", label: "Company Name" },
              { key: "location", label: "Location" },
              { key: "requirements", label: "Skills Required" },
              { key: "salary", label: "Salary" },
              { key: "experience", label: "Experience" },
            ].map(({ key, label }) => (
              <input
                key={key}
                name={key}
                value={newJob[key] || ""}
                onChange={(e) => setNewJob({ ...newJob, [key]: e.target.value })}
                placeholder={label}
                className="border p-2 rounded w-full"
                required
              />
            ))}

            <input
              type="number"
              name="vacancies"
              value={newJob.vacancies || ""}
              onChange={(e) => setNewJob({ ...newJob, vacancies: e.target.value })}
              placeholder="Number of Vacancies"
              className="border p-2 rounded w-full"
              required
            />

            <select
              name="category"
              value={newJob.category || ""}
              onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {[
              { key: "description", label: "Job Description" },
              { key: "qualifications", label: "Qualifications" },
              { key: "about", label: "About the Company" },
            ].map(({ key, label }) => (
              <textarea
                key={key}
                name={key}
                value={newJob[key] || ""}
                onChange={(e) => setNewJob({ ...newJob, [key]: e.target.value })}
                placeholder={label}
                className="border p-2 rounded w-full sm:col-span-2"
                required
              />
            ))}

            <div className="flex flex-col sm:flex-row gap-4 sm:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
              >
                {editingJob ? "Update Job" : "Post The Job"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingJob(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded w-full sm:w-auto"
              >
                Close The Form
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Recent Work</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border p-4 rounded bg-gray-50">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p>{job.company} — {job.location}</p>
                <p className="text-sm text-gray-600">
                  {job.category} | ₹{job.salary} | {job.experience} yrs exp
                </p>
                <p className="mt-2 text-sm">{job.description}</p>

                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                    job.status === "pending"
                      ? "bg-yellow-300 text-yellow-900"
                      : "bg-green-300 text-green-900"
                  }`}
                >
                  {job.status === "pending" ? "Pending Approval" : "Approved"}
                </span>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded w-full sm:w-auto"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-1 rounded w-full sm:w-auto"
                    onClick={() =>
                      navigate(`/applications/${job.globalJobId || job.id}`)
                    }
                  >
                    View Applications
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
