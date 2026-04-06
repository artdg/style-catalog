import { Seo } from '../components/Seo'
import { OfferCard } from '../components/OfferCard'
import { offers } from '../data/offers'
import type { OfferCategory } from '../types/offer'
import { useFavorites } from '../hooks/useFavorites'

const TITLE: Record<OfferCategory, string> = {
  'Earn Crypto': 'Earn Crypto',
  'Claim Free': 'Claim Free',
  'Passive Income': 'Passive Income',
  'Play and Earn': 'Play and Earn',
  'Free Spins': 'Free Spins',
}

export function Category({ category }: { category: OfferCategory }) {
  const fav = useFavorites()
  const list = offers.filter((o) => o.category === category)

  const canonical =
    category === 'Earn Crypto'
      ? '/earn-crypto'
      : category === 'Claim Free'
        ? '/claim-free'
        : category === 'Passive Income'
          ? '/passive-income'
          : category === 'Play and Earn'
            ? '/play-and-earn'
            : '/free-spins'

  return (
    <div className="space-y-6">
      <Seo title={`${TITLE[category]} — TOP`} description={`Category: ${TITLE[category]}`} canonicalPath={canonical} />

      <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
        <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">Category</div>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{TITLE[category]}</h1>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Offers in this category. All cards are stored in code in <code>src/data/offers.ts</code>.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <OfferCard
            key={o.id}
            offer={o}
            isFavorite={fav.isFavorite(o.id)}
            onToggleFavorite={() => fav.toggleFavorite(o.id)}
          />
        ))}
      </div>
    </div>
  )
}

