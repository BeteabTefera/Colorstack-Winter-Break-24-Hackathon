import React from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import ApiDocs from '@/components/ApiDocs'

export default function ApiDocsPage() {
  return (
    <PrivateRoute>
      <div>
        <ApiDocs />
      </div>
    </PrivateRoute>
  )
}
