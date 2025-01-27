'use client'
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
const { default: ListedServiceCard } = require("@/components/ListedServiceCard");
import LoadingBar from 'react-top-loading-bar'; // Import the loading bar

const ListedServices = () => {
  const loadingBarRef = useRef(null); // Ref for the loading bar

  // Fetch services
  const fetchServices = async () => {
    const response = await fetch('/api/listedService');

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['listedServices'],
    queryFn: fetchServices,
    onSuccess: () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete(); // Complete the loading bar when data is fetched
      }
    },
    onError: () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete(); // Complete the loading bar in case of an error
      }
    }
  });

  if (isLoading) {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart(); // Start the loading bar when data is loading
    }
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-4 m-10">
      <LoadingBar color="#f11946" ref={loadingBarRef} /> {/* Add the loading bar */}
      
      {/* Sticky header */}
      <h1 className="sticky top-0 bg-dark-green text-white rounded-lg z-10 p-4 text-2xl font-bold shadow-md">
        Listed Services
      </h1>
      
      {/* List of services */}
      {Array.isArray(data) && data.length > 0 ? (
        data.map((service) => (
          <ListedServiceCard
            key={service.ListingID}
            data={service}
          />
        ))
      ) : (
        <span>No services available</span> // Display a message if no data
      )}
    </div>
  );
};

export default ListedServices;
