'use client';
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StarDisplay from "./StarDisplay";
import ListedServiceCard from "./ListedServiceCard";
import ProgressCircle from "./ProgressCircle";

ChartJS.register(ArcElement, Tooltip, Legend);

const ConsumerProfile = ({ name, email, role, contactNumber, profilePicture, services, reviews, servicesAvailed, requestApprovalRate }) => {
  const [progress, setProgress] = useState(0);

  // Calculate progress based on services available and services availed
  useEffect(() => {
    const servicesAvailable = 10; // Example value, adjust based on your data
    const progressPercentage = (servicesAvailed / servicesAvailable) * 100;
    setProgress(progressPercentage);
  }, [servicesAvailed]);

  const pieData = {
    labels: ["Electronics", "Clothing", "Gadgets", "Furniture"],
    datasets: [
      {
        data: [30, 20, 25, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Get the current date and format it (e.g., "DD MMM, YYYY")
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="w-[90%] max-w-6xl max-h-screen flex flex-col lg:flex-row justify-between p-6 rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center bg-darkgreen p-6 rounded-lg shadow-md w-full lg:w-1/3">
          <img
            src={profilePicture || "/assets/no-pfp.jpg"}
            alt="Consumer"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h4 className="text-lg font-bold text-white">{name || "N/A"}</h4>
          <h6 className="text-gray-300">ID: 001</h6>
          <StarDisplay rating={4} /> {/* Assuming the rating is passed as a prop */}
          <h5 className="text-gray-200 mt-2">{email || "N/A"}</h5>
          <hr className="my-4 w-full border-gray-400" />
          <h5 className="text-gray-200">No. of Reviews: {reviews || 0}</h5>
          <h5 className="text-gray-200">Services Availed: {servicesAvailed || 0}</h5>

          {/* Progress Circle */}
          <div className="mt-4">
            <ProgressCircle progress={progress} />
          </div>
          <h5 className="text-gray-200 mt-2">Request Approval rate</h5>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md mt-6 lg:mt-0">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Category-Wise Spending Breakdown
          </h3>
          <div className="flex justify-center items-center mb-6">
            <div className="w-64 h-64">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
          <div className="flex items-center w-full mb-4">
            <input
              type="text"
              placeholder="Search Ongoing Services"
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
            />
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
              Search
            </button>
          </div>

          {/* Service Listing */}
          <div className="flex flex-col space-y-4 overflow-y-auto">
            {services && services.length > 0 ? (
              services.map((service) => (
                <ListedServiceCard
                  key={service.id}
                  mainImage={service.mainImage}
                  serviceName={service.serviceName}
                  serviceType={service.serviceType}
                  priceType={service.priceType}
                  location={service.location}
                />
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;