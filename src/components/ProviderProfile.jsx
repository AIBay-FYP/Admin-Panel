import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import StarDisplay from "./StarDisplay";
import ListedServiceCard from "./ListedServiceCard";
import ProgressCircle from "./progresscircle";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Function to fetch provider data
const fetchProviderData = async (id) => {
  const response = await fetch(`/api/users/provider/${id}`); // Replace with your actual API endpoint
  if (!response.ok) throw new Error("Failed to fetch provider data");
  return response.json();
};

const ProviderProfile = ({ name, email, role, reviews, contactNumber, services, profilePicture, userId }) => {
  const { data, error, isLoading } = useQuery(
    {
      queryKey: ["providerData", userId],
      queryFn: () => fetchProviderData(userId),
    }
  );

  const [progress, setProgress] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState([0, 0, 0, 0, 0, 0, 0]); // Default monthly earnings for each month

  useEffect(() => {
    console.log("Provider data:", data);
    if (data && data.bookings) {
      // Create an array of earnings for each month
      const earningsPerMonth = [0, 0, 0, 0, 0, 0, 0]; // Initialize earnings for each month

      data.bookings.forEach((booking) => {
        const startDate = new Date(booking.StartDate); // Ensure booking.startDate is in a valid format
        const month = startDate.getMonth(); // Get month index (0 = January, 1 = February, etc.)
        earningsPerMonth[month] += booking.Price; // Add booking price to the corresponding month
      });

      setMonthlyEarnings(earningsPerMonth);
    }

    setProgress(data?.serviceApprovalRate || 0);
  }, [data]);

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Months
    datasets: [
      {
        label: "Total Earnings ($)",
        data: monthlyEarnings, // Use dynamic monthly earnings data
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const { reviewCount, listings, bookings, serviceApprovalRate } = data;

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="w-[90%] max-w-6xl max-h-screen flex flex-col lg:flex-row justify-between p-6 rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center bg-darkgreen p-6 rounded-lg shadow-md w-full lg:w-1/3">
          <img
            src={profilePicture || "/assets/no-pfp.jpg"} // Use profile picture from the API or fallback
            alt="Provider"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h4 className="text-lg font-bold text-white">{name}</h4>
          <h6 className="text-gray-300">Role: {role}</h6>
          <StarDisplay rating={reviews || 4} /> {/* Default rating is 4 if not provided */}
          <h5 className="text-gray-200 mt-2">{email}</h5>
          <hr className="my-4 w-full border-gray-400" />
          <h5 className="text-gray-200">No. of Reviews: {reviewCount || 0}</h5>
          <h5 className="text-gray-200">No. of Refunds: {data.refundsCount || 0}</h5>

          {/* Progress Circle */}
          <div className="mt-4">
            <ProgressCircle progress={serviceApprovalRate} />
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
            {listings.map((service) => (
              <ListedServiceCard key={service.id} data={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
