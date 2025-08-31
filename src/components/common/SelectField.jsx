import React from 'react';
import FormField from './FormField';

const SelectField = ({ label, error, value, onChange, name, options, placeholder = 'Select...', required }) => (
  <FormField label={label} error={error}>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </FormField>
);

export default SelectField;
