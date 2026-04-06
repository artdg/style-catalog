import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'solid' | 'soft'
}

export function Badge({ className, variant = 'soft', ...props }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight',
        variant === 'soft' &&
          'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200',
        variant === 'solid' &&
          'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950',
        className,
      )}
      {...props}
    />
  )
}

