// import React, { useState } from 'react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import { mockBookings, mockUsers, mockCars } from '../data/mockData';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Plus, Calendar } from 'lucide-react';

// const CarBooking = () => {
//   const [bookings, setBookings] = useLocalStorage('bookings', mockBookings);
//   const [users] = useLocalStorage('users', mockUsers);
//   const [cars] = useLocalStorage('cars', mockCars);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [formData, setFormData] = useState({
//     userId: '',
//     carId: '',
//     startDate: '',
//     endDate: '',
//     status: 'Active',
//     amount: ''
//   });

//   const getUserName = (userId) => {
//     const user = users.find(u => u.id === userId);
//     return user ? user.name : 'Unknown User';
//   };

//   const getCarModel = (carId) => {
//     const car = cars.find(c => c.id === carId);
//     return car ? car.model : 'Unknown Car';
//   };

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { 
//       key: 'userId', 
//       label: 'User', 
//       sortable: true,
//       render: (userId) => getUserName(userId)
//     },
//     { 
//       key: 'carId', 
//       label: 'Car', 
//       sortable: true,
//       render: (carId) => getCarModel(carId)
//     },
//     { key: 'startDate', label: 'Start Date', sortable: true },
//     { key: 'endDate', label: 'End Date', sortable: true },
//     { 
//       key: 'status', 
//       label: 'Status', 
//       sortable: true,
//       render: (status) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           status === 'Active' ? 'bg-green-100 text-green-800' :
//           status === 'Completed' ? 'bg-blue-100 text-blue-800' :
//           'bg-red-100 text-red-800'
//         }`}>
//           {status}
//         </span>
//       )
//     },
//     { 
//       key: 'amount', 
//       label: 'Amount', 
//       sortable: true,
//       render: (amount) => `$${amount}`
//     }
//   ];

//   const handleAdd = () => {
//     setEditingBooking(null);
//     setFormData({
//       userId: '',
//       carId: '',
//       startDate: '',
//       endDate: '',
//       status: 'Active',
//       amount: ''
//     });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (booking) => {
//     setEditingBooking(booking);
//     setFormData(booking);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (booking) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       setBookings(bookings.filter(b => b.id !== booking.id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingBooking) {
//       setBookings(bookings.map(b => b.id === editingBooking.id ? { ...formData, id: editingBooking.id } : b));
//     } else {
//       const newBooking = {
//         ...formData,
//         id: Math.max(...bookings.map(b => b.id)) + 1,
//         userId: parseInt(formData.userId),
//         carId: parseInt(formData.carId),
//         amount: parseFloat(formData.amount)
//       };
//       setBookings([...bookings, newBooking]);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <Calendar className="w-8 h-8 text-purple-600" />
//           <h1 className="text-2xl font-bold text-gray-900">Car Bookings</h1>
//         </div>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>New Booking</span>
//         </button>
//       </div>

//       <Table
//         data={bookings}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingBooking ? 'Edit Booking' : 'New Booking'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">User</label>
//             <select
//               required
//               value={formData.userId}
//               onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select User</option>
//               {users.map(user => (
//                 <option key={user.id} value={user.id}>{user.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Car</label>
//             <select
//               required
//               value={formData.carId}
//               onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select Car</option>
//               {cars.filter(car => car.status === 'Available').map(car => (
//                 <option key={car.id} value={car.id}>{car.model} - ${car.price}/day</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               required
//               value={formData.startDate}
//               onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               required
//               value={formData.endDate}
//               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
//               <option value="Active">Active</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Amount</label>
//             <input
//               type="number"
//               required
//               value={formData.amount}
//               onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingBooking ? 'Update' : 'Create'}
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

// export default CarBooking;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const KEY = 'bookings';
const load = (k, f = []) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const CarBooking = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => { setRows(load(KEY)); }, []);

  const onDelete = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next); save(KEY, next);
    toast.success('Booking deleted');
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings</h1>
          <Link to="/car-booking/new" className="px-4 py-2 rounded bg-blue-600 text-white">New Booking</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">End</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Amount</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{r.userId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.carId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.startDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.endDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{r.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => onDelete(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400" colSpan={6}>No bookings found. Click “New Booking”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CarBooking;
