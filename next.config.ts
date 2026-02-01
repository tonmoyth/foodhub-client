import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["i.ibb.co"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
  },
};

export default nextConfig;
