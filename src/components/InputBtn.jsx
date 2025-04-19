import React from 'react';

export default function InputBtn({
  type = 'text',
  value='',
  onChange,
  placeholder = '',
  className = '',
  name,
  label,
  required=true
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-1 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        required={required}
      />
    </div>
  );
}
