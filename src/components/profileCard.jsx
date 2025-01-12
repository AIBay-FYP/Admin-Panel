import { useState, useEffect } from "react";
import StarDisplay from "./StarDisplay";
import Image from "next/image";
import ConsumerProfile from "./ConsumerProfile"; // Import the ConsumerProfile component
import ProviderProfile from "./ProviderProfile"; // Import the ProviderProfile component

const ProfileCard = ({ name, role, rating }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Function to toggle the visibility of the overlay
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  // Close the overlay if clicked outside the content
  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setOverlayVisible(false);
    }
  };

  // Effect to toggle the body's scrolling
  useEffect(() => {
    if (isOverlayVisible) {
      // Disable scrolling
      document.body.classList.add("overflow-hidden");
    } else {
      // Enable scrolling
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOverlayVisible]);

  // Conditionally render the profile based on the role
  const ProfileComponent = role === "Provider" ? ProviderProfile : ConsumerProfile;

  return (
    <div className="bg-white flex flex-col justify-center items-center p-7 rounded-lg gap-2 hover:bg-gray-100">
      <Image
        src="/assets/no-pfp.jpg"
        alt="Profile Picture"
        width={64}
        height={64}
        className="object-cover rounded-full"
      />
      <h1 className="text-black text-md font-semibold">{name}</h1>
      <h4 className="text-black text-sm">{role}</h4>
      <StarDisplay rating={rating} />

      <button
        className="bg-transparent border border-black text-black text-sm px-3 py-1 rounded-md hover:bg-gray-100"
        onClick={toggleOverlay} // Toggle the overlay visibility on button click
      >
        View Profile
      </button>

      {/* Overlay component */}
      {isOverlayVisible && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
          onClick={handleOutsideClick} // Close the overlay if clicked outside
        >
          <div
            className="w-[90%] max-w-6xl  rounded-lg shadow-lg overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
          >
            {/* Render the appropriate profile based on role */}
            <ProfileComponent />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
