import Section from '@/components/Section'
import ProjectsClient from '@/components/ProjectsClient'
import { getAllProjects, getAllProjectTags } from '@/lib/content'

export default function ProjectsPage() {
  const projects = getAllProjects()
  const tags = getAllProjectTags()
  return (
    <>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight text-center">Projects</h1>
        <p className="opacity-80 mt-2 text-center">Filter by tag to explore my work.</p>
      </Section>
      <ProjectsClient projects={projects} tags={tags} />
    </>
  )
}
