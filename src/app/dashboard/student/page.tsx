'use client'

import { useState, useEffect } from 'react'
// RoleGuard and SystemIntegration will be added when needed
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  User, Briefcase, Calendar, TrendingUp, Bell, Award, 
  FileText, MessageCircle, Plus, Search, Filter, Download,
  Star, CheckCircle, Clock, XCircle, Target, BookOpen,
  Code, Trophy, Zap, Edit, Trash2, Upload, Eye,
  ThumbsUp, ThumbsDown, Share, Bookmark, ExternalLink,
  ChevronRight, ChevronDown, Sparkles, Lightbulb,
  BarChart3, PieChart, Activity, Target as TargetIcon,
  Mail, Phone, MapPin, Globe, Linkedin, Github,
  Twitter, Instagram, Youtube, Facebook, Video, Mic, 
  Camera, Image, File, Folder, Archive, Lock, Unlock, 
  Shield, AlertTriangle, Info, HelpCircle, Brain, Heart,
  Users, Building, GraduationCap, Briefcase as BriefcaseIcon,
  Settings, LogOut, Home, ArrowLeft, RefreshCw, Save,
  Send, Copy, Share2, Download as DownloadIcon, Upload as UploadIcon
} from 'lucide-react'
// Advanced features will be added incrementally
import Link from 'next/link'
import OpenResumeIntegration from '@/components/student/OpenResumeIntegration'

function StudentDashboardContent() {
  const [userName, setUserName] = useState('Guest')
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Job Match', message: 'Software Developer at Google', time: '2 hours ago', type: 'success', read: false },
    { id: 2, title: 'Interview Scheduled', message: 'Frontend Developer at Microsoft', time: '1 day ago', type: 'info', read: false },
    { id: 3, title: 'Application Update', message: 'Your application was reviewed', time: '3 days ago', type: 'warning', read: true }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    gpa: '',
    graduationYear: '',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    projects: [],
    certifications: [],
    socialLinks: {
      linkedin: '',
      github: '',
      portfolio: ''
    }
  })
  const [newSkill, setNewSkill] = useState('')
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', message: 'Hello! I\'m your AI career advisor. How can I help you today?', timestamp: new Date() }
  ])
  const [newMessage, setNewMessage] = useState('')
  // Removed duplicate declarations - using the ones above

  // System integration - commented out for now
  // const { dashboardData, triggerEvent, sendNotification } = useSystemIntegration('student', 'student_1')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if (user) {
        try {
          const userData = JSON.parse(user)
          if (userData.name) {
            setUserName(userData.name)
            setProfile(prev => ({ ...prev, name: userData.name, email: userData.email }))
          }
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
    }
  }, [])

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill('')
      setShowAddSkill(false)
      // triggerEvent('student_update', { 
      //   action: 'skill_added', 
      //   skill: newSkill.trim(),
      //   totalSkills: profile.skills.length + 1
      // })
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }))
  }

  const sendChatMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { id: Date.now(), type: 'user', message: newMessage, timestamp: new Date() }
      setChatMessages(prev => [...prev, userMessage])
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { 
          id: Date.now() + 1, 
          type: 'ai', 
          message: 'That\'s a great question! Based on your profile, I recommend focusing on advanced React concepts and system design. Would you like me to suggest some specific resources?', 
          timestamp: new Date() 
        }
        setChatMessages(prev => [...prev, aiResponse])
      }, 1000)
      
      setNewMessage('')
    }
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const applications = [
    { id: 1, company: 'Google', position: 'Software Engineer Intern', status: 'Shortlisted', date: '2024-01-15', match: 95 },
    { id: 2, company: 'Microsoft', position: 'Product Manager Intern', status: 'Interview Scheduled', date: '2024-01-20', match: 88 },
    { id: 3, company: 'Amazon', position: 'Data Scientist Intern', status: 'Selected', date: '2024-01-10', match: 92 },
    { id: 4, company: 'Meta', position: 'Frontend Developer Intern', status: 'Applied', date: '2024-01-25', match: 85 }
  ]

  const recommendations = [
    { id: 1, title: 'Software Engineer Intern', company: 'Netflix', match: 95, salary: '$8,000/month', skills: ['React', 'Node.js', 'Python'], type: 'internship' },
    { id: 2, title: 'Data Analyst Intern', company: 'Spotify', match: 88, salary: '$6,500/month', skills: ['Python', 'SQL', 'Pandas'], type: 'internship' },
    { id: 3, title: 'Product Manager Intern', company: 'Uber', match: 82, salary: '$7,200/month', skills: ['Product Strategy', 'Analytics', 'Communication'], type: 'internship' }
  ]

  const interviews = [
    { id: 1, company: 'Google', position: 'Software Engineer Intern', date: '2024-02-10', rating: 4.5, feedback: 'Strong technical skills, good communication' },
    { id: 2, company: 'Microsoft', position: 'Product Manager Intern', date: '2024-02-05', rating: 4.2, feedback: 'Good problem-solving approach, needs more product experience' }
]

const achievements = [
    { id: 1, name: 'First Application', description: 'Applied to your first internship!', icon: '🎯', earned: true, gradient: 'from-blue-400 to-blue-600' },
    { id: 2, name: 'Interview Pro', description: 'Attended 3+ interviews!', icon: '💼', earned: true, gradient: 'from-purple-400 to-purple-600' },
    { id: 3, name: 'Skill Master', description: 'Added 5+ skills to your profile!', icon: '⭐', earned: false, gradient: 'from-green-400 to-green-600' },
    { id: 4, name: 'Network Builder', description: 'Connected with 2+ mentors!', icon: '🤝', earned: false, gradient: 'from-orange-400 to-orange-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Enhanced Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
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
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative"
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
                          <div 
                            key={notification.id}
                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'interview' ? 'bg-blue-500' :
                                notification.type === 'application' ? 'bg-green-500' :
                                'bg-yellow-500'
                              }`}></div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{notification.title}</div>
                                <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                                <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
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

      <div className="container mx-auto px-4 py-8">
          {/* Enhanced Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Welcome back, {userName}! 👋
                </motion.h1>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Track your internship journey and discover new opportunities
                </motion.p>
              </motion.div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Application
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
                      <p className="text-xs text-green-600">+2 this week</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Interviews</p>
                      <p className="text-2xl font-bold text-green-600">{interviews.length}</p>
                      <p className="text-xs text-blue-600">1 scheduled</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-purple-600">75%</p>
                      <p className="text-xs text-green-600">+5% this month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
        </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Achievements</p>
                      <p className="text-2xl font-bold text-orange-600">{achievements.filter(a => a.earned).length}</p>
                      <p className="text-xs text-blue-600">2 more to unlock</p>
                    </div>
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Enhanced Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-9">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="resume">Resume Builder</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="chatbot">AI Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Enhanced Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Recent Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((app) => (
          <motion.div
                          key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">{app.position}</h4>
                            <p className="text-sm text-gray-600">{app.company}</p>
                            <div className="flex items-center mt-1">
                              <Target className="h-3 w-3 mr-1 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">{app.match}% match</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={
                              app.status === 'Selected' ? 'bg-green-100 text-green-800' :
                              app.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'Interview Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {app.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 rounded-lg border-l-4 ${
                            notification.type === 'interview' ? 'bg-blue-50 border-blue-500' :
                            notification.type === 'application' ? 'bg-green-50 border-green-500' :
                            'bg-yellow-50 border-yellow-500'
                          }`}
                        >
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Achievements Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Achievements & Badges
                  </CardTitle>
                  <CardDescription>
                    Unlock achievements as you progress in your internship journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-lg text-center border-2 ${
                          achievement.earned 
                            ? `bg-gradient-to-r ${achievement.gradient} text-white border-transparent` 
                            : 'bg-gray-100 text-gray-700 border-gray-300 opacity-70'
                        }`}
                      >
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        <p className="text-xs mt-1">{achievement.description}</p>
                        {achievement.earned && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Earned
                            </Badge>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Builder
                  </CardTitle>
                  <CardDescription>
                    Complete your profile to get better job recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        placeholder="Enter your email" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={profile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        placeholder="Enter your phone number" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="university">University</Label>
                      <Input 
                        id="university" 
                        value={profile.university}
                        onChange={(e) => handleProfileChange('university', e.target.value)}
                        placeholder="Enter your university" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input 
                        id="major" 
                        value={profile.major}
                        onChange={(e) => handleProfileChange('major', e.target.value)}
                        placeholder="Enter your major" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA</Label>
                      <Input 
                        id="gpa" 
                        value={profile.gpa}
                        onChange={(e) => handleProfileChange('gpa', e.target.value)}
                        placeholder="Enter your GPA" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="graduation">Graduation Year</Label>
                      <Input 
                        id="graduation" 
                        value={profile.graduationYear}
                        onChange={(e) => handleProfileChange('graduationYear', e.target.value)}
                        placeholder="Enter graduation year" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-blue-100 flex items-center space-x-1"
                        >
                          <span>{skill}</span>
                          <XCircle 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeSkill(skill)}
                          />
                        </Badge>
                      ))}
                      {showAddSkill ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add skill"
                            className="w-32"
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button size="sm" onClick={addSkill}>
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setShowAddSkill(false)}>
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setShowAddSkill(true)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Skill
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Social Links</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input 
                          id="linkedin" 
                          value={profile.socialLinks.linkedin}
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                          }))}
                          placeholder="LinkedIn profile URL" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input 
                          id="github" 
                          value={profile.socialLinks.github}
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            socialLinks: { ...prev.socialLinks, github: e.target.value }
                          }))}
                          placeholder="GitHub profile URL" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio</Label>
                        <Input 
                          id="portfolio" 
                          value={profile.socialLinks.portfolio}
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            socialLinks: { ...prev.socialLinks, portfolio: e.target.value }
                          }))}
                          placeholder="Portfolio website URL" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Profile
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Resume
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* OpenResume Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    Professional Resume Builder
                    <Badge variant="secondary" className="ml-2">
                      Powered by OpenResume
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Create ATS-friendly resumes with AI-powered optimization and professional templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OpenResumeIntegration />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resume Builder Tab */}
            <TabsContent value="resume" className="space-y-6">
              <OpenResumeIntegration />
            </TabsContent>

            {/* Enhanced Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Application Tracker
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Search className="h-4 w-4 mr-1" />
                        Search
                      </Button>
                      <Button size="sm" variant="outline">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        New Application
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{app.position}</h4>
                            <p className="text-gray-600">{app.company}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>Applied: {app.date}</span>
                              <div className="flex items-center">
                                <Target className="h-3 w-3 mr-1 text-green-600" />
                                <span className="text-green-600 font-medium">{app.match}% match</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className={
                              app.status === 'Selected' ? 'bg-green-100 text-green-800' :
                              app.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'Interview Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {app.status}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced AI Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3"
                      >
                        <Zap className="h-5 w-5 text-white" />
                      </motion.div>
                      AI-Powered Job Recommendations
                    </CardTitle>
                    <CardDescription className="text-lg">
                      🎯 Personalized opportunities based on your profile and preferences
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    id: 1,
                    title: "Software Engineer Intern",
                    company: "Google",
                    logo: "🔍",
                    salary: "$8,000/month",
                    match: 95,
                    type: "Internship",
                    skills: ["React", "Python", "Machine Learning"],
                    color: "from-blue-500 to-cyan-500",
                    description: "Work on cutting-edge AI projects with Google's engineering team"
                  },
                  {
                    id: 2,
                    title: "Frontend Developer",
                    company: "Microsoft",
                    logo: "🪟",
                    salary: "$6,500/month",
                    match: 88,
                    type: "Internship",
                    skills: ["React", "TypeScript", "Azure"],
                    color: "from-green-500 to-emerald-500",
                    description: "Build modern web applications using Microsoft's latest technologies"
                  },
                  {
                    id: 3,
                    title: "Data Science Intern",
                    company: "Amazon",
                    logo: "📦",
                    salary: "$7,200/month",
                    match: 92,
                    type: "Internship",
                    skills: ["Python", "SQL", "AWS"],
                    color: "from-orange-500 to-yellow-500",
                    description: "Analyze big data to drive business insights and recommendations"
                  },
                  {
                    id: 4,
                    title: "Full Stack Developer",
                    company: "Netflix",
                    logo: "🎬",
                    salary: "$7,800/month",
                    match: 85,
                    type: "Internship",
                    skills: ["React", "Node.js", "GraphQL"],
                    color: "from-red-500 to-pink-500",
                    description: "Develop scalable applications for millions of users worldwide"
                  },
                  {
                    id: 5,
                    title: "AI/ML Engineer",
                    company: "OpenAI",
                    logo: "🤖",
                    salary: "$9,000/month",
                    match: 98,
                    type: "Internship",
                    skills: ["Python", "TensorFlow", "NLP"],
                    color: "from-purple-500 to-indigo-500",
                    description: "Work on the next generation of artificial intelligence systems"
                  },
                  {
                    id: 6,
                    title: "DevOps Engineer",
                    company: "Docker",
                    logo: "🐳",
                    salary: "$6,800/month",
                    match: 82,
                    type: "Internship",
                    skills: ["Docker", "Kubernetes", "AWS"],
                    color: "from-teal-500 to-cyan-500",
                    description: "Build and maintain cloud infrastructure for containerized applications"
                  }
                ].map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${rec.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="text-3xl"
                            >
                              {rec.logo}
                            </motion.div>
                            <div>
                              <h4 className="font-bold text-lg group-hover:text-gray-800 transition-colors">{rec.title}</h4>
                              <p className="text-gray-600 font-medium">{rec.company}</p>
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1 rounded-full bg-gradient-to-r ${rec.color} text-white text-sm font-medium`}
                          >
                            {rec.match}% Match
                          </motion.div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm">{rec.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            💰 {rec.salary}
                          </Badge>
                          <Badge variant="outline" className="border-blue-200 text-blue-700">
                            {rec.type}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.skills.map((skill, idx) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge variant="outline" className="hover:bg-blue-50 transition-colors">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex space-x-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className={`w-full bg-gradient-to-r ${rec.color} hover:opacity-90 text-white border-0`}>
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" className="hover:bg-gray-50">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" className="hover:bg-gray-50">
                              <Share className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Enhanced Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              {/* Progress Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: "Applications", value: applications.length, total: 50, color: "from-blue-500 to-cyan-500", icon: Briefcase },
                  { title: "Interviews", value: interviews.length, total: 15, color: "from-green-500 to-emerald-500", icon: Calendar },
                  { title: "Offers", value: applications.filter(a => a.status === 'Selected').length, total: 5, color: "from-purple-500 to-pink-500", icon: Award },
                  { title: "Success Rate", value: Math.round((applications.filter(a => a.status === 'Selected').length / Math.max(applications.length, 1)) * 100), total: 100, color: "from-orange-500 to-red-500", icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                          >
                            <stat.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                            className="text-right"
                          >
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">/ {stat.total}</div>
                          </motion.div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{stat.title}</span>
                            <span className="font-medium">{Math.round((stat.value / stat.total) * 100)}%</span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                            className="w-full bg-gray-200 rounded-full h-2"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(stat.value / stat.total) * 100}%` }}
                              transition={{ delay: 1 + index * 0.1, duration: 1 }}
                              className={`h-2 bg-gradient-to-r ${stat.color} rounded-full`}
                            />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Progress Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Success Rate */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3"
                        >
                          <TrendingUp className="h-5 w-5 text-white" />
                        </motion.div>
                        Application Success Rate
                      </CardTitle>
                      <CardDescription>Your journey from application to offer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { label: "Applications Submitted", value: applications.length, total: 50, color: "from-blue-500 to-cyan-500" },
                          { label: "Interviews Scheduled", value: interviews.length, total: 15, color: "from-green-500 to-emerald-500" },
                          { label: "Offers Received", value: applications.filter(a => a.status === 'Selected').length, total: 5, color: "from-purple-500 to-pink-500" }
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-700">{item.label}</span>
                              <span className="text-sm font-bold text-gray-900">{item.value}/{item.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.value / item.total) * 100}%` }}
                                transition={{ delay: 0.8 + index * 0.2, duration: 1 }}
                                className={`h-3 bg-gradient-to-r ${item.color} rounded-full`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Interview History */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3"
                        >
                          <Calendar className="h-5 w-5 text-white" />
                        </motion.div>
                        Interview History
                      </CardTitle>
                      <CardDescription>Your interview performance and feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {interviews.map((interview, index) => (
                          <motion.div
                            key={interview.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{interview.position}</h4>
                                <p className="text-gray-600 text-sm">{interview.company}</p>
                                <p className="text-xs text-gray-500">{interview.date}</p>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center bg-yellow-100 px-2 py-1 rounded-full"
                              >
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="font-semibold text-yellow-700">{interview.rating}</span>
                              </motion.div>
                            </div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                            >
                              {interview.feedback}
                            </motion.p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Skills Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3"
                      >
                        <Code className="h-5 w-5 text-white" />
                      </motion.div>
                      Skills Development Progress
                    </CardTitle>
                    <CardDescription>Track your technical skills growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { skill: "React", progress: 85, color: "from-blue-500 to-cyan-500" },
                        { skill: "JavaScript", progress: 90, color: "from-yellow-500 to-orange-500" },
                        { skill: "Python", progress: 75, color: "from-green-500 to-emerald-500" },
                        { skill: "Node.js", progress: 80, color: "from-purple-500 to-pink-500" },
                        { skill: "TypeScript", progress: 70, color: "from-indigo-500 to-blue-500" },
                        { skill: "AWS", progress: 65, color: "from-orange-500 to-red-500" }
                      ].map((skill, index) => (
                        <motion.div
                          key={skill.skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{skill.skill}</span>
                            <span className="text-sm font-bold text-gray-900">{skill.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.progress}%` }}
                              transition={{ delay: 1 + index * 0.1, duration: 1 }}
                              className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Enhanced AI Chatbot Tab */}
            <TabsContent value="chatbot" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    AI Career Guidance Chatbot
                  </CardTitle>
                  <CardDescription>
                    Get personalized career advice and guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 border rounded-lg p-4 bg-gray-50 overflow-y-auto">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start space-x-2 ${message.type === 'user' ? 'justify-end' : ''}`}
                        >
                          {message.type === 'ai' && (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">AI</span>
                            </div>
                          )}
                          <div className={`p-3 rounded-lg shadow-sm max-w-xs ${
                            message.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {message.type === 'user' && (
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">U</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Input 
                      placeholder="Ask me anything about your career..." 
                      className="flex-1"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button onClick={sendChatMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your progress and identify improvement areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <div className="text-sm text-gray-600">Total Applications</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-gray-600">Interviews</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">75%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Learning Tab */}
            <TabsContent value="learning" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Smart Resume Generator
                    </CardTitle>
                    <CardDescription>
                      AI-powered resume generation based on your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Resume
                      </Button>
                </div>
              </CardContent>
            </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Skill Assessment
                    </CardTitle>
                    <CardDescription>
                      Test your knowledge and get personalized learning recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-gray-600">JavaScript Skills</div>
                      </div>
                      <Button className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        Start Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
              <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Networking Hub
                </CardTitle>
                  <CardDescription>
                    Connect with mentors and industry professionals
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Sarah Johnson</h4>
                          <p className="text-sm text-gray-600">Senior Software Engineer at Google</p>
                        </div>
                        <Button size="sm">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
              <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences and notifications
                  </CardDescription>
              </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Notification Preferences</Label>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Push Notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Application Updates</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interview Reminders</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Privacy Settings</Label>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span>Profile Visibility</span>
                        <Select defaultValue="public">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                </Button>
                    <Button variant="outline">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                </Button>
                  </div>
              </CardContent>
            </Card>
            </TabsContent>
          </Tabs>
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  return <StudentDashboardContent />
}