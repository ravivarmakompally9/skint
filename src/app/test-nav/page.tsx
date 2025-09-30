'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function TestNavPage() {
  const [results, setResults] = useState<Record<string, string>>({})

  const testNavigation = (role: string) => {
    console.log(`Testing navigation to ${role} dashboard...`)
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: 'Test User',
      role: role,
      email: 'test@example.com'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User data stored:', userData)
    
    // Test navigation
    try {
      window.location.href = `/dashboard/${role}`
      setResults(prev => ({ ...prev, [role]: 'Navigation attempted' }))
    } catch (error) {
      console.error('Navigation error:', error)
      setResults(prev => ({ ...prev, [role]: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }))
    }
  }

  const testDirectAccess = async (role: string) => {
    try {
      const response = await fetch(`/dashboard/${role}`)
      setResults(prev => ({ 
        ...prev, 
        [`${role}_direct`]: `Status: ${response.status}` 
      }))
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [`${role}_direct`]: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Navigation Test Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['student', 'faculty', 'placement', 'recruiter'].map((role) => (
            <Card key={role}>
              <CardHeader>
                <CardTitle className="capitalize">{role} Dashboard Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => testNavigation(role)} 
                  className="w-full"
                >
                  Navigate to {role}
                </Button>
                <Button 
                  onClick={() => testDirectAccess(role)} 
                  variant="outline"
                  className="w-full"
                >
                  Test Direct Access
                </Button>
                <Link href={`/dashboard/${role}`}>
                  <Button variant="secondary" className="w-full">
                    Link to {role}
                  </Button>
                </Link>
                {results[role] && (
                  <div className="p-2 bg-blue-100 rounded text-sm">
                    {results[role]}
                  </div>
                )}
                {results[`${role}_direct`] && (
                  <div className="p-2 bg-green-100 rounded text-sm">
                    {results[`${role}_direct`]}
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
