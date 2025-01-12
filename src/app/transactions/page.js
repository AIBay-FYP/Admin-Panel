'use client';

import React from 'react';
import ToggleSwitch from '@/components/ToggleSwitch';
import SearchBarWithFilters from '@/components/SearchBarWithFilters';
import DisputesBoard from '../disputes/page';
import TransactionsComponent from '@/components/Transactions';

export default function Transactions() {
    const chartData = {
        labels: ['Funds Withheld', 'Pending', 'Refund'],
        data: [150, 100, 50],
    };

    const tableColumns = [
        { header: 'Payment ID', accessor: 'paymentId' },
        { header: 'Provider Name', accessor: 'providerName' },
        { header: 'Consumer Name', accessor: 'consumerName' },
        { header: 'Date', accessor: 'date' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Service', accessor: 'service' },
        { header: 'Status', accessor: 'status' },
    ];

    const tableData = [
        {
            paymentId: '12345',
            providerName: 'Provider 1',
            consumerName: 'Consumer 1',
            date: '2024-06-16',
            amount: '$100',
            service: 'Laptop',
            status: 'Completed',
        },
        {
            paymentId: '12346',
            providerName: 'Provider 2',
            consumerName: 'Consumer 2',
            date: '2024-06-17',
            amount: '$200',
            service: 'Shoes',
            status: 'Pending',
        },
        {
            paymentId: '12347',
            providerName: 'Provider 3',
            consumerName: 'Consumer 3',
            date: '2024-06-18',
            amount: '$300',
            service: 'Phone',
            status: 'Refunded',
        },
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
                buttonLabels={['Transactions','Disputes']}
                components={{
                    Transactions: () => (
                        <TransactionsComponent
                            chartData={chartData}
                            tableData={tableData}
                            tableColumns={tableColumns}
                            dropdownOptions={dropdownOptions}
                        />
                    ),
                    Disputes: DisputesBoard
                }}
                onSwitch={handleSwitch}
            />
        </div>
    );
}
