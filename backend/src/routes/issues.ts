import express from 'express';
import {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  upvoteIssue,
  removeUpvote,
  submitFeedback,
  getMyIssues,
  createIssueValidation,
  feedbackValidation
} from '../controllers/issueController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, asyncHandler(getIssues));
router.get('/:id', optionalAuth, asyncHandler(getIssue));

// Protected routes
router.post('/', authenticate, createIssueValidation, asyncHandler(createIssue));
router.put('/:id', authenticate, asyncHandler(updateIssue));
router.delete('/:id', authenticate, asyncHandler(deleteIssue));
router.post('/:id/upvote', authenticate, asyncHandler(upvoteIssue));
router.delete('/:id/upvote', authenticate, asyncHandler(removeUpvote));
router.post('/:id/feedback', authenticate, feedbackValidation, asyncHandler(submitFeedback));
router.get('/my-issues', authenticate, asyncHandler(getMyIssues));

export default router;
