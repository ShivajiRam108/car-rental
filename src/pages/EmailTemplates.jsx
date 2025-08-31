// import React, { useState } from 'react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Plus, Mail, Eye, Send } from 'lucide-react';

// const EmailTemplates = () => {
//   const [templates, setTemplates] = useLocalStorage('emailTemplates', [
//     {
//       id: 1,
//       name: 'Welcome Email',
//       subject: 'Welcome to RentiPy!',
//       content: 'Dear {{name}}, Welcome to our car rental platform...',
//       type: 'User Registration',
//       status: 'Active',
//       createdDate: '2024-01-01',
//       lastUsed: '2024-08-20'
//     },
//     {
//       id: 2,
//       name: 'Booking Confirmation',
//       subject: 'Your Booking is Confirmed - {{bookingId}}',
//       content: 'Hi {{name}}, Your car booking has been confirmed...',
//       type: 'Booking',
//       status: 'Active',
//       createdDate: '2024-01-15',
//       lastUsed: '2024-08-22'
//     },
//     {
//       id: 3,
//       name: 'Password Reset',
//       subject: 'Reset Your Password',
//       content: 'Click the link below to reset your password: {{resetLink}}',
//       type: 'Security',
//       status: 'Active',
//       createdDate: '2024-02-01',
//       lastUsed: '2024-08-18'
//     }
//   ]);
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [editingTemplate, setEditingTemplate] = useState(null);
//   const [previewTemplate, setPreviewTemplate] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     subject: '',
//     content: '',
//     type: 'General',
//     status: 'Active'
//   });

//   const templateTypes = ['General', 'User Registration', 'Booking', 'Security', 'Marketing', 'Support'];

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { key: 'name', label: 'Template Name', sortable: true },
//     { key: 'subject', label: 'Subject', sortable: true },
//     { key: 'type', label: 'Type', sortable: true },
//     { 
//       key: 'status', 
//       label: 'Status', 
//       sortable: true,
//       render: (status) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//         }`}>
//           {status}
//         </span>
//       )
//     },
//     { key: 'lastUsed', label: 'Last Used', sortable: true }
//   ];

//   const handleAdd = () => {
//     setEditingTemplate(null);
//     setFormData({ name: '', subject: '', content: '', type: 'General', status: 'Active' });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (template) => {
//     setEditingTemplate(template);
//     setFormData(template);
//     setIsModalOpen(true);
//   };

//   const handlePreview = (template) => {
//     setPreviewTemplate(template);
//     setIsPreviewOpen(true);
//   };

//   const handleDelete = (template) => {
//     if (window.confirm('Are you sure you want to delete this template?')) {
//       setTemplates(templates.filter(t => t.id !== template.id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingTemplate) {
//       setTemplates(templates.map(t => 
//         t.id === editingTemplate.id ? { ...formData, id: editingTemplate.id } : t
//       ));
//     } else {
//       const newTemplate = {
//         ...formData,
//         id: Math.max(...templates.map(t => t.id)) + 1,
//         createdDate: new Date().toISOString().split('T')[0],
//         lastUsed: 'Never'
//       };
//       setTemplates([...templates, newTemplate]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleSendTest = (template) => {
//     // Mock sending test email
//     alert(`Test email sent using template: ${template.name}`);
//     setTemplates(templates.map(t => 
//       t.id === template.id ? { ...t, lastUsed: new Date().toISOString().split('T')[0] } : t
//     ));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <Mail className="w-8 h-8 text-blue-600" />
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
//             <p className="text-gray-600">Manage email templates for automated communications</p>
//           </div>
//         </div>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>New Template</span>
//         </button>
//       </div>

//       {/* Template Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
//             <div className="text-sm text-gray-600">Total Templates</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600">
//               {templates.filter(t => t.status === 'Active').length}
//             </div>
//             <div className="text-sm text-gray-600">Active Templates</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-purple-600">
//               {new Set(templates.map(t => t.type)).size}
//             </div>
//             <div className="text-sm text-gray-600">Template Types</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-orange-600">
//               {templates.filter(t => t.lastUsed !== 'Never').length}
//             </div>
//             <div className="text-sm text-gray-600">Templates Used</div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <Table
//           data={templates}
//           columns={columns}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onView={handlePreview}
//         />
        
//         {/* Custom Action Buttons */}
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex flex-wrap gap-2">
//             {templates.map((template) => (
//               <div key={template.id} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
//                 <span className="text-sm text-gray-700">{template.name}</span>
//                 <button
//                   onClick={() => handlePreview(template)}
//                   className="text-blue-600 hover:text-blue-800"
//                   title="Preview"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => handleSendTest(template)}
//                   className="text-green-600 hover:text-green-800"
//                   title="Send Test"
//                 >
//                   <Send className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Edit/Create Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={editingTemplate ? 'Edit Template' : 'New Template'}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Template Name</label>
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Subject</label>
//             <input
//               type="text"
//               required
//               value={formData.subject}
//               onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//               placeholder="Use {{variable}} for dynamic content"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Type</label>
//               <select
//                 value={formData.type}
//                 onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 {templateTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Status</label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email Content</label>
//             <textarea
//               required
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//               rows="8"
//               placeholder="Use {{variable}} for dynamic content like {{name}}, {{email}}, etc."
//             />
//           </div>
//           <div className="bg-blue-50 p-3 rounded-lg">
//             <h4 className="text-sm font-medium text-blue-800 mb-2">Available Variables:</h4>
//             <div className="text-xs text-blue-600 space-x-2">
//               <span>{{name}}</span>
//               <span>{{email}}</span>
//               <span>{{bookingId}}</span>
//               <span>{{resetLink}}</span>
//               <span>{{date}}</span>
//             </div>
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingTemplate ? 'Update' : 'Create'}
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

//       {/* Preview Modal */}
//       <Modal
//         isOpen={isPreviewOpen}
//         onClose={() => setIsPreviewOpen(false)}
//         title="Email Template Preview"
//         size="lg"
//       >
//         {previewTemplate && (
//           <div className="space-y-4">
//             <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//               <div className="mb-4 pb-4 border-b border-gray-200">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-medium text-gray-900">Subject:</h4>
//                     <p className="text-gray-700">{previewTemplate.subject}</p>
//                   </div>
//                   <span className={`px-2 py-1 rounded text-xs ${
//                     previewTemplate.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {previewTemplate.status}
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Content:</h4>
//                 <div className="bg-white p-4 rounded border border-gray-200 whitespace-pre-wrap">
//                   {previewTemplate.content}
//                 </div>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => handleSendTest(previewTemplate)}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
//               >
//                 <Send className="w-4 h-4" />
//                 <span>Send Test Email</span>
//               </button>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default EmailTemplates;



import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const KEY = 'emailTemplates';
const load = (k, f = []) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const defaultTemplates = [
  { id: 1, name: 'Booking Confirmation', subject: 'Your booking is confirmed', status: 'Active', updatedAt: new Date().toISOString() },
  { id: 2, name: 'Password Reset', subject: 'Reset your password', status: 'Active', updatedAt: new Date().toISOString() },
  { id: 3, name: 'Payment Receipt', subject: 'Your payment receipt', status: 'Inactive', updatedAt: new Date().toISOString() },
];

const EmailTemplates = () => {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', subject: '', status: 'Active', body: '' });

  useEffect(() => {
    const existing = load(KEY);
    if (existing.length === 0) {
      save(KEY, defaultTemplates);
      setRows(defaultTemplates);
    } else {
      setRows(existing);
    }
  }, []);

  const onEdit = (row) => {
    setEditing(row.id);
    setForm({
      name: row.name,
      subject: row.subject,
      status: row.status,
      body: row.body || '',
    });
  };

  const onDelete = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next);
    save(KEY, next);
    toast.success('Template deleted');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onCancel = () => {
    setEditing(null);
    setForm({ name: '', subject: '', status: 'Active', body: '' });
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim()) {
      toast.error('Name and subject are required');
      return;
    }
    const timestamp = new Date().toISOString();

    if (editing) {
      const next = rows.map(r =>
        r.id === editing
          ? { ...r, ...form, updatedAt: timestamp }
          : r
      );
      setRows(next);
      save(KEY, next);
      toast.success('Template updated');
      onCancel();
    } else {
      const item = { id: Date.now(), ...form, updatedAt: timestamp };
      const next = [item, ...rows];
      setRows(next);
      save(KEY, next);
      toast.success('Template created');
      onCancel();
    }
  };

  const onToggleStatus = (row) => {
    const next = rows.map(r =>
      r.id === row.id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active', updatedAt: new Date().toISOString() } : r
    );
    setRows(next);
    save(KEY, next);
    toast.success(`Template ${row.status === 'Active' ? 'disabled' : 'enabled'}`);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Templates</h1>
          <button
            type="button"
            onClick={() => { setEditing(null); setForm({ name: '', subject: '', status: 'Active', body: '' }); }}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            New Template
          </button>
        </div>

        {/* Editor */}
        <form onSubmit={onSave} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
                placeholder="Booking Confirmation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject *</label>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
                placeholder="Your booking is confirmed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
              >
                {['Active','Inactive'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Body</label>
            <textarea
              name="body"
              rows={6}
              value={form.body}
              onChange={onChange}
              placeholder="Use variables like {{name}}, {{date}}, {{amount}}..."
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              {editing ? 'Update Template' : 'Create Template'}
            </button>
            {editing && (
              <button type="button" onClick={onCancel} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase">Updated</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{r.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{r.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{new Date(r.updatedAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(r)} className="px-2 py-1 rounded bg-blue-600 text-white">Edit</button>
                      <button onClick={() => onToggleStatus(r)} className="px-2 py-1 rounded bg-amber-500 text-white">
                        {r.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => onDelete(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400" colSpan={5}>No templates yet. Create your first one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmailTemplates;
