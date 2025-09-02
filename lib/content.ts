import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export type Project = {
  title: string
  slug: string
  summary: string
  tech: string[]
  year: number
  tags: string[]
  repo?: string
  demo?: string
  cover?: string
  gallery?: string[]
  content: string
}

export type Post = {
  title: string
  slug: string
  excerpt: string
  date: string
  updated?: string
  tags: string[]
  cover?: string
  content: string
}

const contentDir = path.join(process.cwd(), 'content')

function readMDXFile(filepath: string) {
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

export function getAllProjects(): Project[] {
  const dir = path.join(contentDir, 'projects')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const items = files.map((file) => {
    const full = path.join(dir, file)
    const { data, content } = readMDXFile(full)
    const fileSlug = file.replace(/\.mdx$/, '')
    const fmSlug = (data as any).slug as string | undefined
    const slug = fmSlug || fileSlug
    return { ...(data as any), slug, content } as Project
  })
  return items.sort((a, b) => b.year - a.year)
}

export function getProjectSlugs() {
  const dir = path.join(contentDir, 'projects')
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const full = path.join(dir, f)
      const { data } = readMDXFile(full)
      const fmSlug = (data as any).slug as string | undefined
      return fmSlug || f.replace(/\.mdx$/, '')
    })
}

export function getProjectBySlug(slug: string): Project | null {
  const dir = path.join(contentDir, 'projects')
  // Try filename match first
  const filepath = path.join(dir, `${slug}.mdx`)
  if (fs.existsSync(filepath)) {
    const { data, content } = readMDXFile(filepath)
    const fmSlug = (data as any).slug as string | undefined
    return { ...(data as any), slug: fmSlug || slug, content } as Project
  }
  // Fallback: find by frontmatter slug
  const file = fs
    .readdirSync(dir)
    .find((f) => {
      if (!f.endsWith('.mdx')) return false
      const { data } = readMDXFile(path.join(dir, f))
      return (data as any).slug === slug
    })
  if (!file) return null
  const { data, content } = readMDXFile(path.join(dir, file))
  return { ...(data as any), slug, content } as Project
}

export function getAllPosts(): (Post & { readingTime: string })[] {
  const dir = path.join(contentDir, 'blog')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const items = files.map((file) => {
    const full = path.join(dir, file)
    const { data, content } = readMDXFile(full)
    const fileSlug = file.replace(/\.mdx$/, '')
    const fmSlug = (data as any).slug as string | undefined
    const slug = fmSlug || fileSlug
    const rt = readingTime(content)
    return { ...(data as any), slug, content, readingTime: rt.text } as Post & {
      readingTime: string
    }
  })
  return items.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostSlugs() {
  const dir = path.join(contentDir, 'blog')
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const full = path.join(dir, f)
      const { data } = readMDXFile(full)
      const fmSlug = (data as any).slug as string | undefined
      return fmSlug || f.replace(/\.mdx$/, '')
    })
}

export function getPostBySlug(slug: string): (Post & { readingTime: string }) | null {
  const dir = path.join(contentDir, 'blog')
  const filepath = path.join(dir, `${slug}.mdx`)
  if (fs.existsSync(filepath)) {
    const { data, content } = readMDXFile(filepath)
    const fmSlug = (data as any).slug as string | undefined
    const rt = readingTime(content)
    return { ...(data as any), slug: fmSlug || slug, content, readingTime: rt.text } as Post & {
      readingTime: string
    }
  }
  const file = fs
    .readdirSync(dir)
    .find((f) => {
      if (!f.endsWith('.mdx')) return false
      const { data } = readMDXFile(path.join(dir, f))
      return (data as any).slug === slug
    })
  if (!file) return null
  const { data, content } = readMDXFile(path.join(dir, file))
  const rt = readingTime(content)
  return { ...(data as any), slug, content, readingTime: rt.text } as Post & { readingTime: string }
}

export function getAllProjectTags(): string[] {
  const items = getAllProjects()
  const set = new Set<string>()
  items.forEach((p) => p.tags?.forEach((t) => set.add(t)))
  return Array.from(set).sort()
}
