import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { mockMessages } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ContactMessages = () => {
  const [messages, setMessages] = useLocalStorage('messages', mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Read' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'date', label: 'Date', sortable: true }
  ];

  const handleView = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    
    // Mark as read
    if (message.status === 'Unread') {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, status: 'Read' } : m
      ));
    }
  };

  const handleDelete = (message) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(m => m.id !== message.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <div className="flex space-x-4">
          <span className="text-sm text-gray-600">
            Total: {messages.length} | 
            Unread: {messages.filter(m => m.status === 'Unread').length}
          </span>
        </div>
      </div>

      <Table
        data={messages}
        columns={columns}
        onView={handleView}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From:</label>
              <p className="text-gray-900">{selectedMessage.name} ({selectedMessage.email})</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject:</label>
              <p className="text-gray-900">{selectedMessage.subject}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date:</label>
              <p className="text-gray-900">{selectedMessage.date}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message:</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMessage.message}</p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactMessages;
