import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp, Award } from 'lucide-react';
import { fetchStats } from '../services/issueService';
import type { IssueStats } from '../services/issueService';

const HomePage: React.FC = () => {
  const [stats, setStats] = useState<IssueStats | null>(null);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((err) => console.error('[HomePage] fetchStats:', err));
  }, []);

  const totalIssues = stats?.total ?? 0;
  const resolvedIssues = stats?.resolved ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Report Civic Issues Easily
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Making our communities better, one report at a time
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Link
              to="/report"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Report Now
            </Link>
            <Link
              to="/dashboard"
              className="inline-block bg-transparent hover:bg-white hover:text-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg border-2 border-white transition-all duration-300 transform hover:scale-105"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Making a Real Impact</h2>
            <p className="text-xl text-gray-600">See how our community is working together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {totalIssues.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium">Issues Reported</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {resolvedIssues.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium">Issues Resolved</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stats ? stats.pending + stats.inProgress : 0}
              </h3>
              <p className="text-gray-600 font-medium">Active Issues</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {totalIssues > 0 ? `${Math.round((resolvedIssues / totalIssues) * 100)}%` : '—'}
              </h3>
              <p className="text-gray-600 font-medium">Resolution Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Spot &amp; Solve?</h2>
            <p className="text-xl text-gray-600">
              Powerful features that make reporting simple and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Location Tracking</h3>
              <p className="text-gray-600">
                Automatically capture precise locations to help authorities respond faster.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Track the progress of your reports from submission to resolution.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Gamification</h3>
              <p className="text-gray-600">
                Earn points and badges for contributing to your community's wellbeing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of citizens working together to improve our communities
          </p>
          <Link
            to="/report"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Reporting Issues
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;