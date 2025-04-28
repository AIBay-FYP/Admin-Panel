'use client';
import { useState } from 'react';
import GenericModal from './genericModal';
import { formatDate } from '@/utiks/formatDate';
import { useQueryClient } from '@tanstack/react-query';


const Flashcard = ({ id, title, date, givenBy, description, status }) => {
  const queryClient = useQueryClient();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(status);

  const handleFlip = (e) => {
    // Prevent flip if dropdown or button is clicked
    console.log(status)
    if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'OPTION') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleDropdownChange = (action) => {
    if (action) {
      setSelectedAction(action);
      setIsModalOpen(true);
    }
  };

  const handlePrimaryAction = async (userID, message, type, readStatus) => {
    const notification = {
      UserID: userID,
      Message: message,
      Type: type,
      ReadStatus: readStatus,
    };
    console.log(`Confirmed for ${id}`);

    try {
      const response = await fetch('/api/notificationPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Notification created:', result);

        // Update feedback status
        const updateResponse = await fetch('/api/feedbacks', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          feedbackID: id,    
          status: selectedAction,
          date: new Date().toISOString(),  
          }),
        });

        if (updateResponse.ok) {
          console.log('Feedback status updated');
          await queryClient.invalidateQueries(['feedbacks'], { refetchActive: true });
        } else {
          console.error('Failed to update feedback status');
        }
      } else {
        console.error('Failed to create notification:', result.error);
      }
    } catch (error) {
      console.error('Error posting notification:', error);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-48 h-64 perspective-1000">
        {/* Container for the flip effect */}
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div
            className={`absolute w-full h-full ${
              status === 'Review' ? 'bg-customGray' : 'bg-[#6AA6A6]'
            } text-white rounded-lg p-4 shadow-lg backface-hidden z-10 cursor-pointer`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            onClick={handleFlip}
          >
            <h2 className="text-xl font-bold">{id}</h2>
            <p className="text-sm mt-2">{title}</p>
            <p className="text-xs mt-1">{formatDate(date)}</p>
            <div className="mt-4 flex items-center">
              <img
                src="/assets/no-pfp.jpg"
                alt="Provider"
                className="rounded-full mr-2 w-[20px]"
              />
              <span>{givenBy}</span>
            </div>
            <p className="mt-2 text-xs italic">Click to see the description</p>

            {/* Actions Dropdown */}
            <div
              className="mt-4"
              onClick={(e) => e.stopPropagation()} // Prevent flip on dropdown click
            >
              <select
                className="w-full bg-white text-black p-2 rounded cursor-pointer focus:outline-none"
                onChange={(e) => handleDropdownChange(e.target.value)}
                value={selectedAction}
              >
                <option value="Pending">Pending</option>
                <option value="Review">Review</option>
                <option value="Implement">Implement</option>
                <option value="Acknowledge">Acknowledge</option>
              </select>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-midgreen text-white rounded-lg p-4 shadow-lg backface-hidden rotate-y-180 z-10 cursor-pointer"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            onClick={handleFlip}
          >
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-xs overflow-y-auto leading-relaxed max-h-40 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 scrollbar-rounded">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Generic Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAction}
        message={`You selected the "${selectedAction}" action. Write a message`}
        primaryAction={handlePrimaryAction}
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
      />
    </div>
  );
};

export default Flashcard;
