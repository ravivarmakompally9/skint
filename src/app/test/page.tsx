'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Navigation Test</h1>
        <div className="space-x-4">
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline">Go to Login</Button>
          </Link>
          <Link href="/dashboard/student">
            <Button variant="secondary">Go to Student Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
