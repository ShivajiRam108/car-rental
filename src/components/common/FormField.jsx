import React from 'react';

const FormField = ({ label, error, children }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>}
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default FormField;
