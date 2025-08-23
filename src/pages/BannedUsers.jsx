import React from 'react';
import Table from '../components/common/Table';
import { mockUsers } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Ban, UserX } from 'lucide-react';

const BannedUsers = () => {
  const [users, setUsers] = useLocalStorage('users', mockUsers);
  
  const bannedUsers = users.filter(user => user.status === 'Banned');

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { 
      key: 'verified', 
      label: 'Was Verified', 
      render: (verified) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          verified ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {verified ? 'Yes' : 'No'}
        </span>
      )
    }
  ];

  const handleUnban = (user) => {
    if (window.confirm(`Are you sure you want to unban ${user.name}?`)) {
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, status: 'Active' } : u
      ));
    }
  };

  const handlePermanentDelete = (user) => {
    if (window.confirm(`Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`)) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Ban className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Banned Users</h1>
            <p className="text-gray-600">Total banned users: {bannedUsers.length}</p>
          </div>
        </div>
      </div>

      {bannedUsers.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
          <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Banned Users</h3>
          <p className="text-gray-600">There are currently no banned users in the system.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Banned Users List</h2>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  Bulk Unban
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Bulk Delete
                </button>
              </div>
            </div>
            
            <Table
              data={bannedUsers}
              columns={columns}
              onEdit={(user) => handleUnban(user)}
              onDelete={(user) => handlePermanentDelete(user)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannedUsers;
