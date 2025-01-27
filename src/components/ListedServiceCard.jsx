import React, { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Assuming you're using Next.js for image handling
import ServiceDetails from "@/app/serviceDetails/ServiceDetails";

const ListedServiceCard = ({ data }) => {
  const [showPopup, setShowPopup] = useState(false);
  const modalRef = useRef(null)
  // Close the popup when clicking outside
  const closePopup = (e) => {
      setShowPopup(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Effect to manage body scrolling
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPopup]);

  return (
    <>
      <div className="flex w-full bg-white rounded-lg shadow-md cursor-pointer" onClick={() => setShowPopup(true)}>
        {/* Left part: Image */}
        <div className="flex-shrink-0 w-1/3 relative">
          <Image
            src={data.Photos[0]}
            alt="Product"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>

        {/* Right part: Details */}
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold text-gray-800">{data.Title}</h3>
          <p className="text-sm text-gray-600">{data.ServiceType}</p>
          <p className="text-sm text-gray-600">{data.isNegotiable ? 'Negotiable' : 'Fixed Price'}</p>
          <p className="text-sm text-gray-600">{data.Location}</p>
        </div>
      </div>

      {/* Render the ServiceDetails Popup if showPopup is true */}
      {showPopup && (
        <div ref={modalRef}>
            <ServiceDetails 
            onClose= {closePopup}
            data={data} 
            isFetch={false} />
          </div>
      )}
    </>
  );
};

export default ListedServiceCard;
