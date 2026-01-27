import Link from 'next/link'
import { withBasePath } from '@/lib/basePath'
import { Card, CardContent, CardHeader } from './ui/Card'
import Badge from './ui/Badge'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  title: string
  summary: string
  tech: string[]
  slug: string
  cover?: string
}

export default function ProjectCard({ title, summary, tech, slug, cover }: Props) {
  const coverSrc = withBasePath(cover) as string | undefined
  return (
    <Link href={`/projects/${slug}`} className="block hover-lift">
      <Card className="overflow-hidden h-full">
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverSrc} alt="" className="h-40 w-full object-cover" />
        ) : null}
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <ArrowUpRight size={18} className="opacity-60" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-80 line-clamp-2">{summary}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
