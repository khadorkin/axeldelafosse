const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { withContentlayer } = require('next-contentlayer')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    browsersListForSwc: true,
    legacyBrowsers: false
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  images: {
    loader: 'custom'
  },
  async headers() {
    const cacheHeaders = [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
    return [{ source: '/_next/static/:static*', headers: cacheHeaders }]
  }
}

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        runtimeCaching
      }
    }
  ],
  withBundleAnalyzer,
  withContentlayer(),
  nextConfig
])
