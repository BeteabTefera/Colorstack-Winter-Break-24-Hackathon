"use client";
import React from 'react';
import Dashboard from '../../pages/Dashboard';
import { AuthProvider } from '../../contexts/AuthContext';
import PrivateRoute from '../../components/PrivateRoute';

export default function DashboardPage() {
  return (
    <AuthProvider>
      <PrivateRoute component={Dashboard} />
    </AuthProvider>
  );
}
