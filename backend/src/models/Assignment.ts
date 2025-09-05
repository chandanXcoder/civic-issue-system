import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment extends Document {
  _id: string;
  issue: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  status: 'assigned' | 'accepted' | 'in-progress' | 'completed' | 'rejected';
  notes?: string;
  estimatedCompletionDate?: Date;
  actualCompletionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>({
  issue: {
    type: Schema.Types.ObjectId,
    ref: 'Issue',
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ['assigned', 'accepted', 'in-progress', 'completed', 'rejected'],
      message: 'Invalid assignment status'
    },
    default: 'assigned'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  estimatedCompletionDate: {
    type: Date
  },
  actualCompletionDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
AssignmentSchema.index({ issue: 1 });
AssignmentSchema.index({ assignedTo: 1 });
AssignmentSchema.index({ assignedBy: 1 });
AssignmentSchema.index({ status: 1 });
AssignmentSchema.index({ createdAt: -1 });

// Compound index for efficient queries
AssignmentSchema.index({ assignedTo: 1, status: 1 });
AssignmentSchema.index({ issue: 1, status: 1 });

// Pre-save middleware to set actualCompletionDate when status changes to completed
AssignmentSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.actualCompletionDate) {
    this.actualCompletionDate = new Date();
  }
  next();
});

// Virtual for assignment duration
AssignmentSchema.virtual('duration').get(function() {
  if (this.actualCompletionDate) {
    return this.actualCompletionDate.getTime() - this.createdAt.getTime();
  }
  return null;
});

// Static method to get assignments by worker
AssignmentSchema.statics.getByWorker = function(workerId: string, status?: string) {
  const query: any = { assignedTo: workerId };
  if (status) {
    query.status = status;
  }
  return this.find(query).populate('issue', 'title description category status').populate('assignedBy', 'name email');
};

// Static method to get assignments by issue
AssignmentSchema.statics.getByIssue = function(issueId: string) {
  return this.find({ issue: issueId })
    .populate('assignedTo', 'name email role')
    .populate('assignedBy', 'name email role')
    .sort({ createdAt: -1 });
};

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);
