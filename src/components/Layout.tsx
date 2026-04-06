import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-dvh bg-zinc-50 dark:bg-zinc-950">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(244,63,94,0.10),transparent_45%)]" />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

