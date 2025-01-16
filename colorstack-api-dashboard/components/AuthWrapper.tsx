'use client'

import { AuthProvider } from '@/contexts/AuthContext'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

