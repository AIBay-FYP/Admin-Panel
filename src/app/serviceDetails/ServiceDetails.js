import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { formatDate } from "@/utiks/formatDate";


const fetchServiceDetails = async (id) => {
  const response = await fetch(`/api/listedService/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const fetchComplianceLogs = async (id) => {
  const response = await fetch(`/api/complianceServices/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch compliance logs");
  }
  return response.json();
};

const ServiceDetails = ({ data: initialData, isFetch = true }) => {
  // Conditionally fetch the service details or use the initialData directly
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceDetails", initialData?.ListingID],
    queryFn: () => (isFetch ? fetchServiceDetails(initialData?.ListingID) : initialData),
    initialData: initialData,
  });

  const { data: complianceData, isLoading: isComplianceLoading, isError: isComplianceError } = useQuery({
    queryKey: ["complianceLogs", initialData?.ListingID],
    queryFn: () => (isFetch? fetchComplianceLogs(initialData?.ListingID):fetchComplianceLogs(initialData?._id)),
    initialData: [], // Fallback in case of no compliance logs
  });

  const {
    Photos = [],
    Title = "No Title",
    Description = "Description not available.",
    Keywords = [],
    Location = "Location not specified",
    IsFixedPrice = false,
    FixedPrice = 0,
    MinPrice = 0,
    MaxPrice = 0,
    SecurityFee = 0,
    CancellationFee = 0,
    IsNegotiable = false,
    ProviderID,
    DaysAvailable = "N/A",
    Category = "Unknown Category",
    ServiceType = "Service",
    Currency =  ""
  } = data || {};

  const [mainImage, setMainImage] = useState(Photos[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center">Error fetching service details.</div>;
  }

  // Handler for thumbnail clicks
  const handleThumbnailClick = (index) => {
    console.log(initialData);
    setMainImage(Photos[index]);
    setCurrentIndex(index);
  };

  // Handler for arrow buttons
  const handleArrowClick = (direction) => {
    let newIndex = currentIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? Photos.length - 1 : currentIndex - 1;
    } else if (direction === "right") {
      newIndex = currentIndex === Photos.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setMainImage(Photos[newIndex]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 mx-20 my-10 overflow-y-auto">
      <div className="min-h-screen bg-custom text-white p-4 md:p-6 lg:p-8">
        {/* Container */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">
          {/* Left Section */}
          <div>
            <div className="grid grid-cols-[4fr_1fr] gap-4">
              {/* Main Image */}
              <div className="relative rounded-md overflow-hidden aspect-[16/9] w-full">
                <Image
                  src={mainImage}
                  alt={Title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex flex-col space-y-4">
                {Photos.length > 0 ? (
                  Photos.map((src, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 border-2 ${currentIndex === index ? "border-white" : "border-transparent"} hover:border-white rounded-md overflow-hidden cursor-pointer`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400">No photos available</div>
                )}
              </div>
            </div>

            {/* Slider Navigation */}
            <div className="flex justify-center items-center w-full px-4 mt-4">
              <button
                className="text-lg px-3 py-2 rounded"
                onClick={() => handleArrowClick("left")}
              >
                <i className="fas fa-arrow-left text-gray-200" style={{ fontSize: "12px" }} />
              </button>
              <span className="text-sm font-bold">{currentIndex + 1}/{Photos.length}</span>
              <button
                className="text-lg px-3 py-2 rounded"
                onClick={() => handleArrowClick("right")}
              >
                <i className="fas fa-arrow-right text-gray-200" style={{ fontSize: "12px" }} />
              </button>
            </div>

            {/* Description */}
            <h2 className="text-2xl font-bold mt-6 mb-2">Description</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{Description}</p>

            {/* Compliance Log Table */}
            <h2 className="text-2xl font-bold mt-6 mb-2">Previous Compliance Checks</h2>
            <div className="overflow-x-auto bg-gray-800 rounded-md">
              <table className="w-full text-left text-sm text-gray-200">
                <thead className="bg-custom">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Date/Time</th>
                    <th className="p-2">Violation Type</th>
                    <th className="p-2">Actions Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceData?.length > 0 ? (
                    complianceData.map((log, i) => (
                      <tr key={i} className="border-t border-gray-600">
                        <td className="p-2">{log.LogID || "N/A"}</td>
                        <td className="p-2">{formatDate(log.LastReviewed) || "N/A"}</td>
                        <td className="p-2">{log.ViolationType || "N/A"}</td>
                        <td className="p-2">{log.Status || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-2 text-center text-gray-400">
                        No compliance logs available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-custom border border-light text-light rounded-md p-4 lg:p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{ServiceType} Service</h2>
              <span
                className={`${IsNegotiable ? "bg-green-600" : "bg-red-600"} text-white text-sm px-2 py-1 rounded`}
              >
                {IsNegotiable ? "Negotiable" : "Fixed"}
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-2">Price</p>
              <h1 className="text-2xl font-bold">
                {IsFixedPrice
                  ? `${Currency} ${FixedPrice}`
                  : MinPrice === 0
                  ? `${Currency} ${MaxPrice}`
                  : `${Currency} ${MinPrice} - ${MaxPrice}`}
              </h1>

            <h3 className="text-lg font-semibold mt-2">{Title}</h3>

            <div className="flex gap-2 my-2">
              {Keywords.map((tag, i) => (
                <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 my-4 text-sm">
            <i className="fas fa-location-pin text-red-500" style={{ fontSize: "12px" }} />
            <span>{Location}</span>
            </div>

            {ServiceType !== "Sale" && (
              <div className="text-sm font-bold">{DaysAvailable} days available</div>
            )}
            <button className="w-full bg-gray-200 text-sm py-2 mt-4 rounded text-greenbg">
              Contact Provider
            </button>

            <div className="mt-6 space-y-2 text-xs text-light">
              <div className="flex justify-between">
                <span>Security Fee</span>
                <span>{SecurityFee}%</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation Fee</span>
                <span>{CancellationFee}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
