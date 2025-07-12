"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/profileCard";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";
import { useRouter } from "next/navigation";

const ModeratorRegistration = () => {
  const router = useRouter();
  const [moderators, setModerators] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fetch data from the API
    const fetchModerators = async () => {
      try {
        const response = await fetch("/api/moderatorPage");
        const data = await response.json();
        setModerators(data);
      } catch (error) {
        console.error("Failed to fetch moderators:", error);
      }
    };

    fetchModerators();
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleFilter = (filter) => {
    console.log("Selected filter:", filter);
  };

  const handleNewRegistration = () => {
    router.push("/moderatorsRegistration");
  };

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="mb-6">
        {/* <SearchBarWithFilters
          placeholder="Search Moderators"
          filterOptions={[
            { label: "By Name", value: "name" },
            { label: "By Email", value: "email" },
          ]}
          onSearch={handleSearch}
          onFilter={handleFilter}
        /> */}
      </div>

      {/* Page Heading and Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-heading text-white">Moderators</h1>
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
        <div className="w-[250px] h-[110px] border border-white text-heading bg-darkgreen rounded-lg p-4 flex flex-col justify-between hover:shadow-lg">
          <h1 className="text-4xl font-bold text-white">{moderators.length}</h1>
          <p className="text-sm font-semibold text-white">Total Registered</p>
        </div>
      </div>

      {/* Moderators Section */}
      <div className="rounded-lg bg-customGray p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moderators.map((moderator, index) => (
          <ProfileCard
          key={moderator._id}
          name={moderator.Name}
          role={moderator.RoleType}
          email={moderator.Email}
          location={moderator.Location}
          contactNumber={moderator.ContactNumber}
          profilePicture={moderator.ProfilePicture}
          rating={moderator.Rating || 0} 
          approvedBy={moderator.ApprovedBy}
          userID={moderator.UserID}
        />
        ))}
      </div>
    </div>
  );
};

export default ModeratorRegistration;