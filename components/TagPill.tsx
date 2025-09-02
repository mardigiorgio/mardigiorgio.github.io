import Badge from './ui/Badge'

export default function TagPill({ tag, active = false, onClick }: { tag: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={active} className="hover-lift">
      <Badge className={active ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : ''}>#{tag}</Badge>
    </button>
  )
}

