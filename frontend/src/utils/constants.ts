// Issue categories
export const ISSUE_CATEGORIES = [
  { value: 'waste', label: 'Waste Management', icon: '🗑️', color: 'brown' },
  { value: 'pothole', label: 'Pothole', icon: '🕳️', color: 'gray' },
  { value: 'streetlight', label: 'Street Light', icon: '💡', color: 'yellow' },
  { value: 'greenery', label: 'Greenery', icon: '🌳', color: 'green' },
  { value: 'water', label: 'Water Supply', icon: '💧', color: 'blue' },
  { value: 'electricity', label: 'Electricity', icon: '⚡', color: 'yellow' },
  { value: 'road', label: 'Road', icon: '🛣️', color: 'gray' },
  { value: 'other', label: 'Other', icon: '📋', color: 'purple' },
] as const;

// Issue priorities
export const ISSUE_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
] as const;

// Issue statuses
export const ISSUE_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'accepted', label: 'Accepted', color: 'blue' },
  { value: 'in-progress', label: 'In Progress', color: 'purple' },
  { value: 'resolved', label: 'Resolved', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
] as const;

// Assignment statuses
export const ASSIGNMENT_STATUSES = [
  { value: 'assigned', label: 'Assigned', color: 'blue' },
  { value: 'accepted', label: 'Accepted', color: 'green' },
  { value: 'in-progress', label: 'In Progress', color: 'purple' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
] as const;

// User roles
export const USER_ROLES = [
  { value: 'citizen', label: 'Citizen', color: 'blue' },
  { value: 'admin', label: 'Admin', color: 'purple' },
  { value: 'worker', label: 'Worker', color: 'green' },
] as const;

// Pagination
export const PAGINATION_LIMITS = [10, 20, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 10;

// Map settings
export const MAP_CENTER: [number, number] = [23.6102, 85.2799]; // Ranchi, Jharkhand
export const MAP_ZOOM = 12;
export const MAP_MAX_ZOOM = 18;

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ISSUES: {
    LIST: '/issues',
    CREATE: '/issues',
    GET: '/issues/:id',
    UPDATE: '/issues/:id',
    DELETE: '/issues/:id',
    UPVOTE: '/issues/:id/upvote',
    FEEDBACK: '/issues/:id/feedback',
    MY_ISSUES: '/issues/my-issues',
  },
  ADMIN: {
    ISSUES: '/admin/issues',
    ASSIGN: '/admin/issues/:id/assign',
    UPDATE_STATUS: '/admin/issues/:id/status',
    ANALYTICS: '/admin/analytics',
    WORKERS: '/admin/workers',
    ASSIGNMENTS: '/admin/assignments',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  REPORT: '/report',
  MY_ISSUES: '/my-issues',
  ISSUE_DETAIL: '/issues/:id',
  ADMIN: '/admin',
  ADMIN_ISSUES: '/admin/issues',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_WORKERS: '/admin/workers',
} as const;

// Validation rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
  },
  PHONE: {
    PATTERN: /^\+?[1-9]\d{1,14}$/,
  },
  TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  COMMENT: {
    MAX_LENGTH: 500,
  },
  NOTES: {
    MAX_LENGTH: 500,
  },
  RESOLUTION_NOTES: {
    MAX_LENGTH: 1000,
  },
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy h:mm a',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// Chart colors
export const CHART_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316', // orange
  '#ec4899', // pink
  '#6b7280', // gray
] as const;
