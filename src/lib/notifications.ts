import { toast } from '@/hooks/use-toast'

export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  data?: any
  actions?: NotificationAction[]
}

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

class NotificationService {
  private registration: ServiceWorkerRegistration | null = null
  private isSupported = false

  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator
  }

  /**
   * Request notification permission
   */
  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('Notifications not supported')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission === 'denied') {
      toast({
        title: 'Notifications Blocked',
        description: 'Please enable notifications in your browser settings to receive updates.',
        variant: 'destructive'
      })
      return false
    }

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  /**
   * Register service worker for push notifications
   */
  async registerServiceWorker(): Promise<boolean> {
    if (!this.isSupported) {
      return false
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', this.registration)
      return true
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return false
    }
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.warn('Service Worker not registered')
      return null
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        )
      })

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription)
      return subscription
    } catch (error) {
      console.error('Push subscription failed:', error)
      return null
    }
  }

  /**
   * Send local notification
   */
  async sendLocalNotification(payload: NotificationPayload): Promise<void> {
    if (!this.isSupported || Notification.permission !== 'granted') {
      return
    }

    const notification = new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/icons/icon-192x192.png',
      badge: payload.badge || '/icons/icon-72x72.png',
      data: payload.data,
      actions: payload.actions
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }

  /**
   * Send push notification via server
   */
  async sendPushNotification(
    userId: string,
    payload: NotificationPayload
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          ...payload
        })
      })

      return response.ok
    } catch (error) {
      console.error('Failed to send push notification:', error)
      return false
    }
  }

  /**
   * Get notification settings
   */
  getNotificationSettings(): {
    enabled: boolean
    types: {
      newOpportunities: boolean
      applicationUpdates: boolean
      interviewReminders: boolean
      deadlineAlerts: boolean
      messages: boolean
    }
  } {
    const settings = localStorage.getItem('notification-settings')
    if (settings) {
      return JSON.parse(settings)
    }

    return {
      enabled: false,
      types: {
        newOpportunities: true,
        applicationUpdates: true,
        interviewReminders: true,
        deadlineAlerts: true,
        messages: true
      }
    }
  }

  /**
   * Update notification settings
   */
  updateNotificationSettings(settings: any): void {
    localStorage.setItem('notification-settings', JSON.stringify(settings))
  }

  /**
   * Schedule notification
   */
  scheduleNotification(
    payload: NotificationPayload,
    delay: number
  ): void {
    setTimeout(() => {
      this.sendLocalNotification(payload)
    }, delay)
  }

  /**
   * Cancel all notifications
   */
  cancelAllNotifications(): void {
    if (this.registration) {
      this.registration.getNotifications().then(notifications => {
        notifications.forEach(notification => notification.close())
      })
    }
  }

  /**
   * Initialize notification service
   */
  async initialize(): Promise<boolean> {
    if (!this.isSupported) {
      return false
    }

    const hasPermission = await this.requestPermission()
    if (!hasPermission) {
      return false
    }

    const isRegistered = await this.registerServiceWorker()
    if (!isRegistered) {
      return false
    }

    const isSubscribed = await this.subscribeToPush()
    return isSubscribed !== null
  }

  /**
   * Send subscription to server
   */
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription: subscription.toJSON()
        })
      })
    } catch (error) {
      console.error('Failed to send subscription to server:', error)
    }
  }

  /**
   * Convert VAPID key to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}

// Notification templates
export const NotificationTemplates = {
  newOpportunity: (companyName: string, title: string) => ({
    title: 'New Opportunity Available',
    body: `${companyName} has posted a new ${title} position`,
    data: { type: 'opportunity', company: companyName }
  }),

  applicationUpdate: (companyName: string, status: string) => ({
    title: 'Application Update',
    body: `Your application at ${companyName} is now ${status}`,
    data: { type: 'application', company: companyName, status }
  }),

  interviewReminder: (companyName: string, time: string) => ({
    title: 'Interview Reminder',
    body: `You have an interview with ${companyName} at ${time}`,
    data: { type: 'interview', company: companyName, time }
  }),

  deadlineAlert: (opportunityTitle: string, deadline: string) => ({
    title: 'Application Deadline',
    body: `Don't miss the deadline for ${opportunityTitle} - ${deadline}`,
    data: { type: 'deadline', title: opportunityTitle, deadline }
  }),

  newMessage: (senderName: string, preview: string) => ({
    title: 'New Message',
    body: `${senderName}: ${preview}`,
    data: { type: 'message', sender: senderName }
  })
}

export default new NotificationService()
