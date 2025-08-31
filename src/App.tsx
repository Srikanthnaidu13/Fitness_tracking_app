import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FitnessProvider } from './contexts/FitnessContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import Profile from './components/Profile/Profile';
import Workouts from './components/Workouts/Workouts';
import Diet from './components/Diet/Diet';
import Progress from './components/Progress/Progress';
import WeeklyReport from './components/Reports/WeeklyReport';
import Camera from './components/Camera/Camera';
import './index.css';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <Layout>
      <FitnessProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/reports" element={<WeeklyReport />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </FitnessProvider>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;