'use client'
import { useEffect, useState } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import "./globals.css";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClientOnly>
        <body>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </ClientOnly>
    </html>
  )
}
