import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  BarChart3,
  Users,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  TrendingUp,
  Eye,
} from 'lucide-react';
import type { IssueStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const { reports, loadingReports, updateReportStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [complexityFilter, setComplexityFilter] = useState('all');

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesComplexity =
      complexityFilter === 'all' ||
      (complexityFilter === 'high' && report.votes >= 15) ||
      (complexityFilter === 'medium' && report.votes >= 8 && report.votes < 15) ||
      (complexityFilter === 'low' && report.votes < 8);

    return matchesSearch && matchesStatus && matchesComplexity;
  });

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'Pending').length,
    inProgress: reports.filter((r) => r.status === 'In Progress').length,
    resolved: reports.filter((r) => r.status === 'Resolved').length,
    highComplexity: reports.filter((r) => r.votes >= 15).length,
    mediumComplexity: reports.filter((r) => r.votes >= 8 && r.votes < 15).length,
    lowComplexity: reports.filter((r) => r.votes < 8).length,
    totalVotes: reports.reduce((sum, r) => sum + r.votes, 0),
  };

  const categories = Array.from(new Set(reports.map((r) => r.category).filter(Boolean))) as string[];

  const categoryStats = categories.map((category) => ({
    name: category,
    count: reports.filter((r) => r.category === category).length,
    resolved: reports.filter((r) => r.category === category && r.status === 'Resolved').length,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplexityLevel = (votes: number) => {
    if (votes >= 15) return { level: 'High', color: 'text-red-600 bg-red-50' };
    if (votes >= 8) return { level: 'Medium', color: 'text-orange-600 bg-orange-50' };
    return { level: 'Low', color: 'text-green-600 bg-green-50' };
  };

  const handleStatusUpdate = async (reportId: string, newStatus: IssueStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
    } catch (err) {
      console.error('[AdminDashboard] handleStatusUpdate error:', err);
    }
  };

  if (loadingReports) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive overview of civic issues and community engagement
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 text-green-600 px-3 py-1 rounded-full">
              <Eye size={16} />
              <span className="text-sm font-medium">Admin View</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-sm text-blue-600">All time reports</p>
              </div>
              <BarChart3 className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-yellow-600">Needs attention</p>
              </div>
              <Clock className="text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                <p className="text-sm text-green-600">
                  {stats.total > 0
                    ? `${((stats.resolved / stats.total) * 100).toFixed(1)}% success rate`
                    : '0% success rate'}
                </p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-3xl font-bold text-red-600">{stats.highComplexity}</p>
                <p className="text-sm text-red-600">15+ community votes</p>
              </div>
              <AlertTriangle className="text-red-600" size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Issue Distribution Map</h2>
            <div
              className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1)), url("https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
              }}
            >
              <div className="text-center p-6 bg-white/90 rounded-xl backdrop-blur-sm">
                <MapPin className="mx-auto mb-2 text-blue-600" size={48} />
                <p className="text-gray-700 font-medium">Interactive Admin Heatmap</p>
                <p className="text-sm text-gray-600 mt-1">
                  Analyzing {reports.length} reports across all districts
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Category Analysis</h2>
            <div className="space-y-4">
              {categoryStats.slice(0, 5).map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{category.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{category.count} total</span>
                      <span>•</span>
                      <span className="text-green-600">{category.resolved} resolved</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{category.count}</div>
                    <div className="text-xs text-gray-500">
                      {category.count > 0
                        ? Math.round((category.resolved / category.count) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              ))}
              {categoryStats.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No category data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Reports Management */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Reports Management</h2>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={complexityFilter}
                onChange={(e) => setComplexityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Complexity</option>
                <option value="high">High (15+ votes)</option>
                <option value="medium">Medium (8-14 votes)</option>
                <option value="low">Low (&lt;8 votes)</option>
              </select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredReports.map((report) => {
                const complexity = getComplexityLevel(report.votes);
                return (
                  <div
                    key={report.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}
                          >
                            {report.status}
                          </span>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${complexity.color}`}>
                            {complexity.level} Priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{report.description}</p>
                        {report.imageUrl && (
                          <div className="mb-3 mt-2">
                            <img
                              src={report.imageUrl}
                              alt={report.title}
                              className="max-h-56 w-auto rounded-lg border border-gray-200 object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MapPin size={16} />
                            <span>{report.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users size={16} />
                            <span>By: {report.username}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrendingUp size={16} />
                            <span>{report.votes} votes</span>
                          </span>
                          <span>{report.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-center mr-4">
                          <p className="text-2xl font-bold text-blue-600">{report.votes}</p>
                          <p className="text-xs text-gray-500">community votes</p>
                        </div>
                        <select
                          value={report.status}
                          onChange={(e) =>
                            handleStatusUpdate(report.id, e.target.value as IssueStatus)
                          }
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <Filter className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No reports found matching your criteria</p>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;