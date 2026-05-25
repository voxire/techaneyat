import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
  },
}

// next-intl plugin will be wired in Phase 7 when locale routing is unified
// under app/[locale]/ directory. For Phase 2, routes are manually split:
// EN at root (app/), AR at /ar/ (app/ar/).
export default nextConfig
