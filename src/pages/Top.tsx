import { Seo } from '../components/Seo'
import { OfferCard } from '../components/OfferCard'
import { offers } from '../data/offers'
import { useFavorites } from '../hooks/useFavorites'
import { Link } from 'react-router-dom'

const sections: { title: string; category: (typeof offers)[number]['category']; take: number }[] = [
  { title: 'Earn Crypto', category: 'Earn Crypto', take: 5 },
  { title: 'Claim Free', category: 'Claim Free', take: 5 },
  { title: 'Passive Income', category: 'Passive Income', take: 4 },
  { title: 'Play and Earn', category: 'Play and Earn', take: 5 },
  { title: 'Free Spins', category: 'Free Spins', take: 4 },
]

const PATH: Record<(typeof offers)[number]['category'], string> = {
  'Earn Crypto': '/earn-crypto',
  'Claim Free': '/claim-free',
  'Passive Income': '/passive-income',
  'Play and Earn': '/play-and-earn',
  'Free Spins': '/free-spins',
}

export function Top() {
  const fav = useFavorites()

  return (
    <div className="space-y-8" id="top">
      <Seo
        title="TOP — Best ways to earn crypto"
        description="Explore legit ways to earn crypto and money online: Earn Crypto, Claim Free, Passive Income, Play and Earn, Free Spins."
        canonicalPath="/"
      />

      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.18),transparent_40%),radial-gradient(circle_at_75%_30%,rgba(217,70,239,0.12),transparent_45%)]" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-extrabold text-white dark:bg-white dark:text-zinc-950">
              TOP EARNING
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold text-white dark:bg-zinc-950 dark:text-white">
                Instant withdrawals
              </span>
            </div>
            <h1 className="mt-2 text-balance text-2xl font-extrabold tracking-tight sm:text-4xl">
              Best ways to earn crypto and money
            </h1>
            <p className="mt-3 text-pretty text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Curated picks: faucets, tasks, games, passive income and free spins. Add new cards in{' '}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[13px] dark:bg-zinc-900">src/data/offers.ts</code>.
            </p>
          </div>

          <div className="relative grid w-full gap-3 lg:max-w-md">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800/70 dark:bg-zinc-900/40">
                <div className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300">Ad</div>
                <a
                  href="https://earnbitmoon.club/?ref=1088181"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block overflow-hidden rounded-xl bg-white p-2 dark:bg-zinc-950"
                  aria-label="Earnbitmoon promo"
                >
                  <img
                    src="https://earnbitmoon.club/promo/EBM_shiba_300.gif"
                    alt="Earnbitmoon - ultimate faucet !"
                    className="h-28 w-full object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800/70 dark:bg-zinc-900/40">
                <div className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300">Ad</div>
                <a
                  href="https://1wolqn.life/betting?open=register&p=1o1a"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block overflow-hidden rounded-xl bg-white p-2 dark:bg-zinc-950"
                  aria-label="1win promo"
                >
                  <img
                    src="https://1win-partners.com/promo-files-uploads/acf4a945c8452dee2dba1c9cfa6b17e65342ec94a8cc71deb9.jpg"
                    alt="Promo banner"
                    className="h-28 w-full object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sections.map((s) => {
        const list = offers.filter((o) => o.category === s.category).slice(0, s.take)
        return (
          <section key={s.category} className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold tracking-tight">{s.title}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Top offers in this category.</div>
              </div>
              <Link
                to={PATH[s.category]}
                className="text-sm font-extrabold text-violet-700 hover:underline dark:text-violet-300"
              >
                View more
              </Link>
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
          </section>
        )
      })}
    </div>
  )
}

