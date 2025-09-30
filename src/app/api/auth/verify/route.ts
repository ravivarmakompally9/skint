import { NextRequest, NextResponse } from 'next/server'
import { createRoleMiddleware, logSecurityEvent } from '@/lib/auth-middleware'

// Middleware to verify user role
const verifyRole = createRoleMiddleware('admin')

export async function POST(request: NextRequest) {
  try {
    const { userId, role, verified } = await request.json()
    
    // In a real app, this would update the database
    console.log('Verifying user:', { userId, role, verified })
    
    // Log security event
    logSecurityEvent(
      userId,
      'user_verification',
      { role, verified },
      request.ip || 'unknown'
    )
    
    return NextResponse.json({
      success: true,
      message: verified ? 'User verified successfully' : 'User verification revoked'
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get pending verifications
    const pendingUsers = [
      {
        id: '1',
        name: 'John Recruiter',
        email: 'john@company.com',
        role: 'recruiter',
        requestedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Jane Placement',
        email: 'jane@university.edu',
        role: 'placement',
        requestedAt: '2024-01-16T14:30:00Z'
      }
    ]
    
    return NextResponse.json({
      success: true,
      pendingUsers
    })
  } catch (error) {
    console.error('Get verifications error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch verifications' },
      { status: 500 }
    )
  }
}
