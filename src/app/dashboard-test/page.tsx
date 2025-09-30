'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DashboardTestPage() {
  const [testResults, setTestResults] = useState<Record<string, string>>({})

  const testDashboardAccess = async (role: string) => {
    try {
      console.log(`Testing access to /dashboard/${role}`)
      
      // Create test user data
      const userData = {
        id: Date.now().toString(),
        name: 'Test User',
        role: role,
        email: 'test@example.com'
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Test navigation
      const result = await fetch(`/dashboard/${role}`)
      console.log(`Dashboard ${role} response:`, result.status)
      
      setTestResults(prev => ({
        ...prev,
        [role]: result.status === 200 ? 'SUCCESS' : `ERROR: ${result.status}`
      }))
      
    } catch (error) {
      console.error(`Error testing ${role}:`, error)
      setTestResults(prev => ({
        ...prev,
        [role]: `ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`
      }))
    }
  }

  const directNavigate = (role: string) => {
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: 'Test User',
      role: role,
      email: 'test@example.com'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Direct navigation
    window.location.href = `/dashboard/${role}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Navigation Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['student', 'faculty', 'placement', 'recruiter'].map((role) => (
            <Card key={role}>
              <CardHeader>
                <CardTitle className="capitalize">{role} Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => testDashboardAccess(role)} 
                  className="w-full"
                >
                  Test Access to {role}
                </Button>
                <Button 
                  onClick={() => directNavigate(role)} 
                  variant="outline"
                  className="w-full"
                >
                  Navigate to {role}
                </Button>
                {testResults[role] && (
                  <div className={`p-2 rounded text-sm ${
                    testResults[role].includes('SUCCESS') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {testResults[role]}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
