// import React, { useState } from 'react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import { mockUsers } from '../data/mockData';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Plus } from 'lucide-react';

// const UserManagement = () => {
//   const [users, setUsers] = useLocalStorage('users', mockUsers);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     status: 'Active',
//     verified: true
//   });

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { key: 'name', label: 'Name', sortable: true },
//     { key: 'email', label: 'Email', sortable: true },
//     { 
//       key: 'status', 
//       label: 'Status', 
//       sortable: true,
//       render: (status) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           status === 'Active' ? 'bg-green-100 text-green-800' :
//           status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
//           'bg-red-100 text-red-800'
//         }`}>
//           {status}
//         </span>
//       )
//     },
//     { 
//       key: 'verified', 
//       label: 'Verified', 
//       render: (verified) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           verified ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//         }`}>
//           {verified ? 'Yes' : 'No'}
//         </span>
//       )
//     },
//     { key: 'joinDate', label: 'Join Date', sortable: true }
//   ];

//   const handleAdd = () => {
//     setEditingUser(null);
//     setFormData({ name: '', email: '', status: 'Active', verified: true });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormData(user);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (user) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter(u => u.id !== user.id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingUser) {
//       setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: editingUser.id } : u));
//     } else {
//       const newUser = {
//         ...formData,
//         id: Math.max(...users.map(u => u.id)) + 1,
//         joinDate: new Date().toISOString().split('T')[0]
//       };
//       setUsers([...users, newUser]);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add User</span>
//         </button>
//       </div>

//       <Table
//         data={users}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingUser ? 'Edit User' : 'Add User'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//               <option value="Banned">Banned</option>
//             </select>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={formData.verified}
//               onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <label className="ml-2 text-sm text-gray-700">Verified</label>
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingUser ? 'Update' : 'Create'}
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(false)}
//               className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default UserManagement;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const KEY = 'users';
const load = (k, f = []) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => { setRows(load(KEY)); }, []);

  const onDelete = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next); save(KEY, next);
    toast.success('User deleted');
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <Link to="/user-management/new" className="px-4 py-2 rounded bg-blue-600 text-white">Add User</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Verified</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{r.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{r.verified ? 'Yes' : 'No'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => onDelete(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400" colSpan={5}>No users found. Click “Add User”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
