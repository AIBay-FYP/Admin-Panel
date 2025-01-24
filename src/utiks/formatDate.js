export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // This will return "Sept 10, 2023"
  };
  