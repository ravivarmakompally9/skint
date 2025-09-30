'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Briefcase, TrendingUp, Shield, Zap, Globe, Star, CheckCircle, Sparkles, Rocket, Target, Award, BookOpen, Brain, Heart, Mail, Phone, MapPin, Linkedin, Twitter, Github, Menu, X, UserCheck, FileText, BarChart3, MessageSquare, Eye, Settings, Search, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const features = [
  {
    icon: Users,
    title: 'Multi-Role Dashboard',
    description: 'Tailored interfaces for Students, Faculty, Placement Cell, and Recruiters',
    gradient: 'from-pink-400 to-purple-500',
    delay: 0.1
  },
  {
    icon: Briefcase,
    title: 'AI-Powered Matching',
    description: 'Intelligent recommendations for internships, jobs, and candidates',
    gradient: 'from-blue-400 to-cyan-500',
    delay: 0.2
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Track progress, placements, and recruiter engagement with detailed reports',
    gradient: 'from-green-400 to-emerald-500',
    delay: 0.3
  },
  {
    icon: Shield,
    title: 'Robust Security',
    description: 'Role-based access, MFA, email verification, and audit logs for data integrity',
    gradient: 'from-purple-400 to-pink-500',
    delay: 0.4
  },
  {
    icon: Zap,
    title: 'Real-time Notifications',
    description: 'Stay updated with instant alerts on applications, approvals, and new opportunities',
    gradient: 'from-yellow-400 to-orange-500',
    delay: 0.5
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with companies and opportunities worldwide through our extensive network',
    gradient: 'from-cyan-400 to-blue-500',
    delay: 0.6
  }
]

const stats = [
  { number: '10K+', label: 'Active Students', icon: Users },
  { number: '500+', label: 'Partner Companies', icon: Briefcase },
  { number: '95%', label: 'Placement Rate', icon: TrendingUp },
  { number: '50+', label: 'Universities', icon: Globe },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    university: 'MIT',
    content: 'Skint transformed my job search experience. The AI matching helped me find the perfect internship at Google!',
    avatar: '/images/avatar-1.svg',
    rating: 5
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Placement Officer',
    university: 'Stanford University',
    content: 'The analytics dashboard gives us incredible insights into student placement trends and success rates.',
    avatar: '/images/avatar-2.svg',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'HR Manager',
    company: 'Microsoft',
    content: 'Finding qualified candidates has never been easier. The platform streamlines our entire recruitment process.',
    avatar: '/images/avatar-3.svg',
    rating: 5
  }
]

export default function HomePage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showRecruiterModal, setShowRecruiterModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showFacultyModal, setShowFacultyModal] = useState(false)
  const [showPlacementModal, setShowPlacementModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -50, 50, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 90, 180, 270, 360],
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-green-400/25 to-emerald-400/25 rounded-full blur-2xl"
          animate={{
            scale: [0.8, 1.2, 0.8],
            rotate: [0, -180, -360],
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
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
            <Link href="#features" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              Testimonials
            </Link>
            <Link href="#dashboards" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
              Dashboards
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-navy-700 hover:text-navy-900 hover:bg-navy-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
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
              <Link href="#features" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                Testimonials
              </Link>
              <Link href="#dashboards" className="text-navy-700 hover:text-navy-900 font-medium transition-colors">
                Dashboards
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-navy-700 hover:text-navy-900 hover:bg-navy-50 w-full justify-start transition-all duration-300 hover:scale-105">
                  Sign In
                </Button>
              </Link>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white w-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Animated Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isScrolled ? 0 : -100, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut" 
        }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-200/50 shadow-lg ${
          isScrolled ? 'block' : 'hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isScrolled ? 1 : 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skint
              </span>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isScrolled ? 1 : 0, 
                y: isScrolled ? 0 : -20 
              }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a 
                href="#features" 
                className="text-purple-700 hover:text-pink-600 transition-colors duration-300 font-medium"
              >
                Features
              </a>
              <a 
                href="#dashboards" 
                className="text-purple-700 hover:text-pink-600 transition-colors duration-300 font-medium"
              >
                Dashboards
              </a>
              <a 
                href="#how-it-works" 
                className="text-purple-700 hover:text-pink-600 transition-colors duration-300 font-medium"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className="text-purple-700 hover:text-pink-600 transition-colors duration-300 font-medium"
              >
                Testimonials
              </a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isScrolled ? 1 : 0, 
                x: isScrolled ? 0 : 20 
              }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex items-center space-x-4"
            >
              <Button
                variant="ghost"
                className="text-purple-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300"
                onClick={() => router.push('/auth/login')}
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => router.push('/auth/register')}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-navy-100 to-blue-100 text-navy-800 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                🚀 Next-Gen Placement Platform
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-800 bg-clip-text text-transparent"
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
              className="text-xl text-navy-600 mb-8 max-w-2xl leading-relaxed"
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
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/get-started">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl btn-hover">
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
                  <Button size="lg" variant="outline" className="text-navy-600 border-navy-600 hover:bg-navy-50 text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl btn-hover">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Platform
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/images/hero-illustration.svg"
                alt="Smart Placement Management Platform"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

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
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-navy-900 mb-2">{stat.number}</div>
                <div className="text-sm text-navy-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl my-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-10 left-1/3 w-20 h-20 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-lg"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-800 rounded-full text-sm font-medium mb-6 shadow-lg border border-white/50">
              <Brain className="w-4 h-4 mr-2 inline animate-pulse" />
              Powerful Features
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            Everything You Need
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-purple-700 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive tools and features designed to streamline the entire placement process
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: feature.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -15,
                rotateY: 5
              }}
              className="group"
            >
              <div className="bg-gradient-to-br from-white/80 via-pink-50/80 to-purple-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-pink-200/50 h-full colorful-card relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                {/* Floating particles */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                  className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"
                />
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.3 
                  }}
                  className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full"
                />

                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-purple-900 mb-4 group-hover:text-pink-700 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 mt-4 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboards" className="relative z-10 container mx-auto px-4 py-20 bg-gradient-to-r from-navy-50 to-blue-50 rounded-3xl my-12 relative overflow-hidden">
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
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-navy-100 to-blue-100 text-navy-800 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2 inline" />
              See It In Action
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 text-navy-900">Experience the Power</h2>
          <p className="text-xl text-navy-600">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Student Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Student dashboard clicked');
                  setShowStudentModal(true);
                }}
              >
                <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl overflow-hidden border border-transparent hover:border-gradient-to-r hover:from-purple-200 hover:to-pink-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105 card-hover colorful-card">
                  <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 text-white shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Student Dashboard</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-purple-50">
                      {/* Student Dashboard Content */}
                      <div className="p-4 h-full flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm">Student Dashboard</h4>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">AI</span>
                          </div>
                        </div>
                        
                        {/* Navigation */}
                        <div className="flex gap-2 mb-3">
                          <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">Overview</span>
                          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Applications</span>
                          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Interviews</span>
                        </div>
                        
                        {/* Content Grid */}
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {/* Smart Resume Builder */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-blue-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Resume Builder</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
                              <div className="bg-green-500 h-1 rounded-full" style={{width: '60%'}}></div>
                            </div>
                            <span className="text-xs text-gray-600">60% Complete</span>
                          </div>
                          
                          {/* Career Guidance */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Career Path</span>
                            </div>
                            <div className="flex items-center">
                              <span className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-bold mr-1">5</span>
                              <span className="text-xs text-gray-600">Job Matches</span>
                            </div>
                          </div>
                          
                          {/* Application Tracking */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-purple-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Applications</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="bg-green-500 text-white px-1 py-0.5 rounded text-xs font-bold">12</span>
                              <span className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-bold">3</span>
                            </div>
                          </div>
                          
                          {/* Interview Prep */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-red-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Interview</span>
                            </div>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">Practice</button>
                          </div>
                        </div>
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
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Faculty dashboard clicked');
                  setShowFacultyModal(true);
                }}
              >
                <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl overflow-hidden border border-transparent hover:border-gradient-to-r hover:from-purple-200 hover:to-pink-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105 card-hover colorful-card">
                  <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Faculty Dashboard</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-green-50 to-emerald-50">
                      {/* Faculty Dashboard Content */}
                      <div className="p-4 h-full flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm">Faculty Dashboard</h4>
                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">📊</span>
                          </div>
                        </div>
                        
                        {/* Navigation */}
                        <div className="flex gap-2 mb-3">
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">Analytics</span>
                          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Students</span>
                          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Reports</span>
                        </div>
                        
                        {/* Content Grid */}
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {/* Student Progress */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Progress</span>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">John Doe - Google</div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          
                          {/* Placement Analytics */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-blue-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Analytics</span>
                            </div>
                            <div className="flex items-center">
                              <span className="bg-green-500 text-white px-1 py-0.5 rounded text-xs font-bold mr-1">85%</span>
                              <span className="text-xs text-gray-600">Success Rate</span>
                            </div>
                          </div>
                          
                          {/* Company Management */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-purple-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Companies</span>
                            </div>
                            <div className="flex items-center">
                              <span className="bg-blue-500 text-white px-1 py-0.5 rounded text-xs font-bold mr-1">12</span>
                              <span className="text-xs text-gray-600">Partners</span>
                            </div>
                          </div>
                          
                          {/* Auto Reports */}
                          <div className="bg-white p-2 rounded border">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-red-500 rounded mr-1"></div>
                              <span className="text-xs font-bold text-gray-800">Reports</span>
                            </div>
                            <button className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">Generate</button>
                          </div>
                        </div>
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
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Placement dashboard clicked');
                  setShowPlacementModal(true);
                }}
              >
                <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl overflow-hidden border border-transparent hover:border-gradient-to-r hover:from-purple-200 hover:to-pink-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105 card-hover colorful-card">
                  <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 p-6 text-white shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Placement Dashboard</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <Image
                        src="/images/placement-dashboard.svg"
                        alt="Placement Dashboard"
                        width={500}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-6 left-6 right-6">
                          <h4 className="text-white font-bold text-xl mb-2">Placement Dashboard</h4>
                          <p className="text-white/90 text-base mb-3">Comprehensive placement management and analytics</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-purple-500/80 text-white px-2 py-1 rounded text-xs font-bold">Full Overview</span>
                            <span className="bg-green-500/80 text-white px-2 py-1 rounded text-xs font-bold">Partnerships</span>
                            <span className="bg-blue-500/80 text-white px-2 py-1 rounded text-xs font-bold">Success Track</span>
                            <span className="bg-red-500/80 text-white px-2 py-1 rounded text-xs font-bold">Automation</span>
                          </div>
                        </div>
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
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  console.log('Recruiter dashboard clicked');
                  setShowRecruiterModal(true);
                }}
              >
                <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl overflow-hidden border border-transparent hover:border-gradient-to-r hover:from-purple-200 hover:to-pink-200 hover:shadow-3xl transition-all duration-500 group-hover:scale-105 card-hover colorful-card">
                  <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-6 text-white shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Recruiter Dashboard</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <Image
                        src="/images/recruiter-dashboard.svg"
                        alt="Recruiter Dashboard"
                        width={500}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-6 left-6 right-6">
                          <h4 className="text-white font-bold text-xl mb-2">Recruiter Dashboard</h4>
                          <p className="text-white/90 text-base mb-3">Advanced candidate search and job posting</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-orange-500/80 text-white px-2 py-1 rounded text-xs font-bold">Advanced Search</span>
                            <span className="bg-purple-500/80 text-white px-2 py-1 rounded text-xs font-bold">AI Matching</span>
                            <span className="bg-blue-500/80 text-white px-2 py-1 rounded text-xs font-bold">Smart Schedule</span>
                            <span className="bg-yellow-500/80 text-white px-2 py-1 rounded text-xs font-bold">Brand Show</span>
                          </div>
                        </div>
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
                    className="w-3 h-3 bg-gradient-to-r from-navy-500 to-blue-500 rounded-full"
                  />
                ))}
              </div>
              <p className="text-sm text-navy-600 mt-2">Click any dashboard to explore! All dashboards are fully functional.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 container mx-auto px-4 py-20">
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
          <h2 className="text-4xl font-bold mb-4 text-navy-900">Simple Steps to Success</h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Get started with Skint in just a few simple steps. Our intuitive platform makes placement management effortless for everyone.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {[
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
          ].map((step, index) => (
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
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-navy-100 card-hover"
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

      {/* Enhanced Features Section */}
      <section id="enhanced-features" className="relative z-10 container mx-auto px-4 py-20 bg-gradient-to-r from-navy-50 to-blue-50 rounded-3xl my-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-navy-900">Role-Specific Features</h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Tailored features designed for each stakeholder in the placement ecosystem
          </p>
        </motion.div>

        <div className="space-y-20">
          {[
            {
              category: 'Student Features',
              icon: Users,
              color: 'blue',
              image: '/images/student-features.svg',
              features: [
                {
                  title: 'Smart Resume Builder',
                  description: 'AI-powered resume optimization with industry-specific templates',
                  icon: FileText,
                  highlight: 'AI-Powered'
                },
                {
                  title: 'Career Path Guidance',
                  description: 'Personalized career recommendations based on skills and interests',
                  icon: Target,
                  highlight: 'Personalized'
                },
                {
                  title: 'Interview Preparation',
                  description: 'Mock interviews and preparation tools with AI feedback',
                  icon: MessageSquare,
                  highlight: 'AI Feedback'
                },
                {
                  title: 'Application Tracking',
                  description: 'Real-time status updates for all applications',
                  icon: Eye,
                  highlight: 'Real-time'
                }
              ]
            },
            {
              category: 'Faculty Features',
              icon: BookOpen,
              color: 'green',
              image: '/images/faculty-features.svg',
              features: [
                {
                  title: 'Student Progress Monitoring',
                  description: 'Track individual student placement progress and performance',
                  icon: TrendingUp,
                  highlight: 'Real-time Tracking'
                },
                {
                  title: 'Placement Analytics',
                  description: 'Comprehensive analytics on placement trends and success rates',
                  icon: BarChart3,
                  highlight: 'Advanced Analytics'
                },
                {
                  title: 'Company Management',
                  description: 'Manage relationships with partner companies and recruiters',
                  icon: Briefcase,
                  highlight: 'Relationship Management'
                },
                {
                  title: 'Automated Reporting',
                  description: 'Generate detailed reports on placement activities and outcomes',
                  icon: FileText,
                  highlight: 'Automated'
                }
              ]
            },
            {
              category: 'Placement Officer Features',
              icon: Target,
              color: 'purple',
              image: '/images/placement-features.svg',
              features: [
                {
                  title: 'Comprehensive Overview',
                  description: 'Complete visibility into all placement activities and metrics',
                  icon: Globe,
                  highlight: 'Complete Visibility'
                },
                {
                  title: 'Company Partnerships',
                  description: 'Manage and track relationships with recruiting companies',
                  icon: Users,
                  highlight: 'Partnership Management'
                },
                {
                  title: 'Success Rate Tracking',
                  description: 'Monitor and analyze placement success rates and trends',
                  icon: TrendingUp,
                  highlight: 'Success Analytics'
                },
                {
                  title: 'Workflow Automation',
                  description: 'Automate routine tasks and streamline placement processes',
                  icon: Settings,
                  highlight: 'Automation'
                }
              ]
            },
            {
              category: 'Recruiter Features',
              icon: Briefcase,
              color: 'orange',
              image: '/images/recruiter-features.svg',
              features: [
                {
                  title: 'Advanced Candidate Search',
                  description: 'Powerful search and filtering tools to find the right candidates',
                  icon: Search,
                  highlight: 'Advanced Search'
                },
                {
                  title: 'AI Candidate Matching',
                  description: 'Intelligent matching system for optimal candidate-role fit',
                  icon: Brain,
                  highlight: 'AI Matching'
                },
                {
                  title: 'Interview Scheduling',
                  description: 'Streamlined interview scheduling and management tools',
                  icon: Calendar,
                  highlight: 'Smart Scheduling'
                },
                {
                  title: 'Company Branding',
                  description: 'Showcase your company culture and opportunities effectively',
                  icon: Star,
                  highlight: 'Brand Showcase'
                }
              ]
            }
          ].map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-transparent hover:border-purple-200 colorful-card"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Header and Image */}
                <div className="space-y-6">
                  <div className="flex items-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-2xl flex items-center justify-center mr-4`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-navy-900">{category.category}</h3>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Image
                      src={category.image}
                      alt={`${category.category} Features`}
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.2 + 0.8 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"
                    />
                  </motion.div>
                </div>

                {/* Right side - Features */}
                <div className="grid md:grid-cols-2 gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.2 + featureIndex * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-purple-200 h-full feature-card colorful-card">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg pulse-glow">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: categoryIndex * 0.2 + featureIndex * 0.1 + 0.5 }}
                            className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg colorful-btn"
                          >
                            {feature.highlight}
                          </motion.span>
                        </div>
                        <h4 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h4>
                        <p className="text-navy-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 container mx-auto px-4 py-20">
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
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-navy-100 to-blue-100 text-navy-800 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2 inline" />
              What Our Users Say
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 text-navy-900">Trusted by Thousands</h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            See how Skint is transforming career journeys across universities and companies worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-purple-200 h-full card-hover colorful-card">
                <div className="flex items-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="relative"
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-navy-900">{testimonial.name}</h4>
                    <p className="text-sm text-navy-600">{testimonial.role}</p>
                    <p className="text-xs text-navy-500">{testimonial.university || testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-navy-600 italic">"{testimonial.content}"</p>
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
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Career Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students, faculty, and recruiters who are already using Skint to streamline their placement process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/get-started">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-white text-navy-600 hover:bg-gray-100 px-8 py-4 text-lg">
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
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
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
                <Linkedin className="w-5 h-5 text-navy-300 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-navy-300 hover:text-white cursor-pointer" />
                <Github className="w-5 h-5 text-navy-300 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-navy-300">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#dashboards" className="hover:text-white transition-colors">Dashboards</Link></li>
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

      {/* Student Dashboard Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowStudentModal(false)}
          ></div>
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Student Dashboard</h2>
                    <p className="text-white/90">AI-powered career guidance and application tracking</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Smart Resume Builder */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Smart Resume Builder</h3>
                  </div>
                  <p className="text-gray-600 mb-4">AI-powered resume optimization with industry-specific templates</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Progress: 60% Complete
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Industry Templates Available
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      AI Optimization Active
                    </div>
                  </div>
                </div>

                {/* Career Path Guidance */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Career Path Guidance</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Personalized career recommendations based on skills and interests</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      5 Job Matches Found
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Skills Assessment Complete
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Career Path Mapped
                    </div>
                  </div>
                </div>

                {/* Application Tracking */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Application Tracking</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Real-time status updates for all applications</p>
                  <div className="flex gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">12 Active</span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">3 Pending</span>
                  </div>
                </div>

                {/* Interview Preparation */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Interview Preparation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Mock interviews and preparation tools with AI feedback</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Faculty Dashboard Modal */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFacultyModal(false)}
          ></div>
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Faculty Dashboard</h2>
                    <p className="text-white/90">Student progress monitoring and analytics</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFacultyModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Student Progress Monitoring */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Student Progress</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Track individual student placement progress and performance</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      John Doe - Google (Applied: 2 days ago)
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Real-time Progress Tracking
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Performance Analytics
                    </div>
                  </div>
                </div>

                {/* Placement Analytics */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Placement Analytics</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Comprehensive analytics on placement trends and success rates</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Success Rate: 85%
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Trend Analysis Available
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Detailed Reports
                    </div>
                  </div>
                </div>

                {/* Company Management */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Company Management</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Manage relationships with partner companies and recruiters</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      12 Active Partners
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Relationship Tracking
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Partnership Analytics
                    </div>
                  </div>
                </div>

                {/* Automated Reporting */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Auto Reports</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Generate detailed reports on placement activities and outcomes</p>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Placement Dashboard Modal */}
      {showPlacementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPlacementModal(false)}
          ></div>
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Placement Dashboard</h2>
                    <p className="text-white/90">Comprehensive placement management and analytics</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPlacementModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Comprehensive Overview */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Complete Overview</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Complete visibility into all placement activities and metrics</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Total Students: 150
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Active Applications: 89
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Success Rate: 78%
                    </div>
                  </div>
                </div>

                {/* Company Partnerships */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Partnerships</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Manage and track relationships with recruiting companies</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Google: 15 students
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Microsoft: 12 students
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Amazon: 8 students
                    </div>
                  </div>
                </div>

                {/* Success Rate Tracking */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Success Analytics</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Monitor and analyze placement success rates and trends</p>
                  <div className="flex gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">78% Success</span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">+12%</span>
                  </div>
                </div>

                {/* Workflow Automation */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Automation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Automate routine tasks and streamline placement processes</p>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors">
                    Auto Tasks
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Recruiter Dashboard Modal */}
      {showRecruiterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowRecruiterModal(false)}
        ></div>
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Recruiter Dashboard</h2>
                  <p className="text-white/90">Advanced candidate search and job posting</p>
                </div>
              </div>
              <button
                onClick={() => setShowRecruiterModal(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>
            </div>
          </div>
          
          {/* Modal Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Advanced Search */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Advanced Search</h3>
                </div>
                <p className="text-gray-600 mb-4">Powerful filtering tools to find the right candidates</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Skills: React, Node.js
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Experience: 2+ years
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Location: Remote
                  </div>
                </div>
              </div>

              {/* AI Matching */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">AI Matching</h3>
                </div>
                <p className="text-gray-600 mb-4">Intelligent matching system for optimal candidate-role fit</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Match Score: 95%
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Best Fit: Sarah Chen
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Skills Match: 98%
                  </div>
                </div>
              </div>

              {/* Smart Scheduling */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Smart Scheduling</h3>
                </div>
                <p className="text-gray-600 mb-4">Streamlined interview scheduling and management tools</p>
                <div className="flex gap-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">3 Scheduled</span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">2 Pending</span>
                </div>
              </div>

              {/* Brand Showcase */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Brand Showcase</h3>
                </div>
                <p className="text-gray-600 mb-4">Showcase your company culture and opportunities effectively</p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors">
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </div>
  )
}
