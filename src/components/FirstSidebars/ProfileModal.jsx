import React from 'react';
import { X, User, Mail, Calendar, Settings, LogOut } from 'lucide-react';

const ProfileModal = ({ onClose }) => {
  const adminData = {
    name: "Super Admin",
    email: "admin@rentipy.com",
    role: "Administrator",
    joinDate: "January 2024",
    lastLogin: "2 hours ago",
    status: "Active",
    avatar: null
  };

  const handleEditProfile = () => {
    console.log("Edit profile");
    // Navigate to profile edit page or open edit modal
  };

  const handleChangePassword = () => {
    console.log("Change password");
    // Navigate to change password page or open modal
  };

  const handleAccountSettings = () => {
    console.log("Account settings");
    // Navigate to account settings
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          {/* Avatar and Basic Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {adminData.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {adminData.email}
            </p>
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full mt-2">
              {adminData.status}
            </span>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">{adminData.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{adminData.joinDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Login</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{adminData.lastLogin}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleEditProfile}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
            
            <button 
              onClick={handleChangePassword}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Change Password
            </button>

            <button 
              onClick={handleAccountSettings}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t dark:border-gray-700">
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
