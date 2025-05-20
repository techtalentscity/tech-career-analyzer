// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Authentication Components
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './Pages/auth/Login';
// Career Test Components
import CareerHome from './Pages/career/CareerHome';
import CareerTest from './Pages/career/CareerTest';
import CareerDashboard from './Pages/career/CareerDashboard';
import CareerResources from './Pages/career/CareerResources'; // Add this import
// Payment Page
import PaymentPage from './Pages/payment/PaymentPage';
// Import services - these are imported for initialization
import './services/googleFormService'; // Import the Google Form service

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Navigate to="/career" replace />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Payment route */}
          <Route path="/payment" element={<PaymentPage />} />
          
          {/* Career assessment routes */}
          <Route path="/career" element={<CareerHome />} />
          <Route path="/career/test" element={
            <ProtectedRoute>
              <CareerTest />
            </ProtectedRoute>
          } />
          <Route path="/career/dashboard" element={
            <ProtectedRoute>
              <CareerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/career/resources" element={
            <ProtectedRoute>
              <CareerResources />
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<div className="p-10 text-center"><h1 className="text-3xl">Page Not Found</h1></div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
