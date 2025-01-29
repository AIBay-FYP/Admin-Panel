/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      domains: ["res.cloudinary.com", "www.w3schools.com"], // Allow images from Cloudinary
    },
  };
  
export default nextConfig;