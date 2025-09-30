'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react'

interface Event {
  id: string
  title: string
  type: 'interview' | 'meeting' | 'deadline' | 'reminder'
  start: Date
  end: Date
  location?: string
  meetingLink?: string
  participants: Array<{
    id: string
    name: string
    role: string
    avatar?: string
  }>
  status: 'scheduled' | 'completed' | 'cancelled'
  description?: string
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Interview with TechCorp',
    type: 'interview',
    start: new Date(2024, 1, 15, 10, 0),
    end: new Date(2024, 1, 15, 11, 0),
    location: 'Conference Room A',
    participants: [
      { id: '1', name: 'Sarah Johnson', role: 'student' },
      { id: '2', name: 'John Smith', role: 'recruiter' }
    ],
    status: 'scheduled',
    description: 'Technical interview for Software Engineer Intern position'
  },
  {
    id: '2',
    title: 'Faculty Meeting',
    type: 'meeting',
    start: new Date(2024, 1, 16, 14, 0),
    end: new Date(2024, 1, 16, 15, 30),
    location: 'Faculty Lounge',
    participants: [
      { id: '3', name: 'Dr. Michael Chen', role: 'faculty' },
      { id: '4', name: 'Dr. Lisa Rodriguez', role: 'faculty' }
    ],
    status: 'scheduled',
    description: 'Monthly faculty meeting to discuss student progress'
  },
  {
    id: '3',
    title: 'Application Deadline',
    type: 'deadline',
    start: new Date(2024, 1, 20, 23, 59),
    end: new Date(2024, 1, 20, 23, 59),
    participants: [],
    status: 'scheduled',
    description: 'Deadline for Data Science Intern applications'
  }
]

const eventTypes = {
  interview: { label: 'Interview', color: 'bg-blue-100 text-blue-800', icon: Users },
  meeting: { label: 'Meeting', color: 'bg-green-100 text-green-800', icon: Users },
  deadline: { label: 'Deadline', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  reminder: { label: 'Reminder', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
}

export default function ScheduleCalendar() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [showEventForm, setShowEventForm] = useState(false)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getEventTypeInfo = (type: string) => {
    return eventTypes[type as keyof typeof eventTypes] || eventTypes.meeting
  }

  const days = getDaysInMonth(selectedDate)
  const today = new Date()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your interviews, meetings, and deadlines</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={view} onValueChange={(value: 'month' | 'week' | 'day') => setView(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setShowEventForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>
                  {selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="h-24 border border-gray-200 dark:border-gray-700" />
                }

                const dayEvents = getEventsForDate(day)
                const isToday = day.toDateString() === today.toDateString()
                const isCurrentMonth = day.getMonth() === selectedDate.getMonth()

                return (
                  <motion.div
                    key={day.toISOString()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className={`h-24 border border-gray-200 dark:border-gray-700 p-1 ${
                      isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-blue-600' : 'text-gray-900 dark:text-white'
                      }`}>
                        {day.getDate()}
                      </span>
                      {dayEvents.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {dayEvents.length}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => {
                        const eventTypeInfo = getEventTypeInfo(event.type)
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${eventTypeInfo.color}`}
                            title={event.title}
                          >
                            {formatTime(event.start)} {event.title}
                          </div>
                        )
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled interviews and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter(event => event.start >= new Date())
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .slice(0, 5)
                .map((event, index) => {
                  const eventTypeInfo = getEventTypeInfo(event.type)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Card className="border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${eventTypeInfo.color}`}>
                                <eventTypeInfo.icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {event.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {event.description}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                      {event.start.toLocaleDateString()} at {formatTime(event.start)}
                                    </span>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="h-4 w-4" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                  {event.meetingLink && (
                                    <div className="flex items-center space-x-1">
                                      <Video className="h-4 w-4" />
                                      <span>Online</span>
                                    </div>
                                  )}
                                </div>
                                {event.participants.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Participants:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {event.participants.map(participant => (
                                        <Badge key={participant.id} variant="outline" className="text-xs">
                                          {participant.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={
                                  event.status === 'scheduled' ? 'default' :
                                  event.status === 'completed' ? 'secondary' :
                                  'destructive'
                                }
                                className="text-xs"
                              >
                                {event.status}
                              </Badge>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
