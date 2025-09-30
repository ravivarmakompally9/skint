'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  Mail,
  Video,
  FileText,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  User
} from 'lucide-react'

const faqCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 'profile',
    name: 'Profile Management',
    icon: User,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 'applications',
    name: 'Applications',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 'interviews',
    name: 'Interviews',
    icon: Video,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/20'
  }
]

const faqItems = [
  {
    id: '1',
    category: 'getting-started',
    question: 'How do I create my profile?',
    answer: 'To create your profile, go to the Profile section in your dashboard and fill in your personal information, skills, and preferences. Make sure to upload your resume and add relevant certifications.',
    helpful: 45,
    tags: ['profile', 'setup', 'beginner']
  },
  {
    id: '2',
    category: 'getting-started',
    question: 'How do I apply for opportunities?',
    answer: 'Browse available opportunities in the Opportunities section, filter by your preferences, and click "Apply Now" on opportunities that match your profile. Make sure your profile is complete before applying.',
    helpful: 38,
    tags: ['application', 'opportunities', 'process']
  },
  {
    id: '3',
    category: 'profile',
    question: 'How do I update my skills?',
    answer: 'Go to your Profile > Skills section and click "Add Skill". You can specify your proficiency level and categorize your skills for better matching.',
    helpful: 42,
    tags: ['skills', 'profile', 'update']
  },
  {
    id: '4',
    category: 'applications',
    question: 'How do I track my applications?',
    answer: 'All your applications are tracked in the Applications section of your dashboard. You can see the status, timeline, and any updates from recruiters.',
    helpful: 35,
    tags: ['applications', 'tracking', 'status']
  },
  {
    id: '5',
    category: 'interviews',
    question: 'How do I schedule interviews?',
    answer: 'Interviews are scheduled by recruiters. You will receive notifications when an interview is scheduled. You can view all your interviews in the Calendar section.',
    helpful: 28,
    tags: ['interviews', 'scheduling', 'calendar']
  },
  {
    id: '6',
    category: 'troubleshooting',
    question: 'I forgot my password. How do I reset it?',
    answer: 'Click "Forgot Password" on the login page and enter your email address. You will receive a password reset link in your email.',
    helpful: 52,
    tags: ['password', 'reset', 'login']
  }
]

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: MessageCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    available: true,
    responseTime: '2-5 minutes'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    icon: Mail,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    available: true,
    responseTime: '2-4 hours'
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with our team',
    icon: Phone,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    available: true,
    responseTime: 'Immediate'
  },
  {
    title: 'Video Call',
    description: 'Schedule a video consultation',
    icon: Video,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    available: false,
    responseTime: '24-48 hours'
  }
]

const quickActions = [
  { title: 'Download User Guide', icon: FileText, action: 'download' },
  { title: 'Watch Tutorial Videos', icon: Video, action: 'tutorials' },
  { title: 'Join Community Forum', icon: MessageCircle, action: 'forum' },
  { title: 'Request Feature', icon: Lightbulb, action: 'feature' }
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Find answers, get support, and learn how to make the most of Skint
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col items-center justify-center space-y-2"
                  >
                    <action.icon className="h-6 w-6" />
                    <span className="text-sm">{action.title}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Support Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Get Support</CardTitle>
            <CardDescription>Choose how you'd like to get help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className={`border-2 ${
                    option.available 
                      ? 'border-gray-200 dark:border-gray-700 hover:border-blue-500' 
                      : 'border-gray-100 dark:border-gray-800 opacity-50'
                  } transition-colors cursor-pointer`}>
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center mx-auto mb-3`}>
                        <option.icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {option.description}
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        {option.available ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-gray-400" />
                          </>
                        )}
                        <span className="text-xs text-gray-500">
                          {option.responseTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Categories
              </Button>
              {faqCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const category = faqCategories.find(cat => cat.id === faq.category)
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {category && (
                                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                                  <category.icon className={`h-4 w-4 ${category.color}`} />
                                </div>
                              )}
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {faq.question}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4" />
                                <span>{faq.helpful} found helpful</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {faq.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <ChevronRight 
                            className={`h-5 w-5 text-gray-400 transition-transform ${
                              expandedFAQ === faq.id ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                        
                        {expandedFAQ === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                          >
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {faq.answer}
                            </p>
                            <div className="flex items-center space-x-4">
                              <Button size="sm" variant="outline">
                                <Star className="h-4 w-4 mr-1" />
                                Helpful
                              </Button>
                              <Button size="sm" variant="outline">
                                Not Helpful
                              </Button>
                              <Button size="sm" variant="outline">
                                Share
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
