'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DirectTestPage() {
  const testDirectNavigation = (role: string) => {
    console.log('=== DIRECT NAVIGATION TEST ===')
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
    
    // Try direct navigation
    console.log('Attempting direct navigation...')
    window.location.href = `/dashboard/${role}`
  }

  const testWithDelay = (role: string) => {
    console.log('=== DELAYED NAVIGATION TEST ===')
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: 'Test User',
      role: role,
      email: 'test@example.com'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Wait and then navigate
    setTimeout(() => {
      console.log('Delayed navigation to:', `/dashboard/${role}`)
      window.location.href = `/dashboard/${role}`
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Direct Navigation Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['student', 'faculty', 'placement', 'recruiter'].map((role) => (
            <Card key={role}>
              <CardHeader>
                <CardTitle className="capitalize">{role} Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => testDirectNavigation(role)} 
                  className="w-full"
                >
                  Direct Navigate to {role}
                </Button>
                <Button 
                  onClick={() => testWithDelay(role)} 
                  variant="outline"
                  className="w-full"
                >
                  Delayed Navigate to {role}
                </Button>
                <Link href={`/dashboard/${role}`}>
                  <Button variant="secondary" className="w-full">
                    Link to {role}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
