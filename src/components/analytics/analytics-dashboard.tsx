'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Target, 
  Award,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const placementData = [
  { month: 'Jan', placements: 12, applications: 45, interviews: 28 },
  { month: 'Feb', placements: 18, applications: 52, interviews: 35 },
  { month: 'Mar', placements: 25, applications: 68, interviews: 42 },
  { month: 'Apr', placements: 22, applications: 58, interviews: 38 },
  { month: 'May', placements: 30, applications: 75, interviews: 48 },
  { month: 'Jun', placements: 35, applications: 82, interviews: 55 }
]

const departmentData = [
  { name: 'Computer Science', value: 45, color: '#3b82f6' },
  { name: 'IT', value: 25, color: '#10b981' },
  { name: 'ECE', value: 15, color: '#f59e0b' },
  { name: 'Mechanical', value: 10, color: '#ef4444' },
  { name: 'Civil', value: 5, color: '#8b5cf6' }
]

const companyData = [
  { name: 'TechCorp', placements: 15, applications: 45 },
  { name: 'StartupXYZ', placements: 12, applications: 38 },
  { name: 'DataFlow', placements: 8, applications: 25 },
  { name: 'CloudTech', placements: 6, applications: 18 },
  { name: 'AI Solutions', placements: 4, applications: 12 }
]

const topPerformers = [
  { name: 'Alex Johnson', department: 'CS', placements: 3, applications: 8, successRate: 37.5 },
  { name: 'Sarah Wilson', department: 'IT', placements: 2, applications: 6, successRate: 33.3 },
  { name: 'Mike Chen', department: 'CS', placements: 2, applications: 5, successRate: 40.0 },
  { name: 'Lisa Rodriguez', department: 'ECE', placements: 1, applications: 4, successRate: 25.0 }
]

export default function AnalyticsDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive insights into placement performance</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Last 6 Months
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Placements</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">142</p>
                <p className="text-sm text-green-600">↑ 23% from last year</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Placement Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">78%</p>
                <p className="text-sm text-green-600">↑ 5% from last year</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">324</p>
                <p className="text-sm text-blue-600">↑ 12% from last year</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Partner Companies</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">28</p>
                <p className="text-sm text-green-600">↑ 3 new this year</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                <Briefcase className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Placement Trends */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Placement Trends</span>
                  </CardTitle>
                  <CardDescription>Monthly placement statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={placementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="placements" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="applications" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-green-600" />
                    <span>Department Distribution</span>
                  </CardTitle>
                  <CardDescription>Placements by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Placement statistics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <motion.div
                      key={dept.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: dept.color }}
                          />
                          <span className="font-medium">{dept.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{dept.value} placements</span>
                          <Badge variant="outline">{dept.value}%</Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle>Company Performance</CardTitle>
                <CardDescription>Placement statistics by company</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={companyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="placements" fill="#3b82f6" name="Placements" />
                    <Bar dataKey="applications" fill="#10b981" name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest placement success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <motion.div
                      key={performer.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {performer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{performer.name}</h3>
                            <p className="text-sm text-gray-500">{performer.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-semibold">{performer.placements}</div>
                            <div className="text-xs text-gray-500">Placements</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{performer.applications}</div>
                            <div className="text-xs text-gray-500">Applications</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">{performer.successRate}%</div>
                            <div className="text-xs text-gray-500">Success Rate</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
