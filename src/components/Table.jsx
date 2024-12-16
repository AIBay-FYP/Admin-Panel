'use client';

import React, { useState } from "react";

const Table = ({ columns, data, dropdownOptions }) => {
    return (
        <div className="flex justify-center items-start w-full p-4">
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg text-sm">
                    {/* Table Header */}
                    <thead className="bg-gray-200">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-4 py-2 text-left text-gray-600 font-medium ${
                                        index === 0
                                            ? "rounded-tl-lg"
                                            : index === columns.length - 1
                                            ? "rounded-tr-lg"
                                            : ""
                                    }`}
                                >
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-4 py-2 text-left text-gray-600 font-medium rounded-tr-lg">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b hover:bg-gray-50 ${
                                    rowIndex === data.length - 1 ? "rounded-b-lg" : ""
                                }`}
                            >
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`px-4 py-2 text-gray-700 ${
                                            colIndex === 0
                                                ? "rounded-l-lg"
                                                : colIndex === columns.length - 1
                                                ? "rounded-r-lg"
                                                : ""
                                        }`}
                                    >
                                        {row[col.accessor] || "-"}
                                    </td>
                                ))}
                                <td
                                    className={`px-4 py-2 text-gray-700 ${
                                        rowIndex === data.length - 1 ? "rounded-br-lg" : ""
                                    }`}
                                >
                                    <Dropdown options={dropdownOptions} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Dropdown = ({ options }) => {
    const [selected, setSelected] = useState(options[0]?.label || 'Status');

    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <div className="relative inline-block text-left">
            <select
                value={selected}
                onChange={handleSelectChange}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none text-xs w-full"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.label} className={`${option.color} rounded-lg` || "text-gray-700"}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Table;
