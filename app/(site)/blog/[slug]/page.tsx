import Section from '@/components/Section'
import Prose from '@/components/Prose'
import { getPostBySlug, getPostSlugs } from '@/lib/content'
import { renderMDX } from '@/lib/mdx'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  return {
    title: post?.title ?? 'Post',
    description: post?.excerpt,
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
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

