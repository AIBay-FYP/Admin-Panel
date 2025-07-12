'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useState, useEffect } from "react";

const SearchBarWithFilters = ({ placeholder, onSearch, onFilter, filterOptions }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleFilterChange = (selectedOption) => {
    setFilterOption(selectedOption);
    if (onFilter) onFilter(selectedOption);
    setIsFilterOpen(false); 
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex w-full md:w-auto flex-grow bg-customgray"
      >
        <input
          type="text"
          className="flex-grow bg-searchBar p-2 border border-gray-500 text-sm border-r-0 rounded-l-md focus:outline-none"
          placeholder={placeholder}  // Use the customizable placeholder
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-searchBar border border-gray-500 border-l-0 text-white px-3 py-2 rounded-r-md cursor-pointer"
        >
          <i className="text-black fas fa-search text-xl" />
        </button>
      </form>

      {/* Filter Icon and Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-dark-green text-white hover:bg-dark-green p-2 rounded-md cursor-pointer flex items-center justify-center relative z-10"
        >
          {/* Updated to use sliders icon */}
          <i className="fas fa-sliders-h text-xl" />
        </button>

        {isFilterOpen && (
          <div className="absolute top-full right-0 mt-2 p-2 bg-white border border-gray-500 rounded-md shadow-lg w-48 z-5000">
            <ul className="space-y-2">
              {/* Dynamically render filter options from the prop */}
              {filterOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterChange(option.value)}
                  className="flex p-2 cursor-pointer text-sm hover:bg-gray-200 text-left  text-gray-400"
                >
                  {option.label} {/* Display the label for each filter option */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarWithFilters;
