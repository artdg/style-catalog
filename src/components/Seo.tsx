import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

export type SeoProps = {
  title: string
  description?: string
  imagePath?: string
  canonicalPath?: string
}

function baseUrl() {
  // In production set VITE_SITE_URL (e.g. https://your-domain.com)
  return (import.meta.env.VITE_SITE_URL as string | undefined) ?? ''
}

function toAbs(urlOrPath: string | undefined) {
  if (!urlOrPath) return undefined
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath
  const b = baseUrl()
  if (!b) return urlOrPath
  return new URL(urlOrPath, b).toString()
}

export function Seo({ title, description, imagePath = '/og.svg', canonicalPath }: SeoProps) {
  const loc = useLocation()
  const canonical = canonicalPath ?? loc.pathname
  const absCanonical = toAbs(canonical)
  const absImage = toAbs(imagePath)

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {absCanonical ? <link rel="canonical" href={absCanonical} /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      {absCanonical ? <meta property="og:url" content={absCanonical} /> : null}
      {absImage ? <meta property="og:image" content={absImage} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      {absImage ? <meta name="twitter:image" content={absImage} /> : null}
    </Helmet>
  )
}

