import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({
  handleBackToListings,
  setSelectedJob,
  setShowApplicationForm,
  setShowAdminPanel,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAdmin = () => {
    navigate("/AdminLogin");
    setMenuOpen(false);
  };

  const handleNavClick = (action) => {
    if (action === "home") {
      if (handleBackToListings) handleBackToListings();
      navigate("/");
    }

    if (action === "find") {
      if (setSelectedJob) setSelectedJob(null);
      if (setShowApplicationForm) setShowApplicationForm(false);
      if (setShowAdminPanel) setShowAdminPanel(false);
      navigate("/findjobs");
    }

    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-2xl md:text-3xl font-bold text-blue-600 cursor-pointer"
            onClick={() => {
              if (handleBackToListings) handleBackToListings();
              navigate("/");
            }}
          >
            Delhi<span className="text-gray-800">NCR</span>
            <span className="text-blue-600">Jobs</span>
          </h1>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-600 focus:outline-none"
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>

          {/* Desktop Admin Button */}
          <div className="hidden md:flex">
            <button
              onClick={handleAdmin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center whitespace-nowrap"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Employers Login
            </button>
          </div>
        </div>

        {/* Nav Links - Mobile & Desktop */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-between border-t border-gray-200 pt-4 mt-4 md:mt-6`}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {/* Home Button */}
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded ${
                location.pathname === "/"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors duration-300`}
              onClick={() => handleNavClick("home")}
            >
              <i className="fas fa-home mr-2"></i>
              Home
            </button>

            {/* Find Jobs Button */}
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded ${
                location.pathname === "/findjobs"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors duration-300`}
              onClick={() => handleNavClick("find")}
            >
              <i className="fas fa-search mr-2"></i>
              Find Jobs
            </button>

            {/* Companies Button */}
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded ${
                location.pathname === "/companies"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors duration-300`}
              onClick={() => navigate("/companies")}
            >
              <i className="fas fa-building mr-2"></i>
              Our Recruitment Companies
            </button>

            {/* Connect With Us Button */}
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded ${
                location.pathname === "/contact"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors duration-300`}
              onClick={() => navigate("/contact")}
            >
              <i className="fas fa-handshake mr-2"></i>
              Connect With Us
            </button>

            {/* Join Our Community Button */}
           <a
  href="https://wa.me/919999999999" // replace with your WhatsApp number or group invite link
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center px-4 py-2 text-sm font-medium rounded text-gray-600 hover:text-blue-600 transition-colors duration-300"
>
  <i className="fas fa-users mr-2"></i>
  Join Our Job Community
</a>
          </div>

          {/* Mobile Admin Button */}
          <div className="md:hidden mt-4">
            <button
              onClick={handleAdmin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Employers Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
