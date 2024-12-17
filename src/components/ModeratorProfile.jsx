'use client';
import React from 'react';

const ModeratorProfile = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Prevent rendering when modal is closed.

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Main Container */}
      <div className="bg-teal-700 rounded-lg p-6 w-[90%] md:w-[60%] flex flex-col md:flex-row shadow-lg text-white">
        
        {/* Left Section - Profile */}
        <div className="bg-teal-800 p-6 rounded-lg w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
            {/* Placeholder for Profile Picture */}
            <span className="text-black text-4xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">John Doe</h2>
          <p className="text-gray-300 mb-3">Compliance Manager</p>
          <a
            href="mailto:abc123@gmail.com"
            className="text-blue-300 underline mb-1 hover:text-blue-500"
          >
            abc123@gmail.com
          </a>
          <p className="mb-1">XXX-XXXX-XXXX</p>
          <p className="text-gray-300 mb-4">20 Sept, 2024</p>
          <div>
            <span className="text-sm text-gray-400">Approved By</span>
            <p className="text-white">John Doe</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-teal-600 p-6 rounded-lg w-full md:w-1/2 flex flex-col">
          <h3 className="text-xl font-semibold mb-6">Moderator Profile</h3>
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter the email"
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Contact</label>
            <input
              type="text"
              placeholder="XXX-XXX-XXX"
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Role Type</label>
            <select className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none">
              <option value="Compliance Manager">Compliance Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button className="bg-light-green text-black px-4 py-2 rounded hover:bg-mid-green">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorProfile;