//   import React, { useState } from "react";
//   import { useLocation, useParams, useNavigate } from "react-router-dom";
//   import Navbar from "../components/Navbar";
//   import Footer from "../components/Footer";
//   import { db } from "../firebase";
//   import {
//     collection,
//     addDoc,
//     query,
//     where,
//     getDocs,
//   } from "firebase/firestore";

//   const JobDetails = () => {
//     const { id } = useParams();
//     const { state } = useLocation();
//     const job = state?.job;
//     const navigate = useNavigate();

//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       phone: "",
//       course: "",
//       resume: null,
//     });

//     const handleChange = (e) => {
//       const { name, value, files } = e.target;
//       if (name === "resume") {
//         const file = files[0];
//         if (file && file.size <= 5 * 1024 * 1024) {
//           setFormData({ ...formData, resume: file });
//         } else {
//           alert("Resume must be under 5MB.");
//         }
//       } else {
//         setFormData({ ...formData, [name]: value });
//       }
//     };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // Upload resume file to Cloudinary
    
//     const formDataCloud = new FormData();
//     formDataCloud.append("file", formData.resume);
//     formDataCloud.append("upload_preset", "jobportal_resume"); // your upload preset
//     formDataCloud.append("cloud_name", "dmkfvomn2"); // your cloud name

//     const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dmkfvomn2/auto/upload", {
//       method: "POST",
//       body: formDataCloud,
//     });

//     const fileData = await cloudRes.json();
//     const resumeUrl = fileData.secure_url;

//     // Send data to Firestore
//     await addDoc(collection(db, "applications"), {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       course: formData.course,
//       resumeUrl: resumeUrl,
//       createdAt: new Date(),
//     });

//     alert("✅ Application submitted!");
//      setShowForm(false);
//   } catch (err) {
//     console.error("❌ Error:", err);
//     alert("❌ Application not submitted.");
//   }
// };


//     if (!job) {
//       return (
//         <div className="min-h-screen flex items-center justify-center text-gray-500">
//           <p>Job details not available. Please go back and select a job again.</p>
//         </div>
//       );
//     }

//     return (
//       <>
//         <Navbar />
//         <div className={`relative z-0 ${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
//           <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow mt-10">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
//             <p className="text-lg text-gray-600 font-medium mb-2">{job.company}</p>
//             <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
//               {job.location}
//             </span>

//             <p className="text-gray-700 mb-2">
//               <strong>Posted on:</strong>{" "}
//               {new Date(job.postedDate).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })}
//             </p>

//             <p className="mb-2"><strong>Category:</strong> {job.category}</p>
//             <p className="mb-2"><strong>Experience:</strong> {job.experience}</p>
//             <p className="mb-2"><strong>Salary:</strong> {job.salary}</p>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Requirements</h2>
//               <p className="text-gray-700">{job.requirements}</p>
//             </div>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Job Description</h2>
//               <p className="text-gray-700">{job.description}</p>
//             </div>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
//               <p className="text-gray-700">{job.qualifications}</p>
//             </div>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
//               <p className="text-gray-700">{job.responsibilities}</p>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
//               >
//                 Back to Jobs
//               </button>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {showForm && (
//           <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//                 onClick={() => setShowForm(false)}
//               >
//                 &times;
//               </button>
//               <h2 className="text-2xl font-semibold mb-4">Apply for {job.title}</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="course"
//                   placeholder="Your Course"
//                   value={formData.course}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//                 <input
//                   type="file"
//                   name="resume"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleChange}
//                   className="w-full"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//                 >
//                   Submit Application
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         <Footer />
//       </>
//     );
//   };

//   export default JobDetails;





// import React, { useState, useEffect } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { db } from "../firebase";
// import axios from "axios";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   Timestamp
// } from "firebase/firestore";

// const JobDetails = () => {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const job = state?.job;
//   const navigate = useNavigate();

//   const [showForm, setShowForm] = useState(false);
//   const [alreadyApplied, setAlreadyApplied] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     course: "",
//     resume: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "resume") {
//       const file = files[0];
//       if (file && file.size <= 5 * 1024 * 1024) {
//         setFormData((prev) => ({ ...prev, resume: file }));
//       } else {
//         alert("Resume must be under 5MB.");
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//       if (name === "email") setEmailError("");
//       if (name === "phone") setPhoneError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setEmailError("");
//     setPhoneError("");

//     if (!formData.resume) {
//       alert("Please upload your resume first.");
//       return;
//     }

//     try {
//       const emailQuery = query(
//         collection(db, "applications"),
//         where("jobId", "==", id),
//         where("email", "==", formData.email)
//       );

//       const phoneQuery = query(
//         collection(db, "applications"),
//         where("jobId", "==", id),
//         where("phone", "==", formData.phone)
//       );

//       const [emailSnap, phoneSnap] = await Promise.all([
//         getDocs(emailQuery),
//         getDocs(phoneQuery)
//       ]);

//       if (!emailSnap.empty || !phoneSnap.empty) {
//         if (!emailSnap.empty) {
//           setEmailError("❌ This email has already been used for this job.");
//         }
//         if (!phoneSnap.empty) {
//           setPhoneError("❌ This phone number has already been used for this job.");
//         }
//         return;
//       }

//       const uploadData = new FormData();
//       uploadData.append("file", formData.resume);
//       uploadData.append("upload_preset", "jobportal_resume");
//       uploadData.append("cloud_name", "dmkfvomn2");

//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/dmkfvomn2/raw/upload",
//         uploadData
//       );
// //
//       const fileURL = res.data.secure_url;

//       await addDoc(collection(db, "applications"), {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         course: formData.course,
//         resume: fileURL,
//         jobId: id,
//         createdAt: Timestamp.now(),
//       });

//       alert("✅ Application submitted successfully!");
//       setAlreadyApplied(true);
//       setShowForm(false);
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const checkApplicationStatus = async () => {
//       const { email, phone } = formData;
//       if (!email || !phone) return;

//       const emailQuery = query(
//         collection(db, "applications"),
//         where("jobId", "==", id),
//         where("email", "==", email)
//       );

//       const phoneQuery = query(
//         collection(db, "applications"),
//         where("jobId", "==", id),
//         where("phone", "==", phone)
//       );

//       const [emailSnap, phoneSnap] = await Promise.all([
//         getDocs(emailQuery),
//         getDocs(phoneQuery)
//       ]);

//       if (!emailSnap.empty || !phoneSnap.empty) {
//         setAlreadyApplied(true);
//       }
//     };

//     checkApplicationStatus();
//   }, [formData.email, formData.phone, id]);

//   if (!job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         <p>Job details not available. Please go back and select a job again.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className={`relative z-0 ${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
//         <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow mt-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
//           <p className="text-lg text-gray-600 font-medium mb-2">{job.company}</p>
//           <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
//             {job.location}
//           </span>

//           <p className="text-gray-700 mb-2"><strong>Posted on:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
//           <p className="mb-2"><strong>Category:</strong> {job.category}</p>
//           <p className="mb-2"><strong>Experience:</strong> {job.experience}</p>
//           <p className="mb-2"><strong>Salary:</strong> {job.salary}</p>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Requirements</h2>
//             <p className="text-gray-700">{job.requirements}</p>
//           </div>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Job Description</h2>
//             <p className="text-gray-700">{job.description}</p>
//           </div>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
//             <p className="text-gray-700">{job.qualifications}</p>
//           </div>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
//             <p className="text-gray-700">{job.responsibilities}</p>
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
//             >
//               Back to Jobs
//             </button>

//             <button
//               onClick={() => {
//                 if (!alreadyApplied) setShowForm(true);
//               }}
//               className={`px-6 py-2 rounded-lg transition ${alreadyApplied ? "bg-gray-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
//               disabled={alreadyApplied}
//             >
//               {alreadyApplied ? "Already Applied" : "Apply Now"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showForm && !alreadyApplied && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//               onClick={() => setShowForm(false)}
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-semibold mb-4">Apply for {job.title}</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <div>
//                 <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
//                 {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
//               </div>
//               <div>
//                 <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
//                 {phoneError && <p className="text-red-600 text-sm mt-1">{phoneError}</p>}
//               </div>
//               <input type="text" name="course" placeholder="Your Course" value={formData.course} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} className="w-full" required />
//               <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Submit Application</button>
//             </form>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default JobDetails;




import React, { useState, useEffect, Profiler } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import axios from "axios";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const JobDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const job = state?.job;
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (file && allowedTypes.includes(file.type) && file.size <= 2 * 1024 * 1024) {
        setFormData((prev) => ({ ...prev, resume: file }));
      } else {
        alert("Please upload a valid PDF, DOC, or DOCX under 2MB.");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "email") setEmailError("");
      if (name === "phone") setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPhoneError("");

    if (!formData.resume) {
      alert("Please upload your resume.");
      return;
    }

    try {
      // Check for duplicate email or phone
      const emailQuery = query(collection(db, "applications"), where("jobId", "==", id), where("email", "==", formData.email));
      const phoneQuery = query(collection(db, "applications"), where("jobId", "==", id), where("phone", "==", formData.phone));

      const [emailSnap, phoneSnap] = await Promise.all([getDocs(emailQuery), getDocs(phoneQuery)]);

      if (!emailSnap.empty || !phoneSnap.empty) {
        if (!emailSnap.empty) setEmailError("❌ This email is already used for this job.");
        if (!phoneSnap.empty) setPhoneError("❌ This phone number is already used for this job.");
        return;
      }

      // Upload resume to Cloudinary
      setIsUploading(true);
      setUploadProgress(0);

      const uploadData = new FormData();
      uploadData.append("file", formData.resume);
      uploadData.append("upload_preset", "jobportal_resume_new"); // preset must be unsigned

      const res = await axios.post("https://api.cloudinary.com/v1_1/dmkfvomn2/raw/upload", uploadData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      setIsUploading(false);
      const fileURL = res.data.secure_url;

      // Save application in Firestore
      await addDoc(collection(db, "applications"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        resume: fileURL,
        jobId: id,
        createdAt: Timestamp.now(),
      });
toast.success("🎉 Your application has been submitted!", {
  position: "top-center",
  autoClose: 5500,
  style: {
    borderRadius: "10px",
    background: "#1E3A8A",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
  },
});

      setAlreadyApplied(true);
      setShowForm(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("❌ Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3500,
        style: {
          borderRadius: "10px",
          background: "#B91C1C",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "500",
        },
      });
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const checkApplicationStatus = async () => {
      const { email, phone } = formData;
      if (!email || !phone) return;

      const emailQuery = query(collection(db, "applications"), where("jobId", "==", id), where("email", "==", email));
      const phoneQuery = query(collection(db, "applications"), where("jobId", "==", id), where("phone", "==", phone));

      const [emailSnap, phoneSnap] = await Promise.all([getDocs(emailQuery), getDocs(phoneQuery)]);

      if (!emailSnap.empty || !phoneSnap.empty) {
        setAlreadyApplied(true);
      }
    };

    checkApplicationStatus();
  }, [formData.email, formData.phone, id]);

  if (!job) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">
      <p>Job details not available. Please go back and select a job again.</p>
    </div>;
  }

  return (
    <>
      <Navbar />
       <ToastContainer
  position="top-center"
  autoClose={3500}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>
    <div className="max-w-5xl mx-auto mt-12 px-6 py-10 rounded-3xl backdrop-blur-md bg-white/80 shadow-xl border border-slate-200 transition-all duration-300">
  {/* Job Title and Company */}
  <div className="mb-8">
    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{job.title}</h1>
    <p className="text-lg text-slate-600 mt-1">{job.company}</p>
  </div>

  {/* Tags */}
  <div className="flex flex-wrap items-center gap-4 text-sm mb-10">
    <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-1 rounded-full shadow-sm font-medium">
      📍 {job.location}
    </span>
    <span className="text-slate-600">
      🗓️ <strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}
    </span>
  </div>

  {/* Info Grid */}
  <div className="grid md:grid-cols-2 gap-6 text-base text-slate-700 mb-10">
    <div><span className="font-medium text-slate-800">🛠 Skills Required:</span> {job.requirements}</div>
    <div><span className="font-medium text-slate-800">🎓 Qualification:</span> {job.qualifications}</div>
    <div><span className="font-medium text-slate-800">💼 Experience:</span> {job.experience}</div>
    <div><span className="font-medium text-slate-800">💰 Salary:</span> ₹{job.salary}</div>
     <div><span className="font-medium text-slate-800">💰 Number of Vacancies:</span> {job.vacancies}</div>
  </div>

  {/* Description */}
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-blue-700 mb-3">Job Description</h2>
    <p className="text-slate-700 leading-relaxed tracking-wide">{job.description}</p>
  </div>

  {/* Responsibilities */}
  <div className="mb-12">
    <h2 className="text-2xl font-semibold text-blue-700 mb-3">About The Company</h2>
    <p className="text-slate-700 leading-relaxed tracking-wide">{job.about}</p>
  </div>

  {/* Apply Button */}
  <div className="text-center">
    <button
      onClick={() => setShowForm(true)}
      disabled={alreadyApplied}
      className={`px-8 py-3 text-lg rounded-full font-semibold shadow-md transition duration-200 ${
        alreadyApplied
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white"
      }`}
    >
      {alreadyApplied ? "✅ Already Applied" : "🚀 Apply Now"}
    </button>
  </div>
</div>
{showForm && !alreadyApplied && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Apply for <span className="text-indigo-600">{job.title}</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}


      <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Upload Your Resume
  </label>

  <div className="flex items-center">
    <label
      htmlFor="resume"
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm cursor-pointer hover:bg-blue-700 transition"
    >
      Choose File
    </label>
    <span className="ml-4 text-gray-500 text-sm" id="file-name">
      No file selected
    </span>
    <input
      type="file"
      id="resume"
      name="resume"
      accept=".pdf,.doc,.docx"
      className="hidden"
      onChange={(e) => {
        handleChange(e);
        const fileName = e.target.files[0]?.name || "No file selected";
        document.getElementById("file-name").textContent = fileName;
      }}
    />
  </div>
</div>

        {isUploading && (
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white py-3 rounded-lg font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
   

  </div>
)}

      <Footer />
    </>
  );
};

export default JobDetails;
