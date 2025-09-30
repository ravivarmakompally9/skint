'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Briefcase, TrendingUp, Shield, Zap, Globe, Star, CheckCircle, Sparkles, Rocket, Target, Award, BookOpen, Brain, Heart, Mail, Phone, MapPin, Linkedin, Twitter, Github, Menu, X, UserCheck, FileText, Calendar, BarChart3, MessageSquare, Settings, Bell, Search, Filter, Download, Upload, Eye, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const steps = [
  {
    id: 1,
    title: 'Sign Up & Verification',
    description: 'Create your account and verify your identity through our secure verification process',
    icon: UserCheck,
    color: 'from-blue-500 to-blue-600',
    details: [
      'Choose your role (Student, Faculty, Placement Officer, or Recruiter)',
      'Complete profile setup with necessary information',
      'Verify email and identity for security',
      'Get access to role-specific dashboard'
    ]
  },
  {
    id: 2,
    title: 'Profile Creation',
    description: 'Build your comprehensive profile with skills, experience, and preferences',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    details: [
      'Upload resume and portfolio documents',
      'Add skills, certifications, and achievements',
      'Set career preferences and goals',
      'Configure notification preferences'
    ]
  },
  {
    id: 3,
    title: 'AI-Powered Matching',
    description: 'Our intelligent system matches you with relevant opportunities or candidates',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    details: [
      'Advanced AI algorithms analyze profiles',
      'Smart matching based on skills and preferences',
      'Real-time opportunity recommendations',
      'Personalized candidate suggestions for recruiters'
    ]
  },
  {
    id: 4,
    title: 'Application & Management',
    description: 'Apply to opportunities or manage applications through our streamlined process',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    details: [
      'One-click application to opportunities',
      'Track application status in real-time',
      'Schedule interviews and meetings',
      'Manage communication with all parties'
    ]
  },
  {
    id: 5,
    title: 'Analytics & Insights',
    description: 'Get detailed insights into your progress and performance metrics',
    icon: BarChart3,
    color: 'from-red-500 to-red-600',
    details: [
      'Comprehensive performance analytics',
      'Placement success tracking',
      'Recruiter engagement metrics',
      'Detailed reporting and insights'
    ]
  }
]

const features = [
  {
    icon: Users,
    title: 'Multi-Role Support',
    description: 'Tailored experiences for Students, Faculty, Placement Officers, and Recruiters',
    gradient: 'from-navy-900 to-blue-600'
  },
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Intelligent algorithms match the right candidates with the right opportunities',
    gradient: 'from-blue-800 to-blue-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with role-based access control and audit trails',
    gradient: 'from-navy-800 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Real-time Notifications',
    description: 'Instant alerts for applications, approvals, interviews, and updates',
    gradient: 'from-blue-900 to-navy-700'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights into placement trends and success metrics',
    gradient: 'from-navy-700 to-blue-500'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with companies and opportunities worldwide',
    gradient: 'from-blue-600 to-navy-600'
  }
]

const benefits = [
  {
    title: 'For Students',
    icon: Users,
    benefits: [
      'AI-powered job recommendations',
      'Resume optimization suggestions',
      'Interview preparation tools',
      'Career path guidance',
      'Real-time application tracking'
    ]
  },
  {
    title: 'For Faculty',
    icon: BookOpen,
    benefits: [
      'Student progress monitoring',
      'Placement analytics dashboard',
      'Company relationship management',
      'Performance tracking tools',
      'Automated reporting'
    ]
  },
  {
    title: 'For Placement Officers',
    icon: Target,
    benefits: [
      'Comprehensive placement overview',
      'Company partnership management',
      'Student placement tracking',
      'Success rate analytics',
      'Automated workflow management'
    ]
  },
  {
    title: 'For Recruiters',
    icon: Briefcase,
    benefits: [
      'Advanced candidate search',
      'AI-powered candidate matching',
      'Interview scheduling tools',
      'Company branding opportunities',
      'Detailed candidate profiles'
    ]
  }
]

export default function HowItWorksPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-navy-50 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-navy-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-navy-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-navy-600 to-blue-600 bg-clip-text text-transparent">
                Skint
              </span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="/" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              Features
            </Link>
            <Link href="/how-it-works" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              How It Works
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-navy-700 hover:text-navy-900 hover:bg-navy-50 transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-navy-700" /> : <Menu className="w-6 h-6 text-navy-700" />}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                Features
              </Link>
              <Link href="/how-it-works" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                How It Works
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-navy-700 hover:text-navy-900 hover:bg-navy-50 w-full justify-start transition-all duration-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white w-full transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-navy-100 to-blue-100 text-navy-800 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4 mr-2 inline" />
              How It Works
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Simple Steps to Success
          </motion.h1>
          
          <motion.p 
            className="text-xl text-navy-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get started with Skint in just a few simple steps. Our intuitive platform makes placement management effortless for everyone.
          </motion.p>
        </motion.div>

        {/* Steps Section */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 mb-20`}
            >
              {/* Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mr-4`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy-900">{step.title}</h3>
                      <p className="text-navy-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.5 + detailIndex * 0.1 }}
                        className="flex items-center text-navy-600"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-navy-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-navy-100">
                    <div className="text-center">
                      <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <step.icon className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-navy-900 mb-2">Step {step.id}</h4>
                      <p className="text-navy-600">{step.title}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 bg-gradient-to-r from-navy-50 to-blue-50 rounded-3xl my-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-navy-900">Platform Features</h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Discover the powerful features that make Skint the leading placement management platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-navy-100 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{feature.title}</h3>
                <p className="text-navy-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-navy-900">Benefits for Everyone</h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            See how Skint benefits each stakeholder in the placement ecosystem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-navy-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.benefits.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + itemIndex * 0.1 }}
                      className="flex items-center text-navy-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-navy-600 to-blue-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already transforming their placement process with Skint.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/get-started">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-white text-navy-600 hover:bg-gray-100 px-8 py-4 text-lg transition-all duration-300 hover:shadow-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
            <Link href="/auth/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-navy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold">Skint</span>
              </div>
              <p className="text-navy-300 mb-4">
                Revolutionizing career placement with AI-powered matching and comprehensive management tools.
              </p>
              <div className="flex space-x-4">
                <Linkedin className="w-5 h-5 text-navy-300 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-navy-300 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-navy-300 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-navy-300">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/get-started" className="hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-navy-300">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-navy-300">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@skint.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-navy-800 mt-12 pt-8 text-center text-navy-300">
            <p>&copy; 2024 Skint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
