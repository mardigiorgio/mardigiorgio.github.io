"use client"
import { useMemo, useState } from 'react'

type SkillLevel = 'Proficient' | 'Experienced' | 'Familiar'
type SkillItem = { name: string; level: SkillLevel }
type SkillGroup = { category: string; items: SkillItem[] }

type Props = {
  groups: SkillGroup[]
}

const LEVELS: Array<SkillLevel | 'All'> = ['All', 'Proficient', 'Experienced', 'Familiar']

export default function SkillsGrid({ groups }: Props) {
  const [active, setActive] = useState<SkillLevel | 'All'>('All')

  const counts = useMemo(() => {
    const base = { All: 0, Proficient: 0, Experienced: 0, Familiar: 0 } as Record<string, number>
    for (const g of groups) {
      for (const it of g.items) {
        base.All++
        base[it.level]++
      }
    }
    return base
  }, [groups])

  const filteredGroups = useMemo(() => {
    return groups
      .map((g) => ({
        category: g.category,
        items: g.items.filter((it) => active === 'All' || it.level === active),
      }))
      .filter((g) => g.items.length > 0)
  }, [groups, active])

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        {LEVELS.map((lvl) => {
          const selected = active === lvl
          const count = (counts as any)[lvl]
          return (
            <button
              key={lvl}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(lvl as any)}
              className={[
                'text-xs md:text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors',
                selected
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white'
                  : 'bg-transparent border-neutral-200 text-neutral-800 hover:bg-neutral-100/60 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800/60',
              ].join(' ')}
            >
              <span>{lvl}</span>
              <span className="text-[10px] md:text-xs opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {filteredGroups.map((group) => (
          <div key={group.category} className="card-base p-5 hover-lift w-full overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-200">
                {group.category}
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full border bg-neutral-500/5 border-neutral-500/20 text-neutral-500 dark:text-neutral-400">
                {group.items.length}
              </span>
            </div>

            <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between py-2 first:pt-0 last:pb-0 min-w-0">
                  <span className="text-sm font-medium truncate pr-3">{item.name}</span>
                  <span
                    className="shrink-0 text-xs px-2 py-1 rounded-full border bg-neutral-100 border-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 whitespace-nowrap"
                    aria-label={`${item.name} — ${item.level}`}
                  >
                    {item.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
