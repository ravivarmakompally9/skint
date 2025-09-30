'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

const stakeholders = [
  {
    id: 'student',
    name: 'Student',
    description: 'Find opportunities and track applications',
    color: 'bg-blue-500',
    href: '/dashboard/student'
  },
  {
    id: 'faculty',
    name: 'Faculty',
    description: 'Guide and mentor students',
    color: 'bg-green-500',
    href: '/dashboard/faculty'
  },
  {
    id: 'placement',
    name: 'Placement Cell',
    description: 'Coordinate with companies and students',
    color: 'bg-purple-500',
    href: '/dashboard/placement'
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    description: 'Post jobs and manage hiring',
    color: 'bg-orange-500',
    href: '/dashboard/recruiter'
  }
]

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleLogin = (role: string) => {
    if (!name.trim()) {
      alert('Please enter your name first')
      return
    }
    if (!email.trim()) {
      alert('Please enter your email first')
      return
    }

    console.log('=== SIMPLE LOGIN ===')
    console.log('Name:', name)
    console.log('Role:', role)
    
    // Store user data
    const userData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      role: role
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User stored:', userData)
    
    // Show success message
    alert(`Welcome ${name}! Redirecting to your ${role} dashboard...`)
    
    // Navigate to working static dashboards
    const dashboardUrls = {
      student: '/student-dashboard.html',
      faculty: '/faculty-dashboard.html',
      placement: '/placement-dashboard.html',
      recruiter: '/recruiter-dashboard.html'
    }
    
    const dashboardUrl = dashboardUrls[role as keyof typeof dashboardUrls]
    console.log('Navigating to working dashboard:', dashboardUrl)
    window.location.href = dashboardUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <button 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={() => {
              console.log('Logo clicked - navigating to home');
              window.location.replace('/');
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skint
            </span>
          </button>
          
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2"
            onClick={() => {
              console.log('Back to Home clicked - navigating to home');
              window.location.replace('/');
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600">
              Select your stakeholder type to access your personalized dashboard
            </p>
          </div>

          {/* Name Input */}
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle>Enter Your Name</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stakeholder Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakeholders.map((stakeholder) => (
              <Card 
                key={stakeholder.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === stakeholder.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedRole(stakeholder.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${stakeholder.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">
                        {stakeholder.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {stakeholder.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {stakeholder.description}
                      </p>
                    </div>
                  </div>
                  
                  {selectedRole === stakeholder.id && (
                    <div className="mt-4">
                      <Button
                        onClick={() => handleLogin(stakeholder.id)}
                        className="w-full"
                      >
                        Continue as {stakeholder.name}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => {
                  console.log('Bottom Back to Home clicked - navigating to home');
                  window.location.replace('/');
                }}
              >
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <Button 
                variant="secondary"
                onClick={() => window.location.href = '/dashboard-hub'}
              >
                Direct Dashboard Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}