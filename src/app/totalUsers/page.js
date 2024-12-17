"use client";
import React from "react";
import ProfileCard from "@/components/profileCard";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const TotalUsers = () => {
  const users = [
    { name: "John Doe", role: "Provider", rating: 4 },
    { name: "John Poe", role: "Consumer", rating: 5 },
    { name: "John Doe", role: "Provider", rating: 4 },
    { name: "John Poe", role: "Consumer", rating: 5 },
    { name: "John Doe", role: "Provider", rating: 4 },
    { name: "John Poe", role: "Consumer", rating: 5 },
    { name: "John Poe", role: "Consumer", rating: 5 },
    { name: "John Doe", role: "Provider", rating: 4 },
    { name: "John Poe", role: "Consumer", rating: 5 },
  ];

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

  const chartData = {
    labels: ["Providers", "Consumers"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#EF4444", "#3B82F6"], // Red and Blue
        hoverBackgroundColor: ["#DC2626", "#2563EB"],
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
  };

  return (
    <div className="min-h-screen p-6">
      <SearchBarWithFilters
        placeholder="Search by id or name"
        filterOptions={filterOptions}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <h2 className="text-heading text-3xl font-bold my-10">Total Users</h2>

      <div className="flex items-center mb-10">
        {/* Pie Chart */}
        <div className="w-60 h-60">
          <Pie data={chartData} options={chartOptions} />
        </div>

        {/* Chart Legend */}
        <div className="ml-6">
          <p className="flex items-center text-gray-600">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Providers
          </p>
          <p className="flex items-center text-gray-600">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Consumers
          </p>
        </div>
      </div>

      {/* User Cards */}
      <div className="rounded-lg bg-customGray p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user, index) => (
          <ProfileCard
            key={index}
            name={user.name}
            role={user.role}
            rating={user.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default TotalUsers;
