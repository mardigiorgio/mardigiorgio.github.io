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
      </Section>
      <ProjectsClient projects={projects} tags={tags} />
    </>
  )
}
