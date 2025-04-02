/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // Make sure static file serving is enabled for images
  images: {
    domains: [],
  },
};

module.exports = nextConfig; 