import { NextRequest, NextResponse } from 'next/server'

// Mock data for placement dashboard
const mockPlacementData = {
  stats: {
    totalStudents: 1250,
    totalRecruiters: 45,
    totalInternships: 180,
    totalPlacements: 320,
    placementRate: 85.2,
    avgSalary: 8.5
  },
  departments: [
    { name: 'Computer Science', students: 350, placed: 280, rate: 80.0, avgSalary: 9.2 },
    { name: 'Electronics', students: 280, placed: 240, rate: 85.7, avgSalary: 7.8 },
    { name: 'Mechanical', students: 320, placed: 260, rate: 81.3, avgSalary: 6.5 },
    { name: 'Civil', students: 200, placed: 160, rate: 80.0, avgSalary: 5.8 },
    { name: 'Chemical', students: 100, placed: 85, rate: 85.0, avgSalary: 7.2 }
  ],
  recruiters: [
    { id: 1, name: 'Google', email: 'hr@google.com', status: 'verified', jobsPosted: 12, studentsHired: 25, rating: 4.8 },
    { id: 2, name: 'Microsoft', email: 'recruiting@microsoft.com', status: 'verified', jobsPosted: 8, studentsHired: 18, rating: 4.6 },
    { id: 3, name: 'Amazon', email: 'university@amazon.com', status: 'verified', jobsPosted: 15, studentsHired: 32, rating: 4.7 },
    { id: 4, name: 'StartupXYZ', email: 'founder@startupxyz.com', status: 'pending', jobsPosted: 0, studentsHired: 0, rating: 0 },
    { id: 5, name: 'TechCorp', email: 'hr@techcorp.com', status: 'rejected', jobsPosted: 0, studentsHired: 0, rating: 0 }
  ],
  jobPostings: [
    { id: 1, company: 'Google', title: 'Software Engineer Intern', applicants: 45, status: 'approved', postedDate: '2024-01-15' },
    { id: 2, company: 'Microsoft', title: 'Product Manager Intern', applicants: 32, status: 'pending', postedDate: '2024-01-20' },
    { id: 3, company: 'Amazon', title: 'Data Science Intern', applicants: 28, status: 'approved', postedDate: '2024-01-18' }
  ],
  drives: [
    { id: 1, company: 'Google', date: '2024-02-15', type: 'Campus Drive', students: 150, status: 'Scheduled' },
    { id: 2, company: 'Microsoft', date: '2024-02-20', type: 'Virtual Drive', students: 200, status: 'Scheduled' }
  ],
  notifications: [
    { id: 1, title: 'New Recruiter Registration', message: 'TechCorp has registered and is pending verification', time: '2 hours ago', type: 'recruiter', read: false },
    { id: 2, title: 'Job Posting Approval', message: 'Microsoft Product Manager Intern posting needs approval', time: '1 day ago', type: 'job', read: false }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: mockPlacementData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch placement data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    switch (action) {
      case 'approve_recruiter':
        return NextResponse.json({
          success: true,
          message: 'Recruiter approved successfully',
          data: { recruiterId: data.recruiterId }
        })
      
      case 'reject_recruiter':
        return NextResponse.json({
          success: true,
          message: 'Recruiter rejected',
          data: { recruiterId: data.recruiterId }
        })
      
      case 'approve_job':
        return NextResponse.json({
          success: true,
          message: 'Job posting approved successfully',
          data: { jobId: data.jobId }
        })
      
      case 'send_notification':
        return NextResponse.json({
          success: true,
          message: 'Notification sent successfully',
          data: { notificationId: Date.now() }
        })
      
      case 'schedule_drive':
        return NextResponse.json({
          success: true,
          message: 'Drive scheduled successfully',
          data: { driveId: Date.now() }
        })
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
