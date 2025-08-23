import React, { useState } from 'react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import { mockCars, carTypes, carAreas } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus } from 'lucide-react';

const Cars = () => {
  const [cars, setCars] = useLocalStorage('cars', mockCars);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    type: '',
    area: '',
    price: '',
    status: 'Available',
    year: new Date().getFullYear()
  });

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'area', label: 'Area', sortable: true },
    { 
      key: 'price', 
      label: 'Price/Day', 
      sortable: true,
      render: (price) => `$${price}`
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Available' ? 'bg-green-100 text-green-800' :
          status === 'Booked' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'year', label: 'Year', sortable: true }
  ];

  const handleAdd = () => {
    setEditingCar(null);
    setFormData({
      model: '',
      type: '',
      area: '',
      price: '',
      status: 'Available',
      year: new Date().getFullYear()
    });
    setIsModalOpen(true);
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData(car);
    setIsModalOpen(true);
  };

  const handleDelete = (car) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(c => c.id !== car.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCar) {
      setCars(cars.map(c => c.id === editingCar.id ? { ...formData, id: editingCar.id } : c));
    } else {
      const newCar = {
        ...formData,
        id: Math.max(...cars.map(c => c.id)) + 1,
        price: parseFloat(formData.price)
      };
      setCars([...cars, newCar]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Cars Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Car</span>
        </button>
      </div>

      <Table
        data={cars}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCar ? 'Edit Car' : 'Add Car'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Type</option>
              {carTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <select
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Area</option>
              {carAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Day</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingCar ? 'Update' : 'Create'}
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

export default Cars;
