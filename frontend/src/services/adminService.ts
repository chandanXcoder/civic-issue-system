import api from './api';
import { ApiResponse, Issue, Assignment, User, AnalyticsData, PaginatedResponse } from '../types';

export const adminService = {
  // Get all issues for admin
  getIssues: async (filters: any = {}): Promise<ApiResponse<PaginatedResponse<Issue>>> => {
    const response = await api.get('/admin/issues', { params: filters });
    return response.data;
  },

  // Assign issue to worker
  assignIssue: async (issueId: string, assignedTo: string, notes?: string, estimatedCompletionDate?: string): Promise<ApiResponse<{ assignment: Assignment }>> => {
    const response = await api.put(`/admin/issues/${issueId}/assign`, {
      assignedTo,
      notes,
      estimatedCompletionDate
    });
    return response.data;
  },

  // Update issue status
  updateIssueStatus: async (issueId: string, status: string, resolutionNotes?: string): Promise<ApiResponse<{ issue: Issue }>> => {
    const response = await api.put(`/admin/issues/${issueId}/status`, {
      status,
      resolutionNotes
    });
    return response.data;
  },

  // Get analytics data
  getAnalytics: async (period: string = '30d'): Promise<ApiResponse<AnalyticsData>> => {
    const response = await api.get('/admin/analytics', { params: { period } });
    return response.data;
  },

  // Get workers list
  getWorkers: async (): Promise<ApiResponse<{ workers: User[] }>> => {
    const response = await api.get('/admin/workers');
    return response.data;
  },

  // Get assignments
  getAssignments: async (filters: any = {}): Promise<ApiResponse<PaginatedResponse<Assignment>>> => {
    const response = await api.get('/admin/assignments', { params: filters });
    return response.data;
  },
};
