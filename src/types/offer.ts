export type OfferCategory =
  | 'Earn Crypto'
  | 'Claim Free'
  | 'Passive Income'
  | 'Play and Earn'
  | 'Free Spins'

export type PayoutMethod =
  | 'FaucetPay'
  | 'Cwallet'
  | 'Binance'
  | 'Solflare'
  | 'Crypto wallet'

export type OfferTag =
  | 'TOP'
  | 'HOT'
  | 'NEW'
  | 'FAST PAY'
  | 'BONUS'
  | 'GIFT'
  | 'AIRDROP'

export type Offer = {
  id: string
  name: string
  tagline: string
  category: OfferCategory
  tags: OfferTag[]
  minWithdrawUsd?: number
  payouts: PayoutMethod[]
  cadence?: string
  highlights: string[]
  ctaLabel: string
  ctaUrl: string
  accent?: 'violet' | 'emerald' | 'amber' | 'sky' | 'rose'
  verified?: boolean
}

