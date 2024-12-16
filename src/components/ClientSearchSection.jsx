"use client"; // Mark as a Client Component

import React from "react";
import SearchBarWithFilters from "./SearchBarWithFilters";

const ClientSearchSection = () => {
  const filterOptions = [
    { label: "Restricted Keywords", value: "restricted" },
    { label: "Excessive Search Frequency", value: "frequency" },
    { label: "Out-of-Scope Searches", value: "out-of-scope" },
    { label: "High-Risk Behavior", value: "high-risk" },
  ];
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Add logic to filter or search based on query
  };

  const handleFilter = (filter) => {
    console.log("Selected filter:", filter);
    // Add logic to filter based on selected option
  };

  return (
    <div className="mb-10">
      <SearchBarWithFilters
      placeholder="Search by provider Id, service name"
      filterOptions={filterOptions}
      onSearch={handleSearch} onFilter={handleFilter} />
    </div>
  );
};

export default ClientSearchSection;
