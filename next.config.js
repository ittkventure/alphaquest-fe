/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "chainplay.gg",
      "www.coingecko.com",
      "tk-storage.s3.ap-southeast-1.amazonaws.com",
      "assets.coingecko.com",
      "img.api.cryptorank.io",
      "wiki.tino.org",
      "img.youtube.com",
      "i.ytimg.com",
      "i.pinimg.com",
      "i.pravatar.cc",
      "pbs.twimg.com",
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
