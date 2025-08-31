import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addCar } from './carService';

const AddCar = () => {
  const navigate = useNavigate();
  const years = Array.from({ length: 45 }, (_, i) => `${new Date().getFullYear() - i}`);
  const types = ['Sedan','SUV','Hatchback','Coupe','Wagon','Van','Truck'];
  const statuses = ['Available','Booked','Maintenance'];

  const [form, setForm] = useState({
    model:'', brand:'', year:`${new Date().getFullYear()}`, type:'',
    area:'', pricePerDay:'', color:'', mileage:'', seats:'',
    features:[], status:'Available', description:''
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value,  checked } = e.target;
    if (name === 'features') {
      setForm(f => ({ ...f, features: checked ? [...f.features, value] : f.features.filter(x => x !== value) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.model.trim()) er.model = 'Model is required';
    if (!form.brand.trim()) er.brand = 'Brand is required';
    if (!form.type) er.type = 'Car type is required';
    if (!form.pricePerDay || Number(form.pricePerDay) <= 0) er.pricePerDay = 'Valid price is required';
    if (!form.seats || Number(form.seats) <= 0) er.seats = 'Seats required';
    setErrors(er); return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors');
      return;
    }
    try {
      addCar({
        ...form,
        year: Number(form.year),
        pricePerDay: Number(form.pricePerDay),
        seats: Number(form.seats),
        mileage: Number(form.mileage || 0),
      });
      toast.success('Car added');
      setForm({
        model:'', brand:'', year:`${new Date().getFullYear()}`, type:'',
        area:'', pricePerDay:'', color:'', mileage:'', seats:'',
        features:[], status:'Available', description:''
      });
      navigate('/cars', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add car');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Car</h1>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600">
            Back
          </button>
        </div>

        <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Model *</label>
              <input name="model" value={form.model} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.model?'border-red-500':'border-gray-300'}`} />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand *</label>
              <input name="brand" value={form.brand} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.brand?'border-red-500':'border-gray-300'}`} />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <select name="year" value={form.year} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select name="type" value={form.type} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.type?'border-red-500':'border-gray-300'}`}>
                <option value="">Select type</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Area</label>
              <input name="area" value={form.area} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price/Day ($) *</label>
              <input type="number" name="pricePerDay" value={form.pricePerDay} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.pricePerDay?'border-red-500':'border-gray-300'}`} />
              {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Seats *</label>
              <input type="number" name="seats" value={form.seats} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.seats?'border-red-500':'border-gray-300'}`} />
              {errors.seats && <p className="text-red-500 text-sm mt-1">{errors.seats}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select name="status" value={form.status} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['GPS','AC','Bluetooth','Backup Camera','Leather Seats','Sunroof','USB','WiFi'].map(f => (
                <label key={f} className="flex items-center">
                  <input type="checkbox" name="features" value={f} checked={form.features.includes(f)} onChange={onChange} className="mr-2" />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300" />
          </div>

          <div className="pt-2">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">Save Car</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCar;
