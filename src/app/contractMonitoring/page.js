// 'use client';
// import React, { useRef, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import SearchBarWithFilters from '@/components/SearchBarWithFilters';
// import { Chart, PieController, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import Table from '@/components/Table';
// import ServiceResolution from '@/components/ServiceResolution';
// import { formatDate } from '@/utiks/formatDate';

// Chart.register(PieController, Title, Tooltip, Legend, ArcElement);

// const fetchContracts = async () => {
//   const response = await fetch('/api/contracts');
//   if (!response.ok) {
//     throw new Error('Failed to fetch contracts');
//   }
//   return response.json();
// };

// export default function ContractMonitoring() {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   const { data = [], isLoading, isError } = useQuery({
//     queryKey: ['fetchContracts'],
//     queryFn: fetchContracts,
//   });

//   const filterOptions = [
//     { label: 'Restricted Keywords', value: 'restricted' },
//     { label: 'Excessive Search Frequency', value: 'frequency' },
//   ];

//   const handleSearch = (query) => console.log('Search query:', query);
//   const handleFilter = (filter) => console.log('Selected filter:', filter);

//   const chartData = {
//     labels: ['On-going', 'Disputed', 'Completed'],
//     datasets: [
//       {
//         data: [
//           data.filter((item) => item.Status === 'On-going').length || 0,
//           data.filter((item) => item.Status === 'Disputed').length || 0,
//           data.filter((item) => item.Status === 'Completed').length || 0,
//         ],
//         backgroundColor: ['#F8D568', '#D9534F', '#5BC0DE'],
//         borderColor: ['#F8D568', '#D9534F', '#5BC0DE'],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: {
//       legend: {
//         position: 'right',
//         labels: {
//           font: { size: 13 },
//           color: '#333',
//           boxWidth: 10,
//           boxHeight: 10,
//           usePointStyle: true,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.label}: ${context.raw}`,
//         },
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   useEffect(() => {
//     if (!data || !chartRef.current) return;

//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     chartInstance.current = new Chart(chartRef.current, {
//       type: 'pie',
//       data: chartData,
//       options: chartOptions,
//     });

//     return () => chartInstance.current?.destroy();
//   }, [data]);

//   const columns = [
//     { header: 'Contract ID', accessor: 'ContractID' },
//     { header: 'Consumer Name', accessor: (row) => row.consumerDetails?.Name },
//     { header: 'Provider Name', accessor: (row) => row.providerDetails?.Name },
//     { header: 'Service Name', accessor: (row) => row.listingDetails?.Title },
//     { header: 'Date Created', accessor: (row) => formatDate(row.Timestamp) },
//   ];

//   const dropdownOptions = [
//     { label: 'On-going', color: 'text-green-500' },
//     { label: 'Disputed', color: 'text-red-500' },
//     { label: 'Completed', color: 'text-blue-500' },
//   ];

//   const openPopup = true;

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching contracts data</div>;
//   }

//   if (data.length === 0) {
//     return <div>No contracts available</div>;
//   }

//   return (
//     <div className="py-6 rounded-lg">
//       <SearchBarWithFilters
//         placeholder="Search by Contract Id, Service Name or Provider Name"
//         filterOptions={filterOptions}
//         onSearch={handleSearch}
//         onFilter={handleFilter}
//       />
//       <h2 className="text-heading text-2xl font-bold my-10 text-left">
//         Contract Monitoring
//       </h2>

//       <div className="flex justify-center mb-6">
//         <div className="w-64 h-64">
//           <canvas ref={chartRef}></canvas>
//         </div>
//       </div>

//       <Table
//         columns={columns}
//         details={true}
//         data={data}
//         dropdownOptions={dropdownOptions}
//         openPopup={openPopup}
//         detailsPopup={ServiceResolution}
//       />
//     </div>
//   );
// }

'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBarWithFilters from '@/components/SearchBarWithFilters';
import { Chart, PieController, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Table from '@/components/Table';
import ServiceResolution from '@/components/ServiceResolution';
import { formatDate } from '@/utiks/formatDate';

Chart.register(PieController, Title, Tooltip, Legend, ArcElement);

const fetchContracts = async () => {
  const response = await fetch('/api/contracts');
  if (!response.ok) {
    throw new Error('Failed to fetch contracts');
  }
  return response.json();
};

export default function ContractMonitoring() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [openPopup, setOpenPopup] = useState(false); // Track popup visibility
  const [selectedContractId, setSelectedContractId] = useState(null); // Track selected contract ID

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['fetchContracts'],
    queryFn: fetchContracts,
  });

  const filterOptions = [
    { label: 'Restricted Keywords', value: 'restricted' },
    { label: 'Excessive Search Frequency', value: 'frequency' },
  ];

  const handleSearch = (query) => console.log('Search query:', query);
  const handleFilter = (filter) => console.log('Selected filter:', filter);

  const chartData = {
    labels: ['On-going', 'Disputed', 'Completed'],
    datasets: [
      {
        data: [
          data.filter((item) => item.Status === 'On-going').length || 0,
          data.filter((item) => item.Status === 'Disputed').length || 0,
          data.filter((item) => item.Status === 'Completed').length || 0,
        ],
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
    if (!data || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'pie',
      data: chartData,
      options: chartOptions,
    });

    return () => chartInstance.current?.destroy();
  }, [data]);

  const columns = [
    { header: 'Contract ID', accessor: 'ContractID' },
    { header: 'Consumer Name', accessor: (row) => row.consumerDetails?.Name },
    { header: 'Provider Name', accessor: (row) => row.providerDetails?.Name },
    { header: 'Service Name', accessor: (row) => row.listingDetails?.Title },
    { header: 'Date Created', accessor: (row) => formatDate(row.Timestamp) },
    
  ];


  const handleRowClick = (contractId) => {
    setSelectedContractId(contractId);
    setOpenPopup(true); // Open the popup
  };

  const handleClosePopup = () => {
    setSelectedContractId(null);
    setOpenPopup(false); // Close the popup
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching contracts data</div>;
  }

  if (data.length === 0) {
    return <div>No contracts available</div>;
  }

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

      <div className="flex justify-center mb-6">
        <div className="w-64 h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      <Table
        columns={columns}
        data={data}
        details={true}
        openPopup={true}
        detailsPopup={ServiceResolution}
        onRowClick={(row) => handleRowClick(row.ContractID)} // Pass ContractID to popup
      />

      {/* Popup */}
      {openPopup && (
        <ServiceResolution
          contractId={selectedContractId} // Pass selected contract ID
          onClose={handleClosePopup} // Close popup
        />
      )}
    </div>
  );
}
