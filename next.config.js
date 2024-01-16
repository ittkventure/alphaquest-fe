/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/alpha-quest",
        destination: "https://api.alphaquest.io", // Proxy to Backend
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
