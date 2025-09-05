import api from './api';
import { ApiResponse, Issue, IssueFormData, IssueFilters, PaginatedResponse } from '../types';

export const issueService = {
  // Get all issues
  getIssues: async (filters: IssueFilters = {}): Promise<ApiResponse<PaginatedResponse<Issue>>> => {
    const response = await api.get('/issues', { params: filters });
    return response.data;
  },

  // Get single issue
  getIssue: async (id: string): Promise<ApiResponse<{ issue: Issue }>> => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  // Create new issue
  createIssue: async (data: IssueFormData): Promise<ApiResponse<{ issue: Issue }>> => {
    const response = await api.post('/issues', data);
    return response.data;
  },

  // Update issue
  updateIssue: async (id: string, data: Partial<IssueFormData>): Promise<ApiResponse<{ issue: Issue }>> => {
    const response = await api.put(`/issues/${id}`, data);
    return response.data;
  },

  // Delete issue
  deleteIssue: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },

  // Upvote issue
  upvoteIssue: async (id: string): Promise<ApiResponse<{ upvoteCount: number }>> => {
    const response = await api.post(`/issues/${id}/upvote`);
    return response.data;
  },

  // Remove upvote
  removeUpvote: async (id: string): Promise<ApiResponse<{ upvoteCount: number }>> => {
    const response = await api.delete(`/issues/${id}/upvote`);
    return response.data;
  },

  // Submit feedback
  submitFeedback: async (id: string, rating: number, comment?: string): Promise<ApiResponse<{ averageRating: number; feedbackCount: number }>> => {
    const response = await api.post(`/issues/${id}/feedback`, { rating, comment });
    return response.data;
  },

  // Get user's issues
  getMyIssues: async (filters: { page?: number; limit?: number; status?: string } = {}): Promise<ApiResponse<PaginatedResponse<Issue>>> => {
    const response = await api.get('/issues/my-issues', { params: filters });
    return response.data;
  },
};
