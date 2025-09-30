'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Zap, 
  Clock, 
  Database, 
  Wifi, 
  Cpu,
  HardDrive,
  MemoryStick,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

interface PerformanceMetrics {
  loadTime: number
  memoryUsage: number
  cpuUsage: number
  networkLatency: number
  cacheHitRate: number
  errorRate: number
  uptime: number
  responseTime: number
}

const mockMetrics: PerformanceMetrics = {
  loadTime: 1.2,
  memoryUsage: 65,
  cpuUsage: 23,
  networkLatency: 45,
  cacheHitRate: 87,
  errorRate: 0.1,
  uptime: 99.9,
  responseTime: 120
}

const performanceThresholds = {
  loadTime: { good: 2, warning: 3, critical: 5 },
  memoryUsage: { good: 70, warning: 85, critical: 95 },
  cpuUsage: { good: 50, warning: 75, critical: 90 },
  networkLatency: { good: 100, warning: 200, critical: 500 },
  cacheHitRate: { good: 80, warning: 60, critical: 40 },
  errorRate: { good: 0.5, warning: 2, critical: 5 },
  uptime: { good: 99.5, warning: 99, critical: 95 },
  responseTime: { good: 200, warning: 500, critical: 1000 }
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(mockMetrics)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate real-time metrics
        setMetrics(prev => ({
          ...prev,
          loadTime: Math.max(0.5, prev.loadTime + (Math.random() - 0.5) * 0.5),
          memoryUsage: Math.max(10, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 10)),
          cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 20)),
          networkLatency: Math.max(10, prev.networkLatency + (Math.random() - 0.5) * 20),
          cacheHitRate: Math.max(0, Math.min(100, prev.cacheHitRate + (Math.random() - 0.5) * 5)),
          errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.2),
          uptime: Math.max(90, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1)),
          responseTime: Math.max(50, prev.responseTime + (Math.random() - 0.5) * 50)
        }))
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const getStatusColor = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = performanceThresholds[metric]
    if (value <= thresholds.good) return 'text-green-600'
    if (value <= thresholds.warning) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = performanceThresholds[metric]
    if (value <= thresholds.good) return CheckCircle
    if (value <= thresholds.warning) return AlertTriangle
    return AlertTriangle
  }

  const getStatusBadge = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = performanceThresholds[metric]
    if (value <= thresholds.good) return { variant: 'default' as const, text: 'Good', color: 'bg-green-100 text-green-800' }
    if (value <= thresholds.warning) return { variant: 'secondary' as const, text: 'Warning', color: 'bg-yellow-100 text-yellow-800' }
    return { variant: 'destructive' as const, text: 'Critical', color: 'bg-red-100 text-red-800' }
  }

  const performanceMetrics = [
    {
      name: 'Load Time',
      value: metrics.loadTime,
      unit: 's',
      icon: Clock,
      description: 'Page load time'
    },
    {
      name: 'Memory Usage',
      value: metrics.memoryUsage,
      unit: '%',
      icon: MemoryStick,
      description: 'RAM utilization'
    },
    {
      name: 'CPU Usage',
      value: metrics.cpuUsage,
      unit: '%',
      icon: Cpu,
      description: 'Processor utilization'
    },
    {
      name: 'Network Latency',
      value: metrics.networkLatency,
      unit: 'ms',
      icon: Wifi,
      description: 'Network response time'
    },
    {
      name: 'Cache Hit Rate',
      value: metrics.cacheHitRate,
      unit: '%',
      icon: Database,
      description: 'Cache efficiency'
    },
    {
      name: 'Error Rate',
      value: metrics.errorRate,
      unit: '%',
      icon: AlertTriangle,
      description: 'Application errors'
    },
    {
      name: 'Uptime',
      value: metrics.uptime,
      unit: '%',
      icon: Activity,
      description: 'Service availability'
    },
    {
      name: 'Response Time',
      value: metrics.responseTime,
      unit: 'ms',
      icon: Zap,
      description: 'API response time'
    }
  ]

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Monitor</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time system performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant={isMonitoring ? 'destructive' : 'default'}
            onClick={() => setIsMonitoring(!isMonitoring)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Activity className="h-4 w-4 mr-2" />
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
        </div>
      </motion.div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {performanceMetrics.map((metric, index) => {
          const StatusIcon = getStatusIcon(metric.name.toLowerCase().replace(' ', '') as keyof PerformanceMetrics, metric.value)
          const statusBadge = getStatusBadge(metric.name.toLowerCase().replace(' ', '') as keyof PerformanceMetrics, metric.value)
          
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="glass border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                      <metric.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(metric.name.toLowerCase().replace(' ', '') as keyof PerformanceMetrics, metric.value)}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {metric.name}
                      </h3>
                      <Badge className={statusBadge.color}>
                        {statusBadge.text}
                      </Badge>
                    </div>
                    
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.value.toFixed(metric.unit === '%' ? 1 : 2)}
                      </span>
                      <span className="text-sm text-gray-500">{metric.unit}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      {metric.description}
                    </p>
                    
                    <div className="mt-3">
                      <Progress 
                        value={metric.value} 
                        className="h-2"
                        max={metric.name === 'Uptime' ? 100 : metric.name === 'Cache Hit Rate' ? 100 : 100}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>
              Historical performance data over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Uptime</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1.2s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Load Time</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">-0.3s</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">45ms</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">-12ms</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">0.1%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Error Rate</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">-0.05%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>System Health</span>
            </CardTitle>
            <CardDescription>
              Overall system health and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Excellent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All systems are performing optimally
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Info className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Recommendations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consider enabling caching for better performance
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Monitoring</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Keep an eye on memory usage trends
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
