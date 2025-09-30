'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestSimplePage() {
  const [result, setResult] = useState('')

  const testDirectAccess = () => {
    console.log('Testing direct access to dashboards...')
    setResult('Testing...')
    
    // Test multiple methods
    const methods = [
      () => window.location.href = '/dashboard/student',
      () => window.location.href = '/student-dashboard.html',
      () => window.location.href = '/dashboards.html',
      () => window.open('/dashboard/student', '_blank'),
      () => window.open('/student-dashboard.html', '_blank')
    ]
    
    methods.forEach((method, index) => {
      setTimeout(() => {
        try {
          console.log(`Method ${index + 1}:`, method.toString())
          method()
        } catch (error) {
          console.error(`Method ${index + 1} failed:`, error)
        }
      }, index * 1000)
    })
    
    setResult('Multiple navigation methods attempted. Check console for details.')
  }

  const testStaticPages = () => {
    console.log('Testing static pages...')
    setResult('Testing static pages...')
    
    // Test static HTML pages
    const staticPages = [
      '/dashboards.html',
      '/student-dashboard.html'
    ]
    
    staticPages.forEach((page, index) => {
      setTimeout(() => {
        console.log(`Testing static page ${index + 1}:`, page)
        window.location.href = page
      }, index * 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Dashboard Test</h1>
        
        <div className="space-y-4 mb-8">
          <Button onClick={testDirectAccess} className="w-full">
            Test Direct Dashboard Access
          </Button>
          
          <Button onClick={testStaticPages} variant="outline" className="w-full">
            Test Static HTML Pages
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/dashboards.html'} 
            variant="secondary" 
            className="w-full"
          >
            Go to Static Dashboards Page
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/student-dashboard.html'} 
            variant="secondary" 
            className="w-full"
          >
            Go to Static Student Dashboard
          </Button>
        </div>
        
        {result && (
          <div className="p-4 bg-blue-100 rounded text-sm">
            {result}
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="font-bold mb-4">Direct Links to Test:</h3>
          <div className="space-y-2">
            <a href="/dashboards.html" className="block text-blue-600 hover:underline">
              /dashboards.html (Static HTML)
            </a>
            <a href="/student-dashboard.html" className="block text-blue-600 hover:underline">
              /student-dashboard.html (Static HTML)
            </a>
            <a href="/dashboard/student" className="block text-blue-600 hover:underline">
              /dashboard/student (Next.js)
            </a>
            <a href="/direct-dashboards" className="block text-blue-600 hover:underline">
              /direct-dashboards (Next.js)
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
