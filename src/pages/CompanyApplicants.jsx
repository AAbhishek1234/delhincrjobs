import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const ViewApplications = () => {
  const { companyEmail } = useParams(); // 👈 get from route
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!companyEmail) return;
      setLoading(true);
      try {
        const q = query(
          collection(db, "applications"),
          where("companyEmail", "==", companyEmail)
        );
        const snapshot = await getDocs(q);
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [companyEmail]);

  const handleDelete = async (app) => {
    const confirm = window.confirm("Are you sure you want to delete this application?");
    if (!confirm) return;

    try {
      if (app.resume || app.resumeUrl) {
        const fileRef = ref(storage, app.resume || app.resumeUrl);
        await deleteObject(fileRef);
      }
      await deleteDoc(doc(db, "applications", app.id));
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
      alert("Deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ⬅ Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Applicants for: {companyEmail}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.id}
            className="border p-4 mb-4 rounded shadow-md flex flex-col gap-2"
          >
            <p><strong>Name:</strong> {app.name || "—"}</p>
            <p><strong>Email:</strong> {app.email || "—"}</p>
            <p><strong>Phone:</strong> {app.phone || "—"}</p>
            <p>
              <strong>Resume:</strong>{" "}
              {app.resume || app.resumeUrl ? (
                <a
                  href={app.resume || app.resumeUrl}
                  target="_blank"
                  download
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Resume
                </a>
              ) : (
                "Not uploaded"
              )}
            </p>
            <button
              onClick={() => handleDelete(app)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-max"
            >
              Delete Application
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewApplications;
