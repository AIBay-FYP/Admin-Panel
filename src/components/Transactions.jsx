'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';
import Table from './Table';

// Register Chart.js components
Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

export default function TransactionsComponent({ chartData, tableData, tableColumns }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: 'Transaction Status',
                            data: chartData.data,
                            backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                            borderColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
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
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'Transaction Status' },
                            ticks: { font: { size: 8 } },
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
    }, [chartData]);

    return (
        <div className="flex flex-col items-center">
            {/* Chart Section */}
            <div style={{ width: '400px', height: '300px' }} className="mb-8">
                <canvas ref={chartRef}></canvas>
            </div>

            {/* Table Section */}
            <div className="mt-8 w-full">
                <Table columns={tableColumns} data={tableData} />
            </div>
        </div>
    );
}
