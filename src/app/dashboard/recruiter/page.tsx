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
  XCircle, Clock, Target, Search, Filter, Calendar, Star,
  Send, Download, Upload, Settings, Eye, MessageSquare,
  Award, MapPin, Phone, Mail, Globe, Plus, Edit, Trash2,
  UserCheck, UserX, Calendar as CalendarIcon, Clock as ClockIcon,
  BarChart3, PieChart, TrendingDown, AlertCircle, ThumbsUp
} from 'lucide-react'
import Link from 'next/link'

// Mock data for recruiter dashboard
const mockCompanyProfile = {
  name: 'TechCorp Solutions',
  industry: 'Technology',
  size: '500-1000 employees',
  location: 'Bangalore, India',
  website: 'www.techcorp.com',
  description: 'Leading technology company focused on innovative solutions',
  logo: '/images/company-logo.png'
}

const mockJobPostings = [
  { id: 1, title: 'Software Engineer Intern', type: 'Internship', applicants: 45, status: 'active', postedDate: '2024-01-15', deadline: '2024-02-15' },
  { id: 2, title: 'Data Analyst Trainee', type: 'Internship', applicants: 32, status: 'active', postedDate: '2024-01-20', deadline: '2024-02-20' },
  { id: 3, title: 'Product Manager', type: 'Full-time', applicants: 28, status: 'closed', postedDate: '2024-01-10', deadline: '2024-02-10' }
]

const mockCandidates = [
  {
    id: 1,
    name: 'John Doe', 
    email: 'john@university.edu', 
    university: 'IIT Delhi', 
    gpa: 8.5, 
    skills: ['React', 'Node.js', 'Python'],
    experience: '2 years', 
    matchScore: 95,
    status: 'shortlisted',
    appliedFor: 'Software Engineer Intern'
  },
  {
    id: 2,
    name: 'Jane Smith', 
    email: 'jane@university.edu', 
    university: 'NIT Bangalore', 
    gpa: 8.2, 
    skills: ['Python', 'Machine Learning', 'SQL'], 
    experience: '1 year', 
    matchScore: 88,
    status: 'pending',
    appliedFor: 'Data Analyst Trainee'
  },
  {
    id: 3,
    name: 'Mike Johnson', 
    email: 'mike@university.edu', 
    university: 'IIIT Hyderabad', 
    gpa: 7.8, 
    skills: ['Java', 'Spring Boot', 'AWS'], 
    experience: '3 years', 
    matchScore: 82,
    status: 'rejected',
    appliedFor: 'Software Engineer Intern'
  }
]

const mockInterviews = [
  { id: 1, candidate: 'John Doe', position: 'Software Engineer Intern', date: '2024-02-20', time: '10:00 AM', status: 'scheduled', type: 'Technical' },
  { id: 2, candidate: 'Jane Smith', position: 'Data Analyst Trainee', date: '2024-02-22', time: '2:00 PM', status: 'completed', type: 'HR' },
  { id: 3, candidate: 'Mike Johnson', position: 'Software Engineer Intern', date: '2024-02-18', time: '11:00 AM', status: 'completed', type: 'Technical' }
]

const mockFeedback = [
  { id: 1, candidate: 'John Doe', position: 'Software Engineer Intern', rating: 5, technical: 5, communication: 4, problemSolving: 5, comments: 'Excellent technical skills and problem-solving ability.' },
  { id: 2, candidate: 'Jane Smith', position: 'Data Analyst Trainee', rating: 4, technical: 4, communication: 5, problemSolving: 4, comments: 'Good analytical skills, needs more experience with ML frameworks.' }
]

const mockAISuggestions = [
  { id: 1, name: 'Sarah Wilson', match: 92, reason: 'Perfect fit for React development role', skills: ['React', 'TypeScript', 'Redux'] },
  { id: 2, name: 'David Brown', match: 89, reason: 'Strong backend development experience', skills: ['Node.js', 'MongoDB', 'Express'] },
  { id: 3, name: 'Lisa Chen', match: 85, reason: 'Excellent data science background', skills: ['Python', 'Pandas', 'Scikit-learn'] }
]

export default function RecruiterDashboard() {
  const [userName, setUserName] = useState('Recruiter')
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    type: 'Internship',
    location: '',
    deadline: ''
  })
  const [searchFilters, setSearchFilters] = useState({
    skills: '',
    gpa: '',
    university: '',
    experience: ''
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

  const handleJobSubmit = () => {
    console.log('Submitting job:', jobForm)
    // In real app, this would call an API
    setJobForm({ title: '', description: '', requirements: '', salary: '', type: 'Internship', location: '', deadline: '' })
  }

  const handleCandidateAction = (candidateId: string, action: 'shortlist' | 'reject' | 'interview') => {
    console.log(`${action} candidate:`, candidateId)
    // In real app, this would call an API
  }

  const handleBulkAction = (action: 'shortlist' | 'reject') => {
    console.log(`Bulk ${action}:`, selectedCandidates)
    setSelectedCandidates([])
  }

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Skint
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                <span className="ml-2">Notifications</span>
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
              </Button>
              </Link>
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
            Find the best talent and manage your hiring process efficiently
          </p>
        </motion.div>

        {/* Company Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            >
            <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold text-orange-600">{mockJobPostings.filter(job => job.status === 'active').length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-orange-600" />
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
                    <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                    <p className="text-2xl font-bold text-blue-600">{mockJobPostings.reduce((sum, job) => sum + job.applicants, 0)}</p>
                    </div>
                  <Users className="h-8 w-8 text-blue-600" />
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
                    <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                    <p className="text-2xl font-bold text-green-600">{mockCandidates.filter(c => c.status === 'shortlisted').length}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
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
                    <p className="text-sm font-medium text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold text-purple-600">{mockInterviews.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="post-job">Post Job</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Job Postings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Recent Job Postings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockJobPostings.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.applicants} applicants</p>
                        </div>
                        <Badge className={job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCandidates.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{candidate.name}</h4>
                          <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
                        </div>
                        <Badge className={
                          candidate.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {candidate.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Post Job Tab */}
          <TabsContent value="post-job" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Post New Job/Internship
                </CardTitle>
                <CardDescription>
                  Create a new job posting to attract the best candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title"
                      value={jobForm.title}
                      onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Software Engineer Intern"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <select 
                      id="type"
                      value={jobForm.type}
                      onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary/Stipend</Label>
                    <Input 
                      id="salary"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                      placeholder="e.g., ₹25,000/month"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={jobForm.location}
                      onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Bangalore, Remote"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input 
                      id="deadline"
                      type="date"
                      value={jobForm.deadline}
                      onChange={(e) => setJobForm(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <textarea 
                    id="description"
                    value={jobForm.description}
                    onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the role, responsibilities, and what the candidate will learn..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-32"
                  />
                </div>
                
                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <textarea 
                    id="requirements"
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
                    placeholder="List the required skills, qualifications, and experience..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-32"
                  />
                </div>
                
                <Button onClick={handleJobSubmit} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Candidate Search & Filter
                  </span>
                  {selectedCandidates.length > 0 && (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleBulkAction('shortlist')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Shortlist ({selectedCandidates.length})
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleBulkAction('reject')}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Reject ({selectedCandidates.length})
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <Input 
                      id="skills"
                      value={searchFilters.skills}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, skills: e.target.value }))}
                      placeholder="e.g., React, Python"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">Min GPA</Label>
                    <Input 
                      id="gpa"
                      type="number"
                      value={searchFilters.gpa}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="7.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input 
                      id="university"
                      value={searchFilters.university}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, university: e.target.value }))}
                      placeholder="IIT, NIT, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input 
                      id="experience"
                      value={searchFilters.experience}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="1 year, 2 years"
                    />
                  </div>
                </div>

                {/* Candidates List */}
                <div className="space-y-4">
                  {mockCandidates.map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <input 
                            type="checkbox" 
                            checked={selectedCandidates.includes(candidate.id.toString())}
                            onChange={() => toggleCandidateSelection(candidate.id.toString())}
                            className="h-4 w-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold text-lg">{candidate.name}</h4>
                              <Badge className="bg-blue-100 text-blue-800">
                                {candidate.matchScore}% Match
                              </Badge>
                            </div>
                            <p className="text-gray-600">{candidate.email}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{candidate.university}</span>
                              <span>GPA: {candidate.gpa}</span>
                              <span>Experience: {candidate.experience}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {candidate.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                            </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            candidate.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                            candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {candidate.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleCandidateAction(candidate.id.toString(), 'shortlist')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <UserCheck className="h-4 w-4 mr-1" />
                              Shortlist
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleCandidateAction(candidate.id.toString(), 'interview')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Interview
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleCandidateAction(candidate.id.toString(), 'reject')}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                        </div>
                      </CardContent>
                    </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Interview Scheduling
                  </span>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                          <div className="flex-1">
                          <h4 className="font-semibold text-lg">{interview.candidate}</h4>
                          <p className="text-gray-600">{interview.position}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {interview.date}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {interview.time}
                            </div>
                            <span>{interview.type} Interview</span>
                            </div>
                          </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={
                            interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {interview.status}
                          </Badge>
                            <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                      </div>
                    </div>
                  ))}
                        </div>
                      </CardContent>
                    </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Interview Feedback
                </CardTitle>
                <CardDescription>
                  Submit structured feedback that updates student records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFeedback.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{feedback.candidate}</h4>
                          <p className="text-gray-600">{feedback.position}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Technical</p>
                          <p className="text-lg font-semibold">{feedback.technical}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Communication</p>
                          <p className="text-lg font-semibold">{feedback.communication}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Problem Solving</p>
                          <p className="text-lg font-semibold">{feedback.problemSolving}/5</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{feedback.comments}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Suggestions Tab */}
          <TabsContent value="ai-suggestions" className="space-y-6">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  AI Candidate Suggestions
              </CardTitle>
              <CardDescription>
                  AI-powered recommendations for best-fit candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {mockAISuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-lg">{suggestion.name}</h4>
                            <Badge className="bg-purple-100 text-purple-800">
                              {suggestion.match}% Match
                            </Badge>
                          </div>
                          <p className="text-gray-600 mt-1">{suggestion.reason}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {suggestion.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                            <Button size="sm" variant="outline">
                            <UserCheck className="h-4 w-4 mr-1" />
                            Shortlist
                            </Button>
                          </div>
                        </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Company Profile Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Company Profile
                </CardTitle>
                <CardDescription>
                  Showcase your company to attract the best talent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName"
                      value={mockCompanyProfile.name}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry"
                      value={mockCompanyProfile.industry}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Company Size</Label>
                    <Input 
                      id="size"
                      value={mockCompanyProfile.size}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={mockCompanyProfile.location}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website"
                      value={mockCompanyProfile.website}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <textarea 
                    id="description"
                    value={mockCompanyProfile.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-32 mt-1"
                  />
                </div>
                
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <span>Software Engineer Intern</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm font-medium">45</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Analyst Trainee</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">32</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
            <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Candidate Status
                  </CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Shortlisted
                      </span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        Pending
                      </span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Rejected
                      </span>
                      <span className="font-semibold">1</span>
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
