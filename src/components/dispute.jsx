"use client";
import { formatDate } from '@/utiks/formatDate';
import React, { useState, useEffect } from 'react';
import GenericModal from './genericModal';

const DisputePopup = ({ dispute, onClose, onSave }) => {
  const [resolutionAction, setResolutionAction] = useState(dispute?.Status || 'New');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [adminComment, setAdminComment] = useState(dispute?.AdminComment || ""); 
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const thumbnails = dispute?.Evidence || [];

  useEffect(() => {
    // Reset the resolution action when the dispute data changes
    setResolutionAction(dispute?.Status || 'New');
    setMainImageIndex(0);  // Reset the main image when dispute changes
    setAdminComment(dispute?.AdminComment || ""); // <-- Update when dispute changes
  }, [dispute]);

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const handleNextImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
  };

  const handlePrevImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + thumbnails.length) % thumbnails.length);
  };

  const handleSubmit = () => {
    setShowNotificationModal(true); // Show modal before actually saving
  };

  const handleNotificationSend = async (userId, message, type) => {
    await onSave(dispute.DisputeID, resolutionAction, adminComment);
    setShowNotificationModal(false);
    onClose(); // <-- Close the main popup after success
  };

  const handleSaveChanges = async (id, status, adminComment) => {
    try {
      await mutation.mutateAsync({ id, status, adminComment });
      // Only close on success
      setSelectedDispute(null);
    } catch (error) {
      // Optionally show error to user
      console.error(error);
    }
  };

  return (
    <>
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
              <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{dispute.Title}</h1>
              <div style={{ marginBottom: '20px' }}>
                <label>Resolution Action</label>
                <select
                  value={resolutionAction}
                  onChange={(e) => setResolutionAction(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#E1EFE6', color: '#555555' }}
                >
                  <option value="New">New</option>
                  <option value="InWorking">InWorking</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              {/* Admin Comment Field */}
              <div style={{ marginBottom: '20px' }}>
                <label>Admin Comment</label>
                {dispute?.AdminComment && (
                  <div style={{ margin: '8px 0', color: '#007B7F', background: '#E1EFE6', padding: '8px', borderRadius: '5px' }}>
                    <strong>Previous Admin Comment:</strong>
                    <div>{dispute.AdminComment}</div>
                  </div>
                )}
                <textarea
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  placeholder="Write a comment about the issue..."
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#E1EFE6', color: '#555555', minHeight: '60px' }}
                />
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <hr style={{ border: 'none', borderTop: '2px solid #E1EFE6', margin: '20px 0' }} />

          {/* Lower Section */}
          <div style={{ backgroundColor: '#002A2E', padding: '10px', borderRadius: '8px' }}>
            <div style={{ marginBottom: '20px' }}>
              <p><strong>ID:</strong> {dispute?.DisputeID}</p>
              <p><strong>Date:</strong> {formatDate(dispute?.Date)}</p>
              <p><strong>Created By:</strong> {dispute?.creatorDetails.Name}</p>
              <p><strong>Description:</strong> {dispute?.Description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button style={{ backgroundColor: '#555555', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={onClose}>Cancel</button>
              <button style={{ backgroundColor: '#007B7F', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleSubmit}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      <GenericModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        title="Send Notification"
        type={resolutionAction}
        primaryAction={handleNotificationSend}
        primaryButtonText="Send Notification"
        secondaryButtonText="Cancel"
      />
    </>
  );
};

export default DisputePopup;