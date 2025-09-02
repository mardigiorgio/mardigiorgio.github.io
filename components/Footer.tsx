import socials from '@/data/socials.json'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-readable py-8 text-sm opacity-70 flex items-center justify-between">
        <p>© {year} Marco DiGiorgio</p>
        <div className="space-x-4">
          <Link href="/rss.xml" className="hover:underline">RSS</Link>
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
