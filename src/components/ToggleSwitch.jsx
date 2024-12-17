'use client'
import { useState } from 'react';

export default function ToggleSwitch({ onSwitch, title, buttonLabels, components }) {
  const [active, setActive] = useState(buttonLabels[0]); // Default to the first button

  const handleSwitch = (tab) => {
    setActive(tab);
    onSwitch(tab);
  };

  const ActiveComponent = components[active]; // Dynamically select the active component

  return (
    <div>
      {/* Title */}
      <h2 className="text-heading text-xl font-bold mb-4">{title}</h2>

      {/* Toggle Switch */}
      <div className="flex space-x-4 mb-4">
        {buttonLabels.map((label) => (
          <button
            key={label}
            onClick={() => handleSwitch(label)}
            className={`px-4 py-2 ${
              active === label ? 'bg-darkgreen text-white' : 'bg-customGray'
            } rounded`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Render Active Component */}
      <div>{ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
}
