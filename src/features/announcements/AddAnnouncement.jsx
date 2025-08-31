import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addAnnouncement } from './announcementService';

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', content:'', priority:'Medium', status:'Active', target:'All Users' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.title.trim()) er.title = 'Title required';
    if (!form.content.trim()) er.content = 'Content required';
    setErrors(er); return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors');
      return;
    }
    try {
      addAnnouncement(form);
      toast.success('Announcement published');
      setForm({ title:'', content:'', priority:'Medium', status:'Active', target:'All Users' });
      navigate('/announcements', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Failed to publish');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Announcement</h1>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600">
            Back
          </button>
        </div>

        <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4 max-w-3xl">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input name="title" value={form.title} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.title?'border-red-500':'border-gray-300'}`} />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select name="priority" value={form.priority} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300">
                {['Low','Medium','High'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select name="status" value={form.status} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300">
                {['Active','Inactive'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target</label>
            <select name="target" value={form.target} onChange={onChange} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300">
              {['All Users','Active Users','Banned Users','Admins'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <textarea name="content" rows={4} value={form.content} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.content?'border-red-500':'border-gray-300'}`} />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <div className="pt-2">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">Publish</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAnnouncement;

