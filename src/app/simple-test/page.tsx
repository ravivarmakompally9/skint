'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function SimpleTestPage() {
  const [result, setResult] = useState('')

  const testNavigation = () => {
    console.log('Testing navigation...')
    setResult('Testing...')
    
    // Create user data
    const userData = {
      id: '123',
      name: 'Test User',
      role: 'student',
      email: 'test@example.com'
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User data stored')
    
    // Try navigation
    try {
      console.log('Attempting navigation to /dashboard/student')
      window.location.href = '/dashboard/student'
      setResult('Navigation attempted')
    } catch (error) {
      console.error('Navigation error:', error)
      setResult('Navigation failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const testDirectURL = () => {
    console.log('Testing direct URL access...')
    setResult('Testing direct URL...')
    
    // Try to fetch the dashboard page
    fetch('/dashboard/student')
      .then(response => {
        console.log('Response status:', response.status)
        setResult(`Dashboard accessible: ${response.status}`)
      })
      .catch(error => {
        console.error('Fetch error:', error)
        setResult('Dashboard not accessible: ' + error.message)
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Navigation Test</h1>
        
        <div className="space-y-4">
          <Button onClick={testNavigation} className="w-full">
            Test Navigation to Dashboard
          </Button>
          
          <Button onClick={testDirectURL} variant="outline" className="w-full">
            Test Direct URL Access
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/dashboard/student'} 
            variant="secondary" 
            className="w-full"
          >
            Force Navigate to Student Dashboard
          </Button>
        </div>
        
        {result && (
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Result:</h3>
            <p>{result}</p>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="font-bold mb-4">Direct Links:</h3>
          <div className="space-y-2">
            <a href="/dashboard/student" className="block text-blue-600 hover:underline">
              /dashboard/student
            </a>
            <a href="/dashboard/faculty" className="block text-blue-600 hover:underline">
              /dashboard/faculty
            </a>
            <a href="/dashboard/placement" className="block text-blue-600 hover:underline">
              /dashboard/placement
            </a>
            <a href="/dashboard/recruiter" className="block text-blue-600 hover:underline">
              /dashboard/recruiter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
