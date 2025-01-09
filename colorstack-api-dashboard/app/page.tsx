"use client";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import SlackWrappedDemo from '../pages/SlackWrappedDemo';
import StudyBuddyDemo from '../pages/StudyBuddyDemo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/slack-wrapped-demo" element={<PrivateRoute component={SlackWrappedDemo} />} />
          <Route path="/study-buddy-demo" element={<PrivateRoute component={StudyBuddyDemo} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
