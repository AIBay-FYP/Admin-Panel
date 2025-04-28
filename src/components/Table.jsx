// 'use client'
// import { useEffect, useRef, useState } from "react";
// import PropTypes from 'prop-types';  // Added PropTypes for prop validation
// import GenericModal from "./genericModal";

// const Table = ({ 
//   columns, 
//   data, 
//   dropdownOptions, 
//   openPopup, 
//   details = false, 
//   detailsPopup: PopUp, 
//   onRowClick, 
//   Document = false,
//   handleDropdown 
// }) => {
//   const [isDetailsModalOpen, setDetailsModalOpen] = useState(false); 
//   const [modalData, setModalData] = useState(null); 
//   const modalRef = useRef(null);

//   console.log("data:", data)

//   const openDetailsModal = (rowData) => {
//     setModalData(rowData); 
//     setDetailsModalOpen(true); 
//   };

//   const closeDetailsModal = () => {
//     setModalData(null); 
//     setDetailsModalOpen(false); 
//   };

//   // Effect to toggle the body's scrolling
//   useEffect(() => {
//     if (isDetailsModalOpen) {
//       // Disable scrolling
//       document.body.classList.add("overflow-hidden");
//     } else {
//       // Enable scrolling
//       document.body.classList.remove("overflow-hidden");
//     }

//     // Cleanup on component unmount
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [isDetailsModalOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         closeDetailsModal();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDocumentClick = (fileUrl) => {
//     if (fileUrl) {
//       window.open(fileUrl, "_blank"); // Open file URL in a new tab
//     } else {
//       console.error("No file URL provided.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-start w-full">
//       <div className="overflow-x-auto w-full">
//         <table className="w-full bg-white shadow-md rounded-lg text-sm">
//           <thead className="bg-gray-200">
//             <tr>
//               {columns.map((col, index) => (
//                 <th
//                   key={index}
//                   className={`px-4 py-2 text-left text-gray-600 font-medium ${index === 0 ? "rounded-tl-lg" : index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
//                 >
//                   {col.header}
//                 </th>
            
//               ))}
//               <th className="px-4 py-2 text-left text-gray-600 font-medium rounded-tr-lg">
//                 Status
//               </th>
//               {details && (
//                 <th className="px-4 py-2 text-left text-gray-600 font-medium rounded-tr-lg">
//                   {Document ? "Document" : "More"}
//                 </th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
            
//             {data.map((row, rowIndex) => (
//               <tr
//               key={rowIndex}
//               className={`border-b hover:bg-gray-50 ${rowIndex === data.length - 1 ? "rounded-b-lg" : ""}`}
//               >
//                 {columns.map((col, colIndex) => (
//                   <td
//                   key={colIndex}
//                   className={`px-4 py-2 text-gray-700 ${colIndex === 0 ? "rounded-l-lg" : colIndex === columns.length - 1 ? "rounded-r-lg" : ""}`}
//                   >
//                     {/* If accessor is a function, call it, else just access the property */}
//                     {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor] || "-"}
//                   </td>
//                 ))}
//                 <td className={`px-4 py-2 text-gray-700 ${rowIndex === data.length - 1 ? "rounded-br-lg" : ""}`}>
//                   {/* Conditionally render dropdown or status */}
//                   {dropdownOptions && dropdownOptions.length > 0 ? (
//                       <Dropdown
//                         options={dropdownOptions}
//                         openPopup={openPopup}
//                         row={row}
//                         handleDropdown={handleDropdown}
//                       />
//                     ) : (
//                       <span>{row.Status}</span>  
//                   )}
//                 </td>
//                 {details && (
//                   <td className="p-2">
//                     <button
//                       className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
//                       onClick={() => openDetailsModal(row) || onRowClick(row)}
                      
//                     >
//                       Details
//                     </button>
//                     {Document ? (
//                       <button
//                         className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
//                         onClick={() => handleDocumentClick(row.File)} // Open document in a new tab
//                       >
//                         View Document
//                       </button>
//                     ) : (
//                       <button
//                         className="bg-gray-200 text-black border rounded-lg p-2 text-xs hover:bg-black hover:text-white"
//                         onClick={() => openDetailsModal(row)} // Pass specific row data
//                       >
//                         Details
//                       </button>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Details Modal */}
//       {isDetailsModalOpen && details && (
//         <div ref={modalRef}>
//             <PopUp 
//             data={modalData} // Pass the specific row data to the modal
//             onClose={closeDetailsModal}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const Dropdown = ({ options, openPopup, row, handleDropdown }) => {
//   const [selected, setSelected] = useState(row.status || options[0]?.label);
//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleSelectChange = (event) => {
//     const newSelectedValue = event.target.value;
//     setSelected(newSelectedValue);

//     if (openPopup) {
//       setModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const handlePrimaryAction = async (userID, message, type, readStatus) => {
//     const notification = {
//       UserID: userID,
//       Message: message,
//       Type: type,
//       ReadStatus: readStatus
//     };

//     console.log(`Confirmed for ${row.name || "this row"}`);

//     try {


//       const response = await fetch("/api/notificationPost", {
//         method: "POST", 
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(notification),
//       });

//       const result = await response.json();


//       if (response.ok) {
//         handleDropdown(row._id, selected);
//         console.log("Notification created:", result);
//       } else {
//         console.error("Failed to create notification:", result.error);
//       }
//     } catch (error) {
//       console.error("Error posting notification:", error);
//     }


//     setModalOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <select
//         value={selected}
//         onChange={handleSelectChange}
//         className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none text-xs w-full"
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option.label} className="text-gray-700">
//             {option.label}
//           </option>
//         ))}
//       </select>

//       <GenericModal 
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         title="Confirm Your Action"
//         type={selected}
        
//         primaryAction={handlePrimaryAction}
//         primaryButtonText="Yes, Confirm"
//         secondaryButtonText="Cancel"
//       />
      
//     </div>
//   );
// };

// Dropdown.propTypes = {
//   options: PropTypes.array.isRequired,
//   openPopup: PropTypes.bool,
//   row: PropTypes.object.isRequired,
//   handleDropdown: PropTypes.func.isRequired
// };
'use client'
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import GenericModal from "./genericModal";

const Table = ({ 
  columns, 
  data, 
  dropdownOptions, 
  openPopup, 
  details = false, 
  detailsPopup: PopUp, 
  onRowClick, 
  Document = false,
  handleDropdown 
}) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false); 
  const [modalData, setModalData] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredData = data.filter(row => 
    columns.some(col => 
      (typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor])?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-4 flex items-center border border-black focus:outline rounded-lg bg-white shadow-md p-2">
        <i className="p-3 fa fa-search text-gray-500 mr-2"></i>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 focus:outline-none text-black"
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-2 text-left text-gray-600 font-medium">
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
              {details && (
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  {Document ? "Document" : "More"}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 text-gray-700">
                    {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor] || "-"}
                  </td>
                ))}
                <td className="px-4 py-2 text-gray-700">
                  {dropdownOptions?.length > 0 ? (
                    <Dropdown 
                    options={dropdownOptions} 
                    row={row} 
                    handleDropdown={handleDropdown} 
                    openPopup={openPopup}
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
      {isDetailsModalOpen && details && (
        <div ref={modalRef}>
          <PopUp data={modalData} onClose={closeDetailsModal} />
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ options, openPopup, row, handleDropdown }) => {
  const [selected, setSelected] = useState(row.Status || options[0]?.label);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSelectChange = (event) => {
    const newSelectedValue = event.target.value;
    setSelected(newSelectedValue);

    if (handleDropdown) {
      handleDropdown(row._id, newSelectedValue);
    }

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
  
    console.log(`Confirmed for row ID: ${row._id}`);
  
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
  
    closeModal();
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
  row: PropTypes.object.isRequired,
  handleDropdown: PropTypes.func.isRequired
};

export default Table;
