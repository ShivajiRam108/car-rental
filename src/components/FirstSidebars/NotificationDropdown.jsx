import React from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationDropdown = ({ onClose }) => {
  const notifications = [
    { 
      id: 1, 
      message: "New user registered", 
      time: "2 min ago", 
      type: "info",
      unread: true 
    },
    { 
      id: 2, 
      message: "System backup completed successfully", 
      time: "1 hour ago", 
      type: "success",
      unread: true 
    },
    { 
      id: 3, 
      message: "Car booking confirmed", 
      time: "3 hours ago", 
      type: "success",
      unread: false 
    },
    { 
      id: 4, 
      message: "Server maintenance scheduled", 
      time: "5 hours ago", 
      type: "warning",
      unread: false 
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const markAllAsRead = () => {
    console.log("Mark all as read");
    // Add your logic to mark notifications as read
  };

  return (
    <div className="absolute top-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 w-80 z-50">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {notifications.some(n => n.unread) && (
          <button 
            onClick={markAllAsRead}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
              {notification.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t dark:border-gray-700">
        <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
