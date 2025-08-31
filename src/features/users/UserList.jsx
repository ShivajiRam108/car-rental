import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import AddUser from './AddUser';
import { listUsers, removeUser } from './userService';

const UserList = () => {
  const [items, setItems] = useState([]);
  const reload = () => setItems(listUsers());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'verified', label: 'Verified', render: v => (
      <span className={`px-2 py-1 rounded-full text-xs ${v ? 'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{v ? 'Yes':'No'}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
      <AddUser onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removeUser(row.id); reload(); }} />
    </div>
  );
};

export default UserList;
