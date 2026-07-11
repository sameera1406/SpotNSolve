import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { supabase } from './lib/supabase';

import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ReportPage from './pages/ReportPage';
import DashboardPage from './pages/DashboardPage';
import GamificationPage from './pages/GamificationPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        {role === 'admin' ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/gamification" element={<GamificationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/gamification" element={<GamificationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

function App() {
  useEffect(() => {
  const testConnection = async () => {
    console.log("🚀 Testing Supabase...");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1);

    console.log("Data:", data);
    console.log("Error:", error);
  };

  testConnection();
}, []);

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;