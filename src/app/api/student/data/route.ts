import { NextRequest, NextResponse } from 'next/server'

// Mock data for student dashboard
const mockStudentData = {
  profile: {
    name: 'John Doe',
    email: 'john@university.edu',
    phone: '+91 9876543210',
    university: 'IIT Delhi',
    major: 'Computer Science',
    gpa: '8.5',
    graduationYear: '2024',
    skills: ['React', 'Next.js', 'Node.js', 'Python', 'Machine Learning'],
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Full-stack web application with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB'],
        github: 'https://github.com/johndoe/ecommerce'
      },
      {
        id: 2,
        name: 'AI Chatbot',
        description: 'Machine learning chatbot using Python and TensorFlow',
        technologies: ['Python', 'TensorFlow', 'NLP'],
        github: 'https://github.com/johndoe/chatbot'
      }
    ],
    certifications: [
      { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2023-12-01' },
      { name: 'Google Cloud Professional', issuer: 'Google Cloud', date: '2023-10-15' }
    ]
  },
  applications: [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'Shortlisted',
      appliedDate: '2024-01-15',
      deadline: '2024-02-15',
      matchScore: 95
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Product Manager Intern',
      status: 'Under Review',
      appliedDate: '2024-01-20',
      deadline: '2024-02-20',
      matchScore: 88
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Data Science Intern',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-18',
      deadline: '2024-02-18',
      matchScore: 92
    }
  ],
  interviews: [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      date: '2024-02-10',
      time: '2:00 PM',
      type: 'Technical',
      status: 'Scheduled',
      interviewer: 'Sarah Johnson'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Product Manager Intern',
      date: '2024-02-12',
      time: '10:00 AM',
      type: 'Behavioral',
      status: 'Scheduled',
      interviewer: 'Mike Chen'
    }
  ],
  recommendations: [
    {
      id: 1,
      company: 'Meta',
      position: 'Frontend Developer Intern',
      matchScore: 92,
      reason: 'Strong React skills and relevant projects',
      salary: '₹50,000/month',
      location: 'Bangalore'
    },
    {
      id: 2,
      company: 'Netflix',
      position: 'Backend Developer Intern',
      matchScore: 89,
      reason: 'Excellent Node.js experience and system design knowledge',
      salary: '₹45,000/month',
      location: 'Mumbai'
    }
  ],
  analytics: {
    totalApplications: 12,
    interviewsScheduled: 5,
    offersReceived: 2,
    placementRate: 16.7,
    avgMatchScore: 87.5
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: mockStudentData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch student data' },
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
      case 'update_profile':
        return NextResponse.json({
          success: true,
          message: 'Profile updated successfully',
          data: { ...mockStudentData.profile, ...data }
        })
      
      case 'add_skill':
        return NextResponse.json({
          success: true,
          message: 'Skill added successfully',
          data: { skill: data.skill }
        })
      
      case 'apply_job':
        return NextResponse.json({
          success: true,
          message: 'Application submitted successfully',
          data: { applicationId: Date.now() }
        })
      
      case 'schedule_interview':
        return NextResponse.json({
          success: true,
          message: 'Interview scheduled successfully',
          data: { interviewId: Date.now() }
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
