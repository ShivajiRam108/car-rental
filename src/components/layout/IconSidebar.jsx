import React, { useState } from "react";
import { Sun, Moon, Search, Bell, Settings, User, LogOut } from "lucide-react";
import SearchModal from "../FirstSidebars/SearchModal";
import NotificationDropdown from "../FirstSidebars/NotificationDropdown";
import ProfileModal from "../FirstSidebars/ProfileModal";
import { useTheme } from "../FirstSidebars/ThemeContext";

const IconSidebar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleSearch = () => setShowSearchModal(true);
  const handleNotifications = () => setShowNotifications(!showNotifications);
  const handleSettings = () => {
    // Navigate to settings page using React Router
    window.location.href = '/system-settings';
  };
  const handleProfile = () => setShowProfileModal(true);
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  const closeModals = () => {
    setShowSearchModal(false);
    setShowProfileModal(false);
    setShowNotifications(false);
  };

  return (
    <>
      <div className="h-screen w-16 bg-gray-900 dark:bg-gray-950 text-white flex flex-col justify-between py-6 transition-colors duration-300">
        {/* Top Section */}
        <div className="flex flex-col items-center gap-6">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            title="Toggle Theme"
            className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
          >
            {darkMode ? (
              <Sun size={24} className="text-yellow-400 hover:text-yellow-300" />
            ) : (
              <Moon size={24} className="text-blue-400 hover:text-blue-300" />
            )}
          </button>

          {/* Search */}
          <button 
            onClick={handleSearch}
            title="Search"
            className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
          >
            <Search size={24} className="text-green-400 hover:text-green-300" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={handleNotifications}
              title="Notifications"
              className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200 relative"
            >
              <Bell size={24} className="text-orange-400 hover:text-orange-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            {showNotifications && (
              <NotificationDropdown onClose={closeModals} />
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6">
          {/* Settings */}
          <button 
            onClick={handleSettings}
            title="Settings"
            className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
          >
            <Settings size={24} className="text-purple-400 hover:text-purple-300" />
          </button>

          {/* Admin Profile */}
          <button 
            onClick={handleProfile}
            title="Admin Profile"
            className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
          >
            <User size={24} className="text-cyan-400 hover:text-cyan-300" />
          </button>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            title="Logout"
            className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
          >
            <LogOut size={24} className="text-red-400 hover:text-red-300" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showSearchModal && (
        <SearchModal onClose={closeModals} />
      )}

      {showProfileModal && (
        <ProfileModal onClose={closeModals} />
      )}
    </>
  );
};

export default IconSidebar;
