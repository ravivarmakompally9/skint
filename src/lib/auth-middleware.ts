import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Role types
export type UserRole = 'student' | 'faculty' | 'placement' | 'recruiter' | 'admin'

// JWT payload interface
export interface JWTPayload {
  id: string
  email: string
  role: UserRole
  verified: boolean
  iat: number
  exp: number
}

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  student: ['/dashboard/student', '/profile', '/applications'],
  faculty: ['/dashboard/faculty', '/students', '/approvals', '/analytics'],
  placement: ['/dashboard/placement', '/recruiters', '/approvals', '/analytics', '/reports'],
  recruiter: ['/dashboard/recruiter', '/jobs', '/candidates', '/interviews'],
  admin: ['/dashboard/admin', '/users', '/settings', '/analytics', '/reports']
}

// Allowed routes for each role
export const ROLE_ROUTES = {
  student: ['/dashboard/student', '/profile', '/applications', '/recommendations'],
  faculty: ['/dashboard/faculty', '/students', '/approvals', '/analytics', '/mentoring'],
  placement: ['/dashboard/placement', '/recruiters', '/approvals', '/analytics', '/reports', '/management'],
  recruiter: ['/dashboard/recruiter', '/jobs', '/candidates', '/interviews', '/company'],
  admin: ['/dashboard/admin', '/users', '/settings', '/analytics', '/reports', '/system']
}

// Security levels for different roles
export const SECURITY_LEVELS = {
  student: 1,
  faculty: 2,
  placement: 3,
  recruiter: 2,
  admin: 4
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    return jwt.verify(token, secret) as JWTPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Check if user has permission for a route
export function hasPermission(userRole: UserRole, path: string): boolean {
  const allowedRoutes = ROLE_ROUTES[userRole]
  return allowedRoutes.some(route => path.startsWith(route))
}

// Check if user has required security level
export function hasSecurityLevel(userRole: UserRole, requiredLevel: number): boolean {
  return SECURITY_LEVELS[userRole] >= requiredLevel
}

// Role-based middleware
export function createRoleMiddleware(requiredRole: UserRole) {
  return function roleMiddleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Check if token is expired
    if (payload.exp < Date.now() / 1000) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      )
    }

    // Check role
    if (payload.role !== requiredRole) {
      return NextResponse.json(
        { 
          error: 'Access denied', 
          message: `This endpoint requires ${requiredRole} role`,
          userRole: payload.role 
        },
        { status: 403 }
      )
    }

    // Check if user is verified (for recruiters and placement)
    if ((payload.role === 'recruiter' || payload.role === 'placement') && !payload.verified) {
      return NextResponse.json(
        { 
          error: 'Account not verified', 
          message: 'Your account is pending verification by admin' 
        },
        { status: 403 }
      )
    }

    return null // Allow access
  }
}

// Multi-role middleware (user can have any of the specified roles)
export function createMultiRoleMiddleware(allowedRoles: UserRole[]) {
  return function multiRoleMiddleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    if (!allowedRoles.includes(payload.role)) {
      return NextResponse.json(
        { 
          error: 'Access denied', 
          message: `This endpoint requires one of: ${allowedRoles.join(', ')}`,
          userRole: payload.role 
        },
        { status: 403 }
      )
    }

    return null // Allow access
  }
}

// Rate limiting for sensitive operations
export function createRateLimitMiddleware(maxRequests: number, windowMs: number) {
  const requests = new Map<string, { count: number; resetTime: number }>()

  return function rateLimitMiddleware(request: NextRequest) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const userRequests = requests.get(ip)

    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + windowMs })
      return null
    }

    if (userRequests.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', message: 'Too many requests' },
        { status: 429 }
      )
    }

    userRequests.count++
    return null
  }
}

// Audit logging
export function logSecurityEvent(
  userId: string, 
  action: string, 
  details: any, 
  ip: string
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId,
    action,
    details,
    ip,
    severity: 'INFO'
  }

  // In production, send to logging service
  console.log('Security Event:', logEntry)
  
  // Store in database for audit trail
  // await auditLog.create(logEntry)
}

// Generate secure JWT token
export function generateToken(
  userId: string, 
  email: string, 
  role: UserRole, 
  verified: boolean = false
): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key'
  const expiresIn = role === 'admin' ? '1h' : '24h' // Shorter expiry for admin

  return jwt.sign(
    {
      id: userId,
      email,
      role,
      verified,
      iat: Math.floor(Date.now() / 1000)
    },
    secret,
    { expiresIn }
  )
}

// Validate email domain for role
export function validateEmailDomain(email: string, role: UserRole): boolean {
  const domain = email.split('@')[1]?.toLowerCase()

  switch (role) {
    case 'student':
    case 'faculty':
      return domain?.endsWith('.edu') || domain?.includes('university')
    case 'recruiter':
      return !domain?.endsWith('.edu') // Company email
    case 'placement':
    case 'admin':
      return domain?.endsWith('.edu') || domain?.includes('university')
    default:
      return false
  }
}

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  student: 1,
  faculty: 2,
  recruiter: 2,
  placement: 3,
  admin: 4
}

// Check if user can access another user's data
export function canAccessUserData(viewerRole: UserRole, targetRole: UserRole): boolean {
  const viewerLevel = ROLE_HIERARCHY[viewerRole]
  const targetLevel = ROLE_HIERARCHY[targetRole]

  // Higher level roles can access lower level data
  // Same level roles cannot access each other's data (except admin)
  return viewerLevel > targetLevel || (viewerRole === 'admin')
}
