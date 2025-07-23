// import React, { useRef, useState } from "react";
// import ReactToPdf from "react-to-pdf";

// const ResumeBuilder = () => {
//   const [formData, setFormData] = useState({
//     fullName: "John Doe",
//     email: "john@example.com",
//     phone: "1234567890",
//     github: "https://github.com/johndoe",
//     linkedin: "https://linkedin.com/in/johndoe",
//     summary:
//       "Motivated Computer Science graduate with hands-on experience in React, Node.js and Firebase.",
//     education: "B.Tech in Computer Science, ABC University, 2023",
//     skills: "React, Node.js, Firebase, MongoDB, JavaScript, HTML, CSS",
//     projects: "Job Portal App, Todo App, Chat App using Socket.io",
//   });

//   const resumeRef = useRef();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto font-sans bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         Resume Builder
//       </h1>

//       {/* Input Form */}
//       <div className="grid md:grid-cols-2 gap-4 mb-6">
//         {Object.keys(formData).map((key) => (
//           <div key={key} className="flex flex-col">
//             <label className="font-medium capitalize mb-1">
//               {key.replace(/([A-Z])/g, " $1")}
//             </label>
//             <textarea
//               rows={key === "summary" || key === "projects" ? 3 : 1}
//               name={key}
//               placeholder={`Enter ${key}`}
//               value={formData[key]}
//               onChange={handleChange}
//               className="p-2 border rounded resize-none"
//             />
//           </div>
//         ))}
//       </div>

//       {/* PDF Download Button */}
//       <div className="flex justify-center">
//         <ReactToPdf targetRef={resumeRef} filename="resume.pdf">
//           {({ toPdf }) => (
//             <button
//               onClick={toPdf}
//               className="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Download Resume as PDF
//             </button>
//           )}
//         </ReactToPdf>
//       </div>

//       {/* Resume Preview */}
//       <div
//         ref={resumeRef}
//         className="bg-white shadow-lg p-8 rounded-md text-black w-full max-w-3xl mx-auto border border-gray-300"
//         style={{ fontFamily: "Georgia, serif" }}
//       >
//         <h2 className="text-3xl font-bold text-center mb-1">
//           {formData.fullName}
//         </h2>
//         <p className="text-center text-gray-600 text-sm">
//           {formData.email} | {formData.phone}
//         </p>
//         <p className="text-center text-gray-600 text-sm mb-4">
//           <a href={formData.github} target="_blank" rel="noreferrer">
//             {formData.github}
//           </a>{" "}
//           |{" "}
//           <a href={formData.linkedin} target="_blank" rel="noreferrer">
//             {formData.linkedin}
//           </a>
//         </p>

//         <hr className="my-4 border-t-2 border-gray-300" />

//         <section className="mb-4">
//           <h3 className="text-xl font-semibold text-blue-700">Summary</h3>
//           <p className="text-gray-800">{formData.summary}</p>
//         </section>

//         <section className="mb-4">
//           <h3 className="text-xl font-semibold text-blue-700">Education</h3>
//           <p className="text-gray-800">{formData.education}</p>
//         </section>

//         <section className="mb-4">
//           <h3 className="text-xl font-semibold text-blue-700">Skills</h3>
//           <ul className="list-disc list-inside text-gray-800">
//             {formData.skills.split(",").map((skill, idx) => (
//               <li key={idx}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </section>

//         <section>
//           <h3 className="text-xl font-semibold text-blue-700">Projects</h3>
//           <ul className="list-disc list-inside text-gray-800">
//             {formData.projects.split(",").map((proj, idx) => (
//               <li key={idx}>{proj.trim()}</li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;
