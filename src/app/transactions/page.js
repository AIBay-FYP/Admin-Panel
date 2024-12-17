'use client';

import React, { useEffect, useRef } from 'react';
import Table from '@/components/Table';
import Search from '@/components/SearchBarWithFilters';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

export default function Transactions() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const dummyChartData = {
        labels: ['Funds Withheld', 'Pending', 'Refund'],
        data: [150, 100, 50],
    };

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destroy previous chart instance
        }

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dummyChartData.labels,
                    datasets: [
                        {
                            label: 'Transaction Status',
                            data: dummyChartData.data,
                            backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                            borderColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                            borderWidth: 1,
                            borderRadius: 10, // Rounded bars
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: { right: 1 },
                    },
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                font: { size: 8 },
                                color: '#000',
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

                                        return {
                                            text: label,
                                            fillStyle: dataset.backgroundColor[index],
                                            strokeStyle: dataset.backgroundColor[index],
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
                            title: { display: true, text: 'Transaction Status' },
                            ticks: {
                                autoSkip: false,
                                minRotation: 0,
                                maxRotation: 0,
                                font: { size: 8 },
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Number of Transactions' },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, []);

    const legend = [
        { label: 'Funds Withheld', color: '#FF6384' },
        { label: 'Pending', color: '#FFCE56' },
        { label: 'Refund', color: '#36A2EB' },
    ];

    const columns = [
        { header: 'Payment ID', accessor: 'paymentId' },
        { header: 'Provider Name', accessor: 'providerName' },
        { header: 'Consumer Name', accessor: 'consumerName' },
        { header: 'Date', accessor: 'date' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Service', accessor: 'service' },
        { header: 'Status', accessor: 'status' },
    ];

    const data = [
        {
            paymentId: '#12345',
            providerName: 'Provider 1',
            consumerName: 'Consumer 1',
            date: '2024-06-16',
            amount: '$100',
            service: 'Laptop',
            status: 'Completed',
        },
        {
            paymentId: '#12346',
            providerName: 'Provider 2',
            consumerName: 'Consumer 2',
            date: '2024-06-17',
            amount: '$200',
            service: 'Shoes',
            status: 'Pending',
        },
        {
            paymentId: '#12347',
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

    return (
        <div
            style={{ backgroundColor: 'var(--background)' }}
            className="min-h-screen bg-gray-100"
        >
            {/* Search Component */}
            <div className="md:flex-row items-center justify-between my-4">
                <Search />
            </div>

            <div className="flex flex-row w-full mt-8">
                {/* Main Content */}
                <div>
                    {/* Bar Chart Section */}
                    <div style={{ width: '400px', height: '300px' }} className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Successful Transactions</h2>
                        <div className="flex justify-center" style={{ width: '100%', height: '100%' }}>
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-8">
                        <Table columns={columns} data={data} dropdownOptions={dropdownOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
