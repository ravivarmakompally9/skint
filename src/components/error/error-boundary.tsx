'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Send, 
  Copy,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log error to monitoring service
    this.logError(error, errorInfo)
  }

  logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      }).catch(console.error)
    } else {
      console.error('Error caught by boundary:', errorData)
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  copyErrorDetails = () => {
    const errorDetails = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString()
    }

    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => {
        // Show success feedback
        const button = document.getElementById('copy-button')
        if (button) {
          button.innerHTML = '<CheckCircle className="h-4 w-4 mr-2" />Copied!'
          setTimeout(() => {
            button.innerHTML = '<Copy className="h-4 w-4 mr-2" />Copy Details'
          }, 2000)
        }
      })
      .catch(console.error)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <Card className="glass border-0 shadow-2xl">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Oops! Something went wrong
                </CardTitle>
                <CardDescription className="text-lg">
                  We encountered an unexpected error. Don't worry, we're on it!
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Details */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <Bug className="h-4 w-4 mr-2 text-red-600" />
                      Error Details
                    </h3>
                    <Badge variant="destructive" className="text-xs">
                      ID: {this.state.errorId}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Message:</span>
                      <p className="text-gray-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 p-2 rounded border">
                        {this.state.error?.message}
                      </p>
                    </div>
                    
                    {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Stack Trace:</span>
                        <pre className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 p-2 rounded border overflow-x-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={this.handleRetry}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Try Again</span>
                  </Button>
                  
                  <Button
                    onClick={this.handleReload}
                    variant="outline"
                    className="flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Reload Page</span>
                  </Button>
                  
                  <Button
                    onClick={this.handleGoHome}
                    variant="outline"
                    className="flex items-center justify-center space-x-2"
                  >
                    <Home className="h-4 w-4" />
                    <span>Go Home</span>
                  </Button>
                  
                  <Button
                    id="copy-button"
                    onClick={this.copyErrorDetails}
                    variant="outline"
                    className="flex items-center justify-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Details</span>
                  </Button>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Need Help?
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                        If this error persists, please contact our support team with the error ID above.
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-300">
                          <Send className="h-4 w-4 mr-1" />
                          Contact Support
                        </Button>
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-300">
                          <Bug className="h-4 w-4 mr-1" />
                          Report Bug
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-500 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Error Status</div>
                    <div className="text-xs text-gray-500">Reported</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Auto-Recovery</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Info className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Support</div>
                    <div className="text-xs text-gray-500">24/7 Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
