import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import StudyBuddyDemo from '@/components/study-buddy-demo';

export default function StudyBuddyDemoPage() {
  return (
    <PrivateRoute>
      <div>
        <StudyBuddyDemo />
      </div>
    </PrivateRoute>
  )
}
