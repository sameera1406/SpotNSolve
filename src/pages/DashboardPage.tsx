import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, User, Vote, Search, Filter } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { reports, loadingReports, voteOnPoll, votedIssueIds } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statusCounts = {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'Pending').length,
    inProgress: reports.filter((r) => r.status === 'In Progress').length,
    resolved: reports.filter((r) => r.status === 'Resolved').length,
  };

  const categories = Array.from(new Set(reports.map((r) => r.category).filter(Boolean))) as string[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVote = async (reportId: string) => {
    if (user) {
      try {
        await voteOnPoll(reportId, user.id);
      } catch (err) {
        console.error('[DashboardPage] handleVote error:', err);
      }
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Dashboard</h1>
          <p className="text-gray-600">Track and monitor civic issues in your area</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-800">{statusCounts.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{statusCounts.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{statusCounts.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Vote className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Issue Map</h2>
              <div
                className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1)), url("https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                }}
              >
                <div className="text-center p-6 bg-white/80 rounded-xl backdrop-blur-sm">
                  <MapPin className="mx-auto mb-2 text-blue-600" size={48} />
                  <p className="text-gray-700 font-medium">Interactive Issue Heatmap</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Visualizing {reports.length} reported issues across the city
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {reports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{report.title}</p>
                      <p className="text-xs text-gray-600">{report.username}</p>
                    </div>
                  </div>
                ))}
                {reports.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No reports yet</p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-2">Community Impact</h3>
              <p className="text-2xl font-bold mb-1">
                {reports.reduce((sum, r) => sum + r.votes, 0)}
              </p>
              <p className="text-sm opacity-90">Total Community Votes</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">All Reports</h2>

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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const hasVoted = votedIssueIds.has(report.id);
              return (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
                        >
                          {report.status}
                        </span>
                        {report.category && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {report.category}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{report.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{report.username}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{report.createdAt.toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{report.votes}</p>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                      <button
                        onClick={() => handleVote(report.id)}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                          hasVoted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Vote size={16} />
                        <span>{hasVoted ? 'Voted' : 'Vote'}</span>
                      </button>
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
  );
};

export default DashboardPage;