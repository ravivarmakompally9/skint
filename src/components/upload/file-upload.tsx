'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive,
  Check,
  X,
  Download,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  status: 'uploading' | 'completed' | 'error'
  progress: number
  uploadedAt: Date
}

const fileTypeIcons = {
  'application/pdf': FileText,
  'image/jpeg': Image,
  'image/png': Image,
  'image/gif': Image,
  'video/mp4': Video,
  'video/avi': Video,
  'audio/mp3': Music,
  'audio/wav': Music,
  'application/zip': Archive,
  'application/x-rar': Archive,
  'default': File
}

const acceptedFileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'video/avi',
  'audio/mp3',
  'audio/wav',
  'application/zip',
  'application/x-rar'
]

const maxFileSize = 10 * 1024 * 1024 // 10MB

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    const Icon = fileTypeIcons[type as keyof typeof fileTypeIcons] || fileTypeIcons.default
    return Icon
  }

  const validateFile = (file: File) => {
    if (!acceptedFileTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported' }
    }
    if (file.size > maxFileSize) {
      return { valid: false, error: 'File size too large (max 10MB)' }
    }
    return { valid: true }
  }

  const uploadFile = async (file: File) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      // Simulate upload progress
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      return { success: true, url: result.url }
    } catch (error) {
      return { success: false, error: 'Upload failed' }
    }
  }

  const handleFiles = useCallback(async (fileList: FileList) => {
    const newFiles: UploadedFile[] = []
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const validation = validateFile(file)
      
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        type: file.type,
        url: '',
        status: validation.valid ? 'uploading' : 'error',
        progress: 0,
        uploadedAt: new Date()
      }

      newFiles.push(uploadedFile)
    }

    setFiles(prev => [...prev, ...newFiles])
    setUploading(true)

    // Simulate upload progress
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      if (file.status === 'error') continue

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ))
      }

      // Complete upload
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'completed', progress: 100 } : f
      ))
    }

    setUploading(false)
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name
    link.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-blue-600" />
              <span>File Upload</span>
            </CardTitle>
            <CardDescription>
              Upload your resume, certificates, and other documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Drop files here or click to browse
              </h3>
              <p className="text-gray-500 mb-4">
                Supports PDF, images, videos, audio, and archives (max 10MB each)
              </p>
              <input
                type="file"
                multiple
                accept={acceptedFileTypes.join(',')}
                onChange={handleChange}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>
                {files.length} file{files.length !== 1 ? 's' : ''} uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                              {React.createElement(getFileIcon(file.type), {
                                className: "h-5 w-5 text-gray-600"
                              })}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {file.name}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{formatFileSize(file.size)}</span>
                                <span>•</span>
                                <span>{file.type}</span>
                                <span>•</span>
                                <span>{file.uploadedAt.toLocaleDateString()}</span>
                              </div>
                              {file.status === 'uploading' && (
                                <div className="mt-2">
                                  <Progress value={file.progress} className="h-2" />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Uploading... {file.progress}%
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {file.status === 'completed' && (
                              <>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                                <Button size="sm" variant="outline" onClick={() => downloadFile(file)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {file.status === 'error' && (
                              <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Error
                              </Badge>
                            )}
                            {file.status === 'uploading' && (
                              <Badge variant="secondary">
                                <Upload className="h-3 w-3 mr-1" />
                                Uploading
                              </Badge>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => removeFile(file.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
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
      )}

      {/* Upload Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Supported File Types
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• PDF documents</li>
                  <li>• Images (JPEG, PNG, GIF)</li>
                  <li>• Videos (MP4, AVI)</li>
                  <li>• Audio (MP3, WAV)</li>
                  <li>• Archives (ZIP, RAR)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  File Requirements
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Maximum file size: 10MB</li>
                  <li>• Use descriptive filenames</li>
                  <li>• Ensure files are not corrupted</li>
                  <li>• Scan documents for clarity</li>
                  <li>• Remove password protection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
