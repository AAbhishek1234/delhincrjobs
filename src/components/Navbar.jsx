import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({
  handleBackToListings,
  setSelectedJob,
  setShowApplicationForm,
  setShowAdminPanel,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
    setMenuOpen(false);
  };

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
  <div className="container mx-auto px-4 py-1">
    <div className="flex justify-between items-center">
      <div className="flex items-center h-[80px] p-0 m-0">
        <img
          src="/images/navlogo1.png"
          alt="Site Logo"
          className="h-full w-auto cursor-pointer object-contain m-0 p-0"
          onClick={() => {
            if (handleBackToListings) handleBackToListings();
            navigate("/");
          }}
        />
      </div>




          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-600 focus:outline-none"
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {!currentUser ? (
              <button
                onClick={handleAdmin}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center shadow"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Employers Login
              </button>
            ) : (
              <>
                {/* Avatar and Greeting */}
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full shadow">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.email}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Hi, <span className="text-blue-600">{currentUser.email.split("@")[0]}</span>
                  </span>
                </div>

                {/* Dashboard */}
                <button
                  onClick={() => navigate("/AdminPannel")}
                  className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium flex items-center shadow"
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition font-medium flex items-center shadow"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Nav Links - Desktop & Mobile */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-between border-t border-gray-200 pt-4 mt-1 md:mt-2`}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
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

            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded ${
                location.pathname === "/findjobs"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors duration-300`}
              onClick={() => handleNavClick("find")}
            >
              <i className="fas fa-search mr-2"></i>
              Find All Jobs
            </button>

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

            <a
              href="https://wa.me/919871428686"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm font-medium rounded text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <i className="fas fa-users mr-2"></i>
              Join Our Job Community
            </a>
          </div>

          {/* Mobile Admin/Logout */}
          <div className="md:hidden mt-6 space-y-3">
            {!currentUser ? (
              <button
                onClick={handleAdmin}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Employers Login
              </button>
            ) : (
              <>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full shadow w-full">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.email}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Hi, <span className="text-blue-600">{currentUser.email.split("@")[0]}</span>
                  </span>
                </div>

                <button
                  onClick={() => navigate("/AdminPannel")}
                  className="w-full px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium flex items-center justify-center shadow"
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition font-medium flex items-center justify-center shadow"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
