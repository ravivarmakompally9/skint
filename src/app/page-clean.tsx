'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Briefcase, TrendingUp, Shield, Zap, Globe, Star, CheckCircle, Sparkles, Rocket, Target, Award, BookOpen, Brain, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const features = [
  {
    icon: Users,
    title: 'Multi-Role Dashboard',
    description: 'Tailored interfaces for Students, Faculty, Placement Cell, and Recruiters',
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0.1
  },
  {
    icon: Briefcase,
    title: 'AI-Powered Matching',
    description: 'Intelligent recommendations for internships, jobs, and candidates',
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Track progress, placements, and recruiter engagement with detailed reports',
    gradient: 'from-green-500 to-emerald-500',
    delay: 0.3
  },
  {
    icon: Shield,
    title: 'Robust Security',
    description: 'Role-based access, MFA, email verification, and audit logs for data integrity',
    gradient: 'from-orange-500 to-red-500',
    delay: 0.4
  },
  {
    icon: Zap,
    title: 'Real-time Notifications',
    description: 'Stay updated with instant alerts on applications, approvals, and new opportunities',
    gradient: 'from-indigo-500 to-blue-500',
    delay: 0.5
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with companies and opportunities worldwide through our extensive network',
    gradient: 'from-teal-500 to-cyan-500',
    delay: 0.6
  }
]

const stats = [
  { number: '10K+', label: 'Active Students', icon: Users },
  { number: '500+', label: 'Partner Companies', icon: Briefcase },
  { number: '95%', label: 'Placement Rate', icon: TrendingUp },
  { number: '50+', label: 'Universities', icon: Globe },
]

export default function HomePage() {
  const router = useRouter()
  const [autoNavigate, setAutoNavigate] = useState(false)
  const [countdown, setCountdown] = useState(10)

  // Auto-navigation to dashboards after 10 seconds
  useEffect(() => {
    console.log('Setting up auto-navigation timer...')
    const timer = setTimeout(() => {
      console.log('Auto-navigation triggered!')
      setAutoNavigate(true)
    }, 10000)

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        console.log('Countdown:', prev)
        if (prev <= 1) {
          clearInterval(countdownTimer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      console.log('Cleaning up timers...')
      clearTimeout(timer)
      clearInterval(countdownTimer)
    }
  }, [])

  // Auto-navigate to dashboard hub after countdown
  useEffect(() => {
    if (autoNavigate) {
      console.log('Navigating to dashboard hub...')
      window.location.href = '/dashboard-hub'
    }
  }, [autoNavigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skint
              </span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                Sign In
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              🚀 Next-Gen Placement Platform
            </div>
          </motion.div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block"
          >
            Smart Placement
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block"
            whileHover={{ scale: 1.05 }}
          >
            Management
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Revolutionize your career journey with our AI-powered platform. Connect students, faculty, placement cells, and recruiters in one seamless ecosystem.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link href="/get-started">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl">
                <Rocket className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <Link href="/auth/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Platform
              </Button>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-lg px-8 py-4 transition-all duration-300"
              onClick={() => {
                console.log('Back to home clicked');
                try {
                  window.location.href = '/';
                } catch (error) {
                  console.error('Navigation error:', error);
                  window.location.replace('/');
                }
              }}
            >
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
              Back to Home
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2 inline" />
              See It In Action
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Experience the Power</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our intuitive dashboard interfaces designed for each stakeholder
          </p>
        </motion.div>

        {/* All Stakeholder Dashboards in One Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Student Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Student dashboard clicked');
                  window.location.href = '/student-dashboard.html';
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">S</span>
                      </div>
                      <h3 className="text-lg font-semibold">Student</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">🎓</span>
                        </div>
                        <p className="text-blue-600 font-semibold text-sm">Student Dashboard</p>
                        <p className="text-xs text-gray-500 mt-1">AI • Tracking • Resume</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Faculty Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Faculty dashboard clicked');
                  window.location.href = '/faculty-dashboard.html';
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">F</span>
                      </div>
                      <h3 className="text-lg font-semibold">Faculty</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-dashed border-green-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">👨‍🏫</span>
                        </div>
                        <p className="text-green-600 font-semibold text-sm">Faculty Dashboard</p>
                        <p className="text-xs text-gray-500 mt-1">Management • Analytics • Approval</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Placement Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Placement dashboard clicked');
                  window.location.href = '/placement-dashboard.html';
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">P</span>
                      </div>
                      <h3 className="text-lg font-semibold">Placement</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">🏢</span>
                        </div>
                        <p className="text-purple-600 font-semibold text-sm">Placement Cell</p>
                        <p className="text-xs text-gray-500 mt-1">Overview • Management • Reports</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recruiter Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Recruiter dashboard clicked');
                  window.location.href = '/recruiter-dashboard.html';
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">R</span>
                      </div>
                      <h3 className="text-lg font-semibold">Recruiter</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-dashed border-orange-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">💼</span>
                        </div>
                        <p className="text-orange-600 font-semibold text-sm">Recruiter Dashboard</p>
                        <p className="text-xs text-gray-500 mt-1">Posting • Search • Scheduling</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Animated Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-8 text-center"
            >
              <div className="flex justify-center space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                    className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Click any dashboard to explore! All dashboards are fully functional.</p>
              
              {/* Auto-navigation countdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
              >
                <p className="text-sm text-blue-700 font-medium">
                  🚀 Auto-navigating to dashboards in {countdown} seconds...
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: "100%" }}
                    animate={{ width: `${(10 - countdown) * 10}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
