import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import AddAnnouncement from './AddAnnouncement';
import { listAnnouncements, removeAnnouncement } from './announcementService';

const AnnouncementList = () => {
  const [items, setItems] = useState([]);
  const reload = () => setItems(listAnnouncements());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' },
    { key: 'status', label: 'Status', render: v => (
      <span className={`px-2 py-1 rounded-full text-xs ${v==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{v}</span>
    )},
    { key: 'target', label: 'Target' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
      <AddAnnouncement onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removeAnnouncement(row.id); reload(); }} />
    </div>
  );
};

export default AnnouncementList;
