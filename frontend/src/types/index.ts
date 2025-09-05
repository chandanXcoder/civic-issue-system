// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'citizen' | 'admin' | 'worker';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Location types
export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
}

// Issue types
export interface Issue {
  _id: string;
  title: string;
  description: string;
  category: 'waste' | 'pothole' | 'streetlight' | 'greenery' | 'water' | 'electricity' | 'road' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'accepted' | 'in-progress' | 'resolved' | 'rejected';
  location: Location;
  photos: string[];
  createdBy: User;
  assignedTo?: User;
  upvotes: Upvote[];
  feedback: Feedback[];
  resolutionNotes?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  upvoteCount: number;
  averageRating: number;
}

// Upvote types
export interface Upvote {
  user: string;
  createdAt: string;
}

// Feedback types
export interface Feedback {
  user: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// Assignment types
export interface Assignment {
  _id: string;
  issue: Issue;
  assignedTo: User;
  assignedBy: User;
  status: 'assigned' | 'accepted' | 'in-progress' | 'completed' | 'rejected';
  notes?: string;
  estimatedCompletionDate?: string;
  actualCompletionDate?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalIssues: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Issue form types
export interface IssueFormData {
  title: string;
  description: string;
  category: Issue['category'];
  priority: Issue['priority'];
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  photos: string[];
}

// Analytics types
export interface AnalyticsData {
  overview: {
    totalIssues: number;
    recentIssues: number;
    resolvedIssues: number;
    pendingIssues: number;
    inProgressIssues: number;
    resolutionRate: number;
  };
  categoryStats: Array<{
    _id: string;
    count: number;
  }>;
  statusStats: Array<{
    _id: string;
    count: number;
  }>;
  priorityStats: Array<{
    _id: string;
    count: number;
  }>;
  resolutionTime: {
    avgResolutionTime: number;
    minResolutionTime: number;
    maxResolutionTime: number;
  };
  monthlyTrend: Array<{
    _id: {
      year: number;
      month: number;
    };
    count: number;
    resolved: number;
  }>;
  topWorkers: Array<{
    workerName: string;
    workerEmail: string;
    completedCount: number;
  }>;
  locationData: Array<{
    _id: string;
    location: Location;
    category: string;
    status: string;
  }>;
}

// Filter types
export interface IssueFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  priority?: string;
  location?: string;
  radius?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Map types
export interface MapMarker {
  id: string;
  position: [number, number];
  category: string;
  status: string;
  title: string;
  description: string;
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// Search types
export interface SearchParams {
  query?: string;
  category?: string;
  status?: string;
  priority?: string;
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  dateRange?: {
    start: string;
    end: string;
  };
}
