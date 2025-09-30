import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Mock user data - in production, this would come from a database
const mockUsers = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'Sarah Johnson',
    role: 'student',
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'faculty@example.com',
    name: 'Dr. Michael Chen',
    role: 'faculty',
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    email: 'placement@example.com',
    name: 'Lisa Rodriguez',
    role: 'placement',
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    email: 'recruiter@example.com',
    name: 'John Smith',
    role: 'recruiter',
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
      
      // Find user by ID
      const user = mockUsers.find(u => u.id === decoded.userId)
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(user)
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
