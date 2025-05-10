import type { NextConfig } from "next";
const path = require('path');
const nextConfig: NextConfig = {
 webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  
  images: {
    domains: ['localhost', 'cinevie.onrender.com', 'img.youtube.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cinevie.onrender.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
    ],
    
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Thêm cấu hình cho server actions
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["*"],
    },
     
  },
   serverExternalPackages: ['axios'],
 
};

export default nextConfig;
