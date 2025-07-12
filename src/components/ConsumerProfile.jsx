import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StarDisplay from "./StarDisplay";
import ListedServiceCard from "./ListedServiceCard";
import ProgressCircle from "./progresscircle";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

const fetchConsumer = async (UserID) => {
  console.log(UserID);
  const response = await fetch(`/api/users/consumer/${UserID}`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

const ConsumerProfile = ({ name, email, role,reviews, contactNumber, services, profilePicture, UserID }) => {
  const [progress, setProgress] = useState(0);
  
  // Using react-query to fetch consumer data
  const { data, error, isLoading } = useQuery(
    { queryKey: ["consumerProfile", UserID], queryFn: () => fetchConsumer(UserID) }
  );
  
  const { reviewCount, listings, servicesAvailable, servicesAvailed } = data || {};

  useEffect(() => {
    const progressPercentage = (servicesAvailed / servicesAvailable) * 100;
    setProgress(progressPercentage);
  }, [servicesAvailed]);

  // Count the occurrences of each category for the pie chart
  const getCategoryData = (listings) => {
    const categoryCount = {};

    listings.forEach((listing) => {
      const category = listing.Category;
      if (category) {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }
    });

    // Prepare the chart data (labels and values)
    const labels = Object.keys(categoryCount);
    const data = Object.values(categoryCount);

    return { labels, data };
  };

  // Get the pie chart data
  const { labels, data: pieDataValues } = listings ? getCategoryData(listings) : { labels: [], data: [] };

  // Pie chart data
  const pieChartData = {
    labels: labels.length > 0 ? labels : ["No categories available"],
    datasets: [
      {
        data: pieDataValues.length > 0 ? pieDataValues : [1], // Default data if no categories
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

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Check if data is loaded, if not, show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check for errors
  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          <h6 className="text-gray-300">Role: {role || "N/A"}</h6>
          <StarDisplay rating={reviews} /> {/* Assuming the rating is passed as a prop */}
          <h5 className="text-gray-200 mt-2">{email || "N/A"}</h5>
          <hr className="my-4 w-full border-gray-400" />
          <h5 className="text-gray-200">No. of Reviews: {reviewCount || 0}</h5>
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
              <Pie data={pieChartData} options={pieOptions} />
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
            {listings && listings.length > 0 ? (
              listings.map((service) => (
                <ListedServiceCard
                  key={service._id}
                  data={service}
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
