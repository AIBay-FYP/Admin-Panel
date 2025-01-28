import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useQuery } from "@tanstack/react-query";

const fetchContractDetails = async (id) => {
  const response = await fetch(`/api/contracts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const ServiceResolution = ({ onClose, contractId }) => {
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [serviceResolution, setServiceResolution] = useState("refund");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["contractDetails", contractId],
    queryFn: () => fetchContractDetails(contractId),
  });

  useEffect(() => {
    if (data && data.listingDetails) {
      const imagesArray = data.listingDetails.Photos || [];
      setImages(imagesArray);
      setMainImage(imagesArray.length > 0 ? imagesArray[0] : "");
    }
  }, [data]);

  const handleCancel = () => {
    onClose();
  };

  const handleSaveChanges = () => {
    console.log("Service Resolution:", serviceResolution);
    console.log("Selected Image:", mainImage);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div>Loading contract details...</div>
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load contract details</div>;
  }

  if (!data) {
    return <div>No contract details found.</div>;
  }

  console.log(data)
  const isDisputed = data?.Status === "Disputed";


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[700px] bg-[#00262A] text-white rounded-lg p-4">
        <div className="flex mb-4 gap-6">
          <div className="flex flex-col items-start">
            {mainImage ? (
              <img
                src={mainImage}
                alt="Service"
                className="w-72 h-40 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-72 h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            {images.length > 0 ? (
              images.map((image, index) => (
                image ? (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className="w-14 h-12 rounded-lg cursor-pointer hover:opacity-80"
                    onClick={() => setMainImage(image)}
                  />
                ) : (
                  <div
                    key={index}
                    className="w-14 h-12 bg-gray-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-500">No Image</span>
                  </div>
                )
              ))
            ) : (
              <div className="text-gray-500">No thumbnails available</div>
            )}
          </div>

          <div className="flex flex-col items-start justify-between ml-4">
            <h2 className="text-2xl font-semibold">
              {data.listingDetails?.Title || "Service Name"}
            </h2>
            {isDisputed && (
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
            )}
            <div className="flex items-center cursor-pointer">
              <a href={data.DocumentURL || "#"} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-file-contract text-gray-300" style={{ fontSize: "12px" }} />
                <span className="text-sm ml-1">Contract</span>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-500 mb-4" />

        <div className="mb-4 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Price:</span> {data.Price || "N/A"} PKR
          </p>
          <p className="text-sm">
            <span className="font-semibold">Consumer’s Name:</span> {data.consumerDetails?.Name || "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Provider’s Name:</span> {data.providerDetails?.Name || "N/A"}
          </p>
          {isDisputed && (
            <p className="text-sm">
              <span className="font-semibold">Nature of Dispute:</span> {data.DisputeNature || "N/A"}
            </p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-sm leading-relaxed">
            {data.listingDetails?.Description || "No description available."}
          </p>
        </div>

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
