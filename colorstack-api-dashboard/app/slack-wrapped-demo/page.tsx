import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import SlackWrappedDemo from '@/components/SlackWrappedDemo';

export default function SlackWrappedDemoPage() {
  return (
    <PrivateRoute>
      <div>
        <SlackWrappedDemo />
      </div>
    </PrivateRoute>
  )
}

