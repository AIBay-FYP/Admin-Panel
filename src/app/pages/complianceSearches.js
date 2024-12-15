// 'use client';
// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import ToggleSwitch from '../components/ToggleSwitch';
// import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';

// Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

// // Fetch function for chart and table data
// async function fetchComplianceData() {
//   const response = await fetch('/api/compliance-data'); // Replace with your API endpoint
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return response.json();
// }

// export default function ComplianceSearches() {
//   const { data, isLoading, isError } = useQuery(['complianceData'], fetchComplianceData);

//   if (isLoading) return <div className="text-white">Loading...</div>;
//   if (isError) return <div className="text-white">Error loading data</div>;

//   // Destructure API response
//   const { chartData: fetchedChartData, tableData } = data;

//   // Chart configuration
//   const chartData = {
//     labels: fetchedChartData.labels,
//     datasets: [
//       {
//         label: 'Violation Type',
//         data: fetchedChartData.data,
//         backgroundColor: ['#B24545', '#EDCC48', '#3DA3EB', '#DF853B'],
//         borderColor: ['#B24545', '#EDCC48', '#3DA3EB', '#DF853B'],
//         borderWidth: 1,
//       },
//     ],
//   };

//     const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
  
//     layout: {
//       padding: {
//         right: 1,  
//       },
//     },
  
//     plugins: {
//       legend: {
//         position: 'right',  
//         labels: {
//           font: { size: 8 },  
//           color: '#fff',  
//           boxWidth: 8,  
//           boxHeight: 8,
//           usePointStyle: true,  
//           padding: 8,  
//           generateLabels: function(chart) {
            
//             const labels = chart.data.labels;
//             const datasets = chart.data.datasets;
  
//             return labels.map((label, index) => {
              
//               const datasetIndex = 0; 
//               const dataset = datasets[datasetIndex];
  
             
//               const backgroundColor = dataset.backgroundColor[index] || '#000';  
//               return {
//                 text: label, 
//                 fillStyle: backgroundColor, 
//                 strokeStyle: backgroundColor,  
//                 lineWidth: 2,
//                 hidden: false,
//                 datasetIndex,
//               };
//             });
//           },
//         },
//       },
//     },
  
//     scales: {
//       x: {
//         title: { display: true, text: 'Violation Types' },
//         ticks: {
//           autoSkip: false,
//           minRotation: 0,
//           maxRotation: 0,
//           font: { size: 5 },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: 'Number of Violations' },
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
//         <table className="w-full max-w-7xl bg-dark text-white rounded table-fixed">
//           <thead>
//             <tr className="bg-dark text-xs">
//               <th className="p-1 mb-2 text-left w-1/4">Consumer Name</th>
//               <th className="p-1 text-left w-1/4">Search Query</th>
//               <th className="p-1 text-left w-1/6">Date</th>
//               <th className="p-1 text-left w-1/6">Time</th>
//               <th className="p-1 text-left w-1/6">Violation Type</th>
//               <th className="p-1 text-left w-1/6">Admin Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index} className="bg-customGray rounded-large text-xs">
//                 <td className="p-1">{row.consumerName}</td>
//                 <td className="p-1">{row.searchQuery}</td>
//                 <td className="p-1">{row.date}</td>
//                 <td className="p-1">{row.time}</td>
//                 <td className="p-1">{row.violationType}</td>
//                 <td className="p-1">
//                   <select className="bg-gray-700 text-white px-2 py-1 rounded w-full">
//                     <option value="" disabled>Select Action</option>
//                     <option value="block_temporarily">Block Temporarily</option>
//                     <option value="block_permanently">Block Permanently</option>
//                     <option value="notify_users">Notify Users</option>
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

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

// Dummy data for chart and table
const dummyChartData = {
  labels: ['Spam', 'Malware', 'Phishing', 'Other'],
  data: [12, 19, 3, 5],
};

const dummyTableData = [
  {
    consumerName: 'John Doe',
    searchQuery: 'Free gift cards',
    date: '2024-12-15',
    time: '10:45 AM',
    violationType: 'Phishing',
  },
  {
    consumerName: 'Jane Smith',
    searchQuery: 'Win a million dollars',
    date: '2024-12-15',
    time: '11:30 AM',
    violationType: 'Spam',
  },
  {
    consumerName: 'Alex Brown',
    searchQuery: 'Fake antivirus software',
    date: '2024-12-14',
    time: '09:15 PM',
    violationType: 'Malware',
  },
];

export default function ComplianceSearches() {
  // React Query code commented out
  // const { data, isLoading, isError } = useQuery(['complianceData'], fetchComplianceData);

  // Replace fetched data with dummy values
  // if (isLoading) return <div className="text-white">Loading...</div>;
  // if (isError) return <div className="text-white">Error loading data</div>;

  // Destructure API response replaced with dummy data
  const fetchedChartData = dummyChartData;
  const tableData = dummyTableData;

  // Chart configuration
  const chartData = {
    labels: fetchedChartData.labels,
    datasets: [
      {
        label: 'Violation Type',
        data: fetchedChartData.data,
        backgroundColor: ['#B24545', '#EDCC48', '#3DA3EB', '#DF853B'],
        borderColor: ['#B24545', '#EDCC48', '#3DA3EB', '#DF853B'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 1,
      },
    },
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
        title: { display: true, text: 'Violation Types' },
        ticks: {
          autoSkip: false,
          minRotation: 0,
          maxRotation: 0,
          font: { size: 5 },
        },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Violations' },
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
        <table className="w-full max-w-7xl bg-dark text-white rounded table-fixed">
          <thead>
            <tr className="bg-dark text-xs">
              <th className="p-1 mb-2 text-left w-1/4">Consumer Name</th>
              <th className="p-1 text-left w-1/4">Search Query</th>
              <th className="p-1 text-left w-1/6">Date</th>
              <th className="p-1 text-left w-1/6">Time</th>
              <th className="p-1 text-left w-1/6">Violation Type</th>
              <th className="p-1 text-left w-1/6">Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="bg-customGray rounded-large text-xs">
                <td className="p-1">{row.consumerName}</td>
                <td className="p-1">{row.searchQuery}</td>
                <td className="p-1">{row.date}</td>
                <td className="p-1">{row.time}</td>
                <td className="p-1">{row.violationType}</td>
                <td className="p-1">
                  <select className="bg-gray-700 text-white px-2 py-1 rounded w-full">
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value="block_temporarily">Block Temporarily</option>
                    <option value="block_permanently">Block Permanently</option>
                    <option value="notify_users">Notify Users</option>
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
