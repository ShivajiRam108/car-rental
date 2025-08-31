// import React, { useState } from 'react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import { mockCars, carTypes, carAreas } from '../data/mockData';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Plus } from 'lucide-react';

// const Cars = () => {
//   const [cars, setCars] = useLocalStorage('cars', mockCars);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingCar, setEditingCar] = useState(null);
//   const [formData, setFormData] = useState({
//     model: '',
//     type: '',
//     area: '',
//     price: '',
//     status: 'Available',
//     year: new Date().getFullYear()
//   });

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { key: 'model', label: 'Model', sortable: true },
//     { key: 'type', label: 'Type', sortable: true },
//     { key: 'area', label: 'Area', sortable: true },
//     { 
//       key: 'price', 
//       label: 'Price/Day', 
//       sortable: true,
//       render: (price) => `$${price}`
//     },
//     { 
//       key: 'status', 
//       label: 'Status', 
//       sortable: true,
//       render: (status) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           status === 'Available' ? 'bg-green-100 text-green-800' :
//           status === 'Booked' ? 'bg-yellow-100 text-yellow-800' :
//           'bg-red-100 text-red-800'
//         }`}>
//           {status}
//         </span>
//       )
//     },
//     { key: 'year', label: 'Year', sortable: true }
//   ];

//   const handleAdd = () => {
//     setEditingCar(null);
//     setFormData({
//       model: '',
//       type: '',
//       area: '',
//       price: '',
//       status: 'Available',
//       year: new Date().getFullYear()
//     });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (car) => {
//     setEditingCar(car);
//     setFormData(car);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (car) => {
//     if (window.confirm('Are you sure you want to delete this car?')) {
//       setCars(cars.filter(c => c.id !== car.id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingCar) {
//       setCars(cars.map(c => c.id === editingCar.id ? { ...formData, id: editingCar.id } : c));
//     } else {
//       const newCar = {
//         ...formData,
//         id: Math.max(...cars.map(c => c.id)) + 1,
//         price: parseFloat(formData.price)
//       };
//       setCars([...cars, newCar]);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Cars Management</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add Car</span>
//         </button>
//       </div>

//       <Table
//         data={cars}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingCar ? 'Edit Car' : 'Add Car'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Model</label>
//             <input
//               type="text"
//               required
//               value={formData.model}
//               onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Type</label>
//             <select
//               value={formData.type}
//               onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select Type</option>
//               {carTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Area</label>
//             <select
//               value={formData.area}
//               onChange={(e) => setFormData({ ...formData, area: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select Area</option>
//               {carAreas.map(area => (
//                 <option key={area} value={area}>{area}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Price per Day</label>
//             <input
//               type="number"
//               required
//               value={formData.price}
//               onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="Available">Available</option>
//               <option value="Booked">Booked</option>
//               <option value="Maintenance">Maintenance</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Year</label>
//             <input
//               type="number"
//               required
//               value={formData.year}
//               onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingCar ? 'Update' : 'Create'}
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

// export default Cars;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const KEY = 'cars';
const load = (k, f = []) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const Cars = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => { setRows(load(KEY)); }, []);

  const onDelete = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next); save(KEY, next);
    toast.success('Car deleted');
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cars</h1>
          <Link to="/cars/new" className="px-4 py-2 rounded bg-blue-600 text-white">Add Car</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Price/Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{r.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.brand}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">${r.pricePerDay}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      r.status === 'Available' ? 'bg-green-100 text-green-700'
                      : r.status === 'Booked' ? 'bg-blue-100 text-blue-700'
                      : 'bg-orange-100 text-orange-700'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => onDelete(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400" colSpan={6}>No cars found. Click “Add Car”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cars;
