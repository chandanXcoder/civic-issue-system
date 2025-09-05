import { Request, Response } from 'express';
import Issue, { IIssue } from '../models/Issue';
import Assignment from '../models/Assignment';
import { asyncHandler } from '../middleware/errorHandler';
import { body, validationResult } from 'express-validator';

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    category,
    status,
    priority,
    location,
    radius = 10, // in kilometers
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

  // Location-based filtering
  if (location) {
    const [lat, lng] = (location as string).split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      filter.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: parseInt(radius as string) * 1000 // Convert km to meters
        }
      };
    }
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
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email')
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

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Public
export const getIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await Issue.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email')
    .populate('upvotes.user', 'name')
    .populate('feedback.user', 'name');

  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: { issue }
  });
});

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }

  const {
    title,
    description,
    category,
    priority = 'medium',
    location,
    address,
    photos = []
  } = req.body;

  const issue = await Issue.create({
    title,
    description,
    category,
    priority,
    location: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
      address
    },
    photos,
    createdBy: req.user!._id
  });

  await issue.populate('createdBy', 'name email');

  res.status(201).json({
    success: true,
    message: 'Issue created successfully',
    data: { issue }
  });
});

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
export const updateIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  // Check if user is the creator or admin
  if (issue.createdBy.toString() !== req.user!._id && req.user!.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Not authorized to update this issue'
    });
    return;
  }

  const allowedUpdates = ['title', 'description', 'category', 'priority', 'photos'];
  const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));

  updates.forEach(update => {
    (issue as any)[update] = req.body[update];
  });

  await issue.save();
  await issue.populate('createdBy', 'name email');
  await issue.populate('assignedTo', 'name email');

  res.status(200).json({
    success: true,
    message: 'Issue updated successfully',
    data: { issue }
  });
});

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
export const deleteIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  // Check if user is the creator or admin
  if (issue.createdBy.toString() !== req.user!._id && req.user!.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Not authorized to delete this issue'
    });
    return;
  }

  await Issue.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Issue deleted successfully'
  });
});

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
// @access  Private
export const upvoteIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  // Check if user already upvoted
  if (issue.hasUserUpvoted(req.user!._id)) {
    res.status(400).json({
      success: false,
      message: 'You have already upvoted this issue'
    });
    return;
  }

  issue.upvotes.push({
    user: req.user!._id,
    createdAt: new Date()
  });

  await issue.save();

  res.status(200).json({
    success: true,
    message: 'Issue upvoted successfully',
    data: {
      upvoteCount: issue.upvotes.length
    }
  });
});

// @desc    Remove upvote from issue
// @route   DELETE /api/issues/:id/upvote
// @access  Private
export const removeUpvote = asyncHandler(async (req: Request, res: Response) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  // Remove user's upvote
  issue.upvotes = issue.upvotes.filter(
    upvote => upvote.user.toString() !== req.user!._id
  );

  await issue.save();

  res.status(200).json({
    success: true,
    message: 'Upvote removed successfully',
    data: {
      upvoteCount: issue.upvotes.length
    }
  });
});

// @desc    Submit feedback for resolved issue
// @route   POST /api/issues/:id/feedback
// @access  Private
export const submitFeedback = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment } = req.body;

  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(404).json({
      success: false,
      message: 'Issue not found'
    });
    return;
  }

  if (issue.status !== 'resolved') {
    res.status(400).json({
      success: false,
      message: 'Feedback can only be submitted for resolved issues'
    });
    return;
  }

  // Check if user already submitted feedback
  if (issue.hasUserFeedback(req.user!._id)) {
    res.status(400).json({
      success: false,
      message: 'You have already submitted feedback for this issue'
    });
    return;
  }

  issue.feedback.push({
    user: req.user!._id,
    rating,
    comment,
    createdAt: new Date()
  });

  await issue.save();

  res.status(200).json({
    success: true,
    message: 'Feedback submitted successfully',
    data: {
      averageRating: issue.averageRating,
      feedbackCount: issue.feedback.length
    }
  });
});

// @desc    Get user's issues
// @route   GET /api/issues/my-issues
// @access  Private
export const getMyIssues = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    status
  } = req.query;

  const filter: any = { createdBy: req.user!._id };
  if (status) {
    filter.status = status;
  }

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const issues = await Issue.find(filter)
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 })
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

// Validation rules
export const createIssueValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['waste', 'pothole', 'streetlight', 'greenery', 'water', 'electricity', 'road', 'other'])
    .withMessage('Invalid category'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
  body('location.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('location.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  body('photos')
    .optional()
    .isArray()
    .withMessage('Photos must be an array'),
  body('photos.*')
    .optional()
    .isURL()
    .withMessage('Invalid photo URL')
];

export const feedbackValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
];
