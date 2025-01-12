'use client';
import { useState } from 'react';
import GenericModal from './genericModal';

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const handleFlip = (e) => {
    // Prevent flip if dropdown or button is clicked
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

  return (
    <div className="relative w-48 h-64 perspective-1000">
      {/* Container for the flip effect */}
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve  ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-[#6AA6A6] text-white rounded-lg p-4 shadow-lg backface-hidden z-10 cursor-pointer"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          onClick={handleFlip}
        >
          <h2 className="text-xl font-bold">001</h2>
          <p className="text-sm mt-2">Title</p>
          <p className="text-xs mt-1">Sept 20, 2023</p>
          <div className="mt-4 flex items-center">
            <img
              src="/assets/no-pfp.jpg"
              alt="Provider"
              className="rounded-full mr-2 w-[20px]"
            />
            <span>Provider</span>
          </div>
          <p className="mt-2 text-xs italic">Hover to see the description</p>

          {/* Actions Dropdown */}
          <div
            className="mt-4"
            onClick={(e) => e.stopPropagation()} // Prevent flip on dropdown click
          >
            <select
              className="w-full bg-white text-black p-2 rounded cursor-pointer focus:outline-none"
              onChange={(e) => handleDropdownChange(e.target.value)}
            >
              <option value="">Actions</option>
              <option value="Review">Review</option>
              <option value="Implement">Implement</option>
              <option value="Acknowledge">Acknowledge</option>
            </select>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-midgreen text-white rounded-lg p-4 shadow-lg backface-hidden rotate-y-180 z-10 cursor-pointer"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          onClick={handleFlip}
        >
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-xs overflow-y-auto leading-relaxed max-h-40 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 scrollbar-rounded">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>



      </div>

      {/* Generic Modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAction}
        message={`You selected the "${selectedAction}" action.`}
        primaryAction={() => {
          alert(`${selectedAction} action confirmed!`);
          setIsModalOpen(false);
        }}
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
      />
    </div>
  );
};

export default Flashcard;
