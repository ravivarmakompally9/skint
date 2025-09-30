'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle,
  Star,
  ArrowRight,
  RefreshCw,
  Sparkles,
  BarChart3,
  Users,
  Briefcase,
  Award
} from 'lucide-react'

interface AIInsight {
  id: string
  type: 'recommendation' | 'trend' | 'prediction' | 'optimization'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  category: string
  actionable: boolean
  action?: string
}

interface AIRecommendation {
  id: string
  title: string
  description: string
  score: number
  reasons: string[]
  category: 'skill' | 'opportunity' | 'profile' | 'application'
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'recommendation',
    title: 'Skill Gap Identified',
    description: 'Your profile is missing 3 high-demand skills: React, Python, and Machine Learning. Adding these could increase your match rate by 40%.',
    confidence: 85,
    impact: 'high',
    category: 'Skills',
    actionable: true,
    action: 'Add missing skills to your profile'
  },
  {
    id: '2',
    type: 'trend',
    title: 'Market Trend Alert',
    description: 'Data Science opportunities have increased by 25% this month. Your background in statistics makes you a strong candidate.',
    confidence: 92,
    impact: 'medium',
    category: 'Market',
    actionable: true,
    action: 'Apply to more Data Science positions'
  },
  {
    id: '3',
    type: 'prediction',
    title: 'Application Success Prediction',
    description: 'Based on your profile and current market trends, you have a 78% chance of getting an interview for Software Engineer roles.',
    confidence: 78,
    impact: 'high',
    category: 'Success',
    actionable: true,
    action: 'Focus on Software Engineer applications'
  },
  {
    id: '4',
    type: 'optimization',
    title: 'Resume Optimization',
    description: 'Your resume could be improved by adding quantifiable achievements. This could increase ATS score by 15 points.',
    confidence: 88,
    impact: 'medium',
    category: 'Resume',
    actionable: true,
    action: 'Update resume with metrics'
  }
]

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'TechCorp Software Engineer Intern',
    description: 'Perfect match for your JavaScript and React skills',
    score: 92,
    reasons: ['Strong skill match', 'Location preference', 'Salary expectations met'],
    category: 'opportunity'
  },
  {
    id: '2',
    title: 'DataFlow Data Science Intern',
    description: 'Great opportunity to develop your Python and ML skills',
    score: 87,
    reasons: ['Skill development opportunity', 'Remote work available', 'Learning budget provided'],
    category: 'opportunity'
  },
  {
    id: '3',
    title: 'Add Machine Learning Certification',
    description: 'Boost your profile with a recognized ML certification',
    score: 85,
    reasons: ['High demand skill', 'Increases marketability', 'Short-term commitment'],
    category: 'skill'
  }
]

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights)
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(mockRecommendations)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const analyzeProfile = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return Target
      case 'trend': return TrendingUp
      case 'prediction': return Brain
      case 'optimization': return Lightbulb
      default: return Star
    }
  }

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory)

  const categories = ['all', 'Skills', 'Market', 'Success', 'Resume']

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Brain className="h-8 w-8 text-purple-600 mr-3" />
            AI Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalized recommendations powered by artificial intelligence
          </p>
        </div>
        <Button
          onClick={analyzeProfile}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Analyze Profile
            </>
          )}
        </Button>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            size="sm"
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>
              Intelligent analysis of your profile and market trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInsights.map((insight, index) => {
                const TypeIcon = getTypeIcon(insight.type)
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                              <TypeIcon className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {insight.title}
                              </h3>
                              <Badge className={getImpactColor(insight.impact)}>
                                {insight.impact} impact
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {insight.confidence}%
                            </div>
                            <div className="text-xs text-gray-500">Confidence</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {insight.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <Progress value={insight.confidence} className="h-2" />
                          </div>
                          {insight.actionable && (
                            <Button size="sm" variant="outline">
                              <ArrowRight className="h-3 w-3 mr-1" />
                              {insight.action}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>AI Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized opportunities and skill development suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-lg ${
                              recommendation.category === 'opportunity' 
                                ? 'bg-blue-100 dark:bg-blue-900/20' 
                                : 'bg-green-100 dark:bg-green-900/20'
                            }`}>
                              {recommendation.category === 'opportunity' ? (
                                <Briefcase className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Award className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {recommendation.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {recommendation.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">
                                {recommendation.score}% Match
                              </span>
                            </div>
                            <div className="flex-1">
                              <Progress value={recommendation.score} className="h-2" />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            {recommendation.reasons.map((reason, reasonIndex) => (
                              <div key={reasonIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          >
                            {recommendation.category === 'opportunity' ? 'Apply' : 'Learn More'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Analytics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>AI Analytics Summary</span>
            </CardTitle>
            <CardDescription>
              Overview of your profile performance and market position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">85%</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Profile Completeness</p>
                <div className="mt-2">
                  <Progress value={85} className="h-2" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">92%</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Market Match Score</p>
                <div className="mt-2">
                  <Progress value={92} className="h-2" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">78%</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Probability</p>
                <div className="mt-2">
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
