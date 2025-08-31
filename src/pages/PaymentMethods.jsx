// import React, { useState } from 'react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Plus, CreditCard } from 'lucide-react';

// const PaymentMethods = () => {
//   const [paymentMethods, setPaymentMethods] = useLocalStorage('paymentMethods', [
//     { id: 1, name: 'Credit Card', type: 'Card', provider: 'Stripe', enabled: true, fee: 2.9 },
//     { id: 2, name: 'PayPal', type: 'Digital Wallet', provider: 'PayPal', enabled: true, fee: 3.4 },
//     { id: 3, name: 'Bank Transfer', type: 'Transfer', provider: 'Direct', enabled: true, fee: 0 },
//     { id: 4, name: 'Apple Pay', type: 'Digital Wallet', provider: 'Apple', enabled: false, fee: 2.9 }
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingMethod, setEditingMethod] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     provider: '',
//     enabled: true,
//     fee: 0
//   });

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { key: 'name', label: 'Method Name', sortable: true },
//     { key: 'type', label: 'Type', sortable: true },
//     { key: 'provider', label: 'Provider', sortable: true },
//     { 
//       key: 'enabled', 
//       label: 'Status', 
//       sortable: true,
//       render: (enabled) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//         }`}>
//           {enabled ? 'Enabled' : 'Disabled'}
//         </span>
//       )
//     },
//     { 
//       key: 'fee', 
//       label: 'Fee (%)', 
//       sortable: true,
//       render: (fee) => `${fee}%`
//     }
//   ];

//   const handleAdd = () => {
//     setEditingMethod(null);
//     setFormData({ name: '', type: '', provider: '', enabled: true, fee: 0 });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (method) => {
//     setEditingMethod(method);
//     setFormData(method);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (method) => {
//     if (window.confirm('Are you sure you want to delete this payment method?')) {
//       setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingMethod) {
//       setPaymentMethods(paymentMethods.map(m => 
//         m.id === editingMethod.id ? { ...formData, id: editingMethod.id } : m
//       ));
//     } else {
//       const newMethod = {
//         ...formData,
//         id: Math.max(...paymentMethods.map(m => m.id)) + 1,
//         fee: parseFloat(formData.fee)
//       };
//       setPaymentMethods([...paymentMethods, newMethod]);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <CreditCard className="w-8 h-8 text-green-600" />
//           <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
//         </div>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add Method</span>
//         </button>
//       </div>

//       <Table
//         data={paymentMethods}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Method Name</label>
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Type</label>
//             <select
//               required
//               value={formData.type}
//               onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">Select Type</option>
//               <option value="Card">Card</option>
//               <option value="Digital Wallet">Digital Wallet</option>
//               <option value="Transfer">Transfer</option>
//               <option value="Cash">Cash</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Provider</label>
//             <input
//               type="text"
//               required
//               value={formData.provider}
//               onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Fee (%)</label>
//             <input
//               type="number"
//               step="0.1"
//               value={formData.fee}
//               onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={formData.enabled}
//               onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <label className="ml-2 text-sm text-gray-700">Enabled</label>
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingMethod ? 'Update' : 'Create'}
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

// export default PaymentMethods;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const KEY = 'paymentMethods';
const load = (k, f = []) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const PaymentMethods = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => { setRows(load(KEY)); }, []);

  const onDelete = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next); save(KEY, next);
    toast.success('Payment method deleted');
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
          <Link to="/payment-methods/new" className="px-4 py-2 rounded bg-blue-600 text-white">Add Method</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Fee (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{r.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.provider}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{Number(r.fee || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{r.enabled ? 'Enabled' : 'Disabled'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => onDelete(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400" colSpan={5}>No payment methods. Click “Add Method”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
