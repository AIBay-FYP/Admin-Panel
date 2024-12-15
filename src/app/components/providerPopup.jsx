'use client'

const AdminActionModal2 = ({ isOpen, onClose, onNotify }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Content */}
      <div className="bg-[#1E3A3A] p-6 rounded-lg w-[500px] text-white">
        <h2 className="text-lg font-semibold mb-4">Notification message - Admin Action</h2>
        <div className="border border-gray-600 rounded p-4 bg-[#1E3A3A] text-sm">
          <p>
            You attempted to search <span className="font-semibold">"Query here"</span> <br />
            on this <span className="font-semibold">"Date"</span> and <span className="font-semibold">"Time"</span> which
            <br /> resulted in violation under <span className="font-semibold">"Category"</span>.
            <br />
            Admin action taken: -
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onNotify}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Notify Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminActionModal2;
