import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Star, Award, TrendingUp, Users } from 'lucide-react';
import type { LeaderboardEntry } from '../types';

const GamificationPage: React.FC = () => {
  const { getLeaderboard } = useData();
  const { profile } = useAuth();

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLeaderboard()
      .then(setLeaderboard)
      .catch((err) => console.error('[GamificationPage] getLeaderboard:', err))
      .finally(() => setLoading(false));
  }, [getLeaderboard]);

  const userStats = leaderboard.find((u) => u.username === profile?.username);
  const userRank = leaderboard.findIndex((u) => u.username === profile?.username) + 1;

  const badges = [
    {
      id: 1,
      name: 'First Reporter',
      description: 'Submit your first issue report',
      icon: <Award size={24} />,
      color: 'bg-blue-500',
      earned: (userStats?.reports ?? 0) >= 1,
    },
    {
      id: 2,
      name: 'Community Helper',
      description: 'Vote on 10 different issues',
      icon: <Users size={24} />,
      color: 'bg-green-500',
      earned: (profile?.points ?? 0) >= 10,
    },
    {
      id: 3,
      name: 'Top Contributor',
      description: 'Rank in top 10 contributors',
      icon: <Trophy size={24} />,
      color: 'bg-yellow-500',
      earned: userRank > 0 && userRank <= 10,
    },
    {
      id: 4,
      name: 'Problem Solver',
      description: 'Report 5 issues that get resolved',
      icon: <Star size={24} />,
      color: 'bg-purple-500',
      earned: (userStats?.reports ?? 0) >= 5,
    },
    {
      id: 5,
      name: 'Civic Champion',
      description: 'Earn 500+ points',
      icon: <Medal size={24} />,
      color: 'bg-red-500',
      earned: (profile?.points ?? 0) >= 500,
    },
  ];

  const earnedBadges = badges.filter((badge) => badge.earned);
  const availableBadges = badges.filter((badge) => !badge.earned);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Gamification Hub</h1>
          <p className="text-xl text-gray-600">Track your impact and compete with fellow citizens</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {profile?.username?.charAt(0).toUpperCase() ?? '?'}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{profile?.username ?? 'User'}</h2>
                <p className="text-gray-600">Community Contributor</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="text-blue-600" size={24} />
                    <span className="font-medium text-gray-800">Current Points</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {profile?.points ?? 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="text-green-600" size={24} />
                    <span className="font-medium text-gray-800">Reports Made</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {userStats?.reports ?? 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Medal className="text-purple-600" size={24} />
                    <span className="font-medium text-gray-800">Leaderboard Rank</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {userRank > 0 ? `#${userRank}` : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your Badges</h3>

              {earnedBadges.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">
                    Earned ({earnedBadges.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="p-4 border-2 border-gray-200 rounded-lg text-center"
                      >
                        <div
                          className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-white mx-auto mb-2`}
                        >
                          {badge.icon}
                        </div>
                        <h5 className="text-sm font-bold text-gray-800">{badge.name}</h5>
                        <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableBadges.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-3">
                    Available ({availableBadges.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availableBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center opacity-60"
                      >
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                          {badge.icon}
                        </div>
                        <h5 className="text-sm font-bold text-gray-800">{badge.name}</h5>
                        <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Community Leaderboard</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Trophy size={16} />
                  <span>Top Contributors</span>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading leaderboard...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leaderboard.slice(0, 10).map((contributor, index) => (
                    <div
                      key={contributor.username}
                      className={`flex items-center justify-between p-6 rounded-xl transition-all duration-200 ${
                        contributor.username === profile?.username
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                            index === 0
                              ? 'bg-yellow-500 text-white'
                              : index === 1
                              ? 'bg-gray-400 text-white'
                              : index === 2
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-800">{contributor.username}</h3>
                            {contributor.username === profile?.username && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                                You
                              </span>
                            )}
                            {index < 3 && (
                              <div className="flex items-center">
                                {index === 0 && <Trophy className="text-yellow-500" size={16} />}
                                {index === 1 && <Medal className="text-gray-400" size={16} />}
                                {index === 2 && <Award className="text-yellow-600" size={16} />}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{contributor.reports} reports submitted</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{contributor.points}</p>
                        <p className="text-sm text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && leaderboard.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 text-lg">No contributors yet</p>
                  <p className="text-gray-500 text-sm">Be the first to earn points!</p>
                </div>
              )}
            </div>

            {/* How Points Work */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white mt-8">
              <h3 className="text-2xl font-bold mb-6">How Points Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">10</span>
                  </div>
                  <span>Points for each report submitted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <span>Points for each vote received</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">5</span>
                  </div>
                  <span>Bonus for resolved issues</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <span>Point for voting on others' reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPage;