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
}

module.exports = nextConfig
