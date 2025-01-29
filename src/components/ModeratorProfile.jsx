import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";  

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
  // State for editable fields
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

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    console.log("FormData before validation:", formData);

    const requiredFields = ["Name", "Email", "ContactNumber", "RoleType", "Location"];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        console.log(`Missing field: ${field}`);
        alert(`${field} is required.`);
        return;
      }
    }
    console.log("All required fields are filled.");

    setIsLoading(true);

    // Prepare payload including UserID
    const payload = {
      UserID,  // Ensure UserID is sent with the payload
      Name: formData.Name.trim(),
      Email: formData.Email.trim(),
      ContactNumber: formData.ContactNumber.trim(),
      RoleType: formData.RoleType.trim(),
      Location: formData.Location.trim(),
    };

    try {
      const response = await fetch("/api/moderatorPage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Changes saved successfully.");
        router.back();  
      } else {
        alert(result.error || "Failed to save changes.");
      }
    } catch (error) {
      console.error("Error while saving changes:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      {/* Main Container */}
      <div className="bg-greenbg rounded-lg p-6 w-[90%] md:w-[60%] flex flex-col md:flex-row shadow-lg text-white z-50">
        {/* Left Section - Profile */}
        <div className="bg-darkgreen p-6 rounded-lg w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
            <Image
              src={formData.ProfilePicture}
              alt="Profile Picture"
              width={64}
              height={64}
              className="object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">{formData.Name || "N/A"}</h2>
          <p className="text-gray-300 mb-3">{formData.RoleType || "N/A"}</p>
          <a
            href={`mailto:${formData.Email}`}
            className="text-blue-300 underline mb-1 hover:text-blue-500"
          >
            {formData.Email || "N/A"}
          </a>
          <p className="mb-1">{formData.ContactNumber || "N/A"}</p>
          <p className="text-gray-300 mb-4">{new Date().toLocaleDateString()}</p>
          <div>
            <span className="text-sm text-gray-400">Approved By</span>
            <p className="text-white">{formData.ApprovedBy || "N/A"}</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="ml-2 bg-darkgreen p-9 rounded-lg w-full md:w-1/2 flex flex-col">
          <h3 className="text-xl font-semibold mb-6">Moderator Profile</h3>
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Contact</label>
            <input
              type="text"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Role Type</label>
            <input
              type="text"
              name="RoleType"
              value={formData.RoleType}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded focus:outline-none"
            />
          </div>
          {/* Buttons */}
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

export default ModeratorProfile;