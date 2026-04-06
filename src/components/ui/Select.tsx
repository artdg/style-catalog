import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, ...props }: Props) {
  return (
    <select
      className={cn(
        'h-11 w-full appearance-none rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition',
        'focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20',
        'dark:border-zinc-800 dark:bg-zinc-950',
        className,
      )}
      {...props}
    />
  )
}

