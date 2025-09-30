'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, Briefcase, GraduationCap, Building, CheckCircle, Star, Rocket, Target, Award, BookOpen, Brain, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const roles = [
  {
    title: "Student",
    description: "Build your profile, get AI recommendations, and track your applications",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    features: ["Resume Builder", "AI Matching", "Application Tracker", "Progress Analytics"],
    link: "/student-dashboard.html",
    stats: "10,000+ Active Students"
  },
  {
    title: "Faculty",
    description: "Monitor students, approve requests, and provide mentorship guidance",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    features: ["Student Management", "Approval System", "Performance Analytics", "Feedback Tools"],
    link: "/faculty-dashboard.html",
    stats: "500+ Faculty Members"
  },
  {
    title: "Placement Cell",
    description: "Manage recruiters, track placements, and generate comprehensive reports",
    icon: Building,
    color: "from-green-500 to-emerald-500",
    features: ["Global Overview", "Recruiter Management", "Placement Analytics", "Drive Management"],
    link: "/placement-dashboard.html",
    stats: "50+ Partner Universities"
  },
  {
    title: "Recruiter",
    description: "Post jobs, find candidates, and streamline your hiring process",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    features: ["Job Posting", "Candidate Search", "Interview Scheduling", "Feedback System"],
    link: "/recruiter-dashboard.html",
    stats: "500+ Partner Companies"
  }
]

const benefits = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our advanced algorithms match the right candidates with the right opportunities"
  },
  {
    icon: Target,
    title: "95% Success Rate",
    description: "Proven track record of successful placements and career advancements"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Stay informed with instant notifications and real-time progress tracking"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Trusted by top universities and leading companies worldwide"
  }
]

export default function GetStartedPage() {
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
            className="flex items-center space-x-4"
          >
            <Link href="/">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
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
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-0 shadow-lg">
                <Rocket className="w-4 h-4 mr-2" />
                Choose Your Role
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
              Get Started
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              with Skint
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Select your role to access your personalized dashboard and start your journey with our AI-powered placement platform.
          </motion.p>
        </section>

        {/* Role Selection */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Link href={role.link}>
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardHeader className="text-center relative z-10">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <role.icon className="h-8 w-8" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-2 mb-4">
                        {role.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {role.stats}
                      </div>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-12">
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
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                <Star className="w-4 h-4 mr-2" />
                Why Choose Skint?
              </Badge>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Powerful Benefits</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the advantages of our comprehensive platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4"
                  >
                    <benefit.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-white/20 text-white border-0">
                  <Heart className="w-4 h-4 mr-2" />
                  Ready to Start?
                </Badge>
              </motion.div>
              <h2 className="text-4xl font-bold mb-6">Join the Future of Career Development</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Don't wait! Start your journey today and unlock endless opportunities with our AI-powered platform.
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
                <Link href="/">
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
          <div className="text-center text-gray-400 border-t border-gray-800 pt-8">
            <p>&copy; 2024 Skint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
