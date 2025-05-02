// 'use client'

// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const ModeratorsRegistration = () => {
//   const router = useRouter();
//   const [isMounted, setIsMounted] = useState(false);
//   const [Location, setLocation] = useState('');
//   const [CNIC, setCNIC] = useState('');
//   const [Name, setName] = useState('');
//   const [Email, setEmail] = useState('');
//   const [ContactNumber, setContact] = useState('');
//   const [RoleType, setRole] = useState('Moderator');
  
//   const { user } = useUser();
//   const UserID = user?.publicMetadata?.UserID;

//   const handleRegister = async () => {
//     if (!Name || !Email || !ContactNumber || !Location || !CNIC) {
//       alert('Please fill out all fields.');
//       return;
//     }

//     const userData = {
//       Name,
//       Email,
//       ContactNumber,
//       RoleType,
//       Location,
//       CNIC,
//       ApprovedBy: UserID, // Using the logged-in user's _id
//     };

//     try {
//       console.log(UserID);
//       const response = await fetch('/api/moderatorPage', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(`Moderator registered successfully! The generated password is: ${result.password}`);
//         router.back();
//       } else {
//         alert('Failed to register moderator.');
//       }
//     } catch (error) {
//       console.error('Error registering moderator:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col p-8">
//       {/* Header */}
//       <div className="flex items-center mb-6">
//         {/* Back Button */}
//         <button
//           onClick={() => router.back()}
//           className="text-gray-600 hover:text-gray-800 text-base mr-2"
//         >
//           &larr; 
//         </button>
//         <h1 className="text-xl font-bold text-gray-800">Moderators Registration</h1>
//       </div>

//       {/* Form Container */}
//       <div className="flex justify-center">
//         <div className="bg-white rounded-lg shadow-md p-8 w-[400px]">
//           {/* Input Fields */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-600 font-medium mb-1 text-sm">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Enter full name"
//               className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
//               value={Name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-600 font-medium mb-1 text-sm">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter the email"
//               className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
//               value={Email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="contact" className="block text-gray-600 font-medium mb-1 text-sm">
//               Contact
//             </label>
//             <input
//               id="contact"
//               type="text"
//               placeholder="XXX-XXX-XXX"
//               className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
//               value={ContactNumber}
//               onChange={(e) => setContact(e.target.value)}
//             />
//           </div>

//           {/* Role Type Dropdown */}
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-gray-600 font-medium mb-1 text-sm">
//               Role Type
//             </label>
//             <select
//               id="role"
//               className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
//               value={RoleType}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="Compliance Manager">Compliance Manager</option>
//               <option value="Moderator">Moderator</option>
//               <option value="Supervisor">Supervisor</option>
//             </select>
//           </div>
//           {/* CNIC Field */}
//           <div className="mb-6">
//             <label htmlFor="cnic" className="block text-gray-600 font-medium mb-1 text-sm">
//               CNIC
//             </label>
//             <input
//               id="cnic"
//               type="text"
//               placeholder="XXXXX-XXXXXX-X"
//               className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
//               value={CNIC}
//               onChange={(e) => setCNIC(e.target.value)}
//             />
//           </div>

//           {/* Location Field */}
//           <div className="mb-6">
//             <label htmlFor="location" className="block text-gray-600 font-medium mb-1 text-sm">
//               Location
//             </label>
//             <input
//               id="location"
//               type="text"
//               placeholder="Enter the location"
//               className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
//               value={Location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between">
//             <button
//               onClick={() => router.back()}
//               className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleRegister}
//               className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-light-green text-sm"
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModeratorsRegistration;


'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ModeratorsRegistration = () => {
  const router = useRouter();
  const [Location, setLocation] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [ContactNumber, setContact] = useState('');
  const [RoleType, setRole] = useState('Moderator');

  const [errors, setErrors] = useState({});

  const { user } = useUser();
  const UserID = user?.publicMetadata?.UserID;

  const validateFields = () => {
    const newErrors = {};
    if (!Name.trim()) {
      newErrors.Name = "Name is required.";
    } else if (/^\d+$/.test(Name.trim())) {
      newErrors.Name = "Name cannot consist of only numbers.";
    }
    if (!Email.trim() || !/\S+@\S+\.\S+/.test(Email)) {
      newErrors.Email = "Valid email is required.";
    }
    if (!ContactNumber.trim() || ContactNumber.length < 11 || !/^\d+$/.test(ContactNumber)) {
      newErrors.ContactNumber = "Contact must be at least 11 digits long and contain only numbers.";
    }
    if (!Location.trim()) {
      newErrors.Location = "Location is required.";
    }
    if (!CNIC.trim() || CNIC.length !== 13 || !/^\d+$/.test(CNIC)) {
      newErrors.CNIC = "CNIC must be exactly 13 digits long and contain only numbers.";
    }
    return newErrors;
  };

  const handleRegister = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const userData = {
      Name,
      Email,
      ContactNumber,
      RoleType,
      Location,
      CNIC,
      ApprovedBy: UserID,
    };

    try {
      const response = await fetch('/api/moderatorPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Moderator registered successfully! The generated password is: ${result.password}`);
        router.back();
      } else {
        alert('Failed to register moderator.');
      }
    } catch (error) {
      console.error('Error registering moderator:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800 text-base mr-2"
        >
          &larr;
        </button>
        <h1 className="text-xl font-bold text-gray-800">Moderators Registration</h1>
      </div>

      {/* Form Container */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-[400px]">
          {/* Input Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-1 text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-1 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter the email"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-600 font-medium mb-1 text-sm">
              Contact
            </label>
            <input
              id="contact"
              type="text"
              placeholder="Enter contact number"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
              value={ContactNumber}
              onChange={(e) => setContact(e.target.value)}
            />
            {errors.ContactNumber && <p className="text-red-500 text-sm">{errors.ContactNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-600 font-medium mb-1 text-sm">
              Role Type
            </label>
            <select
              id="role"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
              value={RoleType}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Compliance Manager">Compliance Manager</option>
              <option value="Moderator">Moderator</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="cnic" className="block text-gray-600 font-medium mb-1 text-sm">
              CNIC
            </label>
            <input
              id="cnic"
              type="text"
              placeholder="Enter CNIC"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
              value={CNIC}
              onChange={(e) => setCNIC(e.target.value)}
            />
            {errors.CNIC && <p className="text-red-500 text-sm">{errors.CNIC}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-600 font-medium mb-1 text-sm">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Enter the location"
              className="w-full border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-green-200"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.Location && <p className="text-red-500 text-sm">{errors.Location}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleRegister}
              className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-light-green text-sm"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorsRegistration;