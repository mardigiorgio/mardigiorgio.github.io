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
          <div className="flex flex-col gap-6 md:items-center">
            <div className="md:text-center">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Marco DiGiorgio</h1>
              <p className="mt-2 text-lg opacity-80">Intelligent Systems Engineering student at DePaul</p>
              <p className="mt-3 max-w-2xl opacity-80 md:mx-auto">
                I'm interested in how sensors, code, and hardware work together to build intelligent systems. I like to prototype things, run experiments, and iterate until they actually work.
              </p>
            </div>
            <div className="flex gap-3 md:justify-center">
              <a href="#projects"><Button>View Projects</Button></a>
              <Link href="/about"><Button variant="outline">About</Button></Link>
              <Link href="/skills"><Button variant="outline">Skills</Button></Link>
              <Link href="/contact"><Button variant="outline">Contact</Button></Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-sm md:justify-center">
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">Intelligent Systems Engineering @ DePaul</span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">Robotics, embedded systems & control</span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">Hardware + software prototyping</span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">Open to research + engineering internships</span>
            </div>
          </div>
        </AnimatedFade>
      </Section>

      <Section>
        <h2 id="projects" className="text-xl font-semibold tracking-tight mb-4 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} title={p.title} summary={p.summary} tech={p.tech} slug={p.slug} cover={p.cover} />
          ))}
        </div>
      </Section>

        <Section>
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-center">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} date={post.date} readingTime={(post as any).readingTime} />
            ))}
          </div>
        </Section>
    </>
  )
}
