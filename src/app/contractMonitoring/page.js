'use client';
import React, { useRef, useEffect, useState } from 'react';
import SearchBarWithFilters from '@/components/SearchBarWithFilters';
import { Chart, PieController, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Table from '@/components/Table'; // Import the Table component

Chart.register(PieController, Title, Tooltip, Legend, ArcElement);

export default function ContractMonitoring() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
    labels: ['On-going', 'Disputed', 'Completed'],
    datasets: [
      {
        data: [722, 748, 947],
        backgroundColor: ['#F8D568', '#D9534F', '#5BC0DE'],
        borderColor: ['#F8D568', '#D9534F', '#5BC0DE'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { size: 13 },
          color: '#333',
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: chartData,
        options: chartOptions,
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Table data
  const columns = [
    { header: 'Contract ID', accessor: 'contractId' },
    { header: 'Consumer Name', accessor: 'consumerName' },
    { header: 'Provider Name', accessor: 'providerName' },
    { header: 'Service Name', accessor: 'serviceName' },
    { header: 'Date Created', accessor: 'dateCreated' },
  ];

  const data = [
    { contractId: '#001', consumerName: 'John Doe', providerName: 'Provider 1', serviceName: 'Service 1', dateCreated: '2024-06-14', status: 'On-going' },
    { contractId: '#002', consumerName: 'Jane Smith', providerName: 'Provider 2', serviceName: 'Service 2', dateCreated: '2024-06-15', status: 'Disputed' },
    { contractId: '#003', consumerName: 'Jim Beam', providerName: 'Provider 3', serviceName: 'Service 3', dateCreated: '2024-06-16', status: 'Completed' },
    { contractId: '#004', consumerName: 'Jake White', providerName: 'Provider 4', serviceName: 'Service 4', dateCreated: '2024-06-17', status: 'On-going' },
  ];

  const dropdownOptions = [
    { label: 'On-going', color: 'text-green-500' },
    { label: 'Disputed', color: 'text-red-500' },
    { label: 'Completed', color: 'text-blue-500' },
  ];

  const openPopup = true; // This could be based on a condition

  return (
    <div className="py-6 rounded-lg">
      <SearchBarWithFilters
        placeholder="Search by Contract Id, Service Name or Provider Name"
        filterOptions={filterOptions}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <h2 className="text-heading text-2xl font-bold my-10 text-left">
        Contract Monitoring
      </h2>

      {/* Chart Section */}
      <div className="flex justify-center mb-6">
        <div className="w-64 h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        data={data}
        dropdownOptions={dropdownOptions}
        openPopup={openPopup} // Pass openPopup to the Table component
      />
    </div>
  );
}
