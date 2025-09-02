/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || ''
const assetPrefix = process.env.ASSET_PREFIX || basePath

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix,
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
