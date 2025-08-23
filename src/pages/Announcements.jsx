import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { mockAnnouncements } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Volume2, Megaphone } from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useLocalStorage('announcements', mockAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    status: 'Active'
  });

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { 
      key: 'priority', 
      label: 'Priority', 
      sortable: true,
      render: (priority) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          priority === 'High' ? 'bg-red-100 text-red-800' :
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
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'date', label: 'Date', sortable: true }
  ];

  const handleAdd = () => {
    setEditingAnnouncement(null);
    setFormData({ title: '', content: '', priority: 'Medium', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData(announcement);
    setIsModalOpen(true);
  };

  const handleDelete = (announcement) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== announcement.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id ? { ...formData, id: editingAnnouncement.id } : a
      ));
    } else {
      const newAnnouncement = {
        ...formData,
        id: Math.max(...announcements.map(a => a.id)) + 1,
        date: new Date().toISOString().split('T')[0]
      };
      setAnnouncements([...announcements, newAnnouncement]);
    }
    setIsModalOpen(false);
  };

  const activeAnnouncements = announcements.filter(a => a.status === 'Active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Volume2 className="w-8 h-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600">Active: {activeAnnouncements.length} | Total: {announcements.length}</p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Active Announcements Banner */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Megaphone className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Current Active Announcements</h3>
          </div>
          <div className="space-y-2">
            {activeAnnouncements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="flex items-center justify-between bg-white rounded p-2">
                <div>
                  <span className="font-medium text-gray-900">{announcement.title}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    announcement.priority === 'High' ? 'bg-red-100 text-red-800' :
                    announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{announcement.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Table
        data={announcements}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}
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
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="4"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingAnnouncement ? 'Update' : 'Create'}
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

export default Announcements;
