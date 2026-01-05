import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import FarmerDashboard from './pages/farmer/Dashboard';
import DealerDashboard from './pages/dealer/Dashboard';
import AdminAnalytics from './pages/admin/Analytics';
import { AppProvider } from './store';

const App: React.FC = () => {
    return (
        <AppProvider>
            <Router>
                <div className="bg-gradient" />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/farmer/*" element={<FarmerDashboard />} />
                    <Route path="/dealer/*" element={<DealerDashboard />} />
                    <Route path="/admin/*" element={<AdminAnalytics />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default App;
