import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Bell, Send, Users, Settings } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useLocalStorage('notifications', [
    {
      id: 1,
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur this Sunday from 2-4 AM.',
      type: 'System',
      target: 'All Users',
      status: 'Sent',
      priority: 'High',
      sentDate: '2024-08-20',
      readCount: 45
    },
    {
      id: 2,
      title: 'New Car Models Available',
      message: 'Check out our latest luxury car additions to the fleet.',
      type: 'Marketing',
      target: 'Active Users',
      status: 'Draft',
      priority: 'Medium',
      sentDate: null,
      readCount: 0
    },
    {
      id: 3,
      title: 'Booking Confirmation',
      message: 'Your recent booking has been confirmed. Thank you!',
      type: 'Booking',
      target: 'Specific User',
      status: 'Sent',
      priority: 'Low',
      sentDate: '2024-08-22',
      readCount: 1
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'General',
    target: 'All Users',
    priority: 'Medium',
    status: 'Draft'
  });

  const notificationTypes = ['General', 'System', 'Marketing', 'Booking', 'Security', 'Maintenance'];
  const targetOptions = ['All Users', 'Active Users', 'Verified Users', 'Premium Users', 'Specific User'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'target', label: 'Target', sortable: true },
    { 
      key: 'priority', 
      label: 'Priority', 
      sortable: true,
      render: (priority) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          priority === 'Urgent' ? 'bg-red-100 text-red-800' :
          priority === 'High' ? 'bg-orange-100 text-orange-800' :
          priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {priority}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Sent' ? 'bg-green-100 text-green-800' :
          status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'sentDate', label: 'Sent Date', sortable: true },
    { key: 'readCount', label: 'Read Count', sortable: true }
  ];

  const handleAdd = () => {
    setEditingNotification(null);
    setFormData({
      title: '',
      message: '',
      type: 'General',
      target: 'All Users',
      priority: 'Medium',
      status: 'Draft'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (notification) => {
    setEditingNotification(notification);
    setFormData(notification);
    setIsModalOpen(true);
  };

  const handleDelete = (notification) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== notification.id));
    }
  };

  const handleSend = (notification) => {
    if (window.confirm('Are you sure you want to send this notification?')) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { 
          ...n, 
          status: 'Sent', 
          sentDate: new Date().toISOString().split('T')[0]
        } : n
      ));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNotification) {
      setNotifications(notifications.map(n => 
        n.id === editingNotification.id ? { ...formData, id: editingNotification.id } : n
      ));
    } else {
      const newNotification = {
        ...formData,
        id: Math.max(...notifications.map(n => n.id)) + 1,
        sentDate: null,
        readCount: 0
      };
      setNotifications([...notifications, newNotification]);
    }
    setIsModalOpen(false);
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'Sent').length,
    draft: notifications.filter(n => n.status === 'Draft').length,
    totalReads: notifications.reduce((sum, n) => sum + n.readCount, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage push notifications and alerts</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Notification</span>
          </button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
            <div className="text-sm text-gray-600">Sent</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
            <div className="text-sm text-gray-600">Draft</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.totalReads}</div>
            <div className="text-sm text-gray-600">Total Reads</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          data={notifications}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</h3>
          <div className="flex flex-wrap gap-2">
            {notifications.filter(n => n.status === 'Draft').map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleSend(notification)}
                className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-lg text-sm flex items-center space-x-2"
              >
                <Send className="w-3 h-3" />
                <span>Send: {notification.title.substring(0, 20)}...</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNotification ? 'Edit Notification' : 'New Notification'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="4"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {notificationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Audience</label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {targetOptions.map(target => (
                  <option key={target} value={target}>{target}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {priorityOptions.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Notification Preview:</h4>
            <div className="bg-white p-3 rounded border border-blue-200">
              <div className="font-medium text-gray-900">{formData.title || 'Notification Title'}</div>
              <div className="text-sm text-gray-600 mt-1">{formData.message || 'Notification message content...'}</div>
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingNotification ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Notifications;
