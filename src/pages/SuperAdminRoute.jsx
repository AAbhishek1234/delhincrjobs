import React from "react";
import { Navigate } from "react-router-dom";

const SuperAdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("superAdminLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/superadmin-login" />;
};

export default SuperAdminRoute;
