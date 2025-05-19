// src/App.jsx - UPDATED IMPORT
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Career Test Components
import CareerHome from './Pages/career/CareerHome';
import CareerTest from './Pages/career/CareerTest';
import CareerDashboard from './Pages/career/dashboard/CareerDashboard'; // ✅ FIXED PATH

// Import services
import './services/googleFormService';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Navigate to="/career" replace />} />
        
        {/* Career assessment routes */}
        <Route path="/career" element={<CareerHome />} />
        <Route path="/career/test" element={<CareerTest />} />
        <Route path="/career/dashboard" element={<CareerDashboard />} />
        
        {/* 404 route */}
        <Route path="*" element={<div className="p-10 text-center"><h1 className="text-3xl">Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
