'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Briefcase, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Award,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Skint!',
    description: 'Your comprehensive placement management platform',
    icon: Star,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Add your personal information and skills',
    icon: User,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 'preferences',
    title: 'Set Your Preferences',
    description: 'Tell us about your career goals and interests',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 'features',
    title: 'Explore Features',
    description: 'Discover what Skint can do for you',
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Start your placement journey',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  }
]

const roleFeatures = {
  student: [
    { name: 'Apply to Opportunities', icon: Briefcase, description: 'Browse and apply to internships and jobs' },
    { name: 'Track Applications', icon: Target, description: 'Monitor your application status' },
    { name: 'AI Recommendations', icon: TrendingUp, description: 'Get personalized opportunity suggestions' },
    { name: 'Interview Scheduling', icon: Calendar, description: 'Manage your interview calendar' },
    { name: 'Resume Builder', icon: Award, description: 'Create and optimize your resume' }
  ],
  faculty: [
    { name: 'Student Management', icon: Users, description: 'Track your mentees\' progress' },
    { name: 'Application Reviews', icon: Target, description: 'Review and approve applications' },
    { name: 'Progress Reports', icon: TrendingUp, description: 'Generate detailed progress reports' },
    { name: 'Meeting Scheduler', icon: Calendar, description: 'Schedule mentoring sessions' },
    { name: 'Communication', icon: MessageCircle, description: 'Stay connected with students' }
  ],
  placement: [
    { name: 'Opportunity Management', icon: Briefcase, description: 'Post and manage opportunities' },
    { name: 'Company Verification', icon: Shield, description: 'Verify and manage company profiles' },
    { name: 'Analytics Dashboard', icon: TrendingUp, description: 'Track placement statistics' },
    { name: 'Student Tracking', icon: Users, description: 'Monitor student progress' },
    { name: 'Report Generation', icon: Award, description: 'Generate placement reports' }
  ],
  recruiter: [
    { name: 'Candidate Search', icon: Users, description: 'Find and filter candidates' },
    { name: 'Job Posting', icon: Briefcase, description: 'Post and manage job openings' },
    { name: 'Interview Management', icon: Calendar, description: 'Schedule and conduct interviews' },
    { name: 'Application Review', icon: Target, description: 'Review and manage applications' },
    { name: 'Analytics', icon: TrendingUp, description: 'Track recruitment metrics' }
  ]
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userRole, setUserRole] = useState('')
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    skills: [] as string[],
    interests: [] as string[]
  })

  const currentStepData = onboardingSteps[currentStep]
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = () => {
    // Handle onboarding completion
    console.log('Onboarding completed!', { userRole, profileData })
  }

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto"
            >
              <Star className="h-12 w-12 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Skint!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Your comprehensive platform for internship, training & placement management
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Multi-Role Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Students, Faculty, Placement Cell & Recruiters
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">AI-Powered</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Smart recommendations and insights
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Secure & Reliable</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enterprise-grade security
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Your Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Help us personalize your experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </div>
        )

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Set Your Preferences
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your career goals and interests
              </p>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-3 block">What are your primary skills?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'Machine Learning', 'Data Science'].map(skill => (
                  <Button
                    key={skill}
                    variant={profileData.skills.includes(skill) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setProfileData(prev => ({
                        ...prev,
                        skills: prev.skills.includes(skill)
                          ? prev.skills.filter(s => s !== skill)
                          : [...prev.skills, skill]
                      }))
                    }}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-3 block">What are your career interests?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Software Development', 'Data Science', 'Product Management', 'UX/UI Design', 'Marketing', 'Finance', 'Consulting', 'Research'].map(interest => (
                  <Button
                    key={interest}
                    variant={profileData.interests.includes(interest) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setProfileData(prev => ({
                        ...prev,
                        interests: prev.interests.includes(interest)
                          ? prev.interests.filter(i => i !== interest)
                          : [...prev.interests, interest]
                      }))
                    }}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'features':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Explore Features
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover what Skint can do for you
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(roleFeatures[userRole as keyof typeof roleFeatures] || []).map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <feature.icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {feature.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                You're All Set!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Welcome to your personalized Skint experience
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What's Next?
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Complete your profile setup</li>
                  <li>• Browse available opportunities</li>
                  <li>• Connect with mentors and peers</li>
                  <li>• Start your placement journey</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="glass border-0 shadow-2xl">
          {/* Progress Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${currentStepData.bgColor}`}>
                  <currentStepData.icon className={`h-5 w-5 ${currentStepData.color}`} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentStepData.title}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of {onboardingSteps.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.round(progress)}%
                </div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          {/* Navigation */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep 
                        ? 'bg-blue-600' 
                        : index < currentStep 
                          ? 'bg-green-600' 
                          : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              {currentStep === onboardingSteps.length - 1 ? (
                <Button
                  onClick={completeOnboarding}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
