import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { listUsers } from '../users/userService';
import { listCars } from '../cars/carService';
import { addBooking } from './bookingService';

const NewBooking = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ userId:'', carId:'', startDate:'', endDate:'', amount:'', notes:'' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUsers(listUsers());
    setCars(listCars().filter(c => c.status === 'Available' || !c.status));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.userId) er.userId = 'User is required';
    if (!form.carId) er.carId = 'Car is required';
    if (!form.startDate) er.startDate = 'Start date is required';
    if (!form.endDate) er.endDate = 'End date is required';
    if (!form.amount || Number(form.amount) <= 0) er.amount = 'Valid amount required';
    setErrors(er); return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors');
      return;
    }
    try {
      addBooking({ ...form, amount: Number(form.amount) });
      toast.success('Booking created');
      setForm({ userId:'', carId:'', startDate:'', endDate:'', amount:'', notes:'' });
      navigate('/car-booking', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Failed to create booking');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Booking</h1>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600">
            Back
          </button>
        </div>

        <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4 max-w-3xl">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">User *</label>
              <select name="userId" value={form.userId} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.userId?'border-red-500':'border-gray-300'}`}>
                <option value="">Select user</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name || u.email || `User ${u.id}`}</option>)}
              </select>
              {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Car *</label>
              <select name="carId" value={form.carId} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.carId?'border-red-500':'border-gray-300'}`}>
                <option value="">Select car</option>
                {cars.map(c => <option key={c.id} value={c.id}>{c.model ? `${c.brand || ''} ${c.model}`.trim() : `Car ${c.id}`}</option>)}
              </select>
              {errors.carId && <p className="text-red-500 text-sm mt-1">{errors.carId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount ($) *</label>
              <input type="number" name="amount" value={form.amount} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.amount?'border-red-500':'border-gray-300'}`} />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date *</label>
              <input type="date" name="startDate" value={form.startDate} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.startDate?'border-red-500':'border-gray-300'}`} />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date *</label>
              <input type="date" name="endDate" value={form.endDate} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.endDate?'border-red-500':'border-gray-300'}`} />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea name="notes" rows={3} value={form.notes} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300" />
          </div>

          <div className="pt-2">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">Create Booking</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewBooking;
