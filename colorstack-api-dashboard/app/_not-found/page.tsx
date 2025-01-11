import React from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import NotFound from '../not-found'

export default function ApiDocsPage() {
  return (
    <PrivateRoute>
      <div>
        <NotFound />
      </div>
    </PrivateRoute>
  )
}