/** @type {import('next').NextConfig} */
const repo = 'portfolio-site'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // Next/Image must be unoptimized for export
  images: { unoptimized: true },
  // Use basePath/assetPrefix on Pages so assets resolve under /<repo>/
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}` : '',
  // Ensure GitHub Pages serves static files reliably
  trailingSlash: true,
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
