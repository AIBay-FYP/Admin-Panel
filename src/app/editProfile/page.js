'use client'
import React, { useState } from "react";

const ModeratorsProfile = () => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "Abdullah Sajjad",
    email: "sajjadabdullah345@gmail.com",
    contact: "0302-4821263",
    roleType: "Compliance Manager",
    approvedBy: "Name",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Functionality to save changes (connect with backend API)
    console.log("Saved Data:", formData);
    alert("Changes have been saved!");
  };

  const handleCancel = () => {
    // Handle cancel action
    alert("Changes have been discarded.");
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-800 mb-6">Moderators Profile</h1>

      {/* Profile Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-medium mb-1 text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium mb-1 text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            disabled
            className="w-full border-gray-300 rounded-md p-2 text-gray-400 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Contact Field */}
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-600 font-medium mb-1 text-sm">
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
          />
        </div>

        {/* Role Type Field */}
        <div className="mb-4">
          <label htmlFor="roleType" className="block text-gray-600 font-medium mb-1 text-sm">
            Role Type
          </label>
          <input
            id="roleType"
            name="roleType"
            type="text"
            value={formData.roleType}
            disabled
            className="w-full border-gray-300 rounded-md p-2 text-gray-400 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Approved By Field */}
        <div className="mb-4">
          <label htmlFor="approvedBy" className="block text-gray-600 font-medium mb-1 text-sm">
            Approved by
          </label>
          <input
            id="approvedBy"
            name="approvedBy"
            type="text"
            value={formData.approvedBy}
            disabled
            className="w-full border-gray-300 rounded-md p-2 text-gray-400 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <a
            href="/change-password"
            className="text-sm font-medium hover:underline ml-auto"
        >
            Change Password
        </a>

        {/* <div className="flex justify-end"> */}
        {/* <a
            href="/change-password"
            className="text-sm text-green-600 font-medium hover:underline"
        >
            Change Password
        </a>
        </div> */}

        {/* Buttons and Change Password Link */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeratorsProfile;