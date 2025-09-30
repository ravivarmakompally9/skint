'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Users, BookOpen, TrendingUp, Calendar, MessageSquare, Award, User, Bell,
  Settings, LogOut, Plus, Search, Filter, Eye, Edit, CheckCircle, Clock,
  Star, BarChart3, PieChart, Target, Home, Download, Send, AlertTriangle,
  Brain, Trophy, FileText, Mail, Phone, MapPin, GraduationCap, Briefcase,
  Activity, Zap, Shield, Lightbulb, ArrowRight, ChevronRight, RefreshCw,
  UserCheck, UserX, AlertCircle, TrendingDown, TrendingUp as TrendingUpIcon,
  MessageCircle, Share2, ExternalLink, Clock3, CheckCircle2, XCircle
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'

// Sample data for faculty dashboard
const students = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    year: 'Final Year',
    department: 'Computer Science',
    applications: 12,
    interviews: 5,
    offers: 2,
    lastActivity: '2 days ago',
    status: 'Active',
    placementStatus: 'Placed',
    skills: ['React', 'Python', 'Machine Learning'],
    gpa: 3.8,
    phone: '+1-555-0123',
    location: 'New York, NY'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@university.edu',
    year: 'Final Year',
    department: 'Computer Science',
    applications: 8,
    interviews: 3,
    offers: 0,
    lastActivity: '1 week ago',
    status: 'Needs Attention',
    placementStatus: 'Unplaced',
    skills: ['Java', 'Spring Boot', 'SQL'],
    gpa: 3.6,
    phone: '+1-555-0124',
    location: 'San Francisco, CA'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    year: 'Final Year',
    department: 'Data Science',
    applications: 15,
    interviews: 8,
    offers: 3,
    lastActivity: '1 day ago',
    status: 'Active',
    placementStatus: 'Placed',
    skills: ['Python', 'R', 'Tableau', 'SQL'],
    gpa: 3.9,
    phone: '+1-555-0125',
    location: 'Austin, TX'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@university.edu',
    year: 'Final Year',
    department: 'Computer Science',
    applications: 6,
    interviews: 1,
    offers: 0,
    lastActivity: '2 weeks ago',
    status: 'Inactive',
    placementStatus: 'Unplaced',
    skills: ['C++', 'Algorithms', 'Data Structures'],
    gpa: 3.4,
    phone: '+1-555-0126',
    location: 'Seattle, WA'
  }
]

const applications = [
  {
    id: 1,
    studentName: 'Sarah Johnson',
    company: 'Google',
    position: 'Software Engineer Intern',
    status: 'Interview Scheduled',
    appliedDate: '2024-01-15',
    interviewDate: '2024-01-25'
  },
  {
    id: 2,
    studentName: 'Emily Rodriguez',
    company: 'Microsoft',
    position: 'Data Scientist Intern',
    status: 'Selected',
    appliedDate: '2024-01-10',
    interviewDate: '2024-01-20'
  },
  {
    id: 3,
    studentName: 'Michael Chen',
    company: 'Amazon',
    position: 'Software Developer Intern',
    status: 'Applied',
    appliedDate: '2024-01-18',
    interviewDate: null
  }
]

const interviews = [
  {
    id: 1,
    studentName: 'Sarah Johnson',
    company: 'Google',
    position: 'Software Engineer Intern',
    date: '2024-01-25',
    time: '10:00 AM',
    outcome: 'Pending',
    feedback: 'Technical round completed, waiting for results'
  },
  {
    id: 2,
    studentName: 'Emily Rodriguez',
    company: 'Microsoft',
    position: 'Data Scientist Intern',
    date: '2024-01-20',
    time: '2:00 PM',
    outcome: 'Selected',
    feedback: 'Excellent performance, strong technical skills'
  }
]

export default function FacultyDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showStudentProfile, setShowStudentProfile] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [mentorshipNotes, setMentorshipNotes] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

const notifications = [
  { id: 1, title: 'Student Alert', message: 'Michael Chen has been inactive for 1 week', type: 'warning', time: '2 hours ago', read: false },
  { id: 2, title: 'Interview Scheduled', message: 'Sarah Johnson has an interview with Google tomorrow', type: 'info', time: '1 day ago', read: false },
  { id: 3, title: 'Placement Update', message: 'Emily Rodriguez received an offer from Microsoft', type: 'success', time: '2 days ago', read: true }
]

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || student.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Calculate metrics
  const totalStudents = students.length
  const placedStudents = students.filter(s => s.placementStatus === 'Placed').length
  const unplacedStudents = students.filter(s => s.placementStatus === 'Unplaced').length
  const activeStudents = students.filter(s => s.status === 'Active').length
  const totalApplications = students.reduce((sum, s) => sum + s.applications, 0)
  const totalInterviews = students.reduce((sum, s) => sum + s.interviews, 0)
  const totalOffers = students.reduce((sum, s) => sum + s.offers, 0)

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student)
    setShowStudentProfile(true)
  }

  const handleSendFeedback = () => {
    // In a real app, this would send feedback to the student
    alert('Feedback sent to student!')
    setFeedback('')
  }

  const handleSendBulkMessage = () => {
    // In a real app, this would send bulk messages
    alert('Bulk message sent to all students!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skint
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-4 w-4" />
                  <span className="ml-2">Notifications</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {notifications.filter(n => !n.read).length}
              </Badge>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                            }`} />
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/">
              <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Dr. {user?.name || 'Faculty'}! 👨‍🏫
              </h1>
              <p className="text-gray-600">
                Monitor and guide your students' placement journey
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">18+</div>
                <div className="text-sm">Advanced Features</div>
              </div>
            </div>
          </div>
          
          {/* Feature Navigation */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">🎯 All 18+ Faculty Features Available:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-sm font-medium">Student Management</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl mb-1">💬</div>
                <div className="text-sm font-medium">Guidance Tools</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm font-medium">Analytics</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl mb-1">🤖</div>
                <div className="text-sm font-medium">AI Insights</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl mb-1">📅</div>
                <div className="text-sm font-medium">Interviews</div>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <div className="text-2xl mb-1">📋</div>
                <div className="text-sm font-medium">Applications</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              💡 Click on the tabs below to explore all features, or scroll down to see the feature overview cards
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Students', value: totalStudents, icon: Users, color: 'from-blue-500 to-cyan-500' },
            { title: 'Placed Students', value: placedStudents, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
            { title: 'Active Applications', value: totalApplications, icon: Briefcase, color: 'from-purple-500 to-pink-500' },
            { title: 'Success Rate', value: `${Math.round((placedStudents / totalStudents) * 100)}%`, icon: TrendingUp, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveTab('students')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Student Management</h3>
                  <p className="text-sm text-gray-600">Complete student oversight</p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Student List View & Search</li>
                <li>• Detailed Student Profiles</li>
                <li>• Progress Tracking</li>
                <li>• Skills & Certifications</li>
              </ul>
              <div className="mt-4 text-blue-600 text-sm font-medium">
                👆 Click to explore Students tab
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveTab('students')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Guidance Tools</h3>
                  <p className="text-sm text-gray-600">Mentorship & feedback</p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Feedback Submission</li>
                <li>• Mentorship Notes</li>
                <li>• Alerts & Notifications</li>
                <li>• Performance Comparison</li>
              </ul>
              <div className="mt-4 text-green-600 text-sm font-medium">
                👆 Click to explore Students tab
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveTab('analytics')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Analytics & Reports</h3>
                  <p className="text-sm text-gray-600">Data insights & exports</p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Dashboard Charts</li>
                <li>• Export Reports</li>
                <li>• Live Progress Tracking</li>
                <li>• Performance Metrics</li>
              </ul>
              <div className="mt-4 text-purple-600 text-sm font-medium">
                👆 Click to explore Analytics tab
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveTab('ai-insights')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Insights</h3>
                  <p className="text-sm text-gray-600">Smart recommendations</p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li>• AI Mentor Assistant</li>
                <li>• Student Ranking</li>
                <li>• Batch Insights</li>
                <li>• Smart Recommendations</li>
              </ul>
              <div className="mt-4 text-orange-600 text-sm font-medium">
                👆 Click to explore AI Insights tab
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveTab('interviews')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Interview Management</h3>
                  <p className="text-sm text-gray-600">Schedule & track interviews</p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Interview Scheduling</li>
                <li>• Results Tracking</li>
                <li>• Feedback Management</li>
                <li>• Performance Analysis</li>
              </ul>
              <div className="mt-4 text-red-600 text-sm font-medium">
                👆 Click to explore Interviews tab
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveTab('applications')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Application Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor all applications</p>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Application Status</li>
                <li>• Company Tracking</li>
                <li>• Progress Monitoring</li>
                <li>• Success Analytics</li>
              </ul>
              <div className="mt-4 text-teal-600 text-sm font-medium">
                👆 Click to explore Applications tab
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-semibold mb-4">🚀 Explore All 18+ Features:</h3>
            <TabsList className="grid w-full grid-cols-6 bg-gray-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                📊 Overview
              </TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                👥 Students
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                📋 Applications
              </TabsTrigger>
              <TabsTrigger value="interviews" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                📅 Interviews
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                📊 Analytics
              </TabsTrigger>
              <TabsTrigger value="ai-insights" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                🤖 AI Insights
              </TabsTrigger>
            </TabsList>
            <p className="text-sm text-gray-600 mt-2 text-center">
              💡 Each tab contains multiple advanced features - click to explore!
            </p>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Student Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.slice(0, 4).map((student) => (
          <motion.div
                        key={student.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleStudentClick(student)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={student.status === 'Active' ? 'default' : student.status === 'Needs Attention' ? 'destructive' : 'secondary'}>
                            {student.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{student.lastActivity}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Bulk Message
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Student Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Group Meeting
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Performance Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Search and filter your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Students</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student, index) => (
                  <motion.div
                  key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleStudentClick(student)}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.department}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Applications:</span>
                          <span className="font-medium">{student.applications}</span>
                            </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Interviews:</span>
                          <span className="font-medium">{student.interviews}</span>
                          </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Offers:</span>
                          <span className="font-medium">{student.offers}</span>
                          </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">GPA:</span>
                          <span className="font-medium">{student.gpa}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {student.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {student.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={student.placementStatus === 'Placed' ? 'default' : 'destructive'}>
                          {student.placementStatus}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Applications</CardTitle>
                <CardDescription>Track all student applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{app.studentName}</h4>
                        <p className="text-gray-600">{app.position} at {app.company}</p>
                        <p className="text-sm text-gray-500">Applied: {app.appliedDate}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          app.status === 'Selected' ? 'default' :
                          app.status === 'Interview Scheduled' ? 'secondary' : 'outline'
                        }>
                          {app.status}
                        </Badge>
                        {app.interviewDate && (
                          <p className="text-sm text-gray-500 mt-1">Interview: {app.interviewDate}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Schedule & Results</CardTitle>
                <CardDescription>Monitor student interviews and provide feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviews.map((interview, index) => (
                  <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{interview.studentName}</h4>
                        <Badge variant={
                          interview.outcome === 'Selected' ? 'default' :
                          interview.outcome === 'Pending' ? 'secondary' : 'destructive'
                        }>
                          {interview.outcome}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{interview.position} at {interview.company}</p>
                      <p className="text-sm text-gray-500">Date: {interview.date} at {interview.time}</p>
                      {interview.feedback && (
                        <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                          Feedback: {interview.feedback}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Placement Status Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Placement Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Placed Students</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="font-semibold">{placedStudents}</span>
                      </div>
                    </div>
                    <Progress value={(placedStudents / totalStudents) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Unplaced Students</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="font-semibold">{unplacedStudents}</span>
                      </div>
                    </div>
                    <Progress value={(unplacedStudents / totalStudents) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Application Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Application Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Applications</span>
                      <span className="font-semibold">{totalApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Interviews</span>
                      <span className="font-semibold">{totalInterviews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Offers</span>
                      <span className="font-semibold">{totalOffers}</span>
                          </div>
                    <div className="flex items-center justify-between">
                      <span>Success Rate</span>
                      <span className="font-semibold text-green-600">
                        {Math.round((totalOffers / totalApplications) * 100)}%
                      </span>
                          </div>
                        </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>Generate and download student performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Student Performance Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Placement Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    Bulk Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Mentor Assistant */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Mentor Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-semibold text-yellow-800">Attention Needed</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Michael Chen has been inactive for 1 week. Consider reaching out for guidance.
                      </p>
                        </div>
                        
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-800">Recommendation</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Sarah Johnson shows strong potential. Consider recommending her for advanced opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Student Ranking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Student Performance Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {students
                      .sort((a, b) => (b.applications + b.interviews + b.offers) - (a.applications + a.interviews + a.offers))
                      .map((student, index) => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-600">{student.department}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{student.applications + student.interviews + student.offers}</p>
                            <p className="text-xs text-gray-500">Total Activity</p>
                          </div>
                        </div>
                      ))}
                        </div>
                      </CardContent>
                    </Card>
            </div>

            {/* Batch Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Batch Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
                    <p className="text-sm text-gray-600">Placement Rate</p>
                    <p className="text-xs text-gray-500">Above batch average (65%)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">8.2</div>
                    <p className="text-sm text-gray-600">Avg Applications/Student</p>
                    <p className="text-xs text-gray-500">Above batch average (6.5)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">3.1</div>
                    <p className="text-sm text-gray-600">Avg Interviews/Student</p>
                    <p className="text-xs text-gray-500">Above batch average (2.8)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Student Profile Modal */}
        <Dialog open={showStudentProfile} onOpenChange={setShowStudentProfile}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Profile - {selectedStudent?.name}</DialogTitle>
              <DialogDescription>
                Detailed view of student's placement journey and progress
              </DialogDescription>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedStudent.phone}</p>
                      <p><span className="font-medium">Location:</span> {selectedStudent.location}</p>
                      <p><span className="font-medium">GPA:</span> {selectedStudent.gpa}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Skills & Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skills.map((skill: any, idx: number) => (
                        <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Tracking */}
                <div>
                  <h3 className="font-semibold mb-4">Placement Progress</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedStudent.applications}</div>
                      <p className="text-sm text-gray-600">Applications</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedStudent.interviews}</div>
                      <p className="text-sm text-gray-600">Interviews</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedStudent.offers}</div>
                      <p className="text-sm text-gray-600">Offers</p>
                    </div>
                  </div>
        </div>

                {/* Faculty Actions */}
                <div>
                  <h3 className="font-semibold mb-4">Faculty Actions</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="feedback">Send Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Add your feedback for this student..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mt-2"
                      />
                      <Button onClick={handleSendFeedback} className="mt-2">
                        <Send className="h-4 w-4 mr-2" />
                        Send Feedback
                </Button>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Mentorship Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Private notes about this student..."
                        value={mentorshipNotes}
                        onChange={(e) => setMentorshipNotes(e.target.value)}
                        className="mt-2"
                      />
                      <Button variant="outline" className="mt-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Save Notes
                </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}