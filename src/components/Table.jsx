'use client'
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';  // Added PropTypes for prop validation
import GenericModal from "./genericModal";

const Table = ({ 
  columns, 
  data, 
  dropdownOptions, 
  openPopup, 
  details = false, 
  detailsPopup: PopUp, 
  handleDropdown,
  onRowClick  
}) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false); 
  const [modalData, setModalData] = useState(null); 
  const modalRef = useRef(null);

  const openDetailsModal = (rowData) => {
    setModalData(rowData); 
    setDetailsModalOpen(true); 
  };

  const closeDetailsModal = () => {
    setModalData(null); 
    setDetailsModalOpen(false); 
  };

  useEffect(() => {
    if (isDetailsModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDetailsModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeDetailsModal();
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
                  className={`px-4 py-2 text-left text-gray-600 font-medium ${index === 0 ? "rounded-tl-lg" : index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
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
              className={`border-b hover:bg-gray-50 ${rowIndex === data.length - 1 ? "rounded-b-lg" : ""}`}
              >
                {columns.map((col, colIndex) => (
                  <td
                  key={colIndex}
                  className={`px-4 py-2 text-gray-700 ${colIndex === 0 ? "rounded-l-lg" : colIndex === columns.length - 1 ? "rounded-r-lg" : ""}`}
                  >
                    {/* If accessor is a function, call it, else just access the property */}
                    {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor] || "-"}
                  </td>
                ))}
                <td className={`px-4 py-2 text-gray-700 ${rowIndex === data.length - 1 ? "rounded-br-lg" : ""}`}>
                  {/* Conditionally render dropdown or status */}
                  {dropdownOptions && dropdownOptions.length > 0 ? (
                      <Dropdown
                        options={dropdownOptions}
                        openPopup={openPopup}
                        row={row}
                        handleDropdown={handleDropdown}
                      />
                    ) : (
                      <span>{row.Status}</span>  
                  )}
                </td>
                {details && (
                  <td className="p-2">
                    <button
                      className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
                      onClick={() => openDetailsModal(row) || onRowClick(row)}
                      
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

      {/* Details Modal */}
      {isDetailsModalOpen && details && (
        <div ref={modalRef}>
          <PopUp 
            data={modalData} 
            onClose={closeDetailsModal}
          />
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dropdownOptions: PropTypes.array,  // It can be undefined if no dropdown is needed
  openPopup: PropTypes.bool,
  details: PropTypes.bool,
  detailsPopup: PropTypes.func,
  handleDropdown: PropTypes.func.isRequired
};

const Dropdown = ({ options, openPopup, row, handleDropdown }) => {
  const [selected, setSelected] = useState(row.status || options[0]?.label);
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
      ReadStatus: readStatus
    };

    try {
      const response = await fetch('/api/notificationPost', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      });

      const result = await response.json();

      if (response.ok) {
        handleDropdown(row._id, selected);
      } else {
        console.error('Failed to create notification:', result.error);
      }
    } catch (error) {
      console.error('Error posting notification:', error);
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
          <option key={index} value={option.label} className="text-gray-700">
            {option.label}
          </option>
        ))}
      </select>

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

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  openPopup: PropTypes.bool,
  row: PropTypes.object.isRequired,
  handleDropdown: PropTypes.func.isRequired
};

export default Table;
