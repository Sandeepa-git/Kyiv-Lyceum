import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [25, 50, 75, 90, 95, 100],
  },
  typedRoutes: true,
};

export default nextConfig;
