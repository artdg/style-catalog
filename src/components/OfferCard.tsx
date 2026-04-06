import { ExternalLink, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Offer } from '../types/offer'
import { cn } from '../lib/cn'
import { Badge } from './ui/Badge'

function accentClass(accent: Offer['accent']) {
  switch (accent) {
    case 'emerald':
      return 'from-emerald-500/20 to-emerald-500/0 border-emerald-500/30'
    case 'amber':
      return 'from-amber-500/20 to-amber-500/0 border-amber-500/30'
    case 'sky':
      return 'from-sky-500/20 to-sky-500/0 border-sky-500/30'
    case 'rose':
      return 'from-rose-500/20 to-rose-500/0 border-rose-500/30'
    case 'violet':
    default:
      return 'from-violet-500/20 to-fuchsia-500/0 border-violet-500/30'
  }
}

export function OfferCard({
  offer,
  isFavorite,
  onToggleFavorite,
}: {
  offer: Offer
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  const hot = offer.tags.includes('HOT')
  const top = offer.tags.includes('TOP')
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
        'border-zinc-200/70 dark:border-zinc-800/70 dark:bg-zinc-950',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70',
          accentClass(offer.accent),
        )}
      />

      <div className="relative flex items-start gap-4">
        <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl border border-white/60 bg-white/70 text-sm font-black text-zinc-900 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/60 dark:text-zinc-50">
          {offer.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {top ? <Badge className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">TOP</Badge> : null}
            {hot ? <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-300">HOT</Badge> : null}
            {offer.tags
              .filter((t) => t !== 'TOP' && t !== 'HOT')
              .slice(0, 2)
              .map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
          </div>

          <div className="mt-2 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                to={`/offer/${offer.id}`}
                className="block truncate text-base font-extrabold tracking-tight text-zinc-950 hover:underline dark:text-zinc-50"
              >
                {offer.name}
              </Link>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{offer.tagline}</div>
            </div>

            <button
              onClick={onToggleFavorite}
              className={cn(
                'grid h-10 w-10 flex-none place-items-center rounded-xl border transition',
                'border-zinc-200 bg-white/70 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:bg-zinc-950',
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={18}
                className={cn(
                  'transition',
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 dark:text-zinc-300',
                )}
              />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="bg-white/60 text-zinc-800 backdrop-blur dark:bg-zinc-950/60 dark:text-zinc-200">
              {offer.category}
            </Badge>
            {offer.cadence ? <Badge>⏱ {offer.cadence}</Badge> : null}
            {typeof offer.minWithdrawUsd === 'number' ? <Badge>Min withdraw: ${offer.minWithdrawUsd.toFixed(2)}</Badge> : null}
            {offer.verified ? (
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Verified</Badge>
            ) : null}
          </div>
        </div>
      </div>

      <ul className="relative mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {offer.highlights.slice(0, 3).map((h, idx) => (
          <li key={`${offer.id}_hl_${idx}`} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-violet-500" />
            <span className="min-w-0">{h}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Withdraw to:</span>
          {offer.payouts.map((p) => (
            <span key={p} className="rounded-full border border-zinc-200/70 px-2 py-1 dark:border-zinc-800/70">
              {p}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/offer/${offer.id}`}
            className="hidden h-9 items-center rounded-xl bg-zinc-100 px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:inline-flex"
          >
            Details
          </Link>
          <a
            href={offer.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-zinc-900 px-3 text-sm font-extrabold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Earn now <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

