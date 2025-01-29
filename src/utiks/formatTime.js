export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options); // Example: "10:30:15 AM"
  };  