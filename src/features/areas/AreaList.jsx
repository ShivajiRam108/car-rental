import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import AddArea from './AddArea';
import { listAreas, removeArea } from './areaService';

const AreaList = () => {
  const [items, setItems] = useState([]);
  const reload = () => setItems(listAreas());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'name', label: 'Area' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'active', label: 'Status', render: (v) => (
      <span className={`px-2 py-1 rounded-full text-xs ${v ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{v ? 'Active' : 'Inactive'}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Areas</h1>
      <AddArea onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removeArea(row.id); reload(); }} />
    </div>
  );
};

export default AreaList;
