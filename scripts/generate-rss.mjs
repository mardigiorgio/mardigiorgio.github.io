import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const siteConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'lib', 'site.config.json'), 'utf8')
)

const blogDir = path.join(process.cwd(), 'content', 'blog')
const publicDir = path.join(process.cwd(), 'public')

function getPosts() {
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf8')
      const { data, content } = matter(raw)
      const slug = (data?.slug || file.replace(/\.mdx$/, ''))
      return {
        title: data?.title || slug,
        slug,
        excerpt: data?.excerpt || '',
        date: data?.date || new Date().toISOString(),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

function buildRSS(posts) {
  const items = posts
    .map(
      (p) => `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${siteConfig.url}/blog/${p.slug}</link>
    <guid>${siteConfig.url}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description><![CDATA[${p.excerpt}]]></description>
  </item>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${siteConfig.name}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>${items}
  </channel>
</rss>
`
}

const posts = getPosts()
const xml = buildRSS(posts)
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir)
fs.writeFileSync(path.join(publicDir, 'rss.xml'), xml)
console.log(`Generated public/rss.xml with ${posts.length} posts`)
