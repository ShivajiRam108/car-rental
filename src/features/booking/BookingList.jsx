import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import NewBooking from './NewBooking';
import { listBookings, removeBooking } from './bookingService';

const BookingList = () => {
  const [items, setItems] = useState([]);
  const reload = () => setItems(listBookings());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'userId', label: 'User' },
    { key: 'carId', label: 'Car' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
    { key: 'amount', label: 'Amount', render: v => `$${v}` },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings</h1>
      <NewBooking onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removeBooking(row.id); reload(); }} />
    </div>
  );
};

export default BookingList;
