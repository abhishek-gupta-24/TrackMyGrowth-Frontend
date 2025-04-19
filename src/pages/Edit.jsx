import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditHeader} from '../components';

export default function EditOptions() {
  const navigate = useNavigate();

  const options = [
    { label: 'Update Personal Information', path: '/edit/personal' },
    { label: 'Update Platform Information', path: '/edit/platforms' },
    { label: 'Update Social Information', path: '/edit/social' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EditHeader />
      <div className="flex justify-center items-center pt-32 px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">
            Update Your Information
          </h2>

          {options.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-lg transition"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
