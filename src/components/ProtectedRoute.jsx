// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAuthorized } = useAuth();
  
  // First check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Then check if user is authorized
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  
  // If both authenticated and authorized, render the protected content
  return children;
};

export default ProtectedRoute;
