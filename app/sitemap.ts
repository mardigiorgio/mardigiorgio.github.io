import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import { getPostSlugs, getProjectSlugs } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const routes = ['/', '/projects', '/blog']
  const proj = getProjectSlugs().map((s) => `/projects/${s}`)
  const posts = getPostSlugs().map((s) => `/blog/${s}`)
  return [...routes, ...proj, ...posts].map((route) => ({ url: `${base}${route}` }))
}

export const dynamic = 'force-static'
