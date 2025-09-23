import Section from '@/components/Section'
import Prose from '@/components/Prose'
import { getPostBySlug, getPostSlugs } from '@/lib/content'
import { renderMDX } from '@/lib/mdx'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return {
    title: post?.title ?? 'Post',
    description: post?.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return null
  const mdx = await renderMDX(post.content)
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      <div className="opacity-70 text-sm mt-2">{new Date(post.date).toLocaleDateString()} • {post.readingTime}</div>
      <div className="mt-8">
        <Prose>{mdx as any}</Prose>
      </div>
    </Section>
  )
}
