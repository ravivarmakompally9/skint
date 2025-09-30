import { NextRequest, NextResponse } from 'next/server'

// Mock data for recruiter dashboard
const mockRecruiterData = {
  companyProfile: {
    name: 'TechCorp Solutions',
    industry: 'Technology',
    size: '500-1000 employees',
    location: 'Bangalore, India',
    website: 'www.techcorp.com',
    description: 'Leading technology company focused on innovative solutions',
    logo: '/images/company-logo.png'
  },
  jobPostings: [
    { id: 1, title: 'Software Engineer Intern', type: 'Internship', applicants: 45, status: 'active', postedDate: '2024-01-15', deadline: '2024-02-15' },
    { id: 2, title: 'Data Analyst Trainee', type: 'Internship', applicants: 32, status: 'active', postedDate: '2024-01-20', deadline: '2024-02-20' },
    { id: 3, title: 'Product Manager', type: 'Full-time', applicants: 28, status: 'closed', postedDate: '2024-01-10', deadline: '2024-02-10' }
  ],
  candidates: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@university.edu',
      university: 'IIT Delhi',
      gpa: 8.5,
      skills: ['React', 'Node.js', 'Python'],
      experience: '2 years',
      matchScore: 95,
      status: 'shortlisted',
      appliedFor: 'Software Engineer Intern'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@university.edu',
      university: 'IIT Bombay',
      gpa: 8.2,
      skills: ['Java', 'Spring Boot', 'MySQL'],
      experience: '1 year',
      matchScore: 88,
      status: 'under_review',
      appliedFor: 'Data Analyst Trainee'
    }
  ],
  interviews: [
    {
      id: 1,
      candidateName: 'John Doe',
      position: 'Software Engineer Intern',
      date: '2024-02-10',
      time: '2:00 PM',
      type: 'Technical',
      status: 'Scheduled',
      interviewer: 'Sarah Johnson'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      position: 'Data Analyst Trainee',
      date: '2024-02-12',
      time: '10:00 AM',
      type: 'Behavioral',
      status: 'Scheduled',
      interviewer: 'Mike Chen'
    }
  ],
  analytics: {
    totalApplications: 105,
    shortlisted: 25,
    interviewed: 15,
    hired: 8,
    conversionRate: 7.6,
    avgTimeToHire: 14
  },
  notifications: [
    { id: 1, title: 'New Application', message: 'John Doe applied for Software Engineer Intern', time: '2 hours ago', type: 'application', read: false },
    { id: 2, title: 'Interview Reminder', message: 'Interview with Jane Smith scheduled for tomorrow', time: '1 day ago', type: 'interview', read: false }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: mockRecruiterData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recruiter data' },
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
      case 'post_job':
        return NextResponse.json({
          success: true,
          message: 'Job posted successfully',
          data: { jobId: Date.now() }
        })
      
      case 'shortlist_candidate':
        return NextResponse.json({
          success: true,
          message: 'Candidate shortlisted successfully',
          data: { candidateId: data.candidateId }
        })
      
      case 'reject_candidate':
        return NextResponse.json({
          success: true,
          message: 'Candidate rejected',
          data: { candidateId: data.candidateId }
        })
      
      case 'schedule_interview':
        return NextResponse.json({
          success: true,
          message: 'Interview scheduled successfully',
          data: { interviewId: Date.now() }
        })
      
      case 'update_company_profile':
        return NextResponse.json({
          success: true,
          message: 'Company profile updated successfully',
          data: { profile: data }
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
