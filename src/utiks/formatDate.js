export const formatDate = (timestamp) => {
  const date = new Date(timestamp); // Parse the MongoDB timestamp
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options); // Example: "Sep 10, 2023"
};