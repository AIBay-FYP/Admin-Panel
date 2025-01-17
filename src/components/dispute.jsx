// 'use client';

// import React, { useState } from 'react';

// const DisputePopup = ({ onClose }) => {
//   const [resolutionAction, setResolutionAction] = useState('Flag');
//   const [mainImageIndex, setMainImageIndex] = useState(0);
//   const thumbnails = ['/shoes1.jpeg', '/shoes2.jpeg', '/shoes3.jpeg'];

//   const handleThumbnailClick = (index) => {
//     setMainImageIndex(index);
//   };

//   const handleNextImage = () => {
//     setMainImageIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
//   };

//   const handlePrevImage = () => {
//     setMainImageIndex((prevIndex) => (prevIndex - 1 + thumbnails.length) % thumbnails.length);
//   };

//   return (
//     <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <div style={{ backgroundColor: '#002A2E', color: '#FFFFFF', borderRadius: '10px', width: '600px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//         {/* Upper Section */}
//         <div style={{ display: 'flex', marginBottom: '20px' }}>
//           {/* Left Section */}
//           <div style={{ flex: 1, marginRight: '20px' }}>
//             <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr', gap: '10px' }}>
//               {/* Main Image */}
//               <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9', width: '100%', height: '200px' }}>
//                 <img src={thumbnails[mainImageIndex]} alt="Main Product" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
//               </div>

//               {/* Thumbnails */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                 {thumbnails.map((src, index) => (
//                   <div
//                     key={index}
//                     style={{ width: '64px', height: '64px', border: mainImageIndex === index ? '2px solid white' : '2px solid transparent', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
//                     onClick={() => handleThumbnailClick(index)}
//                   >
//                     <img src={src} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Slider Navigation */}
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '10px 0', marginTop: '10px' }}>
//               <button onClick={handlePrevImage} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#004A4E', color: '#FFFFFF', cursor: 'pointer', marginRight: '10px' }}>◀</button>
//               <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{mainImageIndex + 1}/{thumbnails.length}</span>
//               <button onClick={handleNextImage} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#004A4E', color: '#FFFFFF', cursor: 'pointer', marginLeft: '10px' }}>▶</button>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div style={{ flex: 1 }}>
//             <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Dispute</h1>
//             <div style={{ marginBottom: '20px' }}>
//               <label>Resolution Action</label>
//               <select
//                 value={resolutionAction}
//                 onChange={(e) => setResolutionAction(e.target.value)}
//                 style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#E1EFE6', color: '#555555' }}
//               >
//                 <option value="Flag">Flag</option>
//                 <option value="Resolve">Resolve</option>
//                 <option value="Escalate">Escalate</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Divider Line */}
//         <hr style={{ border: 'none', borderTop: '2px solid #E1EFE6', margin: '20px 0' }} />

//         {/* Lower Section */}
//         <div style={{ backgroundColor: '#002A2E', padding: '10px', borderRadius: '8px' }}>
//           <div style={{ marginBottom: '20px' }}>
//             <p><strong>ID:</strong> PT001</p>
//             <p><strong>Date:</strong> 23 Sept, 2024</p>
//             <p><strong>Created By:</strong> John Doe</p>
//             <p><strong>Description:</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
//             <button style={{ backgroundColor: '#555555', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={onClose}>Cancel</button>
//             <button style={{ backgroundColor: '#007B7F', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Save Changes</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisputePopup;

'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Mock API for fetching dispute details
const fetchDisputeDetails = async () => {
  // Simulating a network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'PT001',
        date: '23 Sept, 2024',
        createdBy: 'John Doe',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        images: ['/shoes1.jpeg', '/shoes2.jpeg', '/shoes3.jpeg'],
      });
    }, 500); // Delay of 500ms
  });
};

const DisputePopup = ({ onClose }) => {
  const [resolutionAction, setResolutionAction] = useState('Flag');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['disputeDetails'],
    queryFn: fetchDisputeDetails,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading dispute details.</p>;

  const thumbnails = data?.images || [];

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const handleNextImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
  };

  const handlePrevImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + thumbnails.length) % thumbnails.length);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#002A2E', color: '#FFFFFF', borderRadius: '10px', width: '600px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        {/* Upper Section */}
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          {/* Left Section */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr', gap: '10px' }}>
              {/* Main Image */}
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9', width: '100%', height: '200px' }}>
                <img src={thumbnails[mainImageIndex]} alt="Main Product" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {thumbnails.map((src, index) => (
                  <div
                    key={index}
                    style={{ width: '64px', height: '64px', border: mainImageIndex === index ? '2px solid white' : '2px solid transparent', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={src} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '10px 0', marginTop: '10px' }}>
              <button onClick={handlePrevImage} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#004A4E', color: '#FFFFFF', cursor: 'pointer', marginRight: '10px' }}>◀</button>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{mainImageIndex + 1}/{thumbnails.length}</span>
              <button onClick={handleNextImage} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#004A4E', color: '#FFFFFF', cursor: 'pointer', marginLeft: '10px' }}>▶</button>
            </div>
          </div>

          {/* Right Section */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Dispute</h1>
            <div style={{ marginBottom: '20px' }}>
              <label>Resolution Action</label>
              <select
                value={resolutionAction}
                onChange={(e) => setResolutionAction(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#E1EFE6', color: '#555555' }}
              >
                <option value="Flag">Flag</option>
                <option value="Resolve">Resolve</option>
                <option value="Escalate">Escalate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr style={{ border: 'none', borderTop: '2px solid #E1EFE6', margin: '20px 0' }} />

        {/* Lower Section */}
        <div style={{ backgroundColor: '#002A2E', padding: '10px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '20px' }}>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Date:</strong> {data.date}</p>
            <p><strong>Created By:</strong> {data.createdBy}</p>
            <p><strong>Description:</strong> {data.description}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button style={{ backgroundColor: '#555555', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={onClose}>Cancel</button>
            <button style={{ backgroundColor: '#007B7F', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputePopup;