import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import AddCar from './AddCar';
import { listCars, removeCar } from './carService';

const CarList = () => {
  const [items, setItems] = useState([]);
  const reload = () => setItems(listCars());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'model', label: 'Model' },
    { key: 'brand', label: 'Brand' },
    { key: 'type', label: 'Type' },
    { key: 'pricePerDay', label: 'Price/Day', render: v => `$${v}` },
    { key: 'status', label: 'Status', render: v => (
      <span className={`px-2 py-1 rounded-full text-xs ${v==='Available'?'bg-green-100 text-green-700': v==='Booked'?'bg-blue-100 text-blue-700':'bg-orange-100 text-orange-700'}`}>{v}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cars</h1>
      <AddCar onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removeCar(row.id); reload(); }} />
    </div>
  );
};

export default CarList;
