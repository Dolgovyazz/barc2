// Canonical site origin, used for metadata / OG / sitemap / robots.
// On Vercel, VERCEL_PROJECT_PRODUCTION_URL is the production domain (or the
// custom domain if one is assigned). Override with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')
