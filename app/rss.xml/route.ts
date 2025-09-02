import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/content'
import { siteConfig } from '@/lib/seo'

export const runtime = 'nodejs'

export function GET() {
  const posts = getAllPosts()
  const items = posts
    .map((p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${siteConfig.url}/blog/${p.slug}</link>
        <guid>${siteConfig.url}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description><![CDATA[${p.excerpt}]]></description>
      </item>
    `)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      ${items}
    </channel>
  </rss>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}

