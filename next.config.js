/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'jhpvantiskndecjywdon.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
