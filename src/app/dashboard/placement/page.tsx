'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Building, Users, Briefcase, TrendingUp, Bell, CheckCircle, 
  XCircle, Clock, Target, BarChart3, PieChart, Calendar,
  Send, Filter, Search, Download, Upload, Settings,
  UserCheck, UserX, AlertTriangle, Star, Award, Globe,
  Mail, Phone, MapPin, Calendar as CalendarIcon, Clock as ClockIcon,
  Home
} from 'lucide-react'
import Link from 'next/link'

// Mock data for placement dashboard
const mockStats = {
  totalStudents: 1250,
  totalRecruiters: 45,
  totalInternships: 180,
  totalPlacements: 320,
  placementRate: 85.2,
  avgSalary: 8.5
}

const mockDepartments = [
  { name: 'Computer Science', students: 350, placed: 280, rate: 80.0, avgSalary: 9.2 },
  { name: 'Electronics', students: 280, placed: 240, rate: 85.7, avgSalary: 7.8 },
  { name: 'Mechanical', students: 320, placed: 260, rate: 81.3, avgSalary: 6.5 },
  { name: 'Civil', students: 200, placed: 160, rate: 80.0, avgSalary: 5.8 },
  { name: 'Chemical', students: 100, placed: 85, rate: 85.0, avgSalary: 7.2 }
]

const mockRecruiters = [
  { id: 1, name: 'Google', email: 'hr@google.com', status: 'verified', jobsPosted: 12, studentsHired: 25, rating: 4.8 },
  { id: 2, name: 'Microsoft', email: 'recruiting@microsoft.com', status: 'verified', jobsPosted: 8, studentsHired: 18, rating: 4.6 },
  { id: 3, name: 'Amazon', email: 'university@amazon.com', status: 'verified', jobsPosted: 15, studentsHired: 32, rating: 4.7 },
  { id: 4, name: 'StartupXYZ', email: 'founder@startupxyz.com', status: 'pending', jobsPosted: 0, studentsHired: 0, rating: 0 },
  { id: 5, name: 'TechCorp', email: 'hr@techcorp.com', status: 'rejected', jobsPosted: 0, studentsHired: 0, rating: 0 }
]

const mockJobPostings = [
  { id: 1, company: 'Google', title: 'Software Engineer Intern', applicants: 45, status: 'approved', postedDate: '2024-01-15' },
  { id: 2, company: 'Microsoft', title: 'Product Manager Intern', applicants: 32, status: 'pending', postedDate: '2024-01-20' },
  { id: 3, company: 'Amazon', title: 'Data Science Intern', applicants: 28, status: 'approved', postedDate: '2024-01-18' },
  { id: 4, company: 'StartupXYZ', title: 'Full Stack Developer', applicants: 0, status: 'rejected', postedDate: '2024-01-22' }
]

const mockDrives = [
  { id: 1, company: 'Google', date: '2024-02-15', hall: 'Auditorium A', students: 150, status: 'scheduled' },
  { id: 2, company: 'Microsoft', date: '2024-02-20', hall: 'Conference Room B', students: 120, status: 'scheduled' },
  { id: 3, company: 'Amazon', date: '2024-02-25', hall: 'Auditorium A', students: 180, status: 'completed' }
]

const mockNotifications = [
  { id: 1, type: 'announcement', title: 'Google Drive Scheduled', message: 'Google recruitment drive scheduled for Feb 15th', recipients: 'All CS Students', sent: true },
  { id: 2, type: 'reminder', title: 'Application Deadline', message: 'Microsoft internship applications close tomorrow', recipients: 'Final Year Students', sent: false },
  { id: 3, type: 'update', title: 'Placement Statistics', message: 'Monthly placement report is now available', recipients: 'Faculty & Admin', sent: true }
]

export default function PlacementDashboard() {
  const [userName, setUserName] = useState('Admin')
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedRecruiters, setSelectedRecruiters] = useState<string[]>([])
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    recipients: 'all',
    type: 'announcement'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if (user) {
        try {
          const userData = JSON.parse(user)
          if (userData.name) {
            setUserName(userData.name)
          }
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
    }
  }, [])

  const handleRecruiterAction = (recruiterId: string, action: 'approve' | 'reject') => {
    console.log(`${action} recruiter:`, recruiterId)
    // In real app, this would call an API
  }

  const handleJobApproval = (jobId: string, action: 'approve' | 'reject') => {
    console.log(`${action} job:`, jobId)
    // In real app, this would call an API
  }

  const sendNotification = () => {
    console.log('Sending notification:', notificationData)
    // In real app, this would call an API
    setNotificationData({ title: '', message: '', recipients: 'all', type: 'announcement' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Skint
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                <span className="ml-2">Notifications</span>
                <Badge variant="destructive" className="ml-2">5</Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {userName}! 🏢
          </h1>
          <p className="text-gray-600">
            Manage placements, recruiters, and drive the success of your institution
          </p>
        </motion.div>

        {/* Global Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            >
            <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-blue-600">{mockStats.totalStudents.toLocaleString()}</p>
                    </div>
                  <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
        </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Recruiters</p>
                    <p className="text-2xl font-bold text-green-600">{mockStats.totalRecruiters}</p>
                            </div>
                  <Building className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Placements</p>
                    <p className="text-2xl font-bold text-purple-600">{mockStats.totalPlacements}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-orange-600">{mockStats.placementRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
            <TabsTrigger value="jobs">Job Approval</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="drives">Drive Management</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Department Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDepartments.map((dept, index) => (
                      <div key={dept.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm text-gray-600">{dept.rate}%</span>
                        </div>
                        <Progress value={dept.rate} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{dept.placed}/{dept.students} placed</span>
                          <span>Avg: ₹{dept.avgSalary}L</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Google drive completed</p>
                        <p className="text-xs text-gray-500">25 students selected</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">New recruiter registered</p>
                        <p className="text-xs text-gray-500">Microsoft - pending approval</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">Application deadline approaching</p>
                        <p className="text-xs text-gray-500">Amazon - 2 days remaining</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recruiters Tab */}
          <TabsContent value="recruiters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Recruiter Management
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecruiters.map((recruiter) => (
                    <div key={recruiter.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-lg">{recruiter.name}</h4>
                            <Badge 
                              className={
                                recruiter.status === 'verified' ? 'bg-green-100 text-green-800' :
                                recruiter.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {recruiter.status === 'verified' ? <CheckCircle className="h-3 w-3 mr-1" /> :
                               recruiter.status === 'pending' ? <Clock className="h-3 w-3 mr-1" /> :
                               <XCircle className="h-3 w-3 mr-1" />}
                              {recruiter.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{recruiter.email}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Jobs: {recruiter.jobsPosted}</span>
                            <span>Hired: {recruiter.studentsHired}</span>
                            <span>Rating: {recruiter.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {recruiter.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleRecruiterAction(recruiter.id.toString(), 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRecruiterAction(recruiter.id.toString(), 'reject')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Approval Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Internship Posting Approval
                </CardTitle>
                <CardDescription>
                  Review and approve job postings from recruiters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobPostings.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                          <div className="flex-1">
                          <h4 className="font-semibold text-lg">{job.title}</h4>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Applicants: {job.applicants}</span>
                            <span>Posted: {job.postedDate}</span>
                            </div>
                          </div>
                        <div className="flex items-center space-x-4">
                            <Badge 
                            className={
                              job.status === 'approved' ? 'bg-green-100 text-green-800' :
                              job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {job.status}
                            </Badge>
                          {job.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleJobApproval(job.id.toString(), 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleJobApproval(job.id.toString(), 'reject')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                            </Button>
                          </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Year-wise Placement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>2024</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>2023</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>2022</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Department Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDepartments.slice(0, 3).map((dept) => (
                      <div key={dept.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm text-gray-600">{dept.rate}%</span>
                        </div>
                        <Progress value={dept.rate} className="h-2" />
                        <div className="text-sm text-gray-500">
                          Avg Salary: ₹{dept.avgSalary}L
                        </div>
                      </div>
                    ))}
                        </div>
                      </CardContent>
                    </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    Send Bulk Notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title"
                      value={notificationData.title}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Notification title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Input 
                      id="message"
                      value={notificationData.message}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Notification message"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipients">Recipients</Label>
                    <select 
                      id="recipients"
                      value={notificationData.recipients}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, recipients: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Users</option>
                      <option value="students">Students Only</option>
                      <option value="faculty">Faculty Only</option>
                      <option value="recruiters">Recruiters Only</option>
                    </select>
                  </div>
                  <Button onClick={sendNotification} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{notif.title}</h4>
                          <Badge variant={notif.sent ? "default" : "secondary"}>
                            {notif.sent ? "Sent" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">To: {notif.recipients}</p>
                      </div>
                    ))}
                  </div>
              </CardContent>
            </Card>
        </div>
          </TabsContent>

          {/* Drive Management Tab */}
          <TabsContent value="drives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Drive Management
                  </span>
                  <Button>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule New Drive
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDrives.map((drive) => (
                    <div key={drive.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{drive.company} Drive</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {drive.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {drive.hall}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {drive.students} students
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            className={
                              drive.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              drive.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {drive.status}
                          </Badge>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
            <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    AI Placement Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Computer Science 2024</h4>
                      <p className="text-sm text-blue-700">Predicted Success Rate: 87%</p>
                      <Progress value={87} className="h-2 mt-2" />
                </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Electronics 2024</h4>
                      <p className="text-sm text-green-700">Predicted Success Rate: 82%</p>
                      <Progress value={82} className="h-2 mt-2" />
                </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900">Mechanical 2024</h4>
                      <p className="text-sm text-yellow-700">Predicted Success Rate: 75%</p>
                      <Progress value={75} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

              <Card>
            <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    AI Recommendations
                  </CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <h4 className="font-semibold text-green-900">High Potential Students</h4>
                      <p className="text-sm text-green-700">23 students identified for top-tier companies</p>
                    </div>
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <h4 className="font-semibold text-blue-900">Skill Gap Analysis</h4>
                      <p className="text-sm text-blue-700">Focus on Python and React skills for better placements</p>
                    </div>
                    <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                      <h4 className="font-semibold text-purple-900">Recruiter Matching</h4>
                      <p className="text-sm text-purple-700">5 new recruiters recommended based on student profiles</p>
                    </div>
              </div>
            </CardContent>
          </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
