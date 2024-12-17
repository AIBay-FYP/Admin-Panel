'use client';

import { useState } from 'react';

const GenericModal = ({
  isOpen,
  onClose,
  title = "Modal Title",
  message = "Your message goes here.",
  primaryAction,
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel"
}) => {
  const [editableMessage, setEditableMessage] = useState(message);

  const handleMessageChange = (e) => {
    setEditableMessage(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1E3A3A] p-6 rounded-lg w-[500px] text-white">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {/* Editable Message */}
        <div className="border border-gray-600 rounded p-4 bg-[#1E3A3A] text-sm">
          <textarea
            value={editableMessage}
            onChange={handleMessageChange}
            className="w-full h-32 bg-[#1E3A3A] text-white focus:outline-none resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            {secondaryButtonText}
          </button>
          <button
            onClick={() => {
              primaryAction(editableMessage); // Pass the updated message to the primary action
            }}
            className="bg-light-green hover:bg-dark-green text-white py-2 px-4 rounded"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
