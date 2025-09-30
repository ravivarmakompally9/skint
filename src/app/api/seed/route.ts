import { NextRequest, NextResponse } from 'next/server'
import seedData from '@/lib/seed-data'

export async function POST(request: NextRequest) {
  try {
    // Check if running in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Seed data can only be run in development' },
        { status: 403 }
      )
    }

    // Run seed data
    const result = await seedData()

    return NextResponse.json({
      success: true,
      message: 'Seed data created successfully',
      data: {
        users: result.users.length,
        students: result.students.length,
        companies: result.companies.length,
        opportunities: result.opportunities.length,
        applications: result.applications.length
      }
    })

  } catch (error) {
    console.error('Seed data error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create seed data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
