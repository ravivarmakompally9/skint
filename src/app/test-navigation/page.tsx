'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function TestNavigationPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const testLogin = (role: string) => {
    const userData = {
      id: Date.now().toString(),
      name: 'Test User',
      role: role,
      email: 'test@example.com'
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    alert(`Logged in as ${role}. Now try navigating to dashboard.`)
  }

  const testNavigation = (path: string) => {
    window.location.href = path
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Navigation Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => testLogin('student')} className="w-full">
                Login as Student
              </Button>
              <Button onClick={() => testLogin('faculty')} className="w-full">
                Login as Faculty
              </Button>
              <Button onClick={() => testLogin('placement')} className="w-full">
                Login as Placement Cell
              </Button>
              <Button onClick={() => testLogin('recruiter')} className="w-full">
                Login as Recruiter
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => testNavigation('/')} className="w-full">
                Go to Home
              </Button>
              <Button onClick={() => testNavigation('/auth/login')} className="w-full">
                Go to Login
              </Button>
              <Button onClick={() => testNavigation('/dashboard/student')} className="w-full">
                Go to Student Dashboard
              </Button>
              <Button onClick={() => testNavigation('/dashboard/faculty')} className="w-full">
                Go to Faculty Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {user && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current User</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(user, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
