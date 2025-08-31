import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addType } from './typeService';

const AddType = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', active: true });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Type name is required';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors');
      return;
    }
    try {
      addType(form);
      toast.success('Type added');
      setForm({ name: '', description: '', active: true });
      navigate('/car-types', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add type');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Type</h1>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600">
            Back
          </button>
        </div>

        <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Type Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., Sedan"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
            />
          </div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="active" checked={form.active} onChange={onChange} />
            <span>Active</span>
          </label>
          <div className="pt-2">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">Save Type</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddType;

