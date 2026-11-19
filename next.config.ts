import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Integrasi <ViewTransition> React dengan navigasi App Router (docs Next 16.2: config/viewTransition).
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ymwkdlixtipphwgmomvo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
