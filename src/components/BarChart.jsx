'use client';

import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData, options }) => {
    return (
        <div
         className="w-full p-4 bg-white rounded-lg shadow-md ">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;