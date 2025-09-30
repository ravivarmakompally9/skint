'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function TestFacultyPage() {
  const [testResults, setTestResults] = useState<Record<string, string>>({})

  const testFacultyAccess = async () => {
    try {
      console.log('Testing faculty dashboard access...')
      
      // Create faculty user data
      const facultyData = {
        id: 'faculty_1',
        name: 'Dr. Smith',
        email: 'dr.smith@university.edu',
        role: 'faculty'
      }
      
      localStorage.setItem('user', JSON.stringify(facultyData))
      console.log('Faculty user data stored:', facultyData)
      
      setTestResults(prev => ({
        ...prev,
        faculty: 'Faculty user data stored successfully'
      }))
      
      // Test navigation
      setTimeout(() => {
        window.location.href = '/dashboard/faculty'
      }, 1000)
      
    } catch (error) {
      console.error('Error testing faculty access:', error)
      setTestResults(prev => ({
        ...prev,
        faculty: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Dashboard Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={testFacultyAccess} className="h-20 flex-col">
                <span className="text-lg font-semibold">Test Faculty Dashboard</span>
                <span className="text-sm text-gray-600">Login as Faculty & Navigate</span>
              </Button>
              
              <Link href="/dashboard/faculty">
                <Button variant="outline" className="h-20 w-full flex-col">
                  <span className="text-lg font-semibold">Direct Access</span>
                  <span className="text-sm text-gray-600">Go to Faculty Dashboard</span>
                </Button>
              </Link>
            </div>
            
            {testResults.faculty && (
              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="font-semibold mb-2">Test Results:</h3>
                <p className="text-sm">{testResults.faculty}</p>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Faculty Dashboard Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">📊 Overview Panel</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Student List View</li>
                    <li>• Search & Filters</li>
                    <li>• At-a-Glance Metrics</li>
                    <li>• Quick Actions</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">👤 Student Profiles</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Detailed Student Info</li>
                    <li>• Placement Progress</li>
                    <li>• Skills & Certifications</li>
                    <li>• Faculty Actions</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">📈 Analytics & Reports</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Placement Status Charts</li>
                    <li>• Application Trends</li>
                    <li>• Export Reports</li>
                    <li>• Performance Metrics</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">🤖 AI Insights</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• AI Mentor Assistant</li>
                    <li>• Student Ranking</li>
                    <li>• Batch Insights</li>
                    <li>• Smart Recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
