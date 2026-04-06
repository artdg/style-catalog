import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/Button'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../lib/cn'

export function Navbar() {
  const { resolved, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="border-b border-zinc-200/70 bg-gradient-to-r from-zinc-50 to-white py-2 text-center text-xs font-semibold text-zinc-700 dark:border-zinc-800/70 dark:from-zinc-950 dark:to-zinc-950 dark:text-zinc-200">
        💸 Claim rewards daily — curated picks updated regularly.
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:gap-2">
        <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-sm">
            <span className="text-sm font-black">RH</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">RewardHub</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Best ways to earn crypto</div>
          </div>
        </Link>

          <div className="flex items-center gap-2">
            <a
              href="#top"
              className="hidden h-9 items-center rounded-xl bg-zinc-900 px-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 sm:inline-flex"
            >
              Claim reward
            </a>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
              aria-label={resolved === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {resolved === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{resolved === 'dark' ? 'Light' : 'Dark'}</span>
            </Button>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
                isActive && 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50',
              )
            }
            end
          >
            TOP
          </NavLink>
          <NavLink
            to="/earn-crypto"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
                isActive && 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50',
              )
            }
          >
            Earn Crypto
          </NavLink>
          <NavLink
            to="/claim-free"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
                isActive && 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50',
              )
            }
          >
            Claim Free
          </NavLink>
          <NavLink
            to="/passive-income"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
                isActive && 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50',
              )
            }
          >
            Passive Income
          </NavLink>
          <NavLink
            to="/play-and-earn"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
                isActive && 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50',
              )
            }
          >
            Play and Earn
          </NavLink>
          <NavLink
            to="/free-spins"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
                isActive && 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50',
              )
            }
          >
            Free Spins
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

