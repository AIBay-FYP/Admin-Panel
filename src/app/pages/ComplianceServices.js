// 'use client';
// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import ToggleSwitch from '../components/ToggleSwitch';
// import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';

// // Register required components for Chart.js
// Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

// // Mock fetch function for compliance data
// const fetchComplianceData = async () => {
//   const response = await fetch('/api/compliance'); // Update with the actual API endpoint
//   if (!response.ok) throw new Error('Network response was not ok');
//   return response.json();
// };

// export default function ComplianceServices() {

//   // Use React Query to fetch compliance data
//   const { data, isLoading, isError } = useQuery(['complianceData'], fetchComplianceData);

//   // Handle errors or loading states
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading compliance data.</div>;

//   // Extract data for chart and table
//   const chartValues = data.chartData || [1500, 3000, 2000];
//   const tableData = data.tableData || [];

//   const chartData = {
//     labels: ['Rejected', 'Flagged', 'Under Review'],
//     datasets: [
//       {
//         label: 'Status',
//         data: chartValues,
//         backgroundColor: ['#B24545', '#EDCC48', '#3DA3EB'],
//         borderColor: ['#B24545', '#EDCC48', '#3DA3EB'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
    
//       plugins: {
//         legend: {
//           position: 'right',  
//           labels: {
//             font: { size: 8 },  
//             color: '#fff',  
//             boxWidth: 8,  
//             boxHeight: 8,
//             usePointStyle: true,  
//             padding: 8,  
//             generateLabels: function(chart) {
              
//               const labels = chart.data.labels;
//               const datasets = chart.data.datasets;
    
//               return labels.map((label, index) => {
                
//                 const datasetIndex = 0; 
//                 const dataset = datasets[datasetIndex];
    
               
//                 const backgroundColor = dataset.backgroundColor[index] || '#000';  
//                 return {
//                   text: label, 
//                   fillStyle: backgroundColor, 
//                   strokeStyle: backgroundColor,  
//                   lineWidth: 2,
//                   hidden: false,
//                   datasetIndex,
//                 };
//               });
//             },
//           },
//         },
//       },
      
//     scales: {
//       x: {
//         title: { display: true, text: 'Status' },
//         ticks: {
//           autoSkip: false,
//           minRotation: 0,
//           maxRotation: 0,
//           font: { size: 10 },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: 'Number of Services' },
//       },
//     },
//   };

//   return (
//     <div className="bg-dark text-white p-6 rounded">
//       <h2 className="text-xl font-bold mb-4">Compliance Monitoring</h2>

//       {/* Toggle Switch */}
//       <div className="mb-4">
//         <ToggleSwitch onSwitch={() => {}} />
//       </div>

//       {/* Bar Chart Section */}
//       <div className="flex justify-center mb-4" style={{ width: '300px', height: '200px' }}>
//         <canvas
//           ref={(el) => {
//             if (el) {
//               const ctx = el.getContext('2d');
//               new Chart(ctx, {
//                 type: 'bar',
//                 data: chartData,
//                 options: chartOptions,
//               });
//             }
//           }}
//         ></canvas>
//       </div>

//       {/* Table Section */}
//       <div>
//         <table className="w-full max-w-7xl bg-dark text-white text-xs rounded table-fixed">
//           <thead>
//             <tr className="bg-dark">
//               <th className="p-1 mb-2 text-left w-1/4">Service Name</th>
//               <th className="p-1 text-left w-1/4">Provider Name</th>
//               <th className="p-1 text-left w-1/6">Listing Date</th>
//               <th className="p-1 text-left w-1/6">Status</th>
//               <th className="p-1 text-left w-1/6">Violation Type</th>
//               <th className="p-1 text-left w-1/6">Last Reviewed</th>
//               <th className="p-1 text-left w-1/6">Admin Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index} className="bg-customGray rounded-large text-xs">
//                 <td className="p-1">{row.serviceName}</td>
//                 <td className="p-1">{row.providerName}</td>
//                 <td className="p-1">{row.listingDate}</td>
//                 <td className="p-1">{row.status}</td>
//                 <td className="p-1">{row.violationType}</td>
//                 <td className="p-1">{row.lastReviewed}</td>
//                 <td className="p-1">
//                   <select className="bg-gray-700 text-white px-2 py-1 rounded w-full">
//                     <option value="" disabled>Select Action</option>
//                     <option value="block_temporarily">Rejected</option>
//                     <option value="block_permanently">Flagged</option>
//                     <option value="notify_users">Under Review</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

'use client';
import React from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';

// Register required components for Chart.js
Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

// Dummy data for chart and table
const dummyChartValues = [1500, 3000, 2000];
const dummyTableData = [
  {
    serviceName: 'Service A',
    providerName: 'Provider X',
    listingDate: '2024-12-01',
    status: 'Rejected',
    violationType: 'High',
    lastReviewed: '2024-12-10',
  },
  {
    serviceName: 'Service B',
    providerName: 'Provider Y',
    listingDate: '2024-12-02',
    status: 'Flagged',
    violationType: 'Medium',
    lastReviewed: '2024-12-11',
  },
  {
    serviceName: 'Service C',
    providerName: 'Provider Z',
    listingDate: '2024-12-03',
    status: 'Under Review',
    violationType: 'Low',
    lastReviewed: '2024-12-12',
  },
];

// Commented out the React Query section
// const fetchComplianceData = async () => {
//   const response = await fetch('/api/compliance'); // Update with the actual API endpoint
//   if (!response.ok) throw new Error('Network response was not ok');
//   return response.json();
// };

export default function ComplianceServices() {
  // Commented React Query hook
  // const { data, isLoading, isError } = useQuery(['complianceData'], fetchComplianceData);

  // Dummy data for chart and table
  const chartValues = dummyChartValues; // Replace with `data.chartData` if fetching
  const tableData = dummyTableData; // Replace with `data.tableData` if fetching

  const chartData = {
    labels: ['Rejected', 'Flagged', 'Under Review'],
    datasets: [
      {
        label: 'Status',
        data: chartValues,
        backgroundColor: ['#B24545', '#EDCC48', '#3DA3EB'],
        borderColor: ['#B24545', '#EDCC48', '#3DA3EB'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { size: 8 },
          color: '#fff',
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          padding: 8,
          generateLabels: function (chart) {
            const labels = chart.data.labels;
            const datasets = chart.data.datasets;

            return labels.map((label, index) => {
              const datasetIndex = 0;
              const dataset = datasets[datasetIndex];
              const backgroundColor = dataset.backgroundColor[index] || '#000';
              return {
                text: label,
                fillStyle: backgroundColor,
                strokeStyle: backgroundColor,
                lineWidth: 2,
                hidden: false,
                datasetIndex,
              };
            });
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Status' },
        ticks: {
          autoSkip: false,
          minRotation: 0,
          maxRotation: 0,
          font: { size: 10 },
        },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Services' },
      },
    },
  };

  return (
    <div className="bg-dark text-white p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Compliance Monitoring</h2>

      {/* Toggle Switch */}
      <div className="mb-4">
        <ToggleSwitch onSwitch={() => {}} />
      </div>

      {/* Bar Chart Section */}
      <div className="flex justify-center mb-4" style={{ width: '300px', height: '200px' }}>
        <canvas
          ref={(el) => {
            if (el) {
              const ctx = el.getContext('2d');
              new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
              });
            }
          }}
        ></canvas>
      </div>

      {/* Table Section */}
      <div>
        <table className="w-full max-w-7xl bg-dark text-white text-xs rounded table-fixed">
          <thead>
            <tr className="bg-dark">
              <th className="p-1 mb-2 text-left w-1/4">Service Name</th>
              <th className="p-1 text-left w-1/4">Provider Name</th>
              <th className="p-1 text-left w-1/6">Listing Date</th>
              <th className="p-1 text-left w-1/6">Status</th>
              <th className="p-1 text-left w-1/6">Violation Type</th>
              <th className="p-1 text-left w-1/6">Last Reviewed</th>
              <th className="p-1 text-left w-1/6">Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="bg-customGray rounded-large text-xs">
                <td className="p-1">{row.serviceName}</td>
                <td className="p-1">{row.providerName}</td>
                <td className="p-1">{row.listingDate}</td>
                <td className="p-1">{row.status}</td>
                <td className="p-1">{row.violationType}</td>
                <td className="p-1">{row.lastReviewed}</td>
                <td className="p-1">
                  <select className="bg-gray-700 text-white px-2 py-1 rounded w-full">
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value="block_temporarily">Rejected</option>
                    <option value="block_permanently">Flagged</option>
                    <option value="notify_users">Under Review</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
