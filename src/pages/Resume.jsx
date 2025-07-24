// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const ViewApplications = () => {
//   const { jobId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!user || !jobId) return;

//       try {
//         const q = collection(
//           db,
//           `jobApplications/${user.email}/${jobId}/applications`
//         );
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => doc.data());
//         setApplications(data);
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [user, jobId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Applications</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : applications.length === 0 ? (
//         <p>No applications yet.</p>
//       ) : (
//         applications.map((app, index) => (
//           <div key={index} className="border p-4 mb-2 rounded">
//             <p><strong>Name:</strong> {app.name}</p>
//             <p><strong>Email:</strong> {app.email}</p>
//             <p><strong>Phone:</strong> {app.phone}</p>
//             <p>
//               <strong>Resume:</strong>{" "}
//               <a
//                 href={app.resumeUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 underline"
//               >
//                 View Resume
//               </a>
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewApplications;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// const ViewApplications = () => {
//   const { jobId } = useParams(); // this will be the *global* job id after our dashboard fix
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Watch auth
//   useEffect(() => {
//     const auth = getAuth();
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser || null);
//     });
//     return () => unsub();
//   }, []);

//   // Fetch applications by global job id
//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!user || !jobId) return;
//       setLoading(true);
//       try {
//         const appsRef = collection(db, "applications");
//         const q = query(appsRef, where("jobId", "==", jobId));
//         const snap = await getDocs(q);
//         const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//         setApplications(data);
//         console.log("Fetched applications:", data);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchApplications();
//   }, [user, jobId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Applications</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : applications.length === 0 ? (
//         <p>No applications yet.</p>
//       ) : (
//         applications.map((app) => (
//           <div key={app.id} className="border p-4 mb-2 rounded shadow-md">
//             <p><strong>Name:</strong> {app.name || "—"}</p>
//             <p><strong>Email:</strong> {app.email || "—"}</p>
//             <p><strong>Phone:</strong> {app.phone || "—"}</p>
//             <p>
//               <strong>Resume:</strong>{" "}
//               {app.resume || app.resumeUrl ? (
//                 <a
//                   href={app.resume || app.resumeUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   View Resume
//                 </a>
//               ) : (
//                 "Not uploaded"
//               )}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewApplications;







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { db, storage } from "../firebase";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { ref, deleteObject } from "firebase/storage";

// const ViewApplications = () => {
//   const { jobId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Auth observer
//   useEffect(() => {
//     const auth = getAuth();
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser || null);
//     });
//     return () => unsub();
//   }, []);

//   // Fetch applications
//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!user || !jobId) return;
//       setLoading(true);
//       try {
//         const appsRef = collection(db, "applications");
//         const q = query(appsRef, where("jobId", "==", jobId));
//         const snap = await getDocs(q);
//         const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//         setApplications(data);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchApplications();
//   }, [user, jobId]);

//   // Delete Resume & Application
//   const handleDelete = async (app) => {
//     const confirm = window.confirm("Are you sure you want to delete this application?");
//     if (!confirm) return;

//     try {
//       // 1. Delete resume from Firebase Storage if available
//       if (app.resume || app.resumeUrl) {
//         const fileRef = ref(storage, app.resume || app.resumeUrl);
//         await deleteObject(fileRef);
//       }

//       // 2. Delete Firestore document
//       await deleteDoc(doc(db, "applications", app.id));

//       // 3. Update local state
//       setApplications((prev) => prev.filter((a) => a.id !== app.id));
//       alert("Application deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting application:", err);
//       alert("Failed to delete application.");
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     const auth = getAuth();
//     await signOut(auth);
//     navigate("/AdminLogin"); // go to login or homepage
//   };

//   return (
//     <div className="p-6 relative">
//       {/* Logout button */}
//       <button
//         onClick={handleLogout}
//         className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//       <h1 className="text-2xl font-bold mb-4">Applications</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : applications.length === 0 ? (
//         <p>No applications yet.</p>
//       ) : (
//         applications.map((app) => (
//           <div
//             key={app.id}
//             className="border p-4 mb-4 rounded shadow-md flex flex-col gap-2"
//           >
//              <p><strong>Profile:</strong> {app.title || "—"}</p>
//             <p><strong>Name:</strong> {app.name || "—"}</p>
//             <p><strong>Email:</strong> {app.email || "—"}</p>
//             <p><strong>Phone:</strong> {app.phone || "—"}</p>
//             <p>
//               <strong>Resume:</strong>{" "}
//               {app.resume || app.resumeUrl ? (
//                 <a
//                   href={app.resume || app.resumeUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   View Resume
//                 </a>
//               ) : (
//                 "Not uploaded"
//               )}
//             </p>

//             {/* Delete Button */}
//             <button
//               onClick={() => handleDelete(app)}
//               className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-max"
//             >
//               Delete Application
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewApplications;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db, storage } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,          // <-- added
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component

const ViewApplications = () => {
  const { jobId } = useParams();                // jobId from route
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [jobTitle, setJobTitle] = useState(""); // store fetched job title
  const navigate = useNavigate();

  // Auth observer
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsub();
  }, []);

  // Fetch the job title (once) if jobId is present
  useEffect(() => {
    const fetchJobTitle = async () => {
      if (!jobId) return;
      try {
        const jobRef = doc(db, "jobs", jobId);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          const data = jobSnap.data();
            // Try common possible field names
          const titleValue =
            data.title ||
            data.jobTitle ||
            data.name ||
            data.position ||
            "";
          setJobTitle(titleValue);
        } else {
          setJobTitle("");
        }
      } catch (e) {
        console.error("Error fetching job title:", e);
        setJobTitle("");
      }
    };
    fetchJobTitle();
  }, [jobId]);

  // Fetch applications for this job
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !jobId) return;
      setLoading(true);
      try {
        const appsRef = collection(db, "applications");
        const q = query(appsRef, where("jobId", "==", jobId));
        const snap = await getDocs(q);

        const data = snap.docs.map((d) => {
          const raw = d.data();

          // Determine the best title for display
            // Priority: application.title -> application.jobTitle -> fetched jobTitle -> "—"
          const resolvedTitle =
            raw.title ||
            raw.jobTitle ||
            jobTitle ||
            "";

          return {
            id: d.id,
            ...raw,
            resolvedTitle, // store computed for UI
          };
        });

        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch after jobTitle attempt finishes (so we can use it).
    // If jobTitle not yet known, we still proceed; later you could refetch when jobTitle changes.
    fetchApplications();
  }, [user, jobId, jobTitle]);

  // Delete Resume & Application
  const handleDelete = async (app) => {
    const confirm = window.confirm("Are you sure you want to delete this application?");
    if (!confirm) return;

    try {
      // Delete resume from Storage if you stored the *path*.
      // If you stored the full download URL, you need to derive the ref differently.
      if (app.resume || app.resumeUrl) {
        try {
          const pathOrUrl = app.resume || app.resumeUrl;
          // If it's a gs:// or https download URL you might need:
          // const fileRef = ref(storage, pathOrUrl); // Works if you saved the storage path.
          const fileRef = ref(storage, pathOrUrl);
          await deleteObject(fileRef);
        } catch (fileErr) {
          console.warn("Resume file might already be deleted or invalid path:", fileErr);
        }
      }

      await deleteDoc(doc(db, "applications", app.id));
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
      alert("Application deleted successfully.");
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application.");
    }
  };

  // Logout
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/AdminLogin");
  };
const handleDownload = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "resume.pdf"; // Optional: customize filename
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("Failed to download resume. Please try again.");
  }
};

  return (
    <>
     <Navbar></Navbar>
    <div className="p-6 relative">
      {/* Logout button */}
      {/* <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button> */}

      <h1 className="text-2xl font-bold mb-4">Applications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.id}
            className="border p-4 mb-4 rounded shadow-md flex flex-col gap-2"
          >
            <p>
              <strong>Profile:</strong>{" "}
              {app.resolvedTitle || "—"}
            </p>
            <p><strong>Name:</strong> {app.name || "—"}</p>
            <p><strong>Email:</strong> {app.email || "—"}</p>
            <p><strong>Phone:</strong> {app.phone || "—"}</p>
       <p>
  <strong>Resume:</strong>{" "}
  {app.resume || app.resumeUrl ? (
    <>
      <a
        href={app.resume || app.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mr-3"
      >
        View Resume
      </a>
      <button
        onClick={() => handleDownload(app.resume || app.resumeUrl)}
        className="text-green-600 underline"
      >
        Download Resume
      </button>
    </>
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
    </>
  );
};

export default ViewApplications;
