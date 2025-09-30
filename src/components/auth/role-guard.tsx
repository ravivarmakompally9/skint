'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { UserRole, ROLE_ROUTES, hasPermission } from '@/lib/auth-middleware'

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole: UserRole
  fallback?: React.ReactNode
}

interface User {
  id: string
  email: string
  role: UserRole
  verified: boolean
}

export function RoleGuard({ children, requiredRole, fallback }: RoleGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkUserRole()
  }, [pathname])

  const checkUserRole = async () => {
    try {
      setLoading(true)
      
      // Get user data from localStorage or API
      const userData = localStorage.getItem('user')
      if (!userData) {
        redirectToLogin()
        return
      }

      const parsedUser = JSON.parse(userData)
      
      // Check if user has required role
      if (parsedUser.role !== requiredRole) {
        console.warn(`Access denied: User role ${parsedUser.role} cannot access ${requiredRole} dashboard`)
        redirectToUnauthorized()
        return
      }

      // Check if user is verified (for recruiters and placement)
      if ((parsedUser.role === 'recruiter' || parsedUser.role === 'placement') && !parsedUser.verified) {
        redirectToVerificationPending()
        return
      }

      // Check if user has permission for current route
      if (!hasPermission(parsedUser.role, pathname)) {
        console.warn(`Access denied: User cannot access route ${pathname}`)
        redirectToUnauthorized()
        return
      }

      setUser(parsedUser)
      setHasAccess(true)
    } catch (error) {
      console.error('Role check failed:', error)
      redirectToLogin()
    } finally {
      setLoading(false)
    }
  }

  const redirectToLogin = () => {
    router.push('/auth/login')
  }

  const redirectToUnauthorized = () => {
    router.push('/unauthorized')
  }

  const redirectToVerificationPending = () => {
    router.push('/verification-pending')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Hook for role-based access control
export function useRoleAccess() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = () => {
      try {
        const userData = localStorage.getItem('user')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Failed to parse user data:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false
  }

  const isVerified = (): boolean => {
    return user?.verified || false
  }

  const canAccessRoute = (path: string): boolean => {
    return user ? hasPermission(user.role, path) : false
  }

  const redirectToRoleDashboard = () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const dashboardRoutes = {
      student: '/dashboard/student',
      faculty: '/dashboard/faculty',
      placement: '/dashboard/placement',
      recruiter: '/dashboard/recruiter',
      admin: '/dashboard/admin'
    }

    const dashboardRoute = dashboardRoutes[user.role]
    if (dashboardRoute) {
      router.push(dashboardRoute)
    } else {
      router.push('/')
    }
  }

  return {
    user,
    loading,
    hasRole,
    hasAnyRole,
    isVerified,
    canAccessRoute,
    redirectToRoleDashboard
  }
}

// Component for conditional rendering based on role
interface RoleBasedRenderProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleBasedRender({ allowedRoles, children, fallback }: RoleBasedRenderProps) {
  const { user, hasAnyRole } = useRoleAccess()

  if (!user || !hasAnyRole(allowedRoles)) {
    return fallback || null
  }

  return <>{children}</>
}

// Higher-order component for role protection
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: UserRole
) {
  return function RoleGuardedComponent(props: P) {
    return (
      <RoleGuard requiredRole={requiredRole}>
        <Component {...props} />
      </RoleGuard>
    )
  }
}

// Route protection hook
export function useRouteProtection() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, canAccessRoute, redirectToRoleDashboard } = useRoleAccess()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (!canAccessRoute(pathname)) {
      console.warn(`Access denied to route: ${pathname}`)
      redirectToRoleDashboard()
    }
  }, [user, pathname, canAccessRoute, redirectToRoleDashboard, router])

  return { user, canAccessRoute }
}
