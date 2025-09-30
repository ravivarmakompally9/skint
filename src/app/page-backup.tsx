'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, Briefcase, TrendingUp, Shield, Zap, Globe, Star, CheckCircle, Sparkles, Rocket, Target, Award, BookOpen, Brain, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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
    title: 'Seamless Integration',
    description: 'Interconnected dashboards for a unified experience across all stakeholders',
    gradient: 'from-pink-500 to-rose-500',
    delay: 0.6
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    avatar: '/images/avatar-1.svg',
    content: 'Skint transformed my job search journey! The AI recommendations helped me land my dream internship at Google. The resume builder is absolutely incredible!',
    rating: 5,
    company: 'Google'
  },
  {
    name: 'Dr. Anil Kumar',
    role: 'Professor & Mentor',
    avatar: '/images/avatar-2.svg',
    content: 'As a faculty member, monitoring student progress has never been easier. The analytics provide valuable insights that help me guide students better.',
    rating: 5,
    company: 'IIT Delhi'
  },
  {
    name: 'Priya Sharma',
    role: 'Placement Officer',
    avatar: '/images/avatar-3.svg',
    content: 'Managing recruiters and tracking placements is now streamlined. The AI prediction models are incredibly accurate for placement success rates.',
    rating: 5,
    company: 'IIM Bangalore'
  },
]

const stats = [
  { number: '10,000+', label: 'Active Students', icon: Users },
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
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
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
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="container mx-auto px-4 py-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group">
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-lg">S</span>
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Skint
            </motion.span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden md:flex items-center space-x-6"
          >
            <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">Features</Link>
            <Link href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">Testimonials</Link>
            <Link href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">Contact</Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center relative">
          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-20 right-10 w-96 h-64 opacity-20 hidden lg:block"
          >
            <Image
              src="/images/hero-illustration.svg"
              alt="Hero Illustration"
              width={600}
              height={400}
              className="w-full h-full object-contain"
            />
          </motion.div>
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
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                🚀 Next-Gen Placement Platform
              </Badge>
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
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3"
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring" }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20 relative">
          {/* Features Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-10 left-10 w-80 h-40 opacity-10 hidden lg:block"
          >
            <Image
              src="/images/features-illustration.svg"
              alt="Features Illustration"
              width={800}
              height={400}
              className="w-full h-full object-contain"
            />
          </motion.div>
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
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-0">
                <Target className="w-4 h-4 mr-2" />
                Powerful Features
              </Badge>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive tools for career development and placement management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="glass border-0 group hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 10 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-12 relative overflow-hidden">
          {/* Dashboard Preview Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-5 right-5 w-96 h-48 opacity-10 hidden lg:block"
          >
            <Image
              src="/images/dashboard-preview.svg"
              alt="Dashboard Preview"
              width={1000}
              height={600}
              className="w-full h-full object-contain"
            />
          </motion.div>
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
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                <Brain className="w-4 h-4 mr-2" />
                See It In Action
              </Badge>
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

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Student Dashboard",
                description: "AI-powered recommendations, application tracking, and career guidance",
                color: "from-blue-500 to-cyan-500",
                icon: "🎓",
                link: "/student-dashboard.html",
                features: ["Resume Builder", "AI Matching", "Progress Tracking"]
              },
              {
                title: "Faculty Dashboard", 
                description: "Student monitoring, approval workflows, and performance analytics",
                color: "from-purple-500 to-pink-500",
                icon: "👨‍🏫",
                link: "/faculty-dashboard.html",
                features: ["Student Management", "Approval System", "Analytics"]
              },
              {
                title: "Placement Cell",
                description: "Global overview, recruiter management, and placement analytics",
                color: "from-green-500 to-emerald-500",
                icon: "🏢",
                link: "/placement-dashboard.html",
                features: ["Global Overview", "Recruiter Management", "Reports"]
              },
              {
                title: "Recruiter Dashboard",
                description: "Job posting, candidate search, and interview scheduling",
                color: "from-orange-500 to-red-500",
                icon: "💼",
                link: "/recruiter-dashboard.html",
                features: ["Job Posting", "Candidate Search", "Interview Scheduling"]
              }
            ].map((dashboard, index) => (
              <motion.div
                key={dashboard.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group"
              >
                <Link href={dashboard.link}>
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className={`w-16 h-16 bg-gradient-to-r ${dashboard.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        {dashboard.icon}
                      </motion.div>
                      <motion.h3 
                        className="text-lg font-bold mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {dashboard.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 mb-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        {dashboard.description}
                      </motion.p>
                      <div className="space-y-1">
                        {dashboard.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="text-xs text-gray-500 dark:text-gray-400"
                          >
                            • {feature}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link href="/auth/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 py-20">
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
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-0">
                <Heart className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by students, faculty, and recruiters worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="glass border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="pt-6 relative z-10">
                    <motion.div 
                      className="flex items-center mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + i * 0.1 }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-4 italic"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      "{testimonial.content}"
                    </motion.p>
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full overflow-hidden"
                      >
                        <Image
                          src={testimonial.avatar}
                          alt={`${testimonial.name} avatar`}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </motion.div>
                      <div>
                        <motion.p 
                          className="font-semibold"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonial.name}
                        </motion.p>
                        <motion.p 
                          className="text-sm text-gray-500"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonial.role}
                        </motion.p>
                        <motion.p 
                          className="text-xs text-blue-600 font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonial.company}
                        </motion.p>
                      </div>
                    </motion.div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-white/20 text-white border-0">
                  <Award className="w-4 h-4 mr-2" />
                  Ready to Transform Your Career?
                </Badge>
              </motion.div>
              <h2 className="text-4xl font-bold mb-6">Join Thousands of Success Stories</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Start your journey with Skint today and unlock a world of opportunities. 
                Sign up now to get started with our AI-powered platform!
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/auth/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                      <Rocket className="mr-2 h-5 w-5" />
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/auth/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-xl px-10 py-4 transition-all duration-300">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Skint
                </span>
              </Link>
              <p className="text-gray-400">Your ultimate career acceleration platform.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/student-dashboard.html" className="hover:text-white transition-colors">Student Dashboard</Link></li>
                <li><Link href="/faculty-dashboard.html" className="hover:text-white transition-colors">Faculty Dashboard</Link></li>
                <li><Link href="/placement-dashboard.html" className="hover:text-white transition-colors">Placement Dashboard</Link></li>
                <li><Link href="/recruiter-dashboard.html" className="hover:text-white transition-colors">Recruiter Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#team" className="hover:text-white transition-colors">Team</Link></li>
                <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 border-t border-gray-800 pt-8">
            <p>&copy; 2024 Skint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}