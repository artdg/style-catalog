import { offers } from '../data/offers'

export function useOffersStore() {
  // Compatibility shim: keep old call sites working.
  // All offers are now defined in code (static content).
  const byId = new Map(offers.map((o) => [o.id, o] as const))
  return { offers, byId }
}

