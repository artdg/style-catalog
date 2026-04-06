import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition placeholder:text-zinc-400',
        'focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20',
        'dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-500',
        className,
      )}
      {...props}
    />
  )
}

