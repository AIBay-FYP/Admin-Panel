import { useState } from 'react';

export default function ToggleSwitch({ onSwitch }) {
  const [active, setActive] = useState('Searches');

  const handleSwitch = (tab) => {
    setActive(tab);
    onSwitch(tab);
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleSwitch('Searches')}
        className={`px-4 py-2 ${
          active === 'Searches' ? 'bg-darkgreen text-white' : 'bg-customGray'
        } rounded`}
      >
        Searches
      </button>
      <button
        onClick={() => handleSwitch('Services')}
        className={`px-4 py-2 ${
          active === 'Services' ? 'bg-darkgreen text-white' : 'bg-customGray'
        } rounded`}
      >
        Services
      </button>
    </div>
  );
}
