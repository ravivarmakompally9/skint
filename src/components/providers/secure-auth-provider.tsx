'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserRole, generateToken, validateEmailDomain } from '@/lib/auth-middleware'

export interface SecureUser {
  id: string
  name: string
  email: string
  role: UserRole
  verified: boolean
  createdAt: string
  lastLogin?: string
  securityLevel: number
  permissions: string[]
}

export interface SecureAuthContextType {
  user: SecureUser | null
  login: (role: UserRole, name: string, email: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  loading: boolean
  verifyUser: (userId: string) => Promise<boolean>
  updateUserRole: (newRole: UserRole) => Promise<boolean>
  checkSecurityLevel: (requiredLevel: number) => boolean
  hasPermission: (permission: string) => boolean
  canAccessRoute: (route: string) => boolean
}

const SecureAuthContext = createContext<SecureAuthContextType | undefined>(undefined)

// Role-based permissions
const ROLE_PERMISSIONS = {
  student: [
    'view_own_profile',
    'edit_own_profile',
    'apply_jobs',
    'view_applications',
    'view_recommendations'
  ],
  faculty: [
    'view_own_profile',
    'edit_own_profile',
    'view_students',
    'approve_requests',
    'view_analytics',
    'provide_feedback'
  ],
  placement: [
    'view_own_profile',
    'edit_own_profile',
    'manage_recruiters',
    'approve_jobs',
    'view_analytics',
    'generate_reports',
    'manage_users',
    'view_all_data'
  ],
  recruiter: [
    'view_own_profile',
    'edit_own_profile',
    'post_jobs',
    'view_candidates',
    'schedule_interviews',
    'provide_feedback'
  ],
  admin: [
    'view_own_profile',
    'edit_own_profile',
    'manage_all_users',
    'view_all_data',
    'system_settings',
    'audit_logs',
    'role_management'
  ]
}

export function SecureAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SecureUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('secure-user')
      const token = localStorage.getItem('auth-token')
      
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('secure-user')
          localStorage.removeItem('auth-token')
        }
      }
      setLoading(false)
    }
  }, [])

  const login = async (role: UserRole, name: string, email: string): Promise<{ success: boolean; message: string }> => {
    console.log('=== SECURE AUTH LOGIN ===')
    console.log('Role:', role)
    console.log('Name:', name)
    console.log('Email:', email)
    
    // Validate email domain for role
    if (!validateEmailDomain(email, role)) {
      return {
        success: false,
        message: `Invalid email domain for ${role} role. Please use appropriate email.`
      }
    }

    // Check if user already exists with different role
    const existingUser = localStorage.getItem(`secure_user_${email}`)
    if (existingUser) {
      const parsedUser = JSON.parse(existingUser)
      if (parsedUser.role !== role) {
        return {
          success: false,
          message: 'Email already registered with different role. Please contact admin.'
        }
      }
    }

    const userData: SecureUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase(),
      role: role,
      verified: role === 'student' || role === 'faculty', // Auto-verify students and faculty
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      securityLevel: getSecurityLevel(role),
      permissions: ROLE_PERMISSIONS[role] || []
    }
    
    console.log('Created secure user data:', userData)
    
    if (typeof window !== 'undefined') {
      // Store user data
      localStorage.setItem('secure-user', JSON.stringify(userData))
      localStorage.setItem(`secure_user_${email}`, JSON.stringify(userData))
      
      // Generate JWT token
      const token = generateToken(userData.id, userData.email, userData.role, userData.verified)
      localStorage.setItem('auth-token', token)
      
      console.log('Stored secure user data and token.')
      setUser(userData)

      // Log security event
      console.log('Security Event: Secure user login', {
        userId: userData.id,
        role: userData.role,
        email: userData.email,
        verified: userData.verified,
        timestamp: new Date().toISOString()
      })
    }

    return {
      success: true,
      message: userData.verified ? 'Login successful' : 'Account created, pending verification'
    }
  }

  const logout = () => {
    console.log('=== SECURE AUTH LOGOUT ===')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('secure-user')
      localStorage.removeItem('auth-token')
      console.log('Cleared secure localStorage and tokens.')
    }
    setUser(null)
  }

  const verifyUser = async (userId: string): Promise<boolean> => {
    // In real app, this would call an API
    console.log('Verifying user:', userId)
    return true
  }

  const updateUserRole = async (newRole: UserRole): Promise<boolean> => {
    if (!user) return false
    
    // Only admin can change roles
    if (user.role !== 'admin') {
      console.error('Only admin can change user roles')
      return false
    }

    const updatedUser = { 
      ...user, 
      role: newRole, 
      securityLevel: getSecurityLevel(newRole),
      permissions: ROLE_PERMISSIONS[newRole] || []
    }
    setUser(updatedUser)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('secure-user', JSON.stringify(updatedUser))
    }
    
    return true
  }

  const checkSecurityLevel = (requiredLevel: number): boolean => {
    return user ? user.securityLevel >= requiredLevel : false
  }

  const hasPermission = (permission: string): boolean => {
    return user ? user.permissions.includes(permission) : false
  }

  const canAccessRoute = (route: string): boolean => {
    if (!user) return false
    
    // Define route patterns for each role
    const routePatterns = {
      student: ['/dashboard/student', '/profile', '/applications', '/recommendations'],
      faculty: ['/dashboard/faculty', '/students', '/approvals', '/analytics', '/mentoring'],
      placement: ['/dashboard/placement', '/recruiters', '/approvals', '/analytics', '/reports', '/management'],
      recruiter: ['/dashboard/recruiter', '/jobs', '/candidates', '/interviews', '/company'],
      admin: ['/dashboard/admin', '/users', '/settings', '/analytics', '/reports', '/system']
    }

    const allowedRoutes = routePatterns[user.role] || []
    return allowedRoutes.some(allowedRoute => route.startsWith(allowedRoute))
  }

  const getSecurityLevel = (role: UserRole): number => {
    const levels = {
      student: 1,
      faculty: 2,
      recruiter: 2,
      placement: 3,
      admin: 4
    }
    return levels[role] || 1
  }

  return (
    <SecureAuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      verifyUser, 
      updateUserRole, 
      checkSecurityLevel,
      hasPermission,
      canAccessRoute
    }}>
      {children}
    </SecureAuthContext.Provider>
  )
}

export function useSecureAuth() {
  const context = useContext(SecureAuthContext)
  if (context === undefined) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider')
  }
  return context
}
