import Link from 'next/link'
import type { Route } from 'next'
import ThemeToggle from './ThemeToggle'
import socials from '@/data/socials.json'

const nav: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur bg-white/70 dark:bg-neutral-950/70">
      <div className="container-readable flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="opacity-80 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-[20px] w-[20px] text-neutral-900 dark:text-neutral-100"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.303-5.466-1.335-5.466-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="opacity-80 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-[20px] w-[20px] text-neutral-900 dark:text-neutral-100"
              fill="currentColor"
              aria-hidden
            >
              <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.051 20.452H3.561V9h3.49v11.452zM5.306 7.433c-1.121 0-2.03-.91-2.03-2.03 0-1.12.909-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03zM20.452 20.452h-3.487v-5.563c0-1.327-.027-3.033-1.848-3.033-1.85 0-2.134 1.445-2.134 2.937v5.659H9.496V9h3.346v1.561h.048c.467-.885 1.606-1.818 3.305-1.818 3.535 0 4.257 2.328 4.257 5.355v6.354z" />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="opacity-80 hover:opacity-100">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
