'use client';
import { useEffect, useRef, useState } from "react";
import GenericModal from "./genericModal";

const Table = ({ columns, data, dropdownOptions, details = false, detailsPopup }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null); // State to hold the selected contract details
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const modalRef = useRef(null);
  const PopUp = detailsPopup;

  const openDetailsModal = async (contractId) => {
    try {
      const response = await fetch(`/api/contracts?ContractID=${contractId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch contract details");
      }
      const contractData = await response.json();
      setSelectedContract(contractData); // Set the fetched contract data
      setDetailsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching contract details:", error);
    }
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false); // Close the modal
    setSelectedContract(null); // Clear selected contract data
  };

  const openNotificationModal = (type) => {
    setNotificationType(type);
    setNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setNotificationModalOpen(false);
    setNotificationType(null);
  };

  const handleNotificationAction = async (userID, message, type, readStatus) => {
    const notification = {
      UserID: userID,
      Message: message,
      Type: type,
      ReadStatus: readStatus,
    };

    try {
      const response = await fetch('/api/notificationPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Notification created:', result);
      } else {
        console.error('Failed to create notification:', result.error);
      }
    } catch (error) {
      console.error('Error posting notification:', error);
    }

    closeNotificationModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDetailsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-start w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 text-left text-gray-600 font-medium ${
                    index === 0
                      ? "rounded-tl-lg"
                      : index === columns.length - 1
                      ? "rounded-tr-lg"
                      : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-gray-600 font-medium rounded-tr-lg">
                Status
              </th>
              {details && (
                <th className="px-4 py-2 text-left text-gray-600 font-medium rounded-tr-lg">
                  More
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b hover:bg-gray-50 ${
                  rowIndex === data.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 text-gray-700 ${
                      colIndex === 0
                        ? "rounded-l-lg"
                        : colIndex === columns.length - 1
                        ? "rounded-r-lg"
                        : ""
                    }`}
                  >
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : row[col.accessor] || "-"}
                  </td>
                ))}
                <td className={`px-4 py-2 text-gray-700`}>
                  <Dropdown
                    options={dropdownOptions}
                    row={row}
                    openNotificationModal={openNotificationModal}
                  />
                </td>
                {details && (
                  <td className="p-2">
                    <button
                      className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
                      onClick={() => openDetailsModal(row.ContractID)}
                    >
                      Details
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDetailsModalOpen && selectedContract && (
        <div ref={modalRef}>
          <PopUp
            onClose={closeDetailsModal}
            contractDetails={selectedContract}
          />
        </div>
      )}

      {isNotificationModalOpen && (
        <GenericModal
          isOpen={isNotificationModalOpen}
          onClose={closeNotificationModal}
          title="Confirm Your Action"
          type={notificationType}
          primaryAction={handleNotificationAction}
          primaryButtonText="Yes, Confirm"
          secondaryButtonText="Cancel"
        />
      )}
    </div>
  );
};

const Dropdown = ({ options, row, openNotificationModal }) => {
  const [selected, setSelected] = useState(row.Status || options[0]?.label || "Status");

  const handleSelectChange = (event) => {
    const newSelectedValue = event.target.value;
    setSelected(newSelectedValue);
    if (newSelectedValue !== row.Status) {
      openNotificationModal(newSelectedValue);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={selected}
        onChange={handleSelectChange}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none text-xs w-full"
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.label}
            className={option.color || "text-gray-700"}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Table;