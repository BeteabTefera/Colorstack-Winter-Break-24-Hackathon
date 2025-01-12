'use client'
import Dashboard from '@/components/Dashboard'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Dashboard />
}

