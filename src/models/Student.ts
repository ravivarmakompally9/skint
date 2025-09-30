import mongoose, { Document, Schema } from 'mongoose'

export interface IStudent extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  studentId: string
  academicInfo: {
    university: string
    department: string
    program: string
    year: number
    cgpa: number
    expectedGraduation: Date
  }
  skills: Array<{
    name: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    category: 'technical' | 'soft' | 'language' | 'certification'
  }>
  experience: Array<{
    title: string
    company: string
    type: 'internship' | 'project' | 'volunteer' | 'part-time'
    startDate: Date
    endDate?: Date
    description: string
    skills: string[]
  }>
  certifications: Array<{
    name: string
    issuer: string
    issueDate: Date
    expiryDate?: Date
    credentialId?: string
    url?: string
  }>
  preferences: {
    jobTypes: string[]
    locations: string[]
    salaryRange: {
      min: number
      max: number
      currency: string
    }
    workMode: 'remote' | 'onsite' | 'hybrid'
    companySize: 'startup' | 'medium' | 'enterprise'
  }
  achievements: Array<{
    title: string
    description: string
    date: Date
    category: 'academic' | 'professional' | 'personal'
  }>
  documents: Array<{
    type: 'resume' | 'transcript' | 'certificate' | 'portfolio'
    name: string
    url: string
    uploadedAt: Date
  }>
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

const StudentSchema = new Schema<IStudent>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  academicInfo: {
    university: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    program: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    expectedGraduation: {
      type: Date,
      required: true
    }
  },
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true
    },
    category: {
      type: String,
      enum: ['technical', 'soft', 'language', 'certification'],
      required: true
    }
  }],
  experience: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['internship', 'project', 'volunteer', 'part-time'],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      maxlength: 1000
    },
    skills: [{
      type: String,
      trim: true
    }]
  }],
  certifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date,
      default: null
    },
    credentialId: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    }
  }],
  preferences: {
    jobTypes: [{
      type: String,
      trim: true
    }],
    locations: [{
      type: String,
      trim: true
    }],
    salaryRange: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 1000000
      },
      currency: {
        type: String,
        default: 'USD'
      }
    },
    workMode: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      default: 'hybrid'
    },
    companySize: {
      type: String,
      enum: ['startup', 'medium', 'enterprise'],
      default: 'medium'
    }
  },
  achievements: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      maxlength: 500
    },
    date: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      enum: ['academic', 'professional', 'personal'],
      required: true
    }
  }],
  documents: [{
    type: {
      type: String,
      enum: ['resume', 'transcript', 'certificate', 'portfolio'],
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Indexes
StudentSchema.index({ userId: 1 })
StudentSchema.index({ studentId: 1 })
StudentSchema.index({ 'academicInfo.university': 1 })
StudentSchema.index({ 'academicInfo.department': 1 })
StudentSchema.index({ 'academicInfo.program': 1 })
StudentSchema.index({ 'skills.name': 1 })
StudentSchema.index({ isAvailable: 1 })

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema)
