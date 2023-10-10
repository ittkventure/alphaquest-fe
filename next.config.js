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
};

module.exports = nextConfig;
