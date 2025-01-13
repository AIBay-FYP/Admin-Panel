"use client";
import React from "react";
import ProfileCard from "@/components/profileCard";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";

// Mock data for ProfileCard
const moderators = Array(8).fill({
  name: "John Doe",
  role: "Moderator",
  email: "john.doe@example.com",
});

const ModeratorRegistration = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleFilter = (filter) => {
    console.log("Selected filter:", filter);
  };

  const handleNewRegistration = () => {
    // Navigate to the moderator registration screen
    window.location.href = "/moderatorsRegistration";
  };

  return (
    <div className="min-h-screen p-6 bg-darkgreen">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBarWithFilters
          placeholder="Search Moderators"
          filterOptions={[
            { label: "By Name", value: "name" },
            { label: "By Email", value: "email" },
          ]}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />
      </div>

      {/* Page Heading and Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Moderators</h1>
        <button
          onClick={handleNewRegistration}
          className="flex items-center gap-2 bg-darkgreen text-white font-semibold px-5 py-2 rounded-lg hover:bg-white hover:text-darkgreen hover:border-darkgreen border"
        >
          New Registration
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* Metrics Card */}
      <div className="mb-6">
        <div className="w-[250px] h-[110px] bg-[#4CAF50] text-white rounded-lg shadow-lg p-4 flex flex-col justify-between">
          <h1 className="text-4xl font-bold">21</h1>
          <p className="text-sm font-semibold">Total Registered</p>
        </div>
      </div>

      {/* Moderators Section */}
      <div className="rounded-lg bg-gray-100 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moderators.map((moderator, index) => (
          <ProfileCard
            key={index}
            name={moderator.name}
            role={moderator.role}
            rating={4} // Example rating
          />
        ))}
      </div>
    </div>
  );
};

export default ModeratorRegistration;
