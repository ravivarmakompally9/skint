import mongoose, { Document, Schema } from 'mongoose'

export interface IApplication extends Document {
  _id: string
  studentId: mongoose.Types.ObjectId
  opportunityId: mongoose.Types.ObjectId
  status: 'draft' | 'submitted' | 'under-review' | 'shortlisted' | 'interview' | 'accepted' | 'rejected' | 'withdrawn'
  coverLetter?: string
  resume: {
    url: string
    name: string
    uploadedAt: Date
  }
  additionalDocuments: Array<{
    type: 'transcript' | 'certificate' | 'portfolio' | 'other'
    name: string
    url: string
    uploadedAt: Date
  }>
  answers: Array<{
    question: string
    answer: string
  }>
  timeline: Array<{
    status: string
    date: Date
    note?: string
    updatedBy: mongoose.Types.ObjectId
  }>
  interview: {
    scheduled?: Date
    type: 'phone' | 'video' | 'in-person' | 'technical'
    location?: string
    meetingLink?: string
    interviewer?: mongoose.Types.ObjectId
    feedback?: string
    rating?: number
  }
  feedback: {
    fromRecruiter?: {
      rating: number
      comments: string
      strengths: string[]
      improvements: string[]
      submittedAt: Date
      submittedBy: mongoose.Types.ObjectId
    }
    fromStudent?: {
      rating: number
      comments: string
      experience: string
      submittedAt: Date
    }
  }
  notes: Array<{
    content: string
    isPrivate: boolean
    addedBy: mongoose.Types.ObjectId
    addedAt: Date
  }>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ApplicationSchema = new Schema<IApplication>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  opportunityId: {
    type: Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under-review', 'shortlisted', 'interview', 'accepted', 'rejected', 'withdrawn'],
    default: 'draft'
  },
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  resume: {
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  additionalDocuments: [{
    type: {
      type: String,
      enum: ['transcript', 'certificate', 'portfolio', 'other'],
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
  answers: [{
    question: {
      type: String,
      required: true,
      trim: true
    },
    answer: {
      type: String,
      required: true,
      trim: true
    }
  }],
  timeline: [{
    status: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      trim: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  interview: {
    scheduled: {
      type: Date,
      default: null
    },
    type: {
      type: String,
      enum: ['phone', 'video', 'in-person', 'technical'],
      default: null
    },
    location: {
      type: String,
      trim: true
    },
    meetingLink: {
      type: String,
      trim: true
    },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    feedback: {
      type: String,
      maxlength: 1000
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  feedback: {
    fromRecruiter: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: {
        type: String,
        maxlength: 1000
      },
      strengths: [{
        type: String,
        trim: true
      }],
      improvements: [{
        type: String,
        trim: true
      }],
      submittedAt: {
        type: Date,
        default: Date.now
      },
      submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    fromStudent: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: {
        type: String,
        maxlength: 1000
      },
      experience: {
        type: String,
        maxlength: 1000
      },
      submittedAt: {
        type: Date,
        default: Date.now
      }
    }
  },
  notes: [{
    content: {
      type: String,
      required: true,
      trim: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Indexes
ApplicationSchema.index({ studentId: 1 })
ApplicationSchema.index({ opportunityId: 1 })
ApplicationSchema.index({ status: 1 })
ApplicationSchema.index({ studentId: 1, opportunityId: 1 }, { unique: true })
ApplicationSchema.index({ 'timeline.date': -1 })

// Pre-save middleware to update timeline
ApplicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.timeline.push({
      status: this.status,
      date: new Date(),
      updatedBy: this.studentId // This should be the current user ID in practice
    })
  }
  next()
})

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema)
