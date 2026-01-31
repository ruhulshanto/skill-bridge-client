import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

// Use config file directory as Turbopack root so Next.js package is resolvable (fixes "inferred workspace root" error)
const root =
  typeof import.meta?.url !== "undefined"
    ? path.resolve(path.dirname(fileURLToPath(import.meta.url)))
    : path.resolve(process.cwd());

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
