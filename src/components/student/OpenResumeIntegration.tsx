'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  FileText, Download, Upload, Eye, Edit, Trash2, Plus, 
  CheckCircle, AlertCircle, Star, Award, Briefcase, 
  GraduationCap, Code, Globe, Mail, Phone, MapPin,
  ExternalLink, Copy, Share2, Zap, Target, BookOpen,
  Users, Building, Calendar, Clock, TrendingUp
} from 'lucide-react'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    portfolio: string
  }
  summary: string
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    achievements: string[]
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa: string
    achievements: string[]
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    link: string
    startDate: string
    endDate: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    credentialId: string
  }>
}

export default function OpenResumeIntegration() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    projects: [],
    certifications: []
  })

  const [activeTab, setActiveTab] = useState('builder')
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design', color: 'from-blue-500 to-purple-500' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional layout', color: 'from-gray-500 to-gray-700' },
    { id: 'creative', name: 'Creative', description: 'Bold and innovative design', color: 'from-pink-500 to-orange-500' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', color: 'from-green-500 to-teal-500' }
  ]

  const handleInputChange = (section: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: typeof value === 'object' && field.includes('.') 
        ? { ...prev[section as keyof ResumeData], [field.split('.')[1]]: value }
        : { ...prev[section as keyof ResumeData], [field]: value }
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: []
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    }
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    }
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }))
  }

  const removeItem = (section: string, id: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section as keyof ResumeData] as any[]).filter((item: any) => item.id !== id)
    }))
  }

  const generateResume = () => {
    // Simulate resume generation
    console.log('Generating resume with data:', resumeData)
    // In a real implementation, this would generate a PDF
    alert('Resume generated successfully! Download will start shortly.')
  }

  const importResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate resume parsing
      console.log('Importing resume:', file.name)
      alert('Resume imported successfully! Data has been parsed and filled.')
    }
  }

  const parseResume = () => {
    // Simulate resume parsing functionality
    console.log('Parsing resume for ATS compatibility...')
    alert('Resume parsed! ATS Score: 95/100 - Excellent compatibility!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                OpenResume Integration
              </CardTitle>
              <CardDescription>
                Professional resume builder with AI-powered optimization and ATS compatibility
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Import PDF
              </Button>
              <Button onClick={generateResume}>
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={importResume}
            className="hidden"
          />
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Resume Builder</TabsTrigger>
          <TabsTrigger value="parser">Resume Parser</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Resume Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={resumeData.summary}
                onChange={(e) => handleInputChange('', 'summary', e.target.value)}
                placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </CardTitle>
                <Button onClick={addExperience}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Experience #{index + 1}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem('experience', exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => handleInputChange('experience', 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => handleInputChange('experience', 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleInputChange('experience', 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleInputChange('experience', 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => handleInputChange('experience', 'description', e.target.value)}
                      placeholder="Describe your role and key responsibilities..."
                      rows={3}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
                <Button onClick={addEducation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Education #{index + 1}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem('education', edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => handleInputChange('education', 'field', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <Label>GPA</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => handleInputChange('education', 'gpa', e.target.value)}
                        placeholder="3.8"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Technical Skills</Label>
                <Input
                  placeholder="React, Node.js, Python, AWS..."
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    handleInputChange('skills', 'technical', skills)
                  }}
                />
              </div>
              <div>
                <Label>Soft Skills</Label>
                <Input
                  placeholder="Leadership, Communication, Problem Solving..."
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    handleInputChange('skills', 'soft', skills)
                  }}
                />
              </div>
              <div>
                <Label>Languages</Label>
                <Input
                  placeholder="English (Native), Spanish (Fluent), French (Basic)..."
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    handleInputChange('skills', 'languages', skills)
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Projects
                </CardTitle>
                <Button onClick={addProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Project #{index + 1}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem('projects', project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => handleInputChange('projects', 'name', e.target.value)}
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div>
                      <Label>Technologies</Label>
                      <Input
                        value={project.technologies.join(', ')}
                        onChange={(e) => {
                          const techs = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                          handleInputChange('projects', 'technologies', techs)
                        }}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <Label>Project Link</Label>
                      <Input
                        value={project.link}
                        onChange={(e) => handleInputChange('projects', 'link', e.target.value)}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleInputChange('projects', 'description', e.target.value)}
                      placeholder="Describe your project and its impact..."
                      rows={3}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resume Parser Tab */}
        <TabsContent value="parser" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-2 text-green-600" />
                Resume Parser & ATS Checker
              </CardTitle>
              <CardDescription>
                Upload your existing resume to check ATS compatibility and get optimization suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                <p className="text-gray-600 mb-4">Drag and drop your PDF resume here or click to browse</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">ATS Score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8.5</div>
                  <div className="text-sm text-gray-600">Readability</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">Keywords</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Optimization Suggestions</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Good use of action verbs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Proper formatting and structure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Consider adding more quantifiable achievements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Include more relevant keywords for your target role</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={parseResume}>
                  <Zap className="h-4 w-4 mr-2" />
                  Parse Resume
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-6 w-6 mr-2 text-purple-600" />
                Professional Resume Templates
              </CardTitle>
              <CardDescription>
                Choose from our collection of ATS-friendly, professionally designed templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.05 }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className={`w-full h-32 bg-gradient-to-br ${template.color} rounded-lg mb-4 flex items-center justify-center`}>
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={selectedTemplate === template.id ? "default" : "outline"}>
                        {selectedTemplate === template.id ? "Selected" : "Select"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Eye className="h-6 w-6 mr-2 text-indigo-600" />
                  Resume Preview
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-8 bg-white shadow-lg">
                <div className="max-w-4xl mx-auto">
                  {/* Resume Preview Content */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {resumeData.personalInfo.name || 'Your Name'}
                    </h1>
                    <div className="flex justify-center space-x-4 text-gray-600">
                      <span>{resumeData.personalInfo.email || 'your.email@example.com'}</span>
                      <span>•</span>
                      <span>{resumeData.personalInfo.phone || '+1 (555) 123-4567'}</span>
                      <span>•</span>
                      <span>{resumeData.personalInfo.location || 'Your City, State'}</span>
                    </div>
                  </div>

                  {resumeData.summary && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
                      <p className="text-gray-700">{resumeData.summary}</p>
                    </div>
                  )}

                  {resumeData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-4">Experience</h2>
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{exp.position || 'Position Title'}</h3>
                              <p className="text-gray-600">{exp.company || 'Company Name'}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.education.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-4">Education</h2>
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{edu.degree || 'Degree'}</h3>
                              <p className="text-gray-600">{edu.institution || 'Institution'}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.skills.technical.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.technical.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
