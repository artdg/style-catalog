import { useEffect, useMemo, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../lib/storage'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'exma-clone.theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => loadFromStorage<Theme>(STORAGE_KEY) ?? 'system')
  const [systemPref, setSystemPref] = useState<'light' | 'dark'>(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  const resolved = useMemo<'light' | 'dark'>(() => {
    if (theme === 'light') return 'light'
    if (theme === 'dark') return 'dark'
    return systemPref
  }, [theme, systemPref])

  useEffect(() => {
    saveToStorage(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return

    const onChange = () => setSystemPref(mq.matches ? 'dark' : 'light')
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { theme, setTheme, resolved }
}

