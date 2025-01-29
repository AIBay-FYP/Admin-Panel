'use client';

import { useState, useEffect } from "react";
import StarDisplay from "./StarDisplay";
import Image from "next/image";
import ConsumerProfile from "./ConsumerProfile";
import ProviderProfile from "./ProviderProfile";
import ModeratorProfile from "./ModeratorProfile";

const ProfileCard = ({ name, role, rating, email, location, contactNumber, profilePicture, approvedBy, userID }) => {
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
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOverlayVisible]);

  // Conditionally render the profile based on the role
  const ProfileComponent =
    role === "Provider"
      ? ProviderProfile
      : role === "Consumer"
      ? ConsumerProfile
      : ModeratorProfile; // Default to ModeratorProfile for all other roles

  return (
    <div className="bg-white flex flex-col justify-center items-center p-7 rounded-lg gap-2 hover:bg-gray-100">
      <Image
        src={profilePicture || "/assets/no-pfp.jpg"}
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
            className="w-[90%] max-w-6xl rounded-lg shadow-lg overflow-auto p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
          >
            {/* Render the appropriate profile based on role */}
            <ProfileComponent
              name={name}
              email={email}
              location={location}
              contactNumber={contactNumber}
              profilePicture={profilePicture}
              approvedBy={approvedBy}
              rating={rating}
              role={role}
              UserID={userID}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;