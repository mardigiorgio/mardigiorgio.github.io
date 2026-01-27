import AnimatedFade from '@/components/AnimatedFade'
import Section from '@/components/Section'
import { Button } from '@/components/ui/Button'
import ProjectCard from '@/components/ProjectCard'
import PostCard from '@/components/PostCard'
import { getAllProjects, getAllPosts } from '@/lib/content'
import Link from 'next/link'

export default function HomePage() {
  const projects = getAllProjects().slice(0, 3)
  const posts = getAllPosts().slice(0, 2)
  return (
    <>
      <Section>
        <AnimatedFade>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <img
                src="/images/headshot.jpg"
                alt="Marco DiGiorgio"
                className="w-48 h-48 md:w-64 md:h-64 object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Marco DiGiorgio</h1>
                <p className="mt-2 text-lg opacity-80">I&apos;m a physics major at DePaul. I&apos;m interested in simulation, fluid mechanics, heat transfer, and numerical methods, with the long-term goal of working in nuclear engineering.</p>
              </div>
            </div>
          </div>
        </AnimatedFade>
      </Section>

      <Section>
        <h2 id="projects" className="text-xl font-semibold tracking-tight mb-4 text-center">Featured Projects</h2>
        <div className="flex flex-col gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} title={p.title} summary={p.summary} tech={p.tech} slug={p.slug} cover={p.cover} />
          ))}
        </div>
      </Section>

        <Section>
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-center">Latest Posts</h2>
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} date={post.date} readingTime={(post as any).readingTime} />
            ))}
          </div>
        </Section>
    </>
  )
}
