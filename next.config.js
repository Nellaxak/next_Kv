/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/categories/main',
        permanent: false
      },
    ]
  },
  productionBrowserSourceMaps: true,
  eslint: { ignoreDuringBuilds: true }
}

module.exports = nextConfig
