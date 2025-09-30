'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Briefcase, TrendingUp, Shield, Zap, Globe, Star, CheckCircle, Sparkles, Rocket, Target, Award, BookOpen, Brain, Heart, Mail, Phone, MapPin, Linkedin, Twitter, Github, Menu, X, UserCheck, FileText, Calendar, BarChart3, MessageSquare, Settings, Bell, Search, Filter, Download, Upload, Eye, Edit, Trash2, Plus, ArrowLeft, Database, Lock, Clock, Smartphone, Monitor, Laptop, Server, Cloud, Wifi, Battery, Cpu, HardDrive, MemoryStick, Network, Router, ShieldCheck, Key, Fingerprint, EyeOff, AlertTriangle, CheckCircle2, XCircle, Info, HelpCircle, QuestionMarkCircle, Lightbulb, Handshake } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const mainFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Advanced machine learning algorithms match the perfect candidates with opportunities',
    features: [
      'Intelligent skill-based matching',
      'Preference learning and adaptation',
      'Real-time opportunity recommendations',
      'Smart candidate ranking system'
    ],
    gradient: 'from-purple-500 to-purple-600',
    color: 'purple'
  },
  {
    icon: Users,
    title: 'Multi-Role Dashboard',
    description: 'Tailored interfaces for every stakeholder in the placement ecosystem',
    features: [
      'Student career tracking dashboard',
      'Faculty management interface',
      'Placement officer analytics',
      'Recruiter candidate search'
    ],
    gradient: 'from-blue-500 to-blue-600',
    color: 'blue'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights and reporting for data-driven decisions',
    features: [
      'Real-time placement metrics',
      'Success rate tracking',
      'Trend analysis and forecasting',
      'Custom report generation'
    ],
    gradient: 'from-green-500 to-green-600',
    color: 'green'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with role-based access control and audit trails',
    features: [
      'Multi-factor authentication',
      'Role-based permissions',
      'Data encryption at rest and transit',
      'Comprehensive audit logging'
    ],
    gradient: 'from-red-500 to-red-600',
    color: 'red'
  },
  {
    icon: Zap,
    title: 'Real-time Notifications',
    description: 'Stay updated with instant alerts and smart notifications',
    features: [
      'Application status updates',
      'Interview scheduling alerts',
      'Placement milestone notifications',
      'Customizable notification preferences'
    ],
    gradient: 'from-yellow-500 to-yellow-600',
    color: 'yellow'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with companies and opportunities worldwide',
    features: [
      'International company partnerships',
      'Global opportunity database',
      'Multi-language support',
      'Cross-border placement tracking'
    ],
    gradient: 'from-indigo-500 to-indigo-600',
    color: 'indigo'
  }
]

export default function FeaturesPage() {
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
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Platform Features
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Powerful Features
          </motion.h1>
          
          <motion.p 
            className="text-xl text-navy-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the comprehensive suite of features that make Skint the leading placement management platform for universities and companies worldwide.
          </motion.p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-navy-100 h-full card-hover">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{feature.title}</h3>
                <p className="text-navy-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + itemIndex * 0.1 }}
                      className="flex items-center text-sm text-navy-600"
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
          <h2 className="text-4xl font-bold mb-4">Experience the Power</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Ready to transform your placement process? Get started with Skint today and see the difference.
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
            <Link href="/how-it-works">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn More
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