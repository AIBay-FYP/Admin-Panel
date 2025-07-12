'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Table from '../../components/Table';
import SearchBarWithFilters from '@/components/SearchBarWithFilters';

// Function to fetch documents data
const fetchDocuments = async () => {  
  const response = await fetch("/api/documentVerification", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  const data = await response.json();
  return data;
};

const DocumentVerification = () => {
  const router = useRouter();

  // Fetch documents data
  const { data: documents, error, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  });

  // Dropdown options for the Status column
  const dropdownOptions = [
    { label: 'Reject', color: 'text-red-600' },
    { label: 'Revision', color: 'text-yellow-600' },
    { label: 'Approve', color: 'text-green-600' },
  ];

  // Columns configuration
  const columns = [
    { header: 'Document Name', accessor: 'DocumentID' },
    { header: 'Service ID', accessor: 'ListingID' },
    { header: 'Date', accessor: 'LastReviewed' },
    { header: 'Time', accessor: 'Time' },
    { header: 'Verified By', accessor: 'VerifiedBy' },
    { header: 'Submitted By', accessor: 'UserID' }, 
  ];

  
  const handleDropdown = async (id, status) => {
    try {
      const response = await fetch("/api/documentVerification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: status,
        }),
      });
  
      if (response.ok) {
        console.log("Status updated");
      } else {
        const errorMessage = await response.text();  // Log error message if available
        console.error("Failed to update feedback status:", errorMessage);
      }
    } catch (error) {
      console.error("Error posting notification:", error);
    }
  };
  
  // Error and loading states
  if (isLoading) {
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-heading align-left text-3xl font-bold mb-8">Loading Documents...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-heading align-left text-3xl font-bold mb-8">Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-10">
      {/* Search Bar */}
      {/* <SearchBarWithFilters
        placeholder="Search documents..."
        onSearch={(query) => console.log('Search query:', query)}
        onFilter={(filter) => console.log('Selected filter:', filter)}
        filterOptions={[
          { label: 'Verified', value: 'Verified' },
          { label: 'Pending', value: 'Pending' },
          { label: 'Rejected', value: 'Rejected' },
        ]}
      /> */}

      {/* Page Header */}
      <h1 className="text-heading text-2xl text-white font-semibold mb-6">Document Verification</h1>

      {/* Table Component */}
      <Table 
        className="text-sm"
        columns={columns} 
        data={documents} 
        dropdownOptions={dropdownOptions}
        openPopup={true}
        handleDropdown={handleDropdown}
        details={true}
        Document={true} 
      />
    </div>
  );
};

export default DocumentVerification;
