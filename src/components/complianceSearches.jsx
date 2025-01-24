'use client';
import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';
import Table from './Table';
import { useQuery } from '@tanstack/react-query';
import LoadingBar from 'react-top-loading-bar'; // Import the loading bar
import ServiceDetails from '@/app/serviceDetails/ServiceDetails';

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

const columns = [
  { header: 'Id', accessor: 'SearchID' },
  { header: 'Consumer Name', accessor: 'consumerName' },
  { header: 'Search Query', accessor: 'searchQuery' },
  { header: 'Date', accessor: 'date' },
  { header: 'Time', accessor: 'time' },
  { header: 'Violation Type', accessor: 'violationType' },
];

const dropdownOptions = [
  { label: 'Block temporarily', color: 'text-red-500' },
  { label: 'Block permanently', color: 'text-yellow-500' },
  { label: 'Notify Users', color: 'text-blue-500' },
];

const fetchComplianceData = async () => {
  
  const response = await fetch('/api/complianceSearches');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function ComplianceSearches() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const loadingBarRef = useRef(null); 

  const { data, error, isLoading } = useQuery({
    queryKey: ['complianceSearches'], 
    queryFn: fetchComplianceData,
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

  const violationTypes = [
    'High risk behavior',
    'Excessive search frequency',
    'Out of scope',
    'Restricted keywords',
  ];

  const chartData = {
    labels: violationTypes,
    data: new Array(violationTypes.length).fill(0), 
  };

  if (data) {
    data.forEach((row) => {
      const violationIndex = violationTypes.indexOf(row.violationType);
      if (violationIndex !== -1) {
        chartData.data[violationIndex] += 1; 
      }
    });
  }

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && chartData.labels.length) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Violation Type',
              data: chartData.data,
              backgroundColor: ['#B24545', '#EDCC48', '#3DA3EB', '#DF853B'],
              borderColor: ['#B24545', '#EDCC48', '#3DA3EB', '#DF853B'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: 'Violation Types' },
              ticks: {
                autoSkip: false,
                font: { size: 10 },
              },
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Number of Violations' },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
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

  return (
    <>
      <LoadingBar color="#f11946" ref={loadingBarRef} /> 
      <div className="flex justify-center mb-4" style={{ width: '80%', height: '300px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <Table
        columns={columns}
        data={data} 
        dropdownOptions={dropdownOptions}
        openPopup={true}
      />
    </>
  );
}
