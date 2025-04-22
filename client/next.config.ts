import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/upload",
        destination: "http://localhost:3000/upload", 
      },
      {
        source: "/api/matches/:id",
        destination: "http://localhost:3000/matches/:id",
      },
      {
        source: "/api/matches",
        destination: "http://localhost:3000/matches",
      },
    ];
  },
};

export default nextConfig;
