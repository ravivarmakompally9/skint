'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function VerifyPage() {
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    // Test if the app is working
    setStatus('App is running!')
  }, [])

  const testNavigation = (role: string) => {
    console.log('Testing navigation to:', `/dashboard/${role}`)
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: 'Test User',
      role: role,
      email: 'test@example.com'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User data stored:', userData)
    
    // Navigate
    window.location.href = `/dashboard/${role}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">App Verification</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 font-semibold">{status}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {['student', 'faculty', 'placement', 'recruiter'].map((role) => (
            <Button
              key={role}
              onClick={() => testNavigation(role)}
              className="w-full"
            >
              Go to {role} dashboard
            </Button>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
          
          <Link href="/auth/login">
            <Button variant="secondary" className="w-full">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
