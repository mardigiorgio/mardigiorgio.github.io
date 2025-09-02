import Section from '@/components/Section'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/content'

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <p className="opacity-80 mt-2">Notes on security, systems, and the web.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((p) => (
          <PostCard key={p.slug} title={p.title} excerpt={p.excerpt} slug={p.slug} date={p.date} readingTime={(p as any).readingTime} />
        ))}
      </div>
    </Section>
  )
}

