import React from 'react';

const DataTable = ({ columns, data, onEdit, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map(c => (
              <th key={c.key} className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                {c.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map(c => (
                <td key={c.key} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  {onEdit && <button onClick={() => onEdit(row)} className="px-2 py-1 rounded bg-blue-600 text-white">Edit</button>}
                  {onDelete && <button onClick={() => onDelete(row)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
