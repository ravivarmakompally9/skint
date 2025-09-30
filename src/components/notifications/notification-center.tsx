'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bell, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock,
  Star,
  Briefcase,
  Calendar,
  Users,
  Award
} from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Application Approved',
    message: 'Your application for Software Engineer Intern at TechCorp has been approved by your mentor.',
    timestamp: '2 hours ago',
    read: false,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 2,
    type: 'info',
    title: 'New Opportunity Posted',
    message: 'A new Data Science Intern position has been posted by DataFlow Solutions.',
    timestamp: '4 hours ago',
    read: false,
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Interview Scheduled',
    message: 'Your interview for Full Stack Developer at StartupXYZ is scheduled for tomorrow at 2:00 PM.',
    timestamp: '1 day ago',
    read: true,
    icon: Calendar,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    id: 4,
    type: 'success',
    title: 'Profile Updated',
    message: 'Your profile has been updated and is now 95% complete. Great job!',
    timestamp: '2 days ago',
    read: true,
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    id: 5,
    type: 'info',
    title: 'New Achievement Unlocked',
    message: 'Congratulations! You have unlocked the "Interview Ready" badge.',
    timestamp: '3 days ago',
    read: true,
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
  }
]

const notificationTypes = {
  all: { label: 'All', count: notifications.length },
  unread: { label: 'Unread', count: notifications.filter(n => !n.read).length },
  success: { label: 'Success', count: notifications.filter(n => n.type === 'success').length },
  info: { label: 'Info', count: notifications.filter(n => n.type === 'info').length },
  warning: { label: 'Warning', count: notifications.filter(n => n.type === 'warning').length }
}

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('all')
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id))
  }

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notificationList
    if (activeTab === 'unread') return notificationList.filter(n => !n.read)
    return notificationList.filter(n => n.type === activeTab)
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with your placement activities</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Bell className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Notification Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {Object.entries(notificationTypes).map(([key, type]) => (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                <span>{type.label}</span>
                {type.count > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {type.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <AnimatePresence>
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-500">
                    {activeTab === 'unread' 
                      ? 'All notifications have been read'
                      : 'No notifications of this type'
                    }
                  </p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Card className={`glass border-0 transition-all duration-300 ${
                      !notification.read 
                        ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10' 
                        : 'hover:shadow-md'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${notification.bgColor}`}>
                            <notification.icon className={`h-5 w-5 ${notification.color}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className={`font-semibold ${
                                    !notification.read 
                                      ? 'text-gray-900 dark:text-white' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {notification.title}
                                  </h3>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.timestamp}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                {!notification.read && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Bell className="h-6 w-6" />
                <span>Notification Settings</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Clock className="h-6 w-6" />
                <span>Reminder Settings</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Mentor Notifications</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
