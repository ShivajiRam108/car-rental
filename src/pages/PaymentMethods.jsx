import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, CreditCard } from 'lucide-react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useLocalStorage('paymentMethods', [
    { id: 1, name: 'Credit Card', type: 'Card', provider: 'Stripe', enabled: true, fee: 2.9 },
    { id: 2, name: 'PayPal', type: 'Digital Wallet', provider: 'PayPal', enabled: true, fee: 3.4 },
    { id: 3, name: 'Bank Transfer', type: 'Transfer', provider: 'Direct', enabled: true, fee: 0 },
    { id: 4, name: 'Apple Pay', type: 'Digital Wallet', provider: 'Apple', enabled: false, fee: 2.9 }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    provider: '',
    enabled: true,
    fee: 0
  });

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Method Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'provider', label: 'Provider', sortable: true },
    { 
      key: 'enabled', 
      label: 'Status', 
      sortable: true,
      render: (enabled) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
      )
    },
    { 
      key: 'fee', 
      label: 'Fee (%)', 
      sortable: true,
      render: (fee) => `${fee}%`
    }
  ];

  const handleAdd = () => {
    setEditingMethod(null);
    setFormData({ name: '', type: '', provider: '', enabled: true, fee: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setFormData(method);
    setIsModalOpen(true);
  };

  const handleDelete = (method) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMethod) {
      setPaymentMethods(paymentMethods.map(m => 
        m.id === editingMethod.id ? { ...formData, id: editingMethod.id } : m
      ));
    } else {
      const newMethod = {
        ...formData,
        id: Math.max(...paymentMethods.map(m => m.id)) + 1,
        fee: parseFloat(formData.fee)
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <CreditCard className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Method</span>
        </button>
      </div>

      <Table
        data={paymentMethods}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Method Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="Card">Card</option>
              <option value="Digital Wallet">Digital Wallet</option>
              <option value="Transfer">Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider</label>
            <input
              type="text"
              required
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fee (%)</label>
            <input
              type="number"
              step="0.1"
              value={formData.fee}
              onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Enabled</label>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingMethod ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentMethods;
