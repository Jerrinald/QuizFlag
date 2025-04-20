import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";


const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("jwtToken");

  const user = token ? decodeToken(token) : null;

  if (!user || !user.roles.includes(requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;