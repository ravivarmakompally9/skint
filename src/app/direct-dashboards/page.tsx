'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DirectDashboardsPage() {
  const dashboards = [
    {
      id: 'student',
      name: 'Student Dashboard',
      description: 'Find opportunities and track applications',
      color: 'bg-blue-500',
      href: '/dashboard/student'
    },
    {
      id: 'faculty',
      name: 'Faculty Dashboard',
      description: 'Guide and mentor students',
      color: 'bg-green-500',
      href: '/dashboard/faculty'
    },
    {
      id: 'placement',
      name: 'Placement Cell Dashboard',
      description: 'Coordinate with companies and students',
      color: 'bg-purple-500',
      href: '/dashboard/placement'
    },
    {
      id: 'recruiter',
      name: 'Recruiter Dashboard',
      description: 'Post jobs and manage hiring',
      color: 'bg-orange-500',
      href: '/dashboard/recruiter'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Direct Dashboard Access</h1>
        <p className="text-center text-gray-600 mb-8">
          Click any button below to access the dashboard directly. No authentication required.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboards.map((dashboard) => (
            <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${dashboard.color}`}></div>
                  <span>{dashboard.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{dashboard.description}</p>
                <div className="space-y-2">
                  <Link href={dashboard.href}>
                    <Button className="w-full">
                      Go to {dashboard.name}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      console.log(`Navigating to ${dashboard.href}`)
                      window.location.href = dashboard.href
                    }}
                  >
                    Force Navigate
                  </Button>
                </div>
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
