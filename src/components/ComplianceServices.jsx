'use client';
import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';
import Table from './Table'; 
import ServiceDetails from '@/app/serviceDetails/ServiceDetails';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import LoadingBar from 'react-top-loading-bar'; 

// Register required components for Chart.js
Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

// Fetch function for compliance data
const fetchComplianceData = async () => {
  const response = await fetch('/api/complianceServices');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const columns = [
  { header: 'Service Name', accessor: 'ServiceName' },
  { header: 'Provider Name', accessor: 'ProviderName' },
  { header: 'Listing Date', accessor: 'ListingDate' },
  { header: 'Violation Type', accessor: 'ViolationType' },
  { header: 'Last Reviewed', accessor: 'LastReviewed' },
];

const dropdownOptions = [
  { label: 'Approved', color: 'text-red-500' },
  { label: 'Rejected', color: 'text-red-500' },
  { label: 'Flagged', color: 'text-yellow-500' },
  { label: 'Under Review', color: 'text-blue-500' },
];

export default function ComplianceServices() {
  const queryClient = useQueryClient();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const loadingBarRef = useRef(null); 
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['complianceServices'],
    queryFn: fetchComplianceData,
    refetchOnMount: false, // Do not refetch if data is cached
    refetchOnWindowFocus: false, // Disable refetch on tab focus
    onSuccess: () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    },
    onError: () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  });

  const chartData = {
    labels: ['Approved','Rejected', 'Flagged', 'Under Review'],
    datasets: [
      {
        label: 'Status',
        data: [0, 0, 0, 0], 
        backgroundColor: ['#008000','#B24545', '#EDCC48', '#3DA3EB'],
        borderColor: ['#008000','#B24545', '#EDCC48', '#3DA3EB'],
        borderWidth: 1,
      },
    ],
  };

  // Update chart data based on the fetched data
  if (data) {
    data.forEach((row) => {
      const statusIndex = chartData.labels.indexOf(row.Status);
      if (statusIndex !== -1) {
        chartData.datasets[0].data[statusIndex] += 1;
      }
    });
  }

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current && chartData.labels.length) {
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          
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
        },
      });
    }
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  if (isLoading) {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart(); 
    }
  }

  if (error) return <div>Error: {error.message}</div>;
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  
  const handleDropdown = async (id, status) => {
    try {
      console.log("In dropdown: " + id + " " + status);

      const response = await fetch("/api/complianceServices", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      if (response.ok) {
        console.log("Status updated");

        // Find the row for this id to get ProviderId
        const service = data.find(row => row._id === id || row.id === id);
        if (service && service.ProviderId) {
          // Create notification for ProviderId
          await fetch('/api/notificationPost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              UserID: service.ProviderId,
              Message: `Your service status has been updated to "${status}".`,
              Type: 'Compliance',
              ReadStatus: false,
            }),
          });
        }

        // 👉 Tell React Query to refetch fresh data
        await queryClient.invalidateQueries(['complianceServices'], { refetchActive: true });
      } else {
        console.error("Failed to update service status");
      }
    } catch (error) {
      console.error("Error posting service:", error);
    }
  };
  

  return (
    <>
      <LoadingBar color="#f11946" ref={loadingBarRef} /> 
      <div className="flex justify-center mb-4" style={{ width: '80%', height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <Table
        columns={columns}
        data={data} 
        dropdownOptions={dropdownOptions}
        openPopup={true}
        details={true}
        detailsPopup={ServiceDetails}
        handleDropdown={handleDropdown}
      />
    </>
  );
}