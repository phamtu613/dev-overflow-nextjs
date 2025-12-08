/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["github.com"],
    // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDUVm4iEJEe0DHIfGifAA-FvVMM-rAzancQ&s
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
