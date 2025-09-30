'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Brain, Target, Zap, Trophy, Star, CheckCircle, Clock, 
  BookOpen, Code, Users, Building, GraduationCap, Briefcase,
  FileText, Download, Upload, Share, Bookmark, ExternalLink,
  Plus, Edit, Trash2, Eye, Send, Copy, RefreshCw, Save,
  TrendingUp, BarChart3, PieChart, Activity, Calendar,
  MessageCircle, Video, Mic, Camera, Image, File, Folder,
  Archive, Lock, Unlock, Shield, AlertTriangle, Info,
  HelpCircle, Heart, Sparkles, Lightbulb, Award, Target as TargetIcon
} from 'lucide-react'

// Smart Resume Generator Component
export function SmartResumeGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [resumeData, setResumeData] = useState({
    template: 'modern',
    sections: ['experience', 'education', 'skills', 'projects'],
    format: 'pdf'
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate resume generation
    setTimeout(() => {
      setIsGenerating(false)
      alert('Resume generated successfully!')
    }, 2000)
  }

  return (
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
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Template</Label>
            <Select value={resumeData.template} onValueChange={(value) => setResumeData(prev => ({ ...prev, template: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Format</Label>
            <Select value={resumeData.format} onValueChange={(value) => setResumeData(prev => ({ ...prev, format: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="docx">Word Document</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Include Sections</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['experience', 'education', 'skills', 'projects', 'certifications', 'achievements'].map((section) => (
              <div key={section} className="flex items-center space-x-2">
                <Switch 
                  checked={resumeData.sections.includes(section)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setResumeData(prev => ({ ...prev, sections: [...prev.sections, section] }))
                    } else {
                      setResumeData(prev => ({ ...prev, sections: prev.sections.filter(s => s !== section) }))
                    }
                  }}
                />
                <Label className="text-sm capitalize">{section}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Resume
              </>
            )}
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Skill Assessment Component
export function SkillAssessment() {
  const [currentSkill, setCurrentSkill] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const skills = [
    { name: 'JavaScript', questions: [
      'What is the difference between let and var?',
      'Explain closures in JavaScript',
      'What is the event loop?'
    ]},
    { name: 'React', questions: [
      'What is JSX?',
      'Explain the difference between props and state',
      'What are React hooks?'
    ]},
    { name: 'Python', questions: [
      'What is list comprehension?',
      'Explain the difference between lists and tuples',
      'What are decorators in Python?'
    ]}
  ]

  const handleAnswer = (questionIndex: number, rating: number) => {
    const key = `${currentSkill}-${questionIndex}`
    setAnswers(prev => ({ ...prev, [key]: rating }))
  }

  const calculateScore = () => {
    const skillScores = skills.map((skill, skillIndex) => {
      const skillAnswers = skill.questions.map((_, questionIndex) => 
        answers[`${skillIndex}-${questionIndex}`] || 0
      )
      return skillAnswers.reduce((sum, score) => sum + score, 0) / skill.questions.length
    })
    return skillScores
  }

  if (showResults) {
    const scores = calculateScore()
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Skill Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-600">{Math.round(scores[index] * 100)}%</span>
                </div>
                <Progress value={scores[index] * 100} className="h-2" />
              </div>
            ))}
            <div className="mt-6">
              <Button onClick={() => setShowResults(false)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
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
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">
              {skills[currentSkill].name} Assessment
            </h3>
            <div className="space-y-4">
              {skills[currentSkill].questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border rounded-lg p-4">
                  <p className="font-medium mb-3">{question}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Rate your knowledge:</span>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          size="sm"
                          variant={answers[`${currentSkill}-${questionIndex}`] === rating ? 'default' : 'outline'}
                          onClick={() => handleAnswer(questionIndex, rating)}
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentSkill(Math.max(0, currentSkill - 1))}
              disabled={currentSkill === 0}
            >
              Previous
            </Button>
            {currentSkill < skills.length - 1 ? (
              <Button onClick={() => setCurrentSkill(currentSkill + 1)}>
                Next Skill
              </Button>
            ) : (
              <Button onClick={() => setShowResults(true)}>
                <Target className="h-4 w-4 mr-2" />
                View Results
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Career Path Planner Component
export function CareerPathPlanner() {
  const [selectedPath, setSelectedPath] = useState('software-engineer')
  const [currentStep, setCurrentStep] = useState(0)

  const careerPaths = {
    'software-engineer': {
      title: 'Software Engineer',
      steps: [
        { title: 'Learn Programming Fundamentals', duration: '3-6 months', skills: ['JavaScript', 'Python', 'Data Structures'] },
        { title: 'Build Projects', duration: '2-4 months', skills: ['React', 'Node.js', 'Git'] },
        { title: 'Apply for Internships', duration: '1-2 months', skills: ['Resume Building', 'Interview Prep'] },
        { title: 'Gain Professional Experience', duration: '6-12 months', skills: ['Team Collaboration', 'Code Review', 'Agile'] },
        { title: 'Specialize', duration: '6+ months', skills: ['System Design', 'Architecture', 'Leadership'] }
      ]
    },
    'data-scientist': {
      title: 'Data Scientist',
      steps: [
        { title: 'Learn Statistics & Math', duration: '2-4 months', skills: ['Statistics', 'Linear Algebra', 'Calculus'] },
        { title: 'Master Programming', duration: '3-6 months', skills: ['Python', 'R', 'SQL'] },
        { title: 'Learn Machine Learning', duration: '4-6 months', skills: ['ML Algorithms', 'Deep Learning', 'TensorFlow'] },
        { title: 'Build Data Projects', duration: '2-4 months', skills: ['Data Visualization', 'Model Deployment'] },
        { title: 'Apply for Positions', duration: '1-3 months', skills: ['Portfolio Building', 'Interview Prep'] }
      ]
    },
    'product-manager': {
      title: 'Product Manager',
      steps: [
        { title: 'Learn Business Fundamentals', duration: '2-3 months', skills: ['Business Strategy', 'Market Analysis'] },
        { title: 'Understand Technology', duration: '2-4 months', skills: ['Technical Concepts', 'Software Development'] },
        { title: 'Develop Soft Skills', duration: '3-6 months', skills: ['Communication', 'Leadership', 'Negotiation'] },
        { title: 'Build Product Experience', duration: '4-8 months', skills: ['User Research', 'Product Design'] },
        { title: 'Apply for PM Roles', duration: '1-2 months', skills: ['Case Studies', 'Interview Prep'] }
      ]
    }
  }

  const currentPath = careerPaths[selectedPath as keyof typeof careerPaths]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Career Path Planner
        </CardTitle>
        <CardDescription>
          Plan your career journey with step-by-step guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label>Choose Your Career Path</Label>
            <Select value={selectedPath} onValueChange={setSelectedPath}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software-engineer">Software Engineer</SelectItem>
                <SelectItem value="data-scientist">Data Scientist</SelectItem>
                <SelectItem value="product-manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{currentPath.title} Career Path</h3>
            <div className="space-y-4">
              {currentPath.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg p-4 ${
                    index === currentStep ? 'border-blue-500 bg-blue-50' : 
                    index < currentStep ? 'border-green-500 bg-green-50' : 
                    'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === currentStep ? 'bg-blue-500 text-white' :
                        index < currentStep ? 'bg-green-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-gray-600">Duration: {step.duration}</p>
                      </div>
                    </div>
                    {index === currentStep && (
                      <Badge className="bg-blue-100 text-blue-800">Current Step</Badge>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous Step
            </Button>
            <Button 
              onClick={() => setCurrentStep(Math.min(currentPath.steps.length - 1, currentStep + 1))}
              disabled={currentStep === currentPath.steps.length - 1}
            >
              Next Step
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Learning Resources Component
export function LearningResources() {
  const [selectedCategory, setSelectedCategory] = useState('programming')

  const resources = {
    programming: [
      { title: 'JavaScript Fundamentals', type: 'Course', duration: '40 hours', difficulty: 'Beginner', rating: 4.8 },
      { title: 'React Complete Guide', type: 'Course', duration: '60 hours', difficulty: 'Intermediate', rating: 4.9 },
      { title: 'Python for Data Science', type: 'Course', duration: '50 hours', difficulty: 'Beginner', rating: 4.7 },
      { title: 'System Design Interview', type: 'Book', duration: '20 hours', difficulty: 'Advanced', rating: 4.6 }
    ],
    softskills: [
      { title: 'Communication Skills', type: 'Course', duration: '15 hours', difficulty: 'Beginner', rating: 4.5 },
      { title: 'Leadership Development', type: 'Course', duration: '25 hours', difficulty: 'Intermediate', rating: 4.7 },
      { title: 'Public Speaking', type: 'Workshop', duration: '8 hours', difficulty: 'Beginner', rating: 4.4 }
    ],
    interview: [
      { title: 'Coding Interview Prep', type: 'Course', duration: '80 hours', difficulty: 'Intermediate', rating: 4.9 },
      { title: 'Behavioral Interview Guide', type: 'Book', duration: '10 hours', difficulty: 'Beginner', rating: 4.3 },
      { title: 'Technical Interview Practice', type: 'Platform', duration: 'Unlimited', difficulty: 'All Levels', rating: 4.8 }
    ]
  }

  const currentResources = resources[selectedCategory as keyof typeof resources]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Learning Resources
        </CardTitle>
        <CardDescription>
          Curated learning materials to boost your skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="softskills">Soft Skills</SelectItem>
                <SelectItem value="interview">Interview Prep</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {currentResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{resource.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{resource.type}</span>
                      <span>•</span>
                      <span>{resource.duration}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{resource.rating}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm">
                      <Bookmark className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Networking Hub Component
export function NetworkingHub() {
  const [activeTab, setActiveTab] = useState('mentors')

  const mentors = [
    { name: 'Sarah Johnson', role: 'Senior Software Engineer at Google', experience: '8 years', rating: 4.9, available: true },
    { name: 'Mike Chen', role: 'Product Manager at Microsoft', experience: '6 years', rating: 4.8, available: false },
    { name: 'Emily Davis', role: 'Data Scientist at Netflix', experience: '5 years', rating: 4.7, available: true }
  ]

  const events = [
    { title: 'Tech Career Fair 2024', date: '2024-03-15', location: 'San Francisco', attendees: 500 },
    { title: 'Women in Tech Meetup', date: '2024-03-20', location: 'Online', attendees: 150 },
    { title: 'Startup Networking Event', date: '2024-03-25', location: 'New York', attendees: 200 }
  ]

  return (
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="space-y-4">
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{mentor.name}</h4>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{mentor.experience} experience</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{mentor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={mentor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {mentor.available ? 'Available' : 'Busy'}
                    </Badge>
                    <Button size="sm" disabled={!mentor.available}>
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm">
                      <Bookmark className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
