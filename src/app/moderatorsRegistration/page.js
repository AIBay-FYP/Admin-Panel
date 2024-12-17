'use client'

import React from "react";

const ModeratorsRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-800 text-base mr-2"
        >
          &larr; 
        </button>
        <h1 className="text-xl font-bold text-gray-800">Moderators Registration</h1>
      </div>

      {/* Form Container */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-[400px]">
          {/* Input Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-1 text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-1 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter the email"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-600 font-medium mb-1 text-sm">
              Contact
            </label>
            <input
              id="contact"
              type="text"
              placeholder="XXX-XXX-XXX"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
            />
          </div>

          {/* Role Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-600 font-medium mb-1 text-sm">
              Role Type
            </label>
            <select
              id="role"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
            >
              <option value="Compliance Manager">Compliance Manager</option>
              <option value="Moderator">Moderator</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          {/* Approved By Dropdown */}
          <div className="mb-6">
            <label htmlFor="approvedBy" className="block text-gray-600 font-medium mb-1 text-sm">
              Approved by
            </label>
            <select
              id="approvedBy"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
            >
              <option value="Name">Name</option>
              <option value="Manager 1">Manager 1</option>
              <option value="Manager 2">Manager 2</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
            <button
              className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-light-green text-sm"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorsRegistration;