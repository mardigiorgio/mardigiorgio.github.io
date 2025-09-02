import AnimatedFade from '@/components/AnimatedFade'
import Section from '@/components/Section'
import { Button } from '@/components/ui/Button'
import ProjectCard from '@/components/ProjectCard'
import PostCard from '@/components/PostCard'
import { getAllProjects, getAllPosts } from '@/lib/content'

export default function HomePage() {
  const projects = getAllProjects().slice(0, 3)
  const posts = getAllPosts().slice(0, 2)
  return (
    <>
      <Section>
        <AnimatedFade>
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Marco DiGiorgio</h1>
              <p className="mt-2 text-lg opacity-80">Software Engineer & Security tinkerer</p>
              <p className="mt-3 max-w-2xl opacity-80">
                I build fast, reliable systems and delightful web apps.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#projects"><Button>View Projects</Button></a>
              <a href="/contact"><Button variant="outline">Contact</Button></a>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">5+ years coding</span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">Fav stack: Next.js + TS</span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1">Open to internships</span>
            </div>
          </div>
        </AnimatedFade>
      </Section>

      <Section>
        <h2 id="projects" className="text-xl font-semibold tracking-tight mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} title={p.title} summary={p.summary} tech={p.tech} slug={p.slug} cover={p.cover} />
          ))}
        </div>
      </Section>

        <Section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} date={post.date} readingTime={(post as any).readingTime} />
            ))}
          </div>
        </Section>
    </>
  )
}

