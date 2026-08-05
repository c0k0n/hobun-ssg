export const SITE_URL = 'https://hobun-ssg.pages.dev'

export const ROBOTS_INDEX = 'index, follow, max-image-preview:large'

// Dev-mode detection for the Hono app itself. `bun run dev` sets
// NODE_ENV=development; the SSG build leaves it unset, so dev-only routes
// (live reload) never reach dist/.
export const isDev = process.env.NODE_ENV === 'development'

// Served as /robots.txt in dev and pre-rendered to dist/robots.txt by toSSG.
// Every page carries an explicit <meta name="robots"> and the 404 page is
// marked noindex, so the sitemap is the single source of truth.
export const ROBOTS_TXT = `# robots.txt for hobun
# Served by the Hono app and pre-rendered into dist/ at build time.

# Allow all crawlers to read the entire site.
User-agent: *
Allow: /

# Explicit policies for the major search engines (all permissive).
# The site has no private paths; if you add any, add Disallow rules here.
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# Every page carries an explicit <meta name="robots"> and the 404 page is
# marked noindex, so the sitemap below is the single source of truth.
Sitemap: ${SITE_URL}/sitemap.xml
`

export type SiteRoute = {
  path: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
}

export const ROUTES: SiteRoute[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/features', changefreq: 'monthly', priority: '0.9' },
  { path: '/how-it-works', changefreq: 'monthly', priority: '0.8' },
  { path: '/stack', changefreq: 'monthly', priority: '0.8' },
  { path: '/notes', changefreq: 'monthly', priority: '0.7' },
]

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '/' : path}`
}

// Sitemap XML generated from ROUTES, so it stays in sync with your routes.
// Served as /sitemap.xml in dev and pre-rendered to dist/sitemap.xml by toSSG.
export function sitemapXml(): string {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ROUTES.map((route) => {
    const loc = canonicalUrl(route.path)
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`,
      '  </url>',
    ].join('\n')
  }).join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}