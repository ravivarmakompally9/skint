'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  MessageCircle, 
  Calendar, 
  Settings, 
  Bell,
  Search,
  Plus,
  LogOut,
  ChevronRight,
  Users,
  TrendingUp,
  FileText,
  Target,
  Award
} from 'lucide-react'

interface MobileNavProps {
  user: {
    name: string
    role: string
    avatar?: string
  }
  notifications?: number
}

const roleNavigation = {
  student: [
    { name: 'Dashboard', icon: Home, href: '/dashboard/student', active: true },
    { name: 'Profile', icon: User, href: '/profile', active: false },
    { name: 'Opportunities', icon: Briefcase, href: '/opportunities', active: false },
    { name: 'Applications', icon: FileText, href: '/applications', active: false },
    { name: 'Messages', icon: MessageCircle, href: '/messages', active: false },
    { name: 'Calendar', icon: Calendar, href: '/calendar', active: false },
    { name: 'Analytics', icon: TrendingUp, href: '/analytics', active: false }
  ],
  faculty: [
    { name: 'Dashboard', icon: Home, href: '/dashboard/faculty', active: true },
    { name: 'Students', icon: Users, href: '/students', active: false },
    { name: 'Approvals', icon: Target, href: '/approvals', active: false },
    { name: 'Messages', icon: MessageCircle, href: '/messages', active: false },
    { name: 'Calendar', icon: Calendar, href: '/calendar', active: false },
    { name: 'Analytics', icon: TrendingUp, href: '/analytics', active: false }
  ],
  placement: [
    { name: 'Dashboard', icon: Home, href: '/dashboard/placement', active: true },
    { name: 'Opportunities', icon: Briefcase, href: '/opportunities', active: false },
    { name: 'Applications', icon: FileText, href: '/applications', active: false },
    { name: 'Companies', icon: Users, href: '/companies', active: false },
    { name: 'Messages', icon: MessageCircle, href: '/messages', active: false },
    { name: 'Analytics', icon: TrendingUp, href: '/analytics', active: false }
  ],
  recruiter: [
    { name: 'Dashboard', icon: Home, href: '/dashboard/recruiter', active: true },
    { name: 'Candidates', icon: Users, href: '/candidates', active: false },
    { name: 'Jobs', icon: Briefcase, href: '/jobs', active: false },
    { name: 'Interviews', icon: Calendar, href: '/interviews', active: false },
    { name: 'Messages', icon: MessageCircle, href: '/messages', active: false },
    { name: 'Analytics', icon: TrendingUp, href: '/analytics', active: false }
  ]
}

const quickActions = {
  student: [
    { name: 'Apply to Jobs', icon: Plus, action: 'apply' },
    { name: 'Update Profile', icon: User, action: 'profile' },
    { name: 'View Applications', icon: FileText, action: 'applications' }
  ],
  faculty: [
    { name: 'Review Applications', icon: Target, action: 'review' },
    { name: 'Schedule Meeting', icon: Calendar, action: 'meeting' },
    { name: 'View Students', icon: Users, action: 'students' }
  ],
  placement: [
    { name: 'Post Opportunity', icon: Plus, action: 'post' },
    { name: 'View Applications', icon: FileText, action: 'applications' },
    { name: 'Verify Company', icon: Award, action: 'verify' }
  ],
  recruiter: [
    { name: 'Post Job', icon: Plus, action: 'post' },
    { name: 'Search Candidates', icon: Search, action: 'search' },
    { name: 'Schedule Interview', icon: Calendar, action: 'interview' }
  ]
}

export default function MobileNav({ user, notifications = 0 }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const navigation = roleNavigation[user.role as keyof typeof roleNavigation] || []
  const actions = quickActions[user.role as keyof typeof quickActions] || []

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'from-blue-600 to-purple-600'
      case 'faculty': return 'from-purple-600 to-pink-600'
      case 'placement': return 'from-green-600 to-teal-600'
      case 'recruiter': return 'from-orange-600 to-red-600'
      default: return 'from-gray-600 to-gray-800'
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getRoleColor(user.role)} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Skint</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getRoleColor(user.role)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Skint</h2>
                    <p className="text-sm text-gray-500">Placement Management</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Profile */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Navigation
                  </h4>
                  <nav className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <Button
                          variant={item.active ? 'default' : 'ghost'}
                          className={`w-full justify-start ${
                            item.active 
                              ? `bg-gradient-to-r ${getRoleColor(user.role)} text-white` 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Button>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h4>
                  <div className="space-y-1">
                    {actions.map((action, index) => (
                      <motion.div
                        key={action.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <action.icon className="h-4 w-4 mr-3" />
                          {action.name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Settings & Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 dark:text-gray-300"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-around py-2">
          {navigation.slice(0, 5).map((item, index) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 p-2 ${
                item.active 
                  ? `text-blue-600 dark:text-blue-400` 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
      {/* Spacer for mobile bottom nav */}
      <div className="lg:hidden h-16" />
    </>
  )
}
