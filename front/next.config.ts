import type { NextConfig } from "next";
require("dotenv").config();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/:path*',
        destination: '/404',
      },
    ];
  },
};

export default nextConfig;

