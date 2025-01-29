'use client'
import { useEffect, useRef, useState } from "react";
import GenericModal from "./genericModal";

const Table = ({ columns, data, dropdownOptions, openPopup, details = false, detailsPopup, Document = false }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false); // State to manage the Details popup
  const PopUp = detailsPopup;
  const modalRef = useRef(null);

  const openDetailsModal = () => {
    setDetailsModalOpen(true); // Open the details popup when the button is clicked
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false); // Close the details popup
  };

  // Effect to toggle the body's scrolling
  useEffect(() => {
    if (isDetailsModalOpen) {
      // Disable scrolling
      document.body.classList.add("overflow-hidden");
    } else {
      // Enable scrolling
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDetailsModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDetailsModalOpen(false);
      }
    };

    // Add event listener to detect clicks outside of the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDocumentClick = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank"); // Open file URL in a new tab
    } else {
      console.error("No file URL provided.");
    }
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white shadow-md rounded-lg text-sm">
          {/* Table Header */}
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
                  {Document ? "Document" : "More"}
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
                    {row[col.accessor] || "-"}
                  </td>
                ))}
                <td
                  className={`px-4 py-2 text-gray-700 ${
                    rowIndex === data.length - 1 ? "rounded-br-lg" : ""
                  }`}
                >
                  <Dropdown
                    options={dropdownOptions}
                    openPopup={openPopup}
                    row={row}
                  />
                </td>
                {details && (
                  <td className="p-2">
                    {Document ? (
                      <button
                        className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
                        onClick={() => handleDocumentClick(row.File)} // Open document in a new tab
                      >
                        View Document
                      </button>
                    ) : (
                      <button
                        className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
                        onClick={openDetailsModal} // Open the details popup
                      >
                        Details
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ServiceResolution Popup */}
      {isDetailsModalOpen && (
        <div ref={modalRef}>
          <PopUp onClose={closeDetailsModal} />
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ options = [], openPopup, row = {} }) => {
  const [selected, setSelected] = useState(options.length > 0 ? options[0].label : "Status");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSelectChange = (event) => {
    const newSelectedValue = event.target.value;
    setSelected(newSelectedValue);

    if (openPopup) {
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePrimaryAction = async (userID, message, type, readStatus) => {
    const notification = {
      UserID: userID,
      Message: message,
      Type: type,
      ReadStatus: readStatus,
    };
    console.log(`Confirmed for ${row.name || "this row"}`);

    try {
      const response = await fetch("/api/notificationPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Notification created:", result);
      } else {
        console.error("Failed to create notification:", result.error);
      }
    } catch (error) {
      console.error("Error posting notification:", error);
    }

    setModalOpen(false);
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
            className={`${option.color} rounded-lg` || "text-gray-700"}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirm Your Action"
        type={selected}
        primaryAction={handlePrimaryAction}
        primaryButtonText="Yes, Confirm"
        secondaryButtonText="Cancel"
      />
    </div>
  );
};

export default Table;