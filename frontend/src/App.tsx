import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ReportIssuePage from './pages/ReportIssuePage';
import IssueDetailPage from './pages/IssueDetailPage';
import MyIssuesPage from './pages/MyIssuesPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminIssuesPage from './pages/admin/AdminIssuesPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminWorkersPage from './pages/admin/AdminWorkersPage';
import NotFoundPage from './pages/NotFoundPage';

// Layout
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/issues/:id" element={<Layout><IssueDetailPage /></Layout>} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><DashboardPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/report" element={
            <ProtectedRoute>
              <Layout><ReportIssuePage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/my-issues" element={
            <ProtectedRoute>
              <Layout><MyIssuesPage /></Layout>
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <Layout><AdminDashboardPage /></Layout>
            </AdminRoute>
          } />
          <Route path="/admin/issues" element={
            <AdminRoute>
              <Layout><AdminIssuesPage /></Layout>
            </AdminRoute>
          } />
          <Route path="/admin/analytics" element={
            <AdminRoute>
              <Layout><AdminAnalyticsPage /></Layout>
            </AdminRoute>
          } />
          <Route path="/admin/workers" element={
            <AdminRoute>
              <Layout><AdminWorkersPage /></Layout>
            </AdminRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
