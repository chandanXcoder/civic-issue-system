import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  verifyEmail,
  sendOTP,
  verifyOTP,
  getMe,
  forgotPassword,
  resetPassword
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const verifyEmailValidation = [
  body('token')
    .notEmpty()
    .withMessage('Verification token is required')
];

const sendOTPValidation = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number')
];

const verifyOTPValidation = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be 6 digits')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Routes
router.post('/register', registerValidation, asyncHandler(register));
router.post('/login', loginValidation, asyncHandler(login));
router.post('/verify-email', verifyEmailValidation, asyncHandler(verifyEmail));
router.post('/send-otp', sendOTPValidation, asyncHandler(sendOTP));
router.post('/verify-otp', verifyOTPValidation, asyncHandler(verifyOTP));
router.get('/me', authenticate, asyncHandler(getMe));
router.post('/forgot-password', forgotPasswordValidation, asyncHandler(forgotPassword));
router.post('/reset-password', resetPasswordValidation, asyncHandler(resetPassword));

export default router;
