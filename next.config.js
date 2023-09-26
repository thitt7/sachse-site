/** @type {import('next').NextConfig} */

const dns = require("dns");
dns.setDefaultResultOrder('ipv4first');

const nextConfig = {
  
  experimental: {
    serverActions: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
