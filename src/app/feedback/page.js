"use client";
import React from "react";
import FlashCard from "@/components/Flashcard";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";

const dummyData = [
  {
    id: "001",
    title: "Title One",
    date: "Sept 20, 2023",
    givenBy: "John Doe",
    description: "This is the description for Title One.",
  },
  {
    id: "002",
    title: "Title Two",
    date: "Oct 10, 2023",
    givenBy: "Jane Smith",
    description: "This is the description for Title Two.",
  },
  {
    id: "003",
    title: "Title Three",
    date: "Nov 15, 2023",
    givenBy: "Alice Brown",
    description: "This is the description for Title Three.",
  },
  {
    id: "004",
    title: "Title Four",
    date: "Dec 01, 2023",
    givenBy: "Bob Johnson",
    description: "This is the description for Title Four.",
  },
];

const FeedbackPage = () => {
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
        {dummyData.map((item) => (
          <div key={item.id} className="flex justify-center">
            <FlashCard
              id={item.id}
              title={item.title}
              date={item.date}
              givenBy={item.givenBy}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
