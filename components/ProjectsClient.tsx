"use client"
import ProjectCard from './ProjectCard'
import Section from './Section'
import type { Project } from '@/lib/content'

export default function ProjectsClient({ projects, tags }: { projects: Project[]; tags: string[] }) {
  return (
    <Section>
      <div className="mt-6 flex flex-col gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.slug} title={p.title} summary={p.summary} tech={p.tech} slug={p.slug} cover={p.cover} />
        ))}
      </div>
    </Section>
  )
}
