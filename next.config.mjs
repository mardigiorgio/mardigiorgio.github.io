/** @type {import('next').NextConfig} */
// Support either NEXT_PUBLIC_BASE_PATH or BASE_PATH for convenience
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  typedRoutes: true,
}

export default nextConfig
