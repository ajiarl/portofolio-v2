import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'igmimmizowsmheypyesr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/project/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
