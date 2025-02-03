'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenericModal = ({
  isOpen,
  onClose,
  title = "Modal Title",
  type,
  primaryAction,
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel",
}) => {
  const [editableMessage, setEditableMessage] = useState("");
  const {user} = useUser()
  const UserID = user?.publicMetadata.UserID

  // Synchronize editableMessage with the `type` prop whenever it changes
  useEffect(() => {
    if (type) {
      setEditableMessage(
        `Status update: The status has been changed to '${type}' for the selected row. Please review the changes if needed.`
      );
    }
  }, [type]);

  const handleMessageChange = (e) => {
    setEditableMessage(e.target.value);
  };

  const handleClose = () => {
    toast.info("Modal closed without any changes.", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000"
        style={{ zIndex: 9999 }}
      >
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
              onClick={handleClose}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              {secondaryButtonText}
            </button>
            <button
              onClick={() => {
                primaryAction(UserID, editableMessage, type, false);
              }}
              className="bg-light-green hover:bg-dark-green text-white py-2 px-4 rounded"
            >
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <ToastContainer />
    </>
  );
};

export default GenericModal;