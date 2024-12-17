import React from 'react';

const StarDisplay = ({ rating }) => {
  const totalStars = 5; 

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          style={{
            fontSize: '24px',
            color: index < Math.round(rating) ? '#ffd700' : '#dcdcdc', 
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarDisplay;
