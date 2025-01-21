import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS

const ServiceResolution = ({ onClose }) => {
  // State management for image swapping, service resolution, and popup visibility
  const [mainImage, setMainImage] = useState("Roba.jpeg"); // Default main image
  const [images] = useState([
    "shoes1.jpeg", // Thumbnail images
    "shoes2.jpeg",
    "shoes3.jpeg",
  ]);
  const [serviceResolution, setServiceResolution] = useState("refund"); // Default resolution option

  // Handle Cancel button click
  const handleCancel = () => {
    // Just close the popup without resetting any values
    onClose(); // Trigger parent close function
  };

  // Handle Save Changes button click
  const handleSaveChanges = () => {
    // Save logic can go here, for now, it's logging the state
    console.log("Service Resolution:", serviceResolution);
    console.log("Selected Image:", mainImage);
    // Close the popup after saving
    onClose(); // Trigger parent close function
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[700px] bg-[#00262A] text-white rounded-lg p-4">
        {/* Top Section */}
        <div className="flex mb-4 gap-6">
          {/* Image Section */}
          <div className="flex flex-col items-start">
            <img
              src={mainImage}
              alt="Service"
              className="w-72 h-40 object-cover rounded-lg mb-2"
            />
          </div>

          {/* Thumbnails Section */}
          <div className="flex flex-col space-y-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-14 h-12 rounded-lg cursor-pointer hover:opacity-80"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>

          {/* Service Controls */}
          <div className="flex flex-col items-start justify-between ml-4">
            <h2 className="text-2xl font-semibold">Service Name</h2>
            {/* Dropdown */}
            <div>
              <label className="block text-sm mb-1">Service Resolution</label>
              <select
                className="w-40 p-2 rounded-md bg-white text-black"
                value={serviceResolution}
                onChange={(e) => setServiceResolution(e.target.value)}
              >
                <option value="refund">Refund Payment</option>
                <option value="replacement">Replacement</option>
                <option value="cancel">Cancel Service</option>
              </select>
            </div>
            {/* Contract Icon */}
            <div className="flex items-center cursor-pointer">
              <a
                href="https://www.example.com/contract.pdf" // Replace with the actual URL of the PDF
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fas fa-file-contract text-gray-300"
                  style={{ fontSize: "12px" }}
                />
                <span className="text-sm ml-1">Contract</span>
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <hr className="border-t border-gray-500 mb-4" />

        {/* Bottom Section */}
        <div className="mb-4 space-y-2">
          {/* Service Details */}
          <p className="text-sm">
            <span className="font-semibold">Price:</span> 10,000 PKR
          </p>
          <p className="text-sm">
            <span className="font-semibold">Consumer’s Name:</span> John Doe
          </p>
          <p className="text-sm">
            <span className="font-semibold">Provider’s Name:</span> John Poe
          </p>
          <p className="text-sm">
            <span className="font-semibold">Nature of Dispute:</span> Service not delivered
          </p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-[#1E1E1E] px-5 py-2 text-sm rounded-md text-white border border-transparent hover:bg-transparent hover:border-white hover:text-white transition duration-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#E6F4EA] px-5 py-2 text-sm rounded-md text-[#004B23] border border-transparent hover:bg-transparent hover:border-white hover:text-white transition duration-300"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceResolution;
