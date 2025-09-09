import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './components/FirstSidebars/ThemeContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Locations from './pages/Locations';

// Lazy load all page components
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
const Location = lazy(() => import('./pages/Locations'));

const AddType = lazy(() => import('./features/types/AddType'));
const AddArea = lazy(() => import('./features/areas/AddArea'));
const AddCar = lazy(() => import('./features/cars/AddCar'));
const NewBooking = lazy(() => import('./features/booking/NewBooking'));
const PaymentMethodForm = lazy(() => import('./features/payments/PaymentMethodForm'));
const AddUser = lazy(() => import('./features/users/AddUser'));
const AddAnnouncement = lazy(() => import('./features/announcements/AddAnnouncement'));

// 🔥 NEW Login & Signup imports
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="spinner mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected/Admin Layout Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/setup-currency" element={<SetupCurrency />} />
              <Route path="/contact-messages" element={<ContactMessages />} />
              <Route path="/subscribers" element={<Subscribers />} />
              <Route path="/car-types" element={<CarTypes />} />
              <Route path="/car-areas" element={<CarAreas />} />
              <Route path="/locations" element={<Locations />} />
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

              {/* Add New Routes */}
              <Route path="/car-types/new" element={<AddType />} />
              <Route path="/car-areas/new" element={<AddArea />} />
              <Route path="/cars/new" element={<AddCar />} />
              <Route path="/car-booking/new" element={<NewBooking />} />
              <Route path="/payment-methods/new" element={<PaymentMethodForm />} />
              <Route path="/user-management/new" element={<AddUser />} />
              <Route path="/announcements/new" element={<AddAnnouncement />} />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>

        {/* Global Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
