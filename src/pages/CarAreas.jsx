// import React, { useState } from 'react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import { carAreas } from '../data/mockData';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Plus, MapPin } from 'lucide-react';

// const CarAreas = () => {
//   const [areas, setAreas] = useLocalStorage('carAreas', 
//     carAreas.map((area, index) => ({ 
//       id: index + 1, 
//       name: area, 
//       city: 'New York',
//       zipCode: '10001',
//       active: true,
//       createdDate: '2024-01-01'
//     }))
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingArea, setEditingArea] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     city: '',
//     zipCode: '',
//     active: true
//   });

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { key: 'name', label: 'Area Name', sortable: true },
//     { key: 'city', label: 'City', sortable: true },
//     { key: 'zipCode', label: 'Zip Code', sortable: true },
//     { 
//       key: 'active', 
//       label: 'Status', 
//       sortable: true,
//       render: (active) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//         }`}>
//           {active ? 'Active' : 'Inactive'}
//         </span>
//       )
//     },
//     { key: 'createdDate', label: 'Created Date', sortable: true }
//   ];

//   const handleAdd = () => {
//     setEditingArea(null);
//     setFormData({ name: '', city: '', zipCode: '', active: true });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (area) => {
//     setEditingArea(area);
//     setFormData(area);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (area) => {
//     if (window.confirm('Are you sure you want to delete this area?')) {
//       setAreas(areas.filter(a => a.id !== area.id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingArea) {
//       setAreas(areas.map(a => a.id === editingArea.id ? { ...formData, id: editingArea.id } : a));
//     } else {
//       const newArea = {
//         ...formData,
//         id: Math.max(...areas.map(a => a.id)) + 1,
//         createdDate: new Date().toISOString().split('T')[0]
//       };
//       setAreas([...areas, newArea]);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <MapPin className="w-8 h-8 text-red-600" />
//           <h1 className="text-2xl font-bold text-gray-900">Car Areas</h1>
//         </div>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add Area</span>
//         </button>
//       </div>

//       <Table
//         data={areas}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingArea ? 'Edit Area' : 'Add Area'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Area Name</label>
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">City</label>
//             <input
//               type="text"
//               required
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Zip Code</label>
//             <input
//               type="text"
//               required
//               value={formData.zipCode}
//               onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={formData.active}
//               onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <label className="ml-2 text-sm text-gray-700">Active</label>
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingArea ? 'Update' : 'Create'}
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

// export default CarAreas;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const KEY = 'areas';
const load = (k, f = []) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const CarAreas = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => { setRows(load(KEY)); }, []);

  const onDelete = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next); save(KEY, next);
    toast.success('Area deleted');
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Areas</h1>
          <Link to="/car-areas/new" className="px-4 py-2 rounded bg-blue-600 text-white">Add Area</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{r.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.country}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{r.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => onDelete(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400" colSpan={5}>No areas found. Click “Add Area”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CarAreas;
