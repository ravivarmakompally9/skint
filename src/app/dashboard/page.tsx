'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Dashboard index page loaded')
    
    // Check if user is logged in
    const user = localStorage.getItem('user')
    console.log('User data from localStorage:', user)
    
    if (user) {
      try {
        const userData = JSON.parse(user)
        console.log('Parsed user data:', userData)
        
        if (userData.role) {
          console.log('Redirecting to dashboard:', `/dashboard/${userData.role}`)
          // Use window.location for more reliable navigation
          window.location.href = `/dashboard/${userData.role}`
          return
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    
    console.log('No valid user found, redirecting to login')
    // If no user or invalid data, redirect to login
    window.location.href = '/auth/login'
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return null
}