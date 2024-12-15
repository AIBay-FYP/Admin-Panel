"use client"; // Mark as a Client Component

import React from "react";
import SearchBarWithFilters from "./SearchBarWithFilters";

const ClientSearchSection = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Add logic to filter or search based on query
  };

  const handleFilter = (filter) => {
    console.log("Selected filter:", filter);
    // Add logic to filter based on selected option
  };

  return (
    <div className="p-4 ">
      <SearchBarWithFilters onSearch={handleSearch} onFilter={handleFilter} />
    </div>
  );
};

export default ClientSearchSection;
