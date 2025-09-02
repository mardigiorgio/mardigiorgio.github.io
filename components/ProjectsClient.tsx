"use client"
import { useMemo, useState } from 'react'
import TagPill from './TagPill'
import ProjectCard from './ProjectCard'
import Section from './Section'
import type { Project } from '@/lib/content'

export default function ProjectsClient({ projects, tags }: { projects: Project[]; tags: string[] }) {
  const [active, setActive] = useState<string | null>(null)
  const filtered = useMemo(() => {
    if (!active) return projects
    return projects.filter((p) => p.tags?.includes(active))
  }, [active, projects])

  return (
    <Section>
      <div className="mt-4 flex flex-wrap gap-2">
        <TagPill tag="all" active={!active} onClick={() => setActive(null)} />
        {tags.map((t) => (
          <TagPill key={t} tag={t} active={active === t} onClick={() => setActive(t)} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} title={p.title} summary={p.summary} tech={p.tech} slug={p.slug} cover={p.cover} />
        ))}
      </div>
    </Section>
  )
}

