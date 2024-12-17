'use client';

import React from 'react';
import Table from "../../components/Table";
import { useRouter } from 'next/navigation';

const DocumentVerification = () => {
  const router = useRouter();

  // Columns configuration (8 columns)
  const columns = [
    { header: 'Document Name', accessor: 'documentName' },
    { header: 'Service ID', accessor: 'serviceId' },
    { header: 'Date', accessor: 'date' },
    { header: 'Time', accessor: 'time' },
    { header: 'Verified By', accessor: 'verifiedBy' },
    { header: 'Submitted By', accessor: 'submittedBy' },
    { header: 'Status', accessor: 'status' },
    { header: 'Document', accessor: 'document' },
  ];

  // Mock data (example)
  const data = [
    {
      documentName: 'Report 001',
      serviceId: 'SVC12345',
      date: '2024-06-10',
      time: '10:30 AM',
      verifiedBy: 'John Doe',
      submittedBy: 'Jane Smith',
      status: 'Pending',
      document: 'View Document',
    },
    {
      documentName: 'Report 002',
      serviceId: 'SVC67890',
      date: '2024-06-11',
      time: '02:00 PM',
      verifiedBy: 'Alice Johnson',
      submittedBy: 'Bob Brown',
      status: 'Approved',
      document: 'View Document',
    },
  ];

  // Dropdown options for the Status column
  const dropdownOptions = [
    { label: 'Reject', color: 'text-red-600' },
    { label: 'Revision', color: 'text-yellow-600' },
    { label: 'Approve', color: 'text-green-600' },
  ];

// Custom row renderer for document links (inside a button)
const renderCustomDocument = (documentText, rowId) => {
  return (
    <button
      className="bg-light-green hover:bg-dark-green text-white font-medium py-1 px-3 rounded text-xs"
      onClick={() => router.push(`/documents/${rowId}`)} // Navigate to a new screen for the document
    >
      {documentText}
    </button>
  );
};

// Final table data with render logic for custom cells
const finalData = data.map((row, index) => ({
  ...row,
  document: renderCustomDocument("View Document", index + 1), // Adding unique row ID for navigation
}));

  return (
    <div className="flex flex-col items-center p-4">
      {/* Page Header */}
      <h1 className="text-2xl font-semibold mb-6">Document Verification</h1>

      {/* Table Component */}
      <Table
        className="text-sm"
        columns={columns}
        data={finalData}
        dropdownOptions={dropdownOptions}
      />
    </div>
  );
};

export default DocumentVerification;