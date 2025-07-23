import React, { useState } from "react";
import { db, serverTimestamp } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddJobForm = () => {
  const [newJob, setNewJob] = useState({
    title: "", company: "", location: "", category: "",
    requirements: "", description: "", qualifications: "",
    responsibilities: "", salary: ""
  });

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "jobs"), {
      ...newJob,
      postedDate: serverTimestamp()
    });
    setNewJob({
      title: "", company: "", location: "", category: "",
      requirements: "", description: "", qualifications: "",
      responsibilities: "", salary: ""
    });
    alert("Job added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      {["title","company","location","category","requirements","salary"].map((f)=>(
        <input
          key={f}
          name={f}
          value={newJob[f]}
          onChange={handleChange}
          placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
          className="input"
          required
        />
      ))}
      {["description","qualifications","responsibilities"].map((f)=>(
        <textarea
          key={f}
          name={f}
          value={newJob[f]}
          onChange={handleChange}
          placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
          className="input"
          required
        />
      ))}
      <button type="submit" className="btn-blue">Add Job</button>
    </form>
  );
};

export default AddJobForm;
