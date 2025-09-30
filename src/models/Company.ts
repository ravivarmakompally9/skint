import mongoose, { Document, Schema } from 'mongoose'

export interface ICompany extends Document {
  _id: string
  name: string
  description: string
  website: string
  logo?: string
  industry: string
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  founded: number
  headquarters: {
    address: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  contact: {
    email: string
    phone?: string
    linkedin?: string
    twitter?: string
  }
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  culture: {
    values: string[]
    mission: string
    vision: string
    benefits: string[]
  }
  verification: {
    isVerified: boolean
    verifiedAt?: Date
    verifiedBy?: mongoose.Types.ObjectId
    documents: Array<{
      type: string
      url: string
      uploadedAt: Date
    }>
  }
  recruiters: mongoose.Types.ObjectId[]
  opportunities: mongoose.Types.ObjectId[]
  rating: {
    average: number
    count: number
    breakdown: {
      culture: number
      compensation: number
      workLifeBalance: number
      careerGrowth: number
      management: number
    }
  }
  reviews: Array<{
    studentId: mongoose.Types.ObjectId
    rating: number
    title: string
    content: string
    pros: string[]
    cons: string[]
    isAnonymous: boolean
    createdAt: Date
  }>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CompanySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
    required: true
  },
  founded: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  headquarters: {
    address: {
      type: String,
      required: true,
      trim: true
    },
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
    zipCode: {
      type: String,
      required: true,
      trim: true
    }
  },
  contact: {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    }
  },
  socialMedia: {
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    }
  },
  culture: {
    values: [{
      type: String,
      trim: true
    }],
    mission: {
      type: String,
      maxlength: 1000
    },
    vision: {
      type: String,
      maxlength: 1000
    },
    benefits: [{
      type: String,
      trim: true
    }]
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedAt: {
      type: Date,
      default: null
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    documents: [{
      type: {
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
    }]
  },
  recruiters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  opportunities: [{
    type: Schema.Types.ObjectId,
    ref: 'Opportunity'
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    breakdown: {
      culture: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      compensation: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      workLifeBalance: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      careerGrowth: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      management: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      }
    }
  },
  reviews: [{
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000
    },
    pros: [{
      type: String,
      trim: true
    }],
    cons: [{
      type: String,
      trim: true
    }],
    isAnonymous: {
      type: Boolean,
      default: false
    },
    createdAt: {
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
CompanySchema.index({ name: 'text', description: 'text' })
CompanySchema.index({ industry: 1 })
CompanySchema.index({ size: 1 })
CompanySchema.index({ 'headquarters.country': 1, 'headquarters.city': 1 })
CompanySchema.index({ 'verification.isVerified': 1 })
CompanySchema.index({ 'rating.average': -1 })
CompanySchema.index({ isActive: 1 })

// Pre-save middleware to update rating
CompanySchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating.average = totalRating / this.reviews.length
    this.rating.count = this.reviews.length
    
    // Calculate breakdown
    const breakdown = this.reviews.reduce((acc, review) => {
      // This would need to be calculated based on review content or additional fields
      return acc
    }, {
      culture: 0,
      compensation: 0,
      workLifeBalance: 0,
      careerGrowth: 0,
      management: 0
    })
    
    this.rating.breakdown = breakdown
  }
  next()
})

export default mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema)
