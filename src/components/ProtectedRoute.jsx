// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAuthorized } = useAuth();

  // First check if user is authenticated
  if (!currentUser) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Then check if user is authorized (has paid)
  if (!isAuthorized) {
    // User is logged in but hasn't paid, redirect to payment page
    return <Navigate to="/payment" replace />;
  }

  // User is both authenticated and authorized, render the protected content
  return children;
};

export default ProtectedRoute;
