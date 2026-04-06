export function safeJsonParse<T>(value: string | null): T | undefined {
  if (!value) return undefined
  try {
    return JSON.parse(value) as T
  } catch {
    return undefined
  }
}

export function loadFromStorage<T>(key: string): T | undefined {
  if (typeof window === 'undefined') return undefined
  return safeJsonParse<T>(window.localStorage.getItem(key))
}

export function saveToStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

