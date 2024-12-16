// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Image from "next/image";

// const fetchServiceDetails = async () => {
//   const { data } = await axios.get("/api/service-details"); // Adjust the endpoint as per your backend
//   return data;
// };

// const ServiceDetails = () => {
//   const { data, isLoading, isError } = useQuery(["serviceDetails"], fetchServiceDetails);

//   if (isLoading) {
//     return <div className="text-white text-center">Loading...</div>;
//   }

//   if (isError) {
//     return <div className="text-red-500 text-center">Error fetching service details.</div>;
//   }

//   const { mainImage, thumbnails, description, complianceLogs, rentalInfo, tags, location, fees, keywords } = data;

//   return (
//     <div className="min-h-screen bg-custom text-white p-4 md:p-6 lg:p-8">
//       {/* Container */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">
//         {/* Left Section */}
//         <div>
//           <div className="grid grid-cols-[4fr_1fr] gap-4">
//             {/* Main Image */}
//             <div className="relative rounded-md overflow-hidden aspect-[16/9] w-full">
//               <Image
//                 src={mainImage}
//                 alt="Product"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-md"
//               />
//             </div>

//             {/* Thumbnails */}
//             <div className="flex flex-col space-y-4">
//               {thumbnails.map((src, index) => (
//                 <div
//                   key={index}
//                   className="w-16 h-16 border-2 border-transparent hover:border-white rounded-md overflow-hidden cursor-pointer"
//                 >
//                   <Image
//                     src={src}
//                     alt={`Thumbnail ${index + 1}`}
//                     width={64}
//                     height={64}
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Slider Navigation */}
//           <div className="flex justify-center items-center w-full px-4 mt-4">
//             <button className="text-lg px-3 py-2 rounded">
//               <i className="fas fa-arrow-left text-gray-200" style={{ fontSize: "12px" }} />
//             </button>
//             <span className="text-sm font-bold">1/{thumbnails.length}</span>
//             <button className="text-lg px-3 py-2 rounded">
//               <i className="fas fa-arrow-right text-gray-200" style={{ fontSize: "12px" }} />
//             </button>
//           </div>

//           {/* Description */}
//           <h2 className="text-2xl font-bold mt-6 mb-2">Description</h2>
//           <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

//           {/* Compliance Log Table */}
//           <h2 className="text-2xl font-bold mt-6 mb-2">Previous Compliance Checks</h2>
//           <div className="overflow-x-auto bg-gray-800 rounded-md">
//             <table className="w-full text-left text-sm text-gray-200">
//               <thead className="bg-custom">
//                 <tr>
//                   <th className="p-2">ID</th>
//                   <th className="p-2">Date/Time</th>
//                   <th className="p-2">Violation Type</th>
//                   <th className="p-2">Actions Taken</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {complianceLogs.map((log, i) => (
//                   <tr key={i} className="border-t border-gray-600">
//                     <td className="p-2">{log.id}</td>
//                     <td className="p-2">{log.date}</td>
//                     <td className="p-2">{log.type}</td>
//                     <td className="p-2">{log.action}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="bg-custom border border-light text-light rounded-md p-4 lg:p-6 shadow-lg">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Rental Service</h2>
//             <span className="bg-red-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
//               <i className="fas fa-flag text-xs" style={{ fontSize: "10px" }} />
//               Flagged
//             </span>
//           </div>

//           <p className="text-gray-400 text-sm mt-2">Negotiable Price</p>
//           <h1 className="text-2xl font-bold">{rentalInfo.priceRange}</h1>
//           <h3 className="text-lg font-semibold mt-2">{rentalInfo.serviceName}</h3>

//           <div className="flex gap-2 my-2">
//             {tags.map((tag, i) => (
//               <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs">
//                 {tag}
//               </span>
//             ))}
//           </div>

//           <div className="flex items-center gap-2 my-4 text-sm">
//             <i className="fas fa-map-marker-alt text-red-500" style={{ fontSize: "12px" }} />
//             <span>{location}</span>
//           </div>

//           <div className="text-sm font-bold">{rentalInfo.duration}</div>
//           <button className="w-full bg-gray-200 text-sm py-2 mt-4 rounded text-greenbg">
//             {rentalInfo.providerName}
//           </button>

//           <div className="mt-6 space-y-2 text-xs text-light">
//             {fees.map((fee, i) => (
//               <div key={i} className="flex justify-between">
//                 <span className="flex items-center">
//                   {fee.label}
//                   <i className="fas fa-circle-info ml-1 text-gray-400" style={{ fontSize: "10px" }} />
//                 </span>
//                 <span>{fee.value}</span>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 text-gray-400 text-xs">
//             <p>{keywords.join(", ")}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;




'use client'
import React, { useState } from "react";
import Image from "next/image";
// import { useQuery } from "@tanstack/react-query";

// Dummy Data for Service Details
const serviceDetails = {
  images: ["/shoes2.jpeg", "/shoes3.jpeg", "/shoes4.jpeg", "/shoes1.jpeg"],
  description: "This is a sample description for the service. It provides shoes for rent in great condition.",
  priceRange: "PKR 2500 - 4000",
  name: "Rental Shoes Service",
  tags: ["Shoes", "Boots"],
  location: "Raiwand Road, Lahore, Pakistan",
  rentalDays: "3 Days",
  providerName: "John Doe",
  securityFee: "5%",
  cancellationFee: "5%",
  keywords: ["Shoes", "Boots", "Rental", "Fashion"]
};

// Dummy Data for Compliance Logs
const complianceLogs = [
  { id: 1, date: "2024-06-01 10:30 AM", type: "Late Return", action: "Warning Issued" },
  { id: 2, date: "2024-06-05 02:45 PM", type: "Damaged Product", action: "Fine Charged" },
  { id: 3, date: "2024-06-10 09:15 AM", type: "Non-Payment", action: "Account Suspended" }
];

const ServiceDetails = () => {
  // State to track the main image and current index
  const [mainImage, setMainImage] = useState(serviceDetails.images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for thumbnail clicks
  const handleThumbnailClick = (index) => {
    setMainImage(serviceDetails.images[index]);
    setCurrentIndex(index);
  };

  // Handler for arrow buttons
  const handleArrowClick = (direction) => {
    let newIndex = currentIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? serviceDetails.images.length - 1 : currentIndex - 1;
    } else if (direction === "right") {
      newIndex = currentIndex === serviceDetails.images.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setMainImage(serviceDetails.images[newIndex]);
  };

  return (
    <div className="min-h-screen bg-custom text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">
        {/* Left Section */}
        <div>
          <div className="grid grid-cols-[4fr_1fr] gap-4">
            {/* Main Image */}
            <div className="relative rounded-md overflow-hidden aspect-[16/9] w-full">
              <Image
                src={mainImage}
                alt="Product"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col space-y-4">
              {serviceDetails.images.map((src, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 border-2 ${mainImage === src ? "border-white" : "border-transparent"} hover:border-white rounded-md overflow-hidden cursor-pointer`}
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
              ))}
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="flex justify-center items-center w-full px-4 mt-4">
            <button
              className="text-lg px-3 py-2 rounded"
              onClick={() => handleArrowClick("left")}
            >
              <i
                className="fas fa-arrow-left text-gray-200"
                style={{ fontSize: "12px" }}
              />
            </button>
            <span className="text-sm font-bold">{currentIndex + 1}/{serviceDetails.images.length}</span>
            <button
              className="text-lg px-3 py-2 rounded"
              onClick={() => handleArrowClick("right")}
            >
              <i
                className="fas fa-arrow-right text-gray-200"
                style={{ fontSize: "12px" }}
              />
            </button>
          </div>

          {/* Description */}
          <h2 className="text-2xl font-bold mt-6 mb-2">Description</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {serviceDetails.description}
          </p>

          {/* Compliance Log Table */}
          <h2 className="text-2xl font-bold mt-6 mb-2">
            Previous Compliance Checks
          </h2>
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
                {complianceLogs.map((row, i) => (
                  <tr key={i} className="border-t border-gray-500 bg-gray-400">
                    <td className="p-2">{row.id}</td>
                    <td className="p-2">{row.date}</td>
                    <td className="p-2">{row.type}</td>
                    <td className="p-2">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-custom border border-light text-light rounded-md p-4 lg:p-6 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Rental Service</h2>
            {/* Flag Icon */}
            <span className="bg-red-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
              <i className="fas fa-flag text-xs" style={{ fontSize: "10px" }} />
              Flagged
            </span>
          </div>

          {/* Negotiable Price */}
          <p className="text-gray-400 text-sm mt-2">Negotiable Price</p>
          <h1 className="text-2xl font-bold">{serviceDetails.priceRange}</h1>
          <h3 className="text-lg font-semibold mt-2">{serviceDetails.name}</h3>

          {/* Tags */}
          <div className="flex gap-2 my-2">
            {serviceDetails.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Location Icon */}
          <div className="flex items-center gap-2 my-4 text-sm">
            <i
              className="fas fa-map-marker-alt text-red-500"
              style={{ fontSize: "12px" }}
            />
            <span>{serviceDetails.location}</span>
          </div>

          {/* Rental Days */}
          <div className="text-sm font-bold">{serviceDetails.rentalDays}</div>
          <button className="w-full bg-gray-200 text-sm py-2 mt-4 rounded text-greenbg">
            {serviceDetails.providerName}
          </button>

          {/* Fees */}
          <div className="mt-6 space-y-2 text-xs text-light">
            <div className="flex justify-between">
              <span className="flex items-center">
                Security Fee
                <i
                  className="fas fa-circle-info ml-1 text-gray-400"
                  style={{ fontSize: "10px" }}
                />
              </span>
              <span>{serviceDetails.securityFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                Cancellation Fee
                <i
                  className="fas fa-circle-info ml-1 text-gray-400"
                  style={{ fontSize: "10px" }}
                />
              </span>
              <span>{serviceDetails.cancellationFee}</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="mt-6 text-gray-400 text-xs">
            <p>{serviceDetails.keywords.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
