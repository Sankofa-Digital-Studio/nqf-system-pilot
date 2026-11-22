import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      'cloudflare:workers': './lib/cloudflare-workers-vercel-shim.ts',
    },
  },
};

export default nextConfig;