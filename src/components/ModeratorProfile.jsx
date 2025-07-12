import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const ModeratorProfile = ({
  name,
  email,
  location,
  contactNumber,
  profilePicture,
  approvedBy,
  rating,
  role,
  UserID,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: name || "",
    Email: email || "",
    RoleType: role || "",
    ContactNumber: contactNumber || "",
    ProfilePicture: profilePicture || "/assets/no-pfp.jpg",
    ApprovedBy: approvedBy || "",
    Location: location || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const requiredFields = ["Name", "Email", "ContactNumber", "RoleType", "Location"];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`${field} is required.`);
        return;
      }
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(formData.Email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!UserID) {
      alert("User ID is missing.");
      return;
    }

    setIsLoading(true);

    const payload = {
      UserID,
      Name: formData.Name.trim(),
      Email: formData.Email.trim(),
      ContactNumber: formData.ContactNumber.trim(),
      RoleType: formData.RoleType.trim(),
      Location: formData.Location.trim(),
      ProfilePicture: formData.ProfilePicture,
      ApprovedBy: formData.ApprovedBy,
    };

    try {
      const response = await fetch("/api/moderatorPage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Changes saved successfully.");
        router.back();
      } else {
        const errorMsg = response.status === 401 ? "Unauthorized access." : result.error || "Failed to save changes.";
        alert(errorMsg);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="bg-greenbg rounded-lg p-6 w-[90%] md:w-[60%] flex flex-col md:flex-row shadow-lg text-white z-50">
        <div className="bg-darkgreen p-6 rounded-lg w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
            <Image
              src={formData.ProfilePicture}
              alt={`${formData.Name}'s profile picture`}
              width={64}
              height={64}
              className="object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">{formData.Name || "N/A"}</h2>
          <p className="text-gray-300 mb-3">Rating: {rating || "N/A"}</p>
          <p className="gebra-300 mb-3">{formData.RoleType || "N/A"}</p>
          <a
            href={`mailto:${formData.Email}`}
            className="text-blue-300 underline mb-1 hover:text-blue-500"
          >
            {formData.Email || "N/A"}
          </a>
          <p className="mb-1">{formData.ContactNumber || "N/A"}</p>
          <div>
            <span className="text-sm text-gray-400">Approved By</span>
            <p className="text-white">{formData.ApprovedBy || "N/A"}</p>
          </div>
        </div>

        <div className="ml-2 bg-darkgreen p-9 rounded-lg w-full md:w-1/2 flex flex-col relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-darkgreen bg-opacity-50">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z" />
              </svg>
            </div>
          )}
          <h3 className="text-xl font-semibold mb-6">Moderator Profile</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input
              id="name"
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm mb-1">Contact</label>
            <input
              id="contact"
              type="text"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm mb-1">Role Type</label>
            <input
              id="role"
              type="text"
              name="RoleType"
              value={formData.RoleType}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm mb-1">Location</label>
            <input
              id="location"
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSaveChanges}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModeratorProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  contactNumber: PropTypes.string,
  profilePicture: PropTypes.string,
  approvedBy: PropTypes.string,
  rating: PropTypes.number,
  role: PropTypes.string,
  UserID: PropTypes.string.isRequired,
};

export default ModeratorProfile;