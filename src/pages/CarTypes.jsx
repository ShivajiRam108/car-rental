import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { carTypes } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Car } from 'lucide-react';

const CarTypes = () => {
  const [types, setTypes] = useLocalStorage('carTypes', 
    carTypes.map((type, index) => ({ 
      id: index + 1, 
      name: type, 
      description: `${type} vehicles`,
      active: true,
      createdDate: '2024-01-01'
    }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true
  });

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Type Name', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { 
      key: 'active', 
      label: 'Status', 
      sortable: true,
      render: (active) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { key: 'createdDate', label: 'Created Date', sortable: true }
  ];

  const handleAdd = () => {
    setEditingType(null);
    setFormData({ name: '', description: '', active: true });
    setIsModalOpen(true);
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setFormData(type);
    setIsModalOpen(true);
  };

  const handleDelete = (type) => {
    if (window.confirm('Are you sure you want to delete this car type?')) {
      setTypes(types.filter(t => t.id !== type.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingType) {
      setTypes(types.map(t => t.id === editingType.id ? { ...formData, id: editingType.id } : t));
    } else {
      const newType = {
        ...formData,
        id: Math.max(...types.map(t => t.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setTypes([...types, newType]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Car className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Car Types</h1>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Type</span>
        </button>
      </div>

      <Table
        data={types}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingType ? 'Edit Car Type' : 'Add Car Type'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="3"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Active</label>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingType ? 'Update' : 'Create'}
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

export default CarTypes;
