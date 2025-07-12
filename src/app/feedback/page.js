"use client";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import FlashCard from "@/components/Flashcard";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";
import LoadingBar from "react-top-loading-bar"; // Import the LoadingBar component

// Function to fetch feedbacks data
const fetchFeedbacks = async () => {
  const response = await fetch("/api/feedbacks", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch feedbacks");
  }
  return response.json();
};

// export const updateFeedbackStatus = async (feedbackID, newStatus) => {
//   const response = await fetch(`/api/feedbacks/${feedbackID}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ Status: newStatus }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update feedback status');
//   }
//   return response.json();
// };

const FeedbackPage = () => {
  const loadingBarRef = useRef(null); // Create a reference for the loading bar
  const { data: feedbacks, error, isLoading } = useQuery({
    queryKey: ["feedbacks"], // Query key for caching
    queryFn: fetchFeedbacks, // Fetch function
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    refetchOnMount: false, // Do not refetch if data is cached
    refetchOnWindowFocus: false, // Disable refetch on tab focus
    onSuccess: () => {
      // On success, finish the loading bar
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    },
    onError: () => {
      // On error, finish the loading bar
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    },
    onSettled: () => {
      // Ensure that the loading bar is completed when fetching settles
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    },
  });

  const filterOptions = [
    { label: "Restricted Keywords", value: "restricted" },
    { label: "Excessive Search Frequency", value: "frequency" },
  ];

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleFilter = (filter) => {
    console.log("Selected filter:", filter);
  };

  if (isLoading) {
    // Start the loading bar when fetching starts
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    return (
      <div className="p-6 min-h-screen">
        <LoadingBar color="#f11946" ref={loadingBarRef} /> {/* Show loading bar */}
        <h1 className="text-heading align-left text-3xl font-bold mb-8">Loading Feedbacks...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen">
        <LoadingBar color="#f11946" ref={loadingBarRef} /> {/* Show loading bar */}
        <h1 className="text-heading align-left text-3xl font-bold mb-8">Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <LoadingBar color="#f11946" ref={loadingBarRef} /> {/* Show loading bar */}
      {/* <SearchBarWithFilters
        placeholder="Search Feedbacks by id or name"
        filterOptions={filterOptions}
        onSearch={handleSearch}
        onFilter={handleFilter}
      /> */}
      <h1 className="text-heading align-left text-3xl font-bold mb-8">Feedback</h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {feedbacks.map((item) => (
          <div key={item.FeedbackID} className="flex justify-center">
            <FlashCard
              id={item.FeedbackID}
              title={item.Title}
              date={item.Date}
              givenBy={item.RoleType}
              description={item.Description}
              status={item.Status}
              userID={item.User}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
