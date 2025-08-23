// import React, { useState } from 'react';
import Table from '../components/common/Table';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Download, Upload, UserPlus } from 'lucide-react';

const Subscribers = () => {
  const [subscribers, setSubscribers] = useLocalStorage('subscribers', [
    { id: 1, email: 'user1@example.com', subscribeDate: '2024-01-15', status: 'Active', source: 'Website' },
    { id: 2, email: 'user2@example.com', subscribeDate: '2024-02-20', status: 'Active', source: 'Mobile App' },
    { id: 3, email: 'user3@example.com', subscribeDate: '2024-03-10', status: 'Unsubscribed', source: 'Website' },
    { id: 4, email: 'user4@example.com', subscribeDate: '2024-04-05', status: 'Active', source: 'Social Media' }
  ]);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subscribeDate', label: 'Subscribe Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'source', label: 'Source', sortable: true }
  ];

  const handleUnsubscribe = (subscriber) => {
    if (window.confirm('Are you sure you want to unsubscribe this user?')) {
      setSubscribers(subscribers.map(s => 
        s.id === subscriber.id ? { ...s, status: 'Unsubscribed' } : s
      ));
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Email,Subscribe Date,Status,Source\n"
      + subscribers.map(s => `${s.id},${s.email},${s.subscribeDate},${s.status},${s.source}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-600 mt-1">
            Total: {subscribers.length} | 
            Active: {subscribers.filter(s => s.status === 'Active').length} |
            Unsubscribed: {subscribers.filter(s => s.status === 'Unsubscribed').length}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <Table
        data={subscribers}
        columns={columns}
        onDelete={handleUnsubscribe}
      />
    </div>
  );
};

export default Subscribers;
