import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ViewJobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const q = query(
          collection(db, "applications"),
          where("jobId", "==", jobId)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplicants(data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ⬅ Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Applicants for Job: {jobId}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        applicants.map((app) => (
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
                  rel="noopener noreferrer"
                  download
                  className="text-blue-500 underline"
                >
                  View/Download Resume
                </a>
              ) : (
                "Not uploaded"
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewJobApplicants;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   getDoc,
// } from "firebase/firestore";

// const ViewJobApplicants = () => {
//   const { jobId } = useParams();
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [jobtitle, setJobTitle] = useState("");
//   const navigate = useNavigate();

//   // Fetch job title
//   useEffect(() => {
//     const fetchJobTitle = async () => {
//       try {
//         const jobRef = doc(db, "jobPosts", jobId); // Adjust collection name if different
//         const jobSnap = await getDoc(jobRef);

//         if (jobSnap.exists()) {
//           setJobTitle(jobSnap.data().title || "Job Title Not Found");
//         } else {
//           setJobTitle("Job Not Found");
//         }
//       } catch (err) {
//         console.error("Error fetching job title:", err);
//         setJobTitle("Error fetching job");
//       }
//     };

//     fetchJobTitle();
//   }, [jobId]);

//   // Fetch applicants
//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const q = query(
//           collection(db, "applications"),
//           where("jobId", "==", jobId)
//         );
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setApplicants(data);
//       } catch (err) {
//         console.error("Error fetching applicants:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplicants();
//   }, [jobId]);

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         ⬅ Back
//       </button>
//       <h2 className="text-2xl font-bold mb-4">
//         Applicants for Job: {jobtitle}
//       </h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : applicants.length === 0 ? (
//         <p>No applicants found.</p>
//       ) : (
//         applicants.map((app) => (
//           <div
//             key={app.id}
//             className="border p-4 mb-4 rounded shadow-md flex flex-col gap-2"
//           >
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
//                   download
//                   className="text-blue-500 underline"
//                 >
//                   View/Download Resume
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

// export default ViewJobApplicants;
