import { cloudflare } from '@cloudflare/vite-plugin'
import ssg from '@hono/vite-ssg'
import { defineConfig, type Plugin } from 'vite'
import { SITE_URL, ROUTES, canonicalUrl } from './src/site'

function sitemap(): Plugin {
  return {
    name: 'clworkersvite-sitemap',
    apply: 'build',
    generateBundle() {
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
          '  </url>'
        ].join('\n')
      }).join('\n')
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        urls,
        '</urlset>',
        ''
      ].join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    }
  }
}

export default defineConfig(({ command, isPreview }) => ({
  appType: 'mpa',
  plugins: [
    // @hono/vite-ssg is `apply: "build"` only — inert during serve/preview.
    // It pre-renders every route to static HTML in dist/ during `vite build`.
    isPreview ? null : ssg(),
    // Emits dist/sitemap.xml from src/site.ts after every production build.
    sitemap(),
    // Dev only: serves the Hono app live in workerd with HMR. Disabled for
    // build (SSG handles it) and preview (use `bun run preview` -> wrangler dev).
    command === 'serve' && !isPreview ? cloudflare() : null
  ]
}))