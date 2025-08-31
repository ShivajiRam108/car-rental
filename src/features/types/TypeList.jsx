import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import AddType from './AddType';
import { listTypes, removeType } from './typeService';

const TypeList = () => {
  const [items, setItems] = useState([]);

  const reload = () => setItems(listTypes());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'name', label: 'Type' },
    { key: 'description', label: 'Description' },
    { key: 'active', label: 'Status', render: (v) => (
      <span className={`px-2 py-1 rounded-full text-xs ${v ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{v ? 'Active' : 'Inactive'}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Car Types</h1>
      </div>
      <AddType onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removeType(row.id); reload(); }} />
    </div>
  );
};

export default TypeList;
