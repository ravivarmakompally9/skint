'use client'

import { useEffect, useState } from 'react'
import { dataSyncManager, SystemEvent } from '@/lib/data-sync'
import { notificationSystem, Notification } from '@/lib/notification-system'

interface SystemIntegrationProps {
  userRole: 'student' | 'faculty' | 'placement' | 'recruiter'
  userId: string
  children: React.ReactNode
}

export function SystemIntegration({ userRole, userId, children }: SystemIntegrationProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [systemEvents, setSystemEvents] = useState<SystemEvent[]>([])

  useEffect(() => {
    // Initialize user notifications
    const userNotifications = notificationSystem.getUserNotifications(userId)
    setNotifications(userNotifications)
    setUnreadCount(notificationSystem.getUnreadCount(userId))

    // Listen for new notifications
    const handleNewNotification = (notification: Notification) => {
      if (notification.userId === userId || notification.userId === `all_${userRole}s`) {
        setNotifications(prev => [notification, ...prev])
        setUnreadCount(prev => prev + 1)
      }
    }

    // Listen for system events
    const handleSystemEvent = (event: SystemEvent) => {
      setSystemEvents(prev => [event, ...prev.slice(0, 49)]) // Keep last 50 events
    }

    // Register event listeners
    notificationSystem.on('new_notification', handleNewNotification)
    dataSyncManager.on('student_update', handleSystemEvent)
    dataSyncManager.on('faculty_action', handleSystemEvent)
    dataSyncManager.on('placement_approval', handleSystemEvent)
    dataSyncManager.on('recruiter_feedback', handleSystemEvent)

    // Cleanup listeners on unmount
    return () => {
      notificationSystem.off('new_notification', handleNewNotification)
      dataSyncManager.off('student_update', handleSystemEvent)
      dataSyncManager.off('faculty_action', handleSystemEvent)
      dataSyncManager.off('placement_approval', handleSystemEvent)
      dataSyncManager.off('recruiter_feedback', handleSystemEvent)
    }
  }, [userId, userRole])

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    notificationSystem.markAsRead(notification.id)
    setUnreadCount(prev => Math.max(0, prev - 1))
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    )

    // Handle notification action
    if (notification.action) {
      switch (notification.action.type) {
        case 'navigate':
          // Navigate to specific page/tab
          console.log('Navigate to:', notification.action.data)
          break
        case 'refresh':
          // Refresh current data
          window.location.reload()
          break
        case 'update':
          // Update specific data
          console.log('Update data:', notification.action.data)
          break
      }
    }
  }

  const markAllAsRead = () => {
    notificationSystem.markAllAsRead(userId)
    setUnreadCount(0)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="system-integration">
      {/* Notification Bell with Unread Count */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => {
              // Toggle notification panel
              console.log('Toggle notification panel')
            }}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7a5 5 0 0 1 10 0v10z" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>

      {/* System Events Log (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md">
          <div className="bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs">
            <div className="font-semibold mb-2">System Events ({systemEvents.length})</div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {systemEvents.slice(0, 5).map((event, index) => (
                <div key={index} className="text-gray-300">
                  <span className="text-blue-400">{event.type}</span>
                  <span className="ml-2">{event.userRole}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {children}

      {/* Notification Panel (Hidden by default, shown on click) */}
      <div className="hidden notification-panel">
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-4 top-4 w-96 bg-white rounded-lg shadow-xl max-h-96 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all read
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        notification.type === 'error' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {notification.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook for accessing system integration features
 */
export function useSystemIntegration(userRole: string, userId: string) {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get dashboard data
    const data = dataSyncManager.getDashboardData(userRole, userId)
    setDashboardData(data)
    setIsLoading(false)

    // Listen for data updates
    const handleDataUpdate = () => {
      const updatedData = dataSyncManager.getDashboardData(userRole, userId)
      setDashboardData(updatedData)
    }

    // Register for all relevant events
    dataSyncManager.on('student_update', handleDataUpdate)
    dataSyncManager.on('faculty_action', handleDataUpdate)
    dataSyncManager.on('placement_approval', handleDataUpdate)
    dataSyncManager.on('recruiter_feedback', handleDataUpdate)

    return () => {
      dataSyncManager.off('student_update', handleDataUpdate)
      dataSyncManager.off('faculty_action', handleDataUpdate)
      dataSyncManager.off('placement_approval', handleDataUpdate)
      dataSyncManager.off('recruiter_feedback', handleDataUpdate)
    }
  }, [userRole, userId])

  const triggerEvent = (eventType: string, data: any) => {
    dataSyncManager.emitEvent({
      type: eventType as any,
      userId,
      userRole: userRole as any,
      data,
      affectedUsers: [userId]
    })
  }

  const sendNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    notificationSystem.createNotification({
      type,
      title,
      message,
      userId,
      userRole: userRole as any
    })
  }

  return {
    dashboardData,
    isLoading,
    triggerEvent,
    sendNotification
  }
}
