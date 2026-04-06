import { useCallback, useMemo, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../lib/storage'

const STORAGE_KEY = 'exma-clone.favorites'

type FavoritesState = Record<string, true>

export function useFavorites() {
  const [fav, setFav] = useState<FavoritesState>(() => loadFromStorage<FavoritesState>(STORAGE_KEY) ?? {})

  const isFavorite = useCallback((id: string) => Boolean(fav[id]), [fav])

  const toggleFavorite = useCallback((id: string) => {
    setFav((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = true
      saveToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const ids = useMemo(() => Object.keys(fav), [fav])

  return { ids, isFavorite, toggleFavorite }
}

