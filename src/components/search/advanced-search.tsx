'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Briefcase,
  Users,
  Star,
  X,
  SlidersHorizontal
} from 'lucide-react'

const searchResults = [
  {
    id: 1,
    title: 'Software Engineer Intern',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'internship',
    salary: '$8,000/month',
    duration: '6 months',
    skills: ['React', 'Node.js', 'Python'],
    match: 95,
    posted: '2 days ago',
    applications: 45,
    description: 'Join our dynamic engineering team to work on cutting-edge web applications...'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'placement',
    salary: '$120,000/year',
    duration: 'Full-time',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    match: 88,
    posted: '1 week ago',
    applications: 32,
    description: 'We are looking for a passionate full-stack developer to join our growing team...'
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'DataFlow Solutions',
    location: 'New York, NY',
    type: 'internship',
    salary: '$6,500/month',
    duration: '3 months',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    match: 92,
    posted: '3 days ago',
    applications: 28,
    description: 'Work with our data science team to analyze large datasets and build ML models...'
  }
]

const departments = [
  'All Departments',
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering'
]

const jobTypes = [
  'All Types',
  'Internship',
  'Full-time Placement',
  'Contract',
  'Part-time'
]

const experienceLevels = [
  'All Levels',
  'Entry Level',
  'Mid Level',
  'Senior Level'
]

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    department: 'All Departments',
    jobType: 'All Types',
    experienceLevel: 'All Levels',
    salaryRange: '',
    skills: [] as string[],
    postedWithin: 'All Time'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim() && !filters.skills.includes(newSkill.trim())) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      department: 'All Departments',
      jobType: 'All Types',
      experienceLevel: 'All Levels',
      salaryRange: '',
      skills: [],
      postedWithin: 'All Time'
    })
    setSearchQuery('')
  }

  const getFilteredResults = () => {
    return searchResults.filter(result => {
      const matchesQuery = !searchQuery || 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesLocation = !filters.location || 
        result.location.toLowerCase().includes(filters.location.toLowerCase())
      
      const matchesType = filters.jobType === 'All Types' || 
        result.type === filters.jobType.toLowerCase()
      
      const matchesSkills = filters.skills.length === 0 || 
        filters.skills.some(skill => 
          result.skills.some(resultSkill => 
            resultSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      
      return matchesQuery && matchesLocation && matchesType && matchesSkills
    })
  }

  const filteredResults = getFilteredResults()

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Opportunity
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover internships and placements tailored to your skills and interests
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for opportunities, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Filters */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showFilters ? 1 : 0, 
          height: showFilters ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span>Advanced Filters</span>
            </CardTitle>
            <CardDescription>
              Refine your search with specific criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, Remote"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={filters.department} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select 
                  value={filters.jobType} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select 
                  value={filters.experienceLevel} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="salary"
                    placeholder="e.g., $50,000 - $80,000"
                    value={filters.salaryRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryRange: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="posted">Posted Within</Label>
                <Select 
                  value={filters.postedWithin} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, postedWithin: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Time">All Time</SelectItem>
                    <SelectItem value="Last 24 hours">Last 24 hours</SelectItem>
                    <SelectItem value="Last week">Last week</SelectItem>
                    <SelectItem value="Last month">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Skills Filter */}
            <div className="space-y-2">
              <Label>Required Skills</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Search Results ({filteredResults.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date Posted</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="match">Match Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="glass border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <Badge 
                          variant={result.type === 'internship' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {result.type}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{result.match}% match</span>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        {result.company} • {result.location}
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{result.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{result.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{result.applications} applications</span>
                        </div>
                        <span>Posted {result.posted}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Apply Now
                      </Button>
                      <Button variant="outline">
                        Save
                      </Button>
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
