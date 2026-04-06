export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 py-10 dark:border-zinc-800/70">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="font-medium text-zinc-900 dark:text-zinc-50">Offer catalog</div>
          <div>
            Curated showcase. Cards are defined in code in <code>src/data/offers.ts</code>.
          </div>
        </div>
      </div>
    </footer>
  )
}

