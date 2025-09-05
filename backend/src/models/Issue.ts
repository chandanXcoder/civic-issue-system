import mongoose, { Document, Schema } from 'mongoose';

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
}

export interface IUpvote {
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface IFeedback {
  user: mongoose.Types.ObjectId;
  rating: number; // 1-5 stars
  comment?: string;
  createdAt: Date;
}

export interface IIssue extends Document {
  _id: string;
  title: string;
  description: string;
  category: 'waste' | 'pothole' | 'streetlight' | 'greenery' | 'water' | 'electricity' | 'road' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'accepted' | 'in-progress' | 'resolved' | 'rejected';
  location: ILocation;
  photos: string[]; // Array of Cloudinary URLs
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  upvotes: IUpvote[];
  feedback: IFeedback[];
  resolutionNotes?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema<IIssue>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['waste', 'pothole', 'streetlight', 'greenery', 'water', 'electricity', 'road', 'other'],
      message: 'Invalid category'
    }
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high', 'urgent'],
      message: 'Invalid priority level'
    },
    default: 'medium'
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'accepted', 'in-progress', 'resolved', 'rejected'],
      message: 'Invalid status'
    },
    default: 'pending'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(coords: number[]) {
          return coords.length === 2 && 
                 coords[0] >= -180 && coords[0] <= 180 && // longitude
                 coords[1] >= -90 && coords[1] <= 90; // latitude
        },
        message: 'Invalid coordinates'
      }
    },
    address: {
      type: String,
      trim: true,
      maxlength: [200, 'Address cannot be more than 200 characters']
    }
  },
  photos: [{
    type: String,
    validate: {
      validator: function(url: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
      },
      message: 'Invalid photo URL'
    }
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upvotes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  resolutionNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Resolution notes cannot be more than 1000 characters']
  },
  resolvedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
IssueSchema.index({ location: '2dsphere' }); // Geospatial index
IssueSchema.index({ status: 1 });
IssueSchema.index({ category: 1 });
IssueSchema.index({ createdBy: 1 });
IssueSchema.index({ assignedTo: 1 });
IssueSchema.index({ createdAt: -1 });
IssueSchema.index({ 'upvotes.user': 1 });

// Virtual for upvote count
IssueSchema.virtual('upvoteCount').get(function() {
  return this.upvotes.length;
});

// Virtual for average rating
IssueSchema.virtual('averageRating').get(function() {
  if (this.feedback.length === 0) return 0;
  const sum = this.feedback.reduce((acc: number, feedback: IFeedback) => acc + feedback.rating, 0);
  return Math.round((sum / this.feedback.length) * 10) / 10; // Round to 1 decimal place
});

// Pre-save middleware to set resolvedAt when status changes to resolved
IssueSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  next();
});

// Method to check if user has upvoted
IssueSchema.methods.hasUserUpvoted = function(userId: string): boolean {
  return this.upvotes.some((upvote: IUpvote) => upvote.user.toString() === userId);
};

// Method to check if user has given feedback
IssueSchema.methods.hasUserFeedback = function(userId: string): boolean {
  return this.feedback.some((feedback: IFeedback) => feedback.user.toString() === userId);
};

export default mongoose.model<IIssue>('Issue', IssueSchema);
