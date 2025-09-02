import { HTMLAttributes } from 'react'
import { cn } from './cn'

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-1 text-xs font-medium',
        className
      )}
      {...props}
    />
  )
}

