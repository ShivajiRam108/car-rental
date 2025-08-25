import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './components/FirstSidebars/ThemeContext';

// Lazy load all page components for better performance

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SetupCurrency = lazy(() => import('./pages/SetupCurrency'));
const ContactMessages = lazy(() => import('./pages/ContactMessages'));
const Subscribers = lazy(() => import('./pages/Subscribers'));
const CarTypes = lazy(() => import('./pages/CarTypes'));
const CarAreas = lazy(() => import('./pages/CarAreas'));
const Cars = lazy(() => import('./pages/Cars'));
const CarBooking = lazy(() => import('./pages/CarBooking'));
const BookingHistory = lazy(() => import('./pages/BookingHistory'));
const PaymentMethods = lazy(() => import('./pages/PaymentMethods'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const UserVerification = lazy(() => import('./pages/UserVerification'));
const BannedUsers = lazy(() => import('./pages/BannedUsers'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Reports = lazy(() => import('./pages/Reports'));
const Announcements = lazy(() => import('./pages/Announcements'));
const EmailTemplates = lazy(() => import('./pages/EmailTemplates'));
const Notifications = lazy(() => import('./pages/Notifications'));
const ActivityLogs = lazy(() => import('./pages/ActivityLogs'));
const SystemSettings = lazy(() => import('./pages/SystemSettings'));
const Security = lazy(() => import('./pages/Security'));
const BackupRestore = lazy(() => import('./pages/BackupRestore'));
const HelpSupport = lazy(() => import('./pages/HelpSupport'));

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Layout>
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="spinner mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/setup-currency" element={<SetupCurrency />} />
            <Route path="/contact-messages" element={<ContactMessages />} />
            <Route path="/subscribers" element={<Subscribers />} />
            <Route path="/car-types" element={<CarTypes />} />
            <Route path="/car-areas" element={<CarAreas />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car-booking" element={<CarBooking />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/user-verification" element={<UserVerification />} />
            <Route path="/banned-users" element={<BannedUsers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/email-templates" element={<EmailTemplates />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/activity-logs" element={<ActivityLogs />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="/security" element={<Security />} />
            <Route path="/backup-restore" element={<BackupRestore />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
    </ThemeProvider>
  );
}

export default App;
