import Link from 'next/link'
import { Card, CardContent, CardHeader } from './ui/Card'

type Props = {
  title: string
  excerpt: string
  slug: string
  date: string
  readingTime: string
}

export default function PostCard({ title, excerpt, slug, date, readingTime }: Props) {
  return (
    <Link href={`/blog/${slug}`} className="block hover-lift">
      <Card className="h-full">
        <CardHeader>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <div className="mt-2 text-xs opacity-60">{new Date(date).toLocaleDateString()} • {readingTime}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-80 line-clamp-2">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

