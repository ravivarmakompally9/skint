import { NextRequest, NextResponse } from 'next/server'

// Mock data for faculty dashboard
const mockFacultyData = {
  profile: {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    specialization: 'Machine Learning',
    experience: '8 years',
    mentees: 25
  },
  mentees: [
    {
      id: 1,
      name: 'John Doe',
      year: 'Final Year',
      department: 'Computer Science',
      applications: 8,
      interviews: 3,
      offers: 1,
      lastActivity: '2 days ago',
      status: 'Active',
      gpa: 8.5,
      skills: ['React', 'Node.js', 'Python'],
      nextInterview: '2024-02-10'
    },
    {
      id: 2,
      name: 'Jane Smith',
      year: 'Third Year',
      department: 'Computer Science',
      applications: 5,
      interviews: 2,
      offers: 0,
      lastActivity: '1 week ago',
      status: 'Active',
      gpa: 8.2,
      skills: ['Java', 'Spring Boot', 'MySQL'],
      nextInterview: '2024-02-15'
    }
  ],
  pendingApprovals: [
    {
      id: 1,
      studentName: 'Mike Wilson',
      requestType: 'Application Review',
      company: 'Google',
      position: 'Software Engineer Intern',
      submittedDate: '2024-01-20',
      priority: 'High'
    },
    {
      id: 2,
      studentName: 'Lisa Brown',
      requestType: 'Interview Preparation',
      company: 'Microsoft',
      position: 'Product Manager Intern',
      submittedDate: '2024-01-22',
      priority: 'Medium'
    }
  ],
  analytics: {
    totalMentees: 25,
    activeApplications: 45,
    interviewsScheduled: 12,
    offersReceived: 8,
    placementRate: 32.0,
    avgGPA: 8.3
  },
  notifications: [
    {
      id: 1,
      title: 'New Application from John Doe',
      message: 'John has applied to Google Software Engineer position',
      time: '2 hours ago',
      type: 'application',
      read: false
    },
    {
      id: 2,
      title: 'Interview Scheduled',
      message: 'Mike Wilson has an interview with Microsoft tomorrow',
      time: '1 day ago',
      type: 'interview',
      read: false
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: mockFacultyData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch faculty data' },
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
      case 'approve_request':
        return NextResponse.json({
          success: true,
          message: 'Request approved successfully',
          data: { requestId: data.requestId }
        })
      
      case 'reject_request':
        return NextResponse.json({
          success: true,
          message: 'Request rejected',
          data: { requestId: data.requestId }
        })
      
      case 'send_feedback':
        return NextResponse.json({
          success: true,
          message: 'Feedback sent successfully',
          data: { feedbackId: Date.now() }
        })
      
      case 'schedule_meeting':
        return NextResponse.json({
          success: true,
          message: 'Meeting scheduled successfully',
          data: { meetingId: Date.now() }
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
