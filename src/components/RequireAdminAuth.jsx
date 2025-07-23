// components/RequireAdminAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdminAuth = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/AdminLogin" replace />;
};

export default RequireAdminAuth;
