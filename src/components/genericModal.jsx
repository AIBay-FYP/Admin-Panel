'use client';
import { useState } from 'react';

const GenericModal = ({
  isOpen,
  onClose,
  selectedAction,
  message,
  primaryAction,
  primaryButtonText,
  secondaryButtonText,
}) => {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{selectedAction}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <textarea
          className="w-full text-black border border-gray-300 rounded p-2 mb-4"
          rows="4"
          placeholder="Write your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            {secondaryButtonText}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              if (input.trim() !== '') {
                primaryAction(input.trim(), selectedAction, true); // ✅ Correct order
              }
            }}
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
