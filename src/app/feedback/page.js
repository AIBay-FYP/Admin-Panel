"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query"; // Import React Query hook
import FlashCard from "@/components/Flashcard";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";

// Function to fetch feedbacks data
const fetchFeedbacks = async () => {
  const response = await fetch("/api/feedbacks", {
    method: "GET", // Explicitly specify GET method (optional since it's the default)
    headers: {
      "Content-Type": "application/json",
    },
  });
    if (!response.ok) {
    throw new Error("Failed to fetch feedbacks");
  }
  console.log(response)
  return response.json();
};

const FeedbackPage = () => {
  const { data: feedbacks, error, isLoading } = useQuery({ 
   queryKey: ["feedbacks"], // Query key for caching
    queryFn: fetchFeedbacks // Fetch function
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
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-heading align-left text-3xl font-bold mb-8">Loading Feedbacks...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-heading align-left text-3xl font-bold mb-8">Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <SearchBarWithFilters
        placeholder="Search Feedbacks by id or name"
        filterOptions={filterOptions}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
