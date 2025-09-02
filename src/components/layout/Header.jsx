import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  // Map routes to page names
  const getPageName = (pathname) => {
    const pageMap = {
      '/': 'Dashboard',
      '/setup-currency': 'Setup Currency',
      '/contact-messages': 'Contact Messages',
      '/subscribers': 'Subscribers',
      '/car-types': 'Car Types',
      '/car-areas': 'Car Areas',
      '/cars': 'Cars',
      '/car-booking': 'Car Booking',
      '/booking-history': 'Booking History',
      '/payment-methods': 'Payment Methods',
      '/user-management': 'User Management',
      '/user-verification': 'User Verification',
      '/banned-users': 'Banned Users',
      '/analytics': 'Analytics',
      '/reports': 'Reports',
      '/announcements': 'Announcements',
      '/email-templates': 'Email Templates',
      '/notifications': 'Notifications',
      '/activity-logs': 'Activity Logs',
      '/system-settings': 'System Settings',
      '/security': 'Security',
      '/backup-restore': 'Backup & Restore',
      '/help-support': 'Help & Support'
    };
    return pageMap[pathname] || 'Page';
  };

  const currentPage = getPageName(location.pathname);

  return (
    // <header className="bg-blue-300 border-b border-blue-100 px-6 py-4">
    // <header className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-800 px-6 py-4 shadow-sm">
    <header className="bg-white text-gray-800 border-b border-gray-200 px-6 py-4 shadow-sm"> 

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentPage}</h1>
          <p className="text-gray-600">Welcome To Rentify Admin Panel</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">  Dashboard  /</span>
          <span className="text-gray-300"> </span>
          <span className="text-sm font-medium text-gray-900">{currentPage}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
