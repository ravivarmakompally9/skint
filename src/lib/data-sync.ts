/**
 * Centralized Data Synchronization System
 * Ensures all dashboards are interconnected and update in real-time
 */

export interface SystemEvent {
  id: string
  type: 'student_update' | 'faculty_action' | 'placement_approval' | 'recruiter_feedback'
  timestamp: Date
  userId: string
  userRole: 'student' | 'faculty' | 'placement' | 'recruiter'
  data: any
  affectedUsers: string[]
}

export interface SyncData {
  students: StudentData[]
  faculty: FacultyData[]
  recruiters: RecruiterData[]
  jobs: JobData[]
  applications: ApplicationData[]
  interviews: InterviewData[]
  feedback: FeedbackData[]
}

export interface StudentData {
  id: string
  name: string
  email: string
  university: string
  gpa: number
  skills: string[]
  applications: string[]
  profileComplete: boolean
  lastUpdated: Date
}

export interface FacultyData {
  id: string
  name: string
  email: string
  department: string
  assignedStudents: string[]
  pendingApprovals: string[]
  lastActive: Date
}

export interface RecruiterData {
  id: string
  name: string
  email: string
  company: string
  verified: boolean
  jobsPosted: string[]
  lastActivity: Date
}

export interface JobData {
  id: string
  title: string
  company: string
  recruiterId: string
  status: 'pending' | 'approved' | 'rejected'
  applicants: string[]
  postedDate: Date
  deadline: Date
}

export interface ApplicationData {
  id: string
  studentId: string
  jobId: string
  status: 'applied' | 'shortlisted' | 'rejected' | 'selected'
  appliedDate: Date
  lastUpdated: Date
}

export interface InterviewData {
  id: string
  studentId: string
  recruiterId: string
  jobId: string
  scheduledDate: Date
  status: 'scheduled' | 'completed' | 'cancelled'
  feedback?: string
}

export interface FeedbackData {
  id: string
  studentId: string
  recruiterId: string
  interviewId: string
  rating: number
  technical: number
  communication: number
  problemSolving: number
  comments: string
  submittedDate: Date
}

class DataSyncManager {
  private events: SystemEvent[] = []
  private listeners: Map<string, Function[]> = new Map()
  private syncData: SyncData = {
    students: [],
    faculty: [],
    recruiters: [],
    jobs: [],
    applications: [],
    interviews: [],
    feedback: []
  }

  /**
   * Emit a system event that triggers updates across all dashboards
   */
  emitEvent(event: Omit<SystemEvent, 'id' | 'timestamp'>) {
    const systemEvent: SystemEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }

    this.events.push(systemEvent)
    this.notifyListeners(event.type, systemEvent)
    this.updateAffectedDashboards(systemEvent)
  }

  /**
   * Listen for specific event types
   */
  on(eventType: string, callback: Function) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }
    this.listeners.get(eventType)!.push(callback)
  }

  /**
   * Remove event listener
   */
  off(eventType: string, callback: Function) {
    const listeners = this.listeners.get(eventType)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  /**
   * Notify all listeners of an event
   */
  private notifyListeners(eventType: string, event: SystemEvent) {
    const listeners = this.listeners.get(eventType)
    if (listeners) {
      listeners.forEach(callback => callback(event))
    }
  }

  /**
   * Update affected dashboards based on event type
   */
  private updateAffectedDashboards(event: SystemEvent) {
    switch (event.type) {
      case 'student_update':
        this.handleStudentUpdate(event)
        break
      case 'faculty_action':
        this.handleFacultyAction(event)
        break
      case 'placement_approval':
        this.handlePlacementApproval(event)
        break
      case 'recruiter_feedback':
        this.handleRecruiterFeedback(event)
        break
    }
  }

  /**
   * Handle student profile updates
   */
  private handleStudentUpdate(event: SystemEvent) {
    // Update faculty dashboard with student progress
    this.emitEvent({
      type: 'faculty_action',
      userId: event.userId,
      userRole: 'faculty',
      data: {
        action: 'student_updated',
        studentId: event.data.studentId,
        updates: event.data.updates
      },
      affectedUsers: event.affectedUsers
    })

    // Update placement cell with student statistics
    this.emitEvent({
      type: 'placement_approval',
      userId: event.userId,
      userRole: 'placement',
      data: {
        action: 'student_statistics_updated',
        studentId: event.data.studentId,
        statistics: event.data.statistics
      },
      affectedUsers: event.affectedUsers
    })
  }

  /**
   * Handle faculty actions
   */
  private handleFacultyAction(event: SystemEvent) {
    // Update student dashboard with faculty feedback
    this.emitEvent({
      type: 'student_update',
      userId: event.userId,
      userRole: 'student',
      data: {
        action: 'faculty_feedback_received',
        facultyId: event.data.facultyId,
        feedback: event.data.feedback
      },
      affectedUsers: event.affectedUsers
    })
  }

  /**
   * Handle placement cell approvals
   */
  private handlePlacementApproval(event: SystemEvent) {
    // Update recruiter dashboard with approval status
    this.emitEvent({
      type: 'recruiter_feedback',
      userId: event.userId,
      userRole: 'recruiter',
      data: {
        action: 'job_approved',
        jobId: event.data.jobId,
        status: event.data.status
      },
      affectedUsers: event.affectedUsers
    })

    // Update student dashboard with new job opportunities
    this.emitEvent({
      type: 'student_update',
      userId: event.userId,
      userRole: 'student',
      data: {
        action: 'new_job_available',
        jobId: event.data.jobId,
        jobDetails: event.data.jobDetails
      },
      affectedUsers: event.affectedUsers
    })
  }

  /**
   * Handle recruiter feedback
   */
  private handleRecruiterFeedback(event: SystemEvent) {
    // Update student profile with feedback
    this.emitEvent({
      type: 'student_update',
      userId: event.userId,
      userRole: 'student',
      data: {
        action: 'feedback_received',
        feedback: event.data.feedback,
        rating: event.data.rating
      },
      affectedUsers: event.affectedUsers
    })

    // Update faculty dashboard with student progress
    this.emitEvent({
      type: 'faculty_action',
      userId: event.userId,
      userRole: 'faculty',
      data: {
        action: 'student_interview_completed',
        studentId: event.data.studentId,
        feedback: event.data.feedback
      },
      affectedUsers: event.affectedUsers
    })

    // Update placement cell with interview results
    this.emitEvent({
      type: 'placement_approval',
      userId: event.userId,
      userRole: 'placement',
      data: {
        action: 'interview_result_updated',
        studentId: event.data.studentId,
        result: event.data.result
      },
      affectedUsers: event.affectedUsers
    })
  }

  /**
   * Get real-time data for a specific dashboard
   */
  getDashboardData(role: string, userId: string) {
    switch (role) {
      case 'student':
        return this.getStudentDashboardData(userId)
      case 'faculty':
        return this.getFacultyDashboardData(userId)
      case 'placement':
        return this.getPlacementDashboardData(userId)
      case 'recruiter':
        return this.getRecruiterDashboardData(userId)
      default:
        return null
    }
  }

  private getStudentDashboardData(userId: string) {
    const student = this.syncData.students.find(s => s.id === userId)
    if (!student) return null

    return {
      profile: student,
      applications: this.syncData.applications.filter(a => a.studentId === userId),
      interviews: this.syncData.interviews.filter(i => i.studentId === userId),
      feedback: this.syncData.feedback.filter(f => f.studentId === userId),
      availableJobs: this.syncData.jobs.filter(j => j.status === 'approved')
    }
  }

  private getFacultyDashboardData(userId: string) {
    const faculty = this.syncData.faculty.find(f => f.id === userId)
    if (!faculty) return null

    return {
      profile: faculty,
      assignedStudents: this.syncData.students.filter(s => 
        faculty.assignedStudents.includes(s.id)
      ),
      pendingApprovals: faculty.pendingApprovals,
      studentProgress: this.getStudentProgressData(faculty.assignedStudents)
    }
  }

  private getPlacementDashboardData(userId: string) {
    return {
      totalStudents: this.syncData.students.length,
      totalRecruiters: this.syncData.recruiters.length,
      totalJobs: this.syncData.jobs.length,
      totalApplications: this.syncData.applications.length,
      placementStats: this.calculatePlacementStats(),
      pendingApprovals: this.getPendingApprovals()
    }
  }

  private getRecruiterDashboardData(userId: string) {
    const recruiter = this.syncData.recruiters.find(r => r.id === userId)
    if (!recruiter) return null

    return {
      profile: recruiter,
      postedJobs: this.syncData.jobs.filter(j => j.recruiterId === userId),
      applications: this.syncData.applications.filter(a => 
        this.syncData.jobs.some(j => j.id === a.jobId && j.recruiterId === userId)
      ),
      interviews: this.syncData.interviews.filter(i => i.recruiterId === userId)
    }
  }

  private getStudentProgressData(studentIds: string[]) {
    return studentIds.map(studentId => {
      const student = this.syncData.students.find(s => s.id === studentId)
      const applications = this.syncData.applications.filter(a => a.studentId === studentId)
      const interviews = this.syncData.interviews.filter(i => i.studentId === studentId)
      
      return {
        student,
        applicationCount: applications.length,
        interviewCount: interviews.length,
        successRate: this.calculateSuccessRate(applications)
      }
    })
  }

  private calculatePlacementStats() {
    const totalApplications = this.syncData.applications.length
    const successfulPlacements = this.syncData.applications.filter(a => a.status === 'selected').length
    
    return {
      totalApplications,
      successfulPlacements,
      placementRate: totalApplications > 0 ? (successfulPlacements / totalApplications) * 100 : 0
    }
  }

  private getPendingApprovals() {
    return {
      recruiters: this.syncData.recruiters.filter(r => !r.verified),
      jobs: this.syncData.jobs.filter(j => j.status === 'pending')
    }
  }

  private calculateSuccessRate(applications: ApplicationData[]) {
    if (applications.length === 0) return 0
    const successful = applications.filter(a => a.status === 'selected').length
    return (successful / applications.length) * 100
  }

  /**
   * Initialize with sample data
   */
  initializeSampleData() {
    this.syncData = {
      students: [
        {
          id: 'student_1',
          name: 'John Doe',
          email: 'john@university.edu',
          university: 'IIT Delhi',
          gpa: 8.5,
          skills: ['React', 'Node.js', 'Python'],
          applications: ['app_1', 'app_2'],
          profileComplete: true,
          lastUpdated: new Date()
        }
      ],
      faculty: [
        {
          id: 'faculty_1',
          name: 'Dr. Smith',
          email: 'smith@university.edu',
          department: 'Computer Science',
          assignedStudents: ['student_1'],
          pendingApprovals: ['approval_1'],
          lastActive: new Date()
        }
      ],
      recruiters: [
        {
          id: 'recruiter_1',
          name: 'TechCorp HR',
          email: 'hr@techcorp.com',
          company: 'TechCorp Solutions',
          verified: true,
          jobsPosted: ['job_1'],
          lastActivity: new Date()
        }
      ],
      jobs: [
        {
          id: 'job_1',
          title: 'Software Engineer Intern',
          company: 'TechCorp Solutions',
          recruiterId: 'recruiter_1',
          status: 'approved',
          applicants: ['student_1'],
          postedDate: new Date(),
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      ],
      applications: [
        {
          id: 'app_1',
          studentId: 'student_1',
          jobId: 'job_1',
          status: 'applied',
          appliedDate: new Date(),
          lastUpdated: new Date()
        }
      ],
      interviews: [],
      feedback: []
    }
  }
}

// Export singleton instance
export const dataSyncManager = new DataSyncManager()

// Initialize with sample data
dataSyncManager.initializeSampleData()
