import { useState } from "react";
import GenericModal from "./genericModal";
import ServiceResolution from "./ServiceResolution"; // Import the ServiceResolution component

const Table = ({ columns, data, dropdownOptions, openPopup, contract = false }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false); // State to manage the Details popup

  const openDetailsModal = () => {
    setDetailsModalOpen(true); // Open the details popup when the button is clicked
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false); // Close the details popup
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
              {contract && (
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
                {contract && (
                  <td className="p-2">
                    <button
                      className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
                      onClick={openDetailsModal} // Open the details popup
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

      {/* ServiceResolution Popup */}
      {isDetailsModalOpen && (
        <ServiceResolution onClose={closeDetailsModal} />
      )}
    </div>
  );
};

const Dropdown = ({ options, openPopup, row }) => {
  const [selected, setSelected] = useState(options[0]?.label || "Status");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSelectChange = (event) => {
    setSelected(event.target.value);

    // Trigger modal if openPopup is true
    if (openPopup) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePrimaryAction = () => {
    // Handle confirm action
    console.log(`Confirmed for ${row.name || "this row"}`);
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
        message={`Are you sure you want to set status to "${selected}" for ${row.name || "this row"}?`}
        primaryAction={handlePrimaryAction}
        primaryButtonText="Yes, Confirm"
        secondaryButtonText="Cancel"
      />
    </div>
  );
};

export default Table;
