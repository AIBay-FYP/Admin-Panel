import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import StarDisplay from "./StarDisplay";
import ListedServiceCard from "./ListedServiceCard";
import ProgressCircle from "./progresscircle";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProviderProfile = () => {
  const [progress, setProgress] = useState(0);
  const [services, setServices] = useState([
    {
      id: 1,
      mainImage: "/shoes1.jpeg",
      serviceName: "Shoe Rental",
      serviceType: "Rental",
      priceType: "Per Day",
      location: "Downtown",
    },
    {
      id: 2,
      mainImage: "/shoes1.jpeg",
      serviceName: "Shoe Cleaning",
      serviceType: "Service",
      priceType: "Flat Rate",
      location: "Uptown",
    },
    {
      id: 3,
      mainImage: "/shoes1.jpeg",
      serviceName: "Boot Repair",
      serviceType: "Service",
      priceType: "Flat Rate",
      location: "Midtown",
    },
    {
      id: 4,
      mainImage: "/shoes1.jpeg",
      serviceName: "Sneaker Maintenance",
      serviceType: "Service",
      priceType: "Flat Rate",
      location: "Suburb",
    },
    {
      id: 5,
      mainImage: "/shoes1.jpeg",
      serviceName: "Heels Rental",
      serviceType: "Rental",
      priceType: "Per Day",
      location: "City Center",
    },
  ]);

  useEffect(() => {
    const servicesAvailable = 10; // Example total services
    const servicesAvailed = 5; // Example services availed
    const progressPercentage = (servicesAvailed / servicesAvailable) * 100;
    setProgress(progressPercentage);
  }, []);

  // Data for the Line Chart (Total earnings per month)
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Months
    datasets: [
      {
        label: "Total Earnings ($)",
        data: [1200, 1500, 2000, 1800, 2200, 2500, 2800], // Example earnings data
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings Overview per Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Earnings ($)",
        },
        min: 0,
      },
    },
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="w-[90%] max-w-6xl max-h-screen flex flex-col lg:flex-row justify-between p-6 rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center bg-darkgreen p-6 rounded-lg shadow-md w-full lg:w-1/3">
          <img
            src="/assets/no-pfp.jpg"
            alt="Provider"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h4 className="text-lg font-bold text-white">Provider's Name</h4>
          <h6 className="text-gray-300">ID: 001</h6>
          <StarDisplay rating={4} />
          <h5 className="text-gray-200 mt-2">provideremail@example.com</h5>
          <hr className="my-4 w-full border-gray-400" />
          <h5 className="text-gray-200">No. of Reviews: {15}</h5>
          <h5 className="text-gray-200">No. of Refunds: {5}</h5>

          {/* Progress Circle */}
          <div className="mt-4">
            <ProgressCircle progress={progress} />
          </div>
          <h5 className="text-gray-200 mt-2">Service Approval rate</h5>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md mt-6 lg:mt-0">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Earnings Overview per Month
          </h3>
          <div className="flex justify-center items-center mb-6">
            <div className="w-full h-64">
              <Line data={lineChartData} options={lineChartOptions} />
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
          <div
            className="flex flex-col space-y-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 300px)" }} // Adjust height to prevent shrinking
          >
            {services.map((service) => (
              <ListedServiceCard
                key={service.id}
                mainImage={service.mainImage}
                serviceName={service.serviceName}
                serviceType={service.serviceType}
                priceType={service.priceType}
                location={service.location}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;