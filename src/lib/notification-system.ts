/**
 * Real-time Notification System
 * Handles cross-dashboard notifications and updates
 */

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  userId: string
  userRole: 'student' | 'faculty' | 'placement' | 'recruiter'
  action?: {
    type: 'navigate' | 'refresh' | 'update'
    data: any
  }
  read: boolean
}

export interface NotificationPreferences {
  userId: string
  emailNotifications: boolean
  pushNotifications: boolean
  dashboardUpdates: boolean
  eventTypes: string[]
}

class NotificationSystem {
  private notifications: Notification[] = []
  private preferences: Map<string, NotificationPreferences> = new Map()
  private listeners: Map<string, Function[]> = new Map()

  /**
   * Create a new notification
   */
  createNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    }

    this.notifications.push(newNotification)
    this.notifyListeners('new_notification', newNotification)
    return newNotification
  }

  /**
   * Get notifications for a specific user
   */
  getUserNotifications(userId: string, limit: number = 50) {
    return this.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.notifyListeners('notification_read', notification)
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  markAllAsRead(userId: string) {
    this.notifications
      .filter(n => n.userId === userId && !n.read)
      .forEach(n => {
        n.read = true
        this.notifyListeners('notification_read', n)
      })
  }

  /**
   * Get unread notification count
   */
  getUnreadCount(userId: string) {
    return this.notifications.filter(n => n.userId === userId && !n.read).length
  }

  /**
   * Set notification preferences
   */
  setPreferences(userId: string, preferences: NotificationPreferences) {
    this.preferences.set(userId, preferences)
  }

  /**
   * Get notification preferences
   */
  getPreferences(userId: string) {
    return this.preferences.get(userId) || {
      userId,
      emailNotifications: true,
      pushNotifications: true,
      dashboardUpdates: true,
      eventTypes: ['all']
    }
  }

  /**
   * Listen for notification events
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
   * Notify listeners
   */
  private notifyListeners(eventType: string, data: any) {
    const listeners = this.listeners.get(eventType)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }

  /**
   * System-wide notification triggers
   */
  triggerSystemNotifications(eventType: string, data: any) {
    switch (eventType) {
      case 'student_profile_updated':
        this.handleStudentProfileUpdate(data)
        break
      case 'job_application_submitted':
        this.handleJobApplication(data)
        break
      case 'interview_scheduled':
        this.handleInterviewScheduled(data)
        break
      case 'feedback_submitted':
        this.handleFeedbackSubmitted(data)
        break
      case 'recruiter_approved':
        this.handleRecruiterApproved(data)
        break
      case 'job_approved':
        this.handleJobApproved(data)
        break
    }
  }

  private handleStudentProfileUpdate(data: any) {
    // Notify faculty about student progress
    this.createNotification({
      type: 'info',
      title: 'Student Profile Updated',
      message: `${data.studentName} has updated their profile`,
      userId: data.facultyId,
      userRole: 'faculty',
      action: {
        type: 'navigate',
        data: { path: '/dashboard/faculty', studentId: data.studentId }
      }
    })

    // Notify placement cell about student activity
    this.createNotification({
      type: 'info',
      title: 'Student Activity',
      message: `Profile update from ${data.studentName}`,
      userId: 'placement_cell',
      userRole: 'placement'
    })
  }

  private handleJobApplication(data: any) {
    // Notify recruiter about new application
    this.createNotification({
      type: 'success',
      title: 'New Application',
      message: `${data.studentName} applied for ${data.jobTitle}`,
      userId: data.recruiterId,
      userRole: 'recruiter',
      action: {
        type: 'navigate',
        data: { path: '/dashboard/recruiter', tab: 'candidates' }
      }
    })

    // Notify faculty about student application
    this.createNotification({
      type: 'info',
      title: 'Student Application',
      message: `${data.studentName} applied for ${data.jobTitle}`,
      userId: data.facultyId,
      userRole: 'faculty'
    })

    // Notify placement cell about application statistics
    this.createNotification({
      type: 'info',
      title: 'Application Statistics',
      message: 'New application recorded in system',
      userId: 'placement_cell',
      userRole: 'placement'
    })
  }

  private handleInterviewScheduled(data: any) {
    // Notify student about interview
    this.createNotification({
      type: 'success',
      title: 'Interview Scheduled',
      message: `Interview scheduled for ${data.jobTitle} on ${data.date}`,
      userId: data.studentId,
      userRole: 'student',
      action: {
        type: 'navigate',
        data: { path: '/dashboard/student', tab: 'interviews' }
      }
    })

    // Notify faculty about student interview
    this.createNotification({
      type: 'info',
      title: 'Student Interview',
      message: `${data.studentName} has an interview scheduled`,
      userId: data.facultyId,
      userRole: 'faculty'
    })
  }

  private handleFeedbackSubmitted(data: any) {
    // Notify student about feedback
    this.createNotification({
      type: 'info',
      title: 'Interview Feedback',
      message: `Feedback received for ${data.jobTitle} interview`,
      userId: data.studentId,
      userRole: 'student',
      action: {
        type: 'navigate',
        data: { path: '/dashboard/student', tab: 'feedback' }
      }
    })

    // Notify faculty about student feedback
    this.createNotification({
      type: 'info',
      title: 'Student Feedback',
      message: `Interview feedback received for ${data.studentName}`,
      userId: data.facultyId,
      userRole: 'faculty'
    })

    // Notify placement cell about interview results
    this.createNotification({
      type: 'info',
      title: 'Interview Results',
      message: `Interview feedback recorded for ${data.studentName}`,
      userId: 'placement_cell',
      userRole: 'placement'
    })
  }

  private handleRecruiterApproved(data: any) {
    // Notify recruiter about approval
    this.createNotification({
      type: 'success',
      title: 'Account Approved',
      message: 'Your recruiter account has been approved',
      userId: data.recruiterId,
      userRole: 'recruiter',
      action: {
        type: 'navigate',
        data: { path: '/dashboard/recruiter' }
      }
    })
  }

  private handleJobApproved(data: any) {
    // Notify recruiter about job approval
    this.createNotification({
      type: 'success',
      title: 'Job Approved',
      message: `Your job posting "${data.jobTitle}" has been approved`,
      userId: data.recruiterId,
      userRole: 'recruiter'
    })

    // Notify all students about new job opportunity
    this.createNotification({
      type: 'info',
      title: 'New Job Opportunity',
      message: `New job posted: ${data.jobTitle} at ${data.company}`,
      userId: 'all_students',
      userRole: 'student',
      action: {
        type: 'navigate',
        data: { path: '/dashboard/student', tab: 'recommendations' }
      }
    })
  }

  /**
   * Bulk notification system for placement cell
   */
  sendBulkNotification(notification: {
    title: string
    message: string
    recipients: 'all' | 'students' | 'faculty' | 'recruiters' | string[]
    type: 'info' | 'success' | 'warning' | 'error'
  }) {
    let targetUsers: string[] = []

    switch (notification.recipients) {
      case 'all':
        targetUsers = ['all_students', 'all_faculty', 'all_recruiters']
        break
      case 'students':
        targetUsers = ['all_students']
        break
      case 'faculty':
        targetUsers = ['all_faculty']
        break
      case 'recruiters':
        targetUsers = ['all_recruiters']
        break
      default:
        targetUsers = notification.recipients
    }

    targetUsers.forEach(userId => {
      this.createNotification({
        type: notification.type,
        title: notification.title,
        message: notification.message,
        userId,
        userRole: this.getUserRole(userId)
      })
    })
  }

  private getUserRole(userId: string): 'student' | 'faculty' | 'placement' | 'recruiter' {
    if (userId.includes('student')) return 'student'
    if (userId.includes('faculty')) return 'faculty'
    if (userId.includes('recruiter')) return 'recruiter'
    if (userId.includes('placement')) return 'placement'
    return 'student' // default
  }

  /**
   * Initialize with sample notifications
   */
  initializeSampleNotifications() {
    this.createNotification({
      type: 'info',
      title: 'Welcome to Skint',
      message: 'Your dashboard is ready! Start by updating your profile.',
      userId: 'student_1',
      userRole: 'student'
    })

    this.createNotification({
      type: 'success',
      title: 'Profile Complete',
      message: 'Your profile has been successfully updated.',
      userId: 'student_1',
      userRole: 'student'
    })

    this.createNotification({
      type: 'info',
      title: 'New Application',
      message: 'John Doe applied for Software Engineer Intern',
      userId: 'recruiter_1',
      userRole: 'recruiter'
    })
  }
}

// Export singleton instance
export const notificationSystem = new NotificationSystem()

// Initialize with sample notifications
notificationSystem.initializeSampleNotifications()
