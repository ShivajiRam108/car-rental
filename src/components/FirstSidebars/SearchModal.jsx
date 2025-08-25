import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { sidebarItems } from '../../data/sidebarItems';

const SearchModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = sidebarItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 8)); // Limit to 8 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleItemClick = (item) => {
    const routeMap = {
      'Dashboard': '/',
      'Setup Currency': '/setup-currency',
      'Contact Messages': '/contact-messages',
      'Subscribers': '/subscribers',
      'Car Types': '/car-types',
      'Car Areas': '/car-areas',
      'Cars': '/cars',
      'Car Booking': '/car-booking',
      'Booking History': '/booking-history',
      'Payment Methods': '/payment-methods',
      'User Management': '/user-management',
      'User Verification': '/user-verification',
      'Banned Users': '/banned-users',
      'Analytics': '/analytics',
      'Reports': '/reports',
      'Announcements': '/announcements',
      'Email Templates': '/email-templates',
      'Notifications': '/notifications',
      'Activity Logs': '/activity-logs',
      'System Settings': '/system-settings',
      'Security': '/security',
      'Backup & Restore': '/backup-restore',
      'Help & Support': '/help-support'
    };

    const route = routeMap[item.name] || '/';
    window.location.href = route;
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    // <div className="absolute top-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 w-96 z-50">
    <div className="absolute top-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 w-80 z-50">

      {/* Header */}
      <div className="flex items-center p-3 border-b dark:border-gray-700">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search dashboard pages..."
          className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 text-sm"
        />
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Results */}
      <div className="max-h-80 overflow-y-auto">
        {searchResults.length > 0 &&
          searchResults.map((item) => (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className="w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700 last:border-b-0 transition-colors"
            >
              <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {item.section}
                </div>
              </div>
            </button>
          ))}

        {searchQuery && searchResults.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No results found for "{searchQuery}"</p>
          </div>
        )}

        {!searchQuery && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Type to search dashboard pages...</p>
            <div className="mt-3 text-xs">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                ESC
              </kbd>
              <span className="ml-2">to close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
