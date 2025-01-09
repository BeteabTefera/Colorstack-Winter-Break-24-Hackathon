"use client";
import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC<RouteProps & { component: React.ComponentType<any> }> = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return user ? <Component {...rest as any} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
