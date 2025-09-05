import api from './api';
import { ApiResponse, AuthResponse, LoginCredentials, RegisterData, User } from '../types';

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (data: RegisterData): Promise<ApiResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  // Send OTP
  sendOTP: async (phone: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/send-otp', { phone });
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (phone: string, otp: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/verify-otp', { phone, otp });
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};
