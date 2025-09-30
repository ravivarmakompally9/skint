'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Home, Users, GraduationCap, Building, Briefcase } from 'lucide-react'

const dashboards = [
  {
    id: 'student',
    name: 'Student Dashboard',
    description: 'Find opportunities and track applications',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    href: '/student-dashboard.html',
    features: ['Job Applications', 'Interview Tracking', 'Profile Management', 'Achievements']
  },
  {
    id: 'faculty',
    name: 'Faculty Dashboard',
    description: 'Guide and mentor students',
    icon: Users,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    href: '/faculty-dashboard.html',
    features: ['Mentee Management', 'Event Scheduling', 'Analytics', 'Notifications']
  },
  {
    id: 'placement',
    name: 'Placement Cell Dashboard',
    description: 'Coordinate with companies and students',
    icon: Building,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    href: '/placement-dashboard.html',
    features: ['Company Management', 'Student Tracking', 'Placement Analytics', 'Coordination']
  },
  {
    id: 'recruiter',
    name: 'Recruiter Dashboard',
    description: 'Post jobs and manage hiring',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    href: '/recruiter-dashboard.html',
    features: ['Job Posting', 'Application Management', 'Interview Scheduling', 'Hiring Analytics']
  }
]

export default function DashboardHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skint
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard Hub
          </h1>
          <p className="text-xl text-gray-600">
            Access your personalized dashboard based on your role
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {dashboards.map((dashboard, index) => (
            <motion.div
              key={dashboard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`h-full transition-all duration-300 hover:shadow-lg ${dashboard.bgColor} border-2 ${dashboard.borderColor}`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${dashboard.color}`}>
                      <dashboard.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{dashboard.name}</CardTitle>
                      <CardDescription className="text-base">
                        {dashboard.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dashboard.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Link href={dashboard.href}>
                        <Button 
                          className={`w-full bg-gradient-to-r ${dashboard.color} hover:opacity-90 transition-all duration-300`}
                          size="lg"
                        >
                          Access {dashboard.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>
                Direct links to all working dashboards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {dashboards.map((dashboard) => (
                  <Link key={dashboard.id} href={dashboard.href}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <dashboard.icon className="h-4 w-4 mr-2" />
                      {dashboard.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
