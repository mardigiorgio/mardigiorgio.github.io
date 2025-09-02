import { PropsWithChildren } from 'react'
import '@/styles/prose.css'

export default function Prose({ children }: PropsWithChildren) {
  return <div className="prose prose-neutral dark:prose-invert">{children}</div>
}

