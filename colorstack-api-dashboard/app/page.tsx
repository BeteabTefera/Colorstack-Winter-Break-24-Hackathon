"use client";
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import LandingPage from '../pages/LandingPage';

export default function Home() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}
