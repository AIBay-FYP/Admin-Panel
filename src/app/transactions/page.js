'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ToggleSwitch from '@/components/ToggleSwitch';
import SearchBarWithFilters from '@/components/SearchBarWithFilters';
import DisputesBoard from '../disputes/page';
import TransactionsComponent from '@/components/Transactions';
import { formatDate } from '@/utiks/formatDate';

// Fetch transaction data from the API
const fetchTransactions = async () => {
  const response = await fetch('/api/transactions'); // Replace with your API route
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
};

export default function Transactions() {
  // Correct usage of useQuery with object format
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchTransactions'],
    queryFn: fetchTransactions,
  });

  // State for dynamically updating chart data
  const [chartData, setChartData] = useState({
    labels: ['Funds Withheld', 'Pending', 'Refunded'],
    data: [0, 0, 0],
  });

  useEffect(() => {
    if (data?.transactions) {
      const statusCounts = {
        'Funds Withheld': 0,
        'Pending': 0,
        'Refunded': 0,
      };

      // Count transactions based on status
      data.transactions.forEach((transaction) => {
        if (transaction.Status === 'Funds Withheld') {
          statusCounts['Funds Withheld'] += 1;
        } else if (transaction.Status === 'Pending') {
          statusCounts['Pending'] += 1;
        } else if (transaction.Status === 'Refunded') {
          statusCounts['Refunded'] += 1;
        }
      });

      // Update chart data with the counted values
      setChartData({
        labels: ['Funds Withheld', 'Pending', 'Refunded'],
        data: [statusCounts['Funds Withheld'], statusCounts['Pending'], statusCounts['Refunded']],
      });
    }
  }, [data]); // Run effect whenever data changes

  const tableColumns = [
    { header: 'Payment ID', accessor: 'PaymentID' },
    { header: 'Consumer Name', accessor: (row) => row.consumerDetails?.Name },
    { header: 'Provider Name', accessor: (row) => row.providerDetails?.Name },
    { header: 'Date', accessor: (row) => formatDate(row.Timestamp) },
    { header: 'Amount', accessor: 'Amount' },
    { header: 'Service Name', accessor: (row) => row.listingDetails?.Title },
    { header: 'Status', accessor: 'Status' },
  ];

  const dropdownOptions = [
    { label: 'Funds Withheld', color: 'text-red-500' },
    { label: 'Pending', color: 'text-yellow-500' },
    { label: 'Refunded', color: 'text-green-500' },
  ];

  const filterOptions = [
    { label: 'Restricted Keywords', value: 'restricted' },
    { label: 'Excessive Search Frequency', value: 'frequency' },
  ];

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleFilter = (filter) => {
    console.log('Selected filter:', filter);
  };

  const handleSwitch = (view) => {
    console.log('Switch view:', view);
  };

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error loading transactions: {error.message}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="my-4">
        <SearchBarWithFilters
          placeholder="Search by Id or Service name"
          filterOptions={filterOptions}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />
      </div>

      {/* ToggleSwitch with Transactions Display */}
      <ToggleSwitch
        title="Successful transactions and Disputes"
        buttonLabels={['Transactions', 'Disputes']}
        components={{
          Transactions: () => (
            <TransactionsComponent
              chartData={chartData} // Dynamically updated chart data
              tableData={data.transactions} // Dynamically fetched data
              tableColumns={tableColumns}
              dropdownOptions={dropdownOptions}
            />
          ),
          Disputes: DisputesBoard,
        }}
        onSwitch={handleSwitch}
      />
    </div>
  );
}
