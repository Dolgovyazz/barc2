/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow opening the dev site from other devices on the LAN (e.g. your phone)
  allowedDevOrigins: ['192.168.1.216'],
}

export default nextConfig
