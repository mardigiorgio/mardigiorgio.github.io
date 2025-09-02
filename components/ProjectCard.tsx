import Link from 'next/link'
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
  return (
    <Link href={`/projects/${slug}`} className="block hover-lift">
      <Card className="overflow-hidden h-full">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="h-40 w-full object-cover" />
        ) : null}
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <ArrowUpRight size={18} className="opacity-60" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-80 line-clamp-2">{summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tech.slice(0, 4).map((t) => (
              <Badge key={t} className="text-xs">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

