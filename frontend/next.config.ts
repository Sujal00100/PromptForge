import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy prompt history API requests to the Express backend
  async rewrites() {
    return [
      {
        source: "/api/prompts/:path*",
        destination: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/prompts/:path*`,
      },
      {
        source: "/api/prompts",
        destination: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/prompts`,
      },
    ];
  },
};

export default nextConfig;
