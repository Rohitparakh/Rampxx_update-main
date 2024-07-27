/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    
  },
}

module.exports = nextConfig;