export type UserRole = 'student' | 'faculty' | 'placement' | 'recruiter'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  role: 'student'
  profile: StudentProfile
  applications: Application[]
  mentorId?: string
}

export interface StudentProfile {
  rollNumber: string
  department: string
  year: number
  cgpa: number
  skills: string[]
  resume?: string
  coverLetter?: string
  certifications: Certification[]
  badges: Badge[]
  preferences: {
    jobTypes: string[]
    locations: string[]
    salaryRange: {
      min: number
      max: number
    }
  }
}

export interface Faculty extends User {
  role: 'faculty'
  department: string
  mentees: string[]
}

export interface PlacementCell extends User {
  role: 'placement'
  permissions: string[]
}

export interface Recruiter extends User {
  role: 'recruiter'
  company: Company
  verified: boolean
}

export interface Company {
  id: string
  name: string
  logo?: string
  description: string
  website: string
  industry: string
  size: string
  verified: boolean
}

export interface Opportunity {
  id: string
  title: string
  company: Company
  type: 'internship' | 'placement'
  description: string
  requirements: string[]
  skills: string[]
  location: string
  salary?: {
    min: number
    max: number
    currency: string
  }
  stipend?: number
  duration?: string
  deadline: Date
  status: 'active' | 'closed' | 'draft'
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: string
  studentId: string
  opportunityId: string
  status: 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected'
  appliedAt: Date
  feedback?: string
  interviewDate?: Date
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialId?: string
  url?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: Date
  category: string
}

export interface Interview {
  id: string
  applicationId: string
  studentId: string
  recruiterId: string
  scheduledAt: Date
  duration: number
  type: 'online' | 'offline'
  location?: string
  meetingLink?: string
  status: 'scheduled' | 'completed' | 'cancelled'
  feedback?: string
}
