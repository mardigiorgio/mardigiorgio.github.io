import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur bg-white/70 dark:bg-neutral-950/70">
      <div className="container-readable flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Marco DiGiorgio</Link>
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

