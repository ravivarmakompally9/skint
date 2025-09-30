import mongoose, { Document, Schema } from 'mongoose'

export interface IOpportunity extends Document {
  _id: string
  title: string
  description: string
  type: 'internship' | 'full-time' | 'part-time' | 'contract' | 'freelance'
  category: string
  company: {
    name: string
    id: mongoose.Types.ObjectId
    logo?: string
    website?: string
    size: 'startup' | 'medium' | 'enterprise'
    industry: string
  }
  location: {
    city: string
    state: string
    country: string
    isRemote: boolean
    workMode: 'remote' | 'onsite' | 'hybrid'
  }
  requirements: {
    education: string[]
    experience: {
      min: number
      max?: number
      type: 'years' | 'months'
    }
    skills: string[]
    languages: Array<{
      name: string
      level: 'basic' | 'intermediate' | 'advanced' | 'native'
    }>
  }
  benefits: {
    salary: {
      min: number
      max: number
      currency: string
      period: 'hourly' | 'monthly' | 'yearly'
    }
    perks: string[]
    benefits: string[]
  }
  application: {
    deadline: Date
    startDate: Date
    duration?: number // in months
    process: Array<{
      stage: string
      description: string
      estimatedDays: number
    }>
    requirements: string[]
  }
  status: 'draft' | 'active' | 'paused' | 'closed' | 'cancelled'
  postedBy: mongoose.Types.ObjectId
  approvedBy?: mongoose.Types.ObjectId
  approvedAt?: Date
  applications: mongoose.Types.ObjectId[]
  views: number
  applicationsCount: number
  isFeatured: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const OpportunitySchema = new Schema<IOpportunity>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000
  },
  type: {
    type: String,
    enum: ['internship', 'full-time', 'part-time', 'contract', 'freelance'],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    logo: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    size: {
      type: String,
      enum: ['startup', 'medium', 'enterprise'],
      required: true
    },
    industry: {
      type: String,
      required: true,
      trim: true
    }
  },
  location: {
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    isRemote: {
      type: Boolean,
      default: false
    },
    workMode: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true
    }
  },
  requirements: {
    education: [{
      type: String,
      trim: true
    }],
    experience: {
      min: {
        type: Number,
        required: true,
        min: 0
      },
      max: {
        type: Number,
        min: 0
      },
      type: {
        type: String,
        enum: ['years', 'months'],
        default: 'years'
      }
    },
    skills: [{
      type: String,
      trim: true
    }],
    languages: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      level: {
        type: String,
        enum: ['basic', 'intermediate', 'advanced', 'native'],
        required: true
      }
    }]
  },
  benefits: {
    salary: {
      min: {
        type: Number,
        required: true,
        min: 0
      },
      max: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        required: true,
        default: 'USD'
      },
      period: {
        type: String,
        enum: ['hourly', 'monthly', 'yearly'],
        required: true
      }
    },
    perks: [{
      type: String,
      trim: true
    }],
    benefits: [{
      type: String,
      trim: true
    }]
  },
  application: {
    deadline: {
      type: Date,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      min: 1
    },
    process: [{
      stage: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      estimatedDays: {
        type: Number,
        required: true,
        min: 1
      }
    }],
    requirements: [{
      type: String,
      trim: true
    }]
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'closed', 'cancelled'],
    default: 'draft'
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  approvedAt: {
    type: Date,
    default: null
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application'
  }],
  views: {
    type: Number,
    default: 0
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
})

// Indexes
OpportunitySchema.index({ title: 'text', description: 'text' })
OpportunitySchema.index({ type: 1 })
OpportunitySchema.index({ category: 1 })
OpportunitySchema.index({ 'company.id': 1 })
OpportunitySchema.index({ 'location.city': 1, 'location.country': 1 })
OpportunitySchema.index({ status: 1 })
OpportunitySchema.index({ postedBy: 1 })
OpportunitySchema.index({ 'application.deadline': 1 })
OpportunitySchema.index({ isFeatured: 1 })
OpportunitySchema.index({ tags: 1 })

export default mongoose.models.Opportunity || mongoose.model<IOpportunity>('Opportunity', OpportunitySchema)
