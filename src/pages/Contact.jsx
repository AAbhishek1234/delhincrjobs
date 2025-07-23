import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Firebase submission logic can go here
    console.log("Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", reason: "", message: "" });
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Connect With Us
        </h2>
        <p className="text-gray-600 text-center mb-8">
        Want to have One-to-One discussion with our HR Expert? Fill out the form below to get a callback .
        </p>

        {submitted ? (
          <div className="text-green-600 font-medium text-center">
            ✅ Thank you! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              />
            </div>
<div>
  <label className="block text-sm font-medium text-gray-700">
    Phone Number
  </label>
  <input
    required
    name="phone"
    type="tel"
    value={formData.phone}
    onChange={handleChange}
    className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
  />
</div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reason for Contact
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              >
                <option value="">Select a reason</option>
                <option>I need help applying for a job</option>
                <option>I have a suggestion</option>
                <option>I want to list jobs on your platform</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        )}

        <div className="mt-10 text-center text-sm text-gray-500">
          📧 Email:{" "}
          <a
            href="mailto:info.jobsindelhincr@gmail.com"
            className="text-blue-600 hover:underline"
          >
            info.jobsindelhincr@gmail.com
          </a>
          <br />
          📍 Location: 101, Block C, Sector 61, Noida, Uttar Pradesh 201301, India
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Contact;
