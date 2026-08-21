import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https://igmimmizowsmheypyesr.supabase.co;
              font-src 'self' data:;
              connect-src 'self' https://igmimmizowsmheypyesr.supabase.co wss://igmimmizowsmheypyesr.supabase.co https://vitals.vercel-insights.com;
              frame-ancestors 'none';
            `.replace(/\n/g, '').replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ]
  },
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
