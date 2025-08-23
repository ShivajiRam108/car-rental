import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { mockUsers } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserCheck, CheckCircle, XCircle, Eye } from 'lucide-react';

const UserVerification = () => {
  const [users, setUsers] = useLocalStorage('users', mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unverifiedUsers = users.filter(user => !user.verified);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' :
          status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleVerify = (user) => {
    if (window.confirm(`Are you sure you want to verify ${user.name}?`)) {
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, verified: true } : u
      ));
    }
  };

  const handleReject = (user) => {
    if (window.confirm(`Are you sure you want to reject ${user.name}'s verification?`)) {
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, status: 'Banned' } : u
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <UserCheck className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Verification</h1>
            <p className="text-gray-600">Pending verifications: {unverifiedUsers.length}</p>
          </div>
        </div>
      </div>

      <Table
        data={unverifiedUsers}
        columns={columns}
        onView={handleView}
        searchable={true}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Verification Details"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date:</label>
                <p className="text-gray-900">{selectedUser.joinDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status:</label>
                <p className="text-gray-900">{selectedUser.status}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Verification Documents</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">ID Document: driver_license.pdf</p>
                <p className="text-sm text-gray-600">Address Proof: utility_bill.pdf</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => {
                  handleVerify(selectedUser);
                  setIsModalOpen(false);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Verify User</span>
              </button>
              <button
                onClick={() => {
                  handleReject(selectedUser);
                  setIsModalOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
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

export default UserVerification;
