// 'use client';
// import React, { useRef, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Chart, PieController, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // Register required components for Chart.js
// Chart.register(PieController, Title, Tooltip, Legend, ArcElement);

// // Mock API fetch function
// const fetchContractMonitoringData = async () => {
//   const response = await fetch('/api/contract-monitoring'); // Update with actual API endpoint
//   if (!response.ok) throw new Error('Failed to fetch contract monitoring data');
//   return response.json();
// };

// export default function ContractMonitoring() {
//   const chartRef = useRef(null);

//   // Fetch data using React Query
//   const { data, isLoading, isError } = useQuery(['contractMonitoringData'], fetchContractMonitoringData);

//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching contract monitoring data.</div>;

//   // Extract data from the fetched API response
//   const chartData = {
//     labels: ['On-going', 'Disputed', 'Completed'],
//     datasets: [
//       {
//         data: data.chartData || [0, 0, 0], // Fallback to zeros if data is unavailable
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
//           boxWidth: 10, // Size of the square legend box
//           boxHeight: 10, // Height of the square legend box
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
//     if (chartRef.current) {
//       new Chart(chartRef.current, {
//         type: 'pie',
//         data: chartData,
//         options: chartOptions,
//       });
//     }
//   }, [chartData]);

//   return (
//     <div className="bg-[#E6F8F4] p-6 rounded-lg text-gray-800 w-full">
//       <h2 className="text-2xl font-bold mb-4 text-left text-[#013220]">
//         Contract Monitoring
//       </h2>

//       {/* Chart Section */}
//       <div className="flex justify-center mb-6">
//         <div className="w-64 h-64">
//           <canvas ref={chartRef}></canvas>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div>
//         <table className="w-full bg-white text-sm text-gray-600 rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-[#E6F8F4] text-gray-700">
//               <th className="p-3 text-left">Contract ID</th>
//               <th className="p-3 text-left">Consumer Name</th>
//               <th className="p-3 text-left">Provider Name</th>
//               <th className="p-3 text-left">Service Name</th>
//               <th className="p-3 text-left">Date Created</th>
//               <th className="p-3 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.tableData.map((row, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{row.contractId}</td>
//                 <td className="p-3">{row.consumerName}</td>
//                 <td className="p-3">{row.providerName}</td>
//                 <td className="p-3">{row.serviceName}</td>
//                 <td className="p-3">{row.dateCreated}</td>
//                 <td className="p-3">{row.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
'use client';
import React, { useRef, useEffect } from 'react';
import { Chart, PieController, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components for Chart.js
Chart.register(PieController, Title, Tooltip, Legend, ArcElement);

export default function ContractMonitoring() {
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // To store the Chart instance

  // Dummy data for the pie chart
  const chartData = {
    labels: ['On-going', 'Disputed', 'Completed'],
    datasets: [
      {
        data: [722, 748, 947], // Replace these with actual API data if needed
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
          boxWidth: 10, // Size of the square legend box
          boxHeight: 10, // Height of the square legend box
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
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: chartData,
        options: chartOptions,
      });
    }

    // Cleanup chart instance on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="bg-[#E6F8F4] p-6 rounded-lg text-gray-800 w-full">
      <h2 className="text-2xl font-bold mb-4 text-left text-[#013220]">
        Contract Monitoring
      </h2>

      {/* Chart Section */}
      <div className="flex justify-center mb-6">
        <div className="w-64 h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <table className="w-full bg-white text-sm text-gray-600 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#E6F8F4] text-gray-700">
              <th className="p-3 text-left">Contract ID</th>
              <th className="p-3 text-left">Consumer Name</th>
              <th className="p-3 text-left">Provider Name</th>
              <th className="p-3 text-left">Service Name</th>
              <th className="p-3 text-left">Date Created</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">#00{index + 1}</td>
                <td className="p-3">John Doe</td>
                <td className="p-3">Provider {index + 1}</td>
                <td className="p-3">Service {index + 1}</td>
                <td className="p-3">2024-06-14</td>
                <td className="p-3">
                  {index % 3 === 0
                    ? 'On-going'
                    : index % 3 === 1
                    ? 'Disputed'
                    : 'Completed'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
