import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function NotFound() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <Seo
        title="404 — Page not found"
        description="Page not found."
        canonicalPath="/404"
      />
      Page not found. Back to{' '}
      <Link className="font-semibold text-violet-600 hover:underline dark:text-violet-400" to="/">
        TOP
      </Link>
      .
    </div>
  )
}

