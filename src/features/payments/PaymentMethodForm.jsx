import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addPaymentMethod } from './paymentService';

const PaymentMethodForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'Credit Card', type:'Card', provider:'Stripe', fee:'2.9', description:'Visa, MasterCard', enabled:true });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Name required';
    if (!form.provider.trim()) er.provider = 'Provider required';
    setErrors(er); return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors');
      return;
    }
    try {
      addPaymentMethod({ ...form, fee: Number(form.fee || 0) });
      toast.success('Payment method added');
      navigate('/payment-methods', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add method');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Payment Method</h1>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600">
            Back
          </button>
        </div>

        <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4 max-w-3xl">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input name="name" value={form.name} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name?'border-red-500':'border-gray-300'}`} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <input name="type" value={form.type} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Provider *</label>
              <input name="provider" value={form.provider} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.provider?'border-red-500':'border-gray-300'}`} />
              {errors.provider && <p className="text-red-500 text-sm mt-1">{errors.provider}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fee (%)</label>
              <input type="number" step="0.1" name="fee" value={form.fee} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300" />
            </div>
            <label className="inline-flex items-center gap-2 mt-6">
              <input type="checkbox" name="enabled" checked={form.enabled} onChange={onChange} />
              <span>Enabled</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300" />
          </div>

          <div className="pt-2">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">Save Method</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentMethodForm;
