'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function TestDashboardPage() {
  const [results, setResults] = useState<Record<string, string>>({})

  const testDashboardAccess = async (role: string) => {
    console.log(`Testing access to ${role} dashboard...`)
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: 'Test User',
      role: role,
      email: 'test@example.com'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User data stored:', userData)
    
    // Test direct access
    try {
      const response = await fetch(`/dashboard/${role}`)
      console.log(`Dashboard ${role} response:`, response.status)
      setResults(prev => ({
        ...prev,
        [role]: `Status: ${response.status} - ${response.statusText}`
      }))
    } catch (error) {
      console.error(`Error accessing ${role} dashboard:`, error)
      setResults(prev => ({
        ...prev,
        [role]: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }))
    }
  }

  const navigateToDashboard = (role: string) => {
    console.log(`Navigating to ${role} dashboard...`)
    
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Access Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['student', 'faculty', 'placement', 'recruiter'].map((role) => (
            <Card key={role}>
              <CardHeader>
                <CardTitle className="capitalize">{role} Dashboard Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => testDashboardAccess(role)} 
                  className="w-full"
                >
                  Test Access to {role}
                </Button>
                <Button 
                  onClick={() => navigateToDashboard(role)} 
                  variant="outline"
                  className="w-full"
                >
                  Navigate to {role}
                </Button>
                <Link href={`/dashboard/${role}`}>
                  <Button variant="secondary" className="w-full">
                    Direct Link to {role}
                  </Button>
                </Link>
                {results[role] && (
                  <div className="p-2 bg-blue-100 rounded text-sm">
                    {results[role]}
                  </div>
                )}
              </CardContent>
            </Card>
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
