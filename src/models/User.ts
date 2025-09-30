import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  password?: string
  role: 'student' | 'faculty' | 'placement' | 'recruiter'
  profile: {
    firstName: string
    lastName: string
    avatar?: string
    phone?: string
    location?: string
    bio?: string
    linkedin?: string
    github?: string
    website?: string
  }
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'connections' | 'private'
      showEmail: boolean
      showPhone: boolean
      showLocation: boolean
    }
    theme: {
      mode: 'light' | 'dark' | 'system'
      primaryColor: string
      fontSize: number
    }
  }
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return this.role !== 'recruiter' // Recruiters might use OAuth only
    }
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'placement', 'recruiter'],
    required: true
  },
  profile: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      maxlength: 500
    },
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'connections', 'private'],
        default: 'public'
      },
      showEmail: {
        type: Boolean,
        default: false
      },
      showPhone: {
        type: Boolean,
        default: false
      },
      showLocation: {
        type: Boolean,
        default: true
      }
    },
    theme: {
      mode: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system'
      },
      primaryColor: {
        type: String,
        default: 'blue'
      },
      fontSize: {
        type: Number,
        default: 16,
        min: 12,
        max: 24
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

// Indexes
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ 'profile.firstName': 1, 'profile.lastName': 1 })

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`
})

// Ensure virtual fields are serialized
UserSchema.set('toJSON', { virtuals: true })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
