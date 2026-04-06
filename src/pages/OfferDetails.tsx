import { ExternalLink, Heart } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { cn } from '../lib/cn'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useOffersStore } from '../hooks/useOffersStore'
import { Seo } from '../components/Seo'

export function OfferDetails() {
  const { id } = useParams()
  const { byId } = useOffersStore()
  const offer = id ? byId.get(id) : undefined
  const fav = useFavorites()

  if (!offer) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        Offer not found. Back to{' '}
        <Link className="font-semibold text-violet-600 hover:underline dark:text-violet-400" to="/">
          TOP
        </Link>
        .
      </div>
    )
  }

  const isFav = fav.isFavorite(offer.id)

  return (
    <div className="space-y-6">
      <Seo
        title={`${offer.name} — TOP`}
        description={offer.tagline}
        canonicalPath={`/offer/${offer.id}`}
      />
      <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{offer.name}</h1>
              {offer.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{offer.tagline}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">{offer.category}</Badge>
              {offer.cadence ? <Badge>⏱ {offer.cadence}</Badge> : null}
              {typeof offer.minWithdrawUsd === 'number' ? (
                <Badge>Min withdraw: ${offer.minWithdrawUsd.toFixed(2)}</Badge>
              ) : null}
              {offer.verified ? (
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  Verified
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => fav.toggleFavorite(offer.id)}>
              <Heart size={16} className={cn(isFav && 'fill-rose-500 text-rose-500')} />
              {isFav ? 'In favorites' : 'Add to favorites'}
            </Button>
            <a
              href={offer.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Earn now <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
            <div className="text-sm font-semibold tracking-tight">Highlights</div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {offer.highlights.map((h, idx) => (
                <li key={`${offer.id}_h_${idx}`} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-violet-500" />
                  <span className="min-w-0">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
          <div className="text-sm font-semibold tracking-tight">Withdraw</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {offer.payouts.map((p) => (
              <span
                key={p}
                className="rounded-full border border-zinc-200/70 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800/70 dark:text-zinc-300"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
            You can add real terms, KYC, countries and limits later if needed.
          </div>
        </div>
      </div>
    </div>
  )
}

