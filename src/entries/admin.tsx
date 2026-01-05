import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import FarmerDashboard from '../pages/farmer/Dashboard';
import DealerDashboard from '../pages/dealer/Dashboard';
import AdminAnalytics from '../pages/admin/Analytics';
import { AppProvider } from '../store';
import '../styles/index.css';

const AdminApp: React.FC = () => {
    return (
        <AppProvider>
            <Router basename="/admin">
                <div className="bg-gradient" />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/farmer/*" element={<FarmerDashboard />} />
                    <Route path="/dealer/*" element={<DealerDashboard />} />
                    <Route path="/analytics/*" element={<AdminAnalytics />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AppProvider>
    );
};

createRoot(document.getElementById('root')!).render(<AdminApp />);
