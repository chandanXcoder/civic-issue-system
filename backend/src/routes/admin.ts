import express from 'express';
import {
  getAdminIssues,
  assignIssue,
  updateIssueStatus,
  getAnalytics,
  getWorkers,
  getAssignments,
  assignIssueValidation,
  updateStatusValidation
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// Issue management
router.get('/issues', asyncHandler(getAdminIssues));
router.put('/issues/:id/assign', assignIssueValidation, asyncHandler(assignIssue));
router.put('/issues/:id/status', updateStatusValidation, asyncHandler(updateIssueStatus));

// Analytics and reporting
router.get('/analytics', asyncHandler(getAnalytics));

// Worker management
router.get('/workers', asyncHandler(getWorkers));

// Assignment management
router.get('/assignments', asyncHandler(getAssignments));

export default router;
