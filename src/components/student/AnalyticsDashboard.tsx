'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  TrendingUp, BarChart3, PieChart, Activity, Target, Calendar,
  Briefcase, Users, Award, Clock, CheckCircle, XCircle,
  Star, Eye, Download, Share, RefreshCw, Filter, Search,
  ArrowUp, ArrowDown, Minus, Zap, Brain, Trophy, BookOpen
} from 'lucide-react'

// Performance Analytics Component
export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('applications')

  const performanceData = {
    applications: {
      total: 24,
      thisMonth: 8,
      successRate: 75,
      trend: 'up',
      change: '+12%'
    },
    interviews: {
      total: 12,
      thisMonth: 4,
      successRate: 67,
      trend: 'up',
      change: '+8%'
    },
    offers: {
      total: 3,
      thisMonth: 1,
      successRate: 25,
      trend: 'up',
      change: '+5%'
    }
  }

  const monthlyData = [
    { month: 'Jan', applications: 4, interviews: 2, offers: 0 },
    { month: 'Feb', applications: 6, interviews: 3, offers: 1 },
    { month: 'Mar', applications: 8, interviews: 4, offers: 1 },
    { month: 'Apr', applications: 6, interviews: 3, offers: 1 },
    { month: 'May', applications: 8, interviews: 4, offers: 0 },
    { month: 'Jun', applications: 10, interviews: 5, offers: 2 }
  ]

  const currentData = performanceData[selectedMetric as keyof typeof performanceData]

  return (
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentData.total}</div>
              <div className="text-sm text-gray-600">Total {selectedMetric}</div>
              <div className="flex items-center justify-center mt-1">
                {currentData.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                ) : currentData.trend === 'down' ? (
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <Minus className="h-4 w-4 text-gray-500 mr-1" />
                )}
                <span className={`text-sm ${currentData.trend === 'up' ? 'text-green-500' : currentData.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                  {currentData.change}
                </span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentData.thisMonth}</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{currentData.successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Monthly Trend</h4>
            <div className="space-y-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(data.applications / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{data.applications}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(data.interviews / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{data.interviews}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${(data.offers / 2) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{data.offers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Skill Progress Tracker
export function SkillProgressTracker() {
  const [skills, setSkills] = useState([
    { name: 'JavaScript', level: 85, target: 90, trend: 'up' },
    { name: 'React', level: 78, target: 85, trend: 'up' },
    { name: 'Python', level: 72, target: 80, trend: 'up' },
    { name: 'Node.js', level: 65, target: 75, trend: 'up' },
    { name: 'SQL', level: 58, target: 70, trend: 'up' },
    { name: 'System Design', level: 45, target: 70, trend: 'up' }
  ])

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'text-green-600'
    if (level >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSkillBgColor = (level: number) => {
    if (level >= 80) return 'bg-green-500'
    if (level >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Skill Progress Tracker
        </CardTitle>
        <CardDescription>
          Monitor your skill development and set targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold">{skill.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Target: {skill.target}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${getSkillColor(skill.level)}`}>
                    {skill.level}%
                  </span>
                  {skill.trend === 'up' && (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <div className="relative">
                <Progress value={skill.level} className="h-3" />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gray-300 rounded-full"
                  style={{ width: `${skill.target}%` }}
                ></div>
                <div 
                  className={`absolute top-0 left-0 h-3 rounded-full ${getSkillBgColor(skill.level)}`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                <span>Current: {skill.level}%</span>
                <span>Target: {skill.target}%</span>
                <span>Gap: {skill.target - skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Interview Performance Analytics
export function InterviewPerformanceAnalytics() {
  const [interviewData] = useState([
    { company: 'Google', position: 'Software Engineer', rating: 4.5, feedback: 'Strong technical skills', date: '2024-02-10' },
    { company: 'Microsoft', position: 'Product Manager', rating: 4.2, feedback: 'Good communication', date: '2024-02-05' },
    { company: 'Amazon', position: 'Data Scientist', rating: 3.8, feedback: 'Needs more ML experience', date: '2024-01-28' },
    { company: 'Netflix', position: 'Frontend Developer', rating: 4.7, feedback: 'Excellent React skills', date: '2024-01-20' }
  ])

  const averageRating = interviewData.reduce((sum, interview) => sum + interview.rating, 0) / interviewData.length
  const totalInterviews = interviewData.length
  const positiveFeedback = interviewData.filter(interview => interview.rating >= 4).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Interview Performance Analytics
        </CardTitle>
        <CardDescription>
          Analyze your interview performance and feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalInterviews}</div>
              <div className="text-sm text-gray-600">Total Interviews</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round((positiveFeedback / totalInterviews) * 100)}%</div>
              <div className="text-sm text-gray-600">Positive Feedback</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Interview History</h4>
            <div className="space-y-3">
              {interviewData.map((interview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{interview.position}</h4>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{interview.feedback}</p>
                      <p className="text-xs text-gray-400 mt-1">{interview.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(interview.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{interview.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Goal Setting and Tracking
export function GoalSettingTracker() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Apply to 20 companies', target: 20, current: 15, deadline: '2024-03-31', status: 'in-progress' },
    { id: 2, title: 'Complete 5 interviews', target: 5, current: 3, deadline: '2024-04-15', status: 'in-progress' },
    { id: 3, title: 'Learn React advanced concepts', target: 100, current: 75, deadline: '2024-03-20', status: 'in-progress' },
    { id: 4, title: 'Build 3 portfolio projects', target: 3, current: 3, deadline: '2024-02-28', status: 'completed' }
  ])

  const [newGoal, setNewGoal] = useState({ title: '', target: 0, deadline: '' })

  const addGoal = () => {
    if (newGoal.title && newGoal.target > 0 && newGoal.deadline) {
      const goal = {
        id: Date.now(),
        title: newGoal.title,
        target: newGoal.target,
        current: 0,
        deadline: newGoal.deadline,
        status: 'in-progress' as const
      }
      setGoals(prev => [...prev, goal])
      setNewGoal({ title: '', target: 0, deadline: '' })
    }
  }

  const updateGoalProgress = (id: number, increment: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const newCurrent = Math.min(goal.current + increment, goal.target)
        return {
          ...goal,
          current: newCurrent,
          status: newCurrent >= goal.target ? 'completed' : 'in-progress'
        }
      }
      return goal
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Goal Setting & Tracking
        </CardTitle>
        <CardDescription>
          Set and track your career development goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-3">Add New Goal</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Target value"
                value={newGoal.target}
                onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <Button onClick={addGoal} className="mt-3">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{goal.title}</h4>
                    <p className="text-sm text-gray-600">
                      Deadline: {goal.deadline}
                    </p>
                  </div>
                  <Badge className={
                    goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.current} / {goal.target}</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {goal.status === 'in-progress' && (
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      size="sm" 
                      onClick={() => updateGoalProgress(goal.id, 1)}
                    >
                      +1
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateGoalProgress(goal.id, -1)}
                    >
                      -1
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Comprehensive Analytics Dashboard
export function ComprehensiveAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('performance')

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <PerformanceAnalytics />
        </TabsContent>

        <TabsContent value="skills">
          <SkillProgressTracker />
        </TabsContent>

        <TabsContent value="interviews">
          <InterviewPerformanceAnalytics />
        </TabsContent>

        <TabsContent value="goals">
          <GoalSettingTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
