import Section from '@/components/Section'
import Prose from '@/components/Prose'
import { getProjectBySlug, getProjectSlugs } from '@/lib/content'
import { renderMDX } from '@/lib/mdx'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProjectBySlug(params.slug)
  return {
    title: p?.title ?? 'Project',
    description: p?.summary,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return null
  const mdx = await renderMDX(project.content)
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
      <p className="opacity-80 mt-2">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-70">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border px-2 py-1 border-neutral-200 dark:border-neutral-800">{t}</span>
        ))}
      </div>
      <div className="mt-8">
        <Prose>{mdx as any}</Prose>
      </div>
    </Section>
  )
}

