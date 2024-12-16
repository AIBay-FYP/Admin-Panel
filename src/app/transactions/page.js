import React from "react";
import Table from "../components/Table";
import BarChart from "../components/BarChart";
import Search from "../components/SearchBarWithFilters";

export default function Transactions() {
    const chartData = {
        labels: ["Funds Withheld", "Pending", "Refund"],
        datasets: [
            {
                label: "Transaction Status",
                data: [150, 100, 50],
                backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
                borderRadius: 10, // Round the bars
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Disable default legend
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const legend = [
        { label: "Funds Withheld", color: "#FF6384" },
        { label: "Pending", color: "#FFCE56" },
        { label: "Refunded", color: "#36A2EB" },
    ];

    const columns = [
        { header: "Payment ID", accessor: "paymentId" },
        { header: "Provider Name", accessor: "providerName" },
        { header: "Consumer Name", accessor: "consumerName" },
        { header: "Date", accessor: "date" },
        { header: "Amount", accessor: "amount" },
        { header: "Service", accessor: "service" },
        { header: "Status", accessor: "status" },
    ];

    const data = [
        {
            paymentId: "#12345",
            providerName: "Provider 1",
            consumerName: "Consumer 1",
            date: "2024-06-16",
            amount: "$100",
            service: "Laptop",
            status: "Completed",
        },
        {
            paymentId: "#12346",
            providerName: "Provider 2",
            consumerName: "Consumer 2",
            date: "2024-06-17",
            amount: "$200",
            service: "Shoes",
            status: "Pending",
        },
        {
            paymentId: "#12347",
            providerName: "Provider 3",
            consumerName: "Consumer 3",
            date: "2024-06-18",
            amount: "$300",
            service: "Phone",
            status: "Refunded",
        },
    ];

    const dropdownOptions = [
        { label: "Funds Withheld", color: "text-red-500" },
        { label: "Pending", color: "text-yellow-500" },
        { label: "Refunded", color: "text-green-500" },
    ];

    return (
        <div 
            style={{ backgroundColor: "var(--background)" }}
            className="flex flex-col w-full min-h-screen bg-gray-100">
            {/* Search Component */}
            <div className="md:flex-row items-center justify-between my-4">
                <Search />
            </div>

            <div className="flex flex-row w-full mt-8 px-8">

                {/* Main Content */}
                <div className="flex-grow px-4">
                    {/* Bar Chart Section */}
                    <div style={{ width: '400px', height: '300px' }} className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">
                            Successful Transactions
                        </h2>
                        <BarChart chartData={chartData} options={options} />
                        {/* Custom Legend */}
                        <div className="flex space-x-4 mt-4">
                            {legend.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <span
                                        className="w-4 h-4 inline-block"
                                        style={{ backgroundColor: item.color }}
                                    ></span>
                                    <span className="text-sm text-gray-600">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-8">
                        <Table
                            columns={columns}
                            data={data}
                            dropdownOptions={dropdownOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}