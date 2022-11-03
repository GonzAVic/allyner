/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "allyner-1.sfo3.digitaloceanspaces.com",
      },
    ],
  },
};

module.exports = nextConfig;
