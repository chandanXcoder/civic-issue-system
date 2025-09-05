import { Request, Response } from 'express';
import Issue, { IIssue } from '../models/Issue';
import Assignment from '../models/Assignment';
import User from '../models/User';
import { asyncHandler } from '../middleware/errorHandler';
import { body, validationResult } from 'express-validator';

// @desc    Get all issues for admin
// @route   GET /api/admin/issues
// @access  Private (Admin)
export const getAdminIssues = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    category,
    status,
    priority,
    assignedTo,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter: any = {};

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (assignedTo) {
    filter.assignedTo = assignedTo;
  }

  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  // Sort options
  const sortOptions: any = {};
  sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

  // Execute query
  const issues = await Issue.find(filter)
    .populate('createdBy', 'name email phone')
    .populate('assignedTo', 'name email role')
    .populate('upvotes.user', 'name')
    .populate('feedback.user', 'name')
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum)
    .lean();

  const total = await Issue.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      issues,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalIssues: total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    }
  });
});

// @desc    Assign issue to worker
// @route   PUT /api/admin/issues/:id/assign
// @access  Private (Admin)
export const assignIssue = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }

  const { assignedTo, notes, estimatedCompletionDate } = req.body;

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  // Check if worker exists and has worker role
  const worker = await User.findById(assignedTo);
  if (!worker || worker.role !== 'worker') {
    res.status(400).json({
      success: false,
      message: 'Invalid worker assigned'
    });
    return;
  }

  // Update issue
  issue.assignedTo = assignedTo;
  issue.status = 'accepted';
  await issue.save();

  // Create assignment record
  const assignment = await Assignment.create({
    issue: issue._id,
    assignedTo,
    assignedBy: req.user!._id,
    notes,
    estimatedCompletionDate: estimatedCompletionDate ? new Date(estimatedCompletionDate) : undefined
  });

  await assignment.populate('assignedTo', 'name email role');
  await assignment.populate('assignedBy', 'name email role');

  res.status(200).json({
    success: true,
    message: 'Issue assigned successfully',
    data: { assignment }
  });
});

// @desc    Update issue status
// @route   PUT /api/admin/issues/:id/status
// @access  Private (Admin)
export const updateIssueStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status, resolutionNotes } = req.body;

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  issue.status = status;
  if (resolutionNotes) {
    issue.resolutionNotes = resolutionNotes;
  }

  await issue.save();

  // Update assignment status if exists
  if (issue.assignedTo) {
    const assignment = await Assignment.findOne({ issue: issue._id });
    if (assignment) {
      assignment.status = status === 'resolved' ? 'completed' : 
                        status === 'in-progress' ? 'in-progress' : 
                        status === 'rejected' ? 'rejected' : 'assigned';
      await assignment.save();
    }
  }

  res.status(200).json({
    success: true,
    message: 'Issue status updated successfully',
    data: { issue }
  });
});

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private (Admin)
export const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { period = '30d' } = req.query;

  // Calculate date range
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '1y':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  // Get basic statistics
  const totalIssues = await Issue.countDocuments();
  const recentIssues = await Issue.countDocuments({ createdAt: { $gte: startDate } });
  const resolvedIssues = await Issue.countDocuments({ status: 'resolved' });
  const pendingIssues = await Issue.countDocuments({ status: 'pending' });
  const inProgressIssues = await Issue.countDocuments({ status: 'in-progress' });

  // Category breakdown
  const categoryStats = await Issue.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Status breakdown
  const statusStats = await Issue.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Priority breakdown
  const priorityStats = await Issue.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Resolution time analysis
  const resolutionTimeStats = await Issue.aggregate([
    { $match: { status: 'resolved', resolvedAt: { $exists: true } } },
    {
      $project: {
        resolutionTime: {
          $divide: [
            { $subtract: ['$resolvedAt', '$createdAt'] },
            1000 * 60 * 60 * 24 // Convert to days
          ]
        }
      }
    },
    {
      $group: {
        _id: null,
        avgResolutionTime: { $avg: '$resolutionTime' },
        minResolutionTime: { $min: '$resolutionTime' },
        maxResolutionTime: { $max: '$resolutionTime' }
      }
    }
  ]);

  // Monthly trend
  const monthlyTrend = await Issue.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 },
        resolved: {
          $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
        }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Top workers by resolution count
  const topWorkers = await Assignment.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: '$assignedTo',
        completedCount: { $sum: 1 }
      }
    },
    { $sort: { completedCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'worker'
      }
    },
    { $unwind: '$worker' },
    {
      $project: {
        workerName: '$worker.name',
        workerEmail: '$worker.email',
        completedCount: 1
      }
    }
  ]);

  // Location heatmap data
  const locationData = await Issue.find(
    { location: { $exists: true } },
    { location: 1, category: 1, status: 1 }
  ).lean();

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalIssues,
        recentIssues,
        resolvedIssues,
        pendingIssues,
        inProgressIssues,
        resolutionRate: totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0
      },
      categoryStats,
      statusStats,
      priorityStats,
      resolutionTime: resolutionTimeStats[0] || {
        avgResolutionTime: 0,
        minResolutionTime: 0,
        maxResolutionTime: 0
      },
      monthlyTrend,
      topWorkers,
      locationData
    }
  });
});

// @desc    Get workers list
// @route   GET /api/admin/workers
// @access  Private (Admin)
export const getWorkers = asyncHandler(async (req: Request, res: Response) => {
  const workers = await User.find({ role: 'worker' })
    .select('name email phone createdAt')
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    data: { workers }
  });
});

// @desc    Get assignments
// @route   GET /api/admin/assignments
// @access  Private (Admin)
export const getAssignments = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    status,
    assignedTo
  } = req.query;

  const filter: any = {};
  if (status) {
    filter.status = status;
  }
  if (assignedTo) {
    filter.assignedTo = assignedTo;
  }

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const assignments = await Assignment.find(filter)
    .populate('issue', 'title description category status createdAt')
    .populate('assignedTo', 'name email role')
    .populate('assignedBy', 'name email role')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .lean();

  const total = await Assignment.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      assignments,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalAssignments: total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    }
  });
});

// Validation rules
export const assignIssueValidation = [
  body('assignedTo')
    .isMongoId()
    .withMessage('Invalid worker ID'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  body('estimatedCompletionDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format')
];

export const updateStatusValidation = [
  body('status')
    .isIn(['pending', 'accepted', 'in-progress', 'resolved', 'rejected'])
    .withMessage('Invalid status'),
  body('resolutionNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Resolution notes cannot exceed 1000 characters')
];
