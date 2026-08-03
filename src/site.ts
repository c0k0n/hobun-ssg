export const SITE_URL = 'https://clworkersvite.pages.dev'

export type SiteRoute = {
  path: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
}

export const ROUTES: SiteRoute[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
]

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '/' : path}`
}