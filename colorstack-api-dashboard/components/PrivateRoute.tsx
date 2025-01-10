"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC<{ component: React.ComponentType<any> }> = ({ component: Component }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return user ? <Component /> : null;
};

export default PrivateRoute;
