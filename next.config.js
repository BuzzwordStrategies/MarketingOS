const nextConfig = {
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber']
  },
  images: {
    domains: ['localhost', 'your-domain.com']
  }
}

module.exports = nextConfig
