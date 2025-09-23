import Section from '@/components/Section'
import Prose from '@/components/Prose'
import { getProjectBySlug, getProjectSlugs } from '@/lib/content'
import { renderMDX } from '@/lib/mdx'
import { Metadata } from 'next'
import { buttonVariants } from '@/components/ui/Button'

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProjectBySlug(slug)
  return {
    title: p?.title ?? 'Project',
    description: p?.summary,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return null
  const mdx = await renderMDX(project.content)
  return (
    <Section>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({ variant: 'outline', size: 'sm' })} gap-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-[16px] w-[16px]"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.303-5.466-1.335-5.466-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
            <span>Source</span>
          </a>
        ) : null}
      </div>
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
