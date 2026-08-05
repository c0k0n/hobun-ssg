import { describe, expect, test } from 'bun:test'
import { join } from 'node:path'
import app from './index.tsx'
import { ROUTES, SITE_URL } from './site.ts'
import { CONTENT_SECURITY_POLICY } from './security.ts'

// Run with `bun test`. Uses Hono's app.request() and Bun's test runner;
// no extra dependencies. bun test sets NODE_ENV=test, so the app is in
// production shape: dev-only routes (/__dev/*) must not be registered.

describe('routes', () => {
  test('home returns 200 with expected content', async () => {
    const res = await app.request('http://localhost/')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('wanted to learn')
  })

  test('features returns 200 with expected content', async () => {
    const res = await app.request('http://localhost/features')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('Nothing here by')
  })

  test('how-it-works returns 200 with expected content', async () => {
    const res = await app.request('http://localhost/how-it-works')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('One app,')
  })

  test('stack returns 200 with expected content', async () => {
    const res = await app.request('http://localhost/stack')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('set out to')
  })

  test('notes returns 200 with expected content', async () => {
    const res = await app.request('http://localhost/notes')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('went wrong')
  })

  test('/404 pre-renders the not-found page', async () => {
    const res = await app.request('http://localhost/404')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('Page not found')
  })

  test('unknown path returns 404 with the styled page', async () => {
    const res = await app.request('http://localhost/does-not-exist')
    expect(res.status).toBe(404)
    expect(await res.text()).toContain('Page not found')
  })

  test('every sitemap route is served by the app', async () => {
    for (const route of ROUTES) {
      const res = await app.request(`http://localhost${route.path}`)
      expect(res.status).toBe(200)
    }
  })

  test('HEAD behaves like GET without a body', async () => {
    const getRes = await app.request('http://localhost/')
    const headRes = await app.request('http://localhost/', { method: 'HEAD' })
    expect(headRes.status).toBe(getRes.status)
    expect(headRes.headers.get('Content-Type')).toBe(getRes.headers.get('Content-Type'))
    expect(headRes.body).toBeNull()
  })
})

describe('security headers', () => {
  test('CSP is strict in every environment', async () => {
    const csp = (await app.request('http://localhost/')).headers.get('Content-Security-Policy') ?? ''
    expect(csp).toContain("script-src 'self'")
    expect(csp).not.toContain("script-src 'self' 'unsafe-inline'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain('require-trusted-types-for')
  })

  test('HSTS and X-Frame-Options follow the security guide', async () => {
    const res = await app.request('http://localhost/')
    expect(res.headers.get('Strict-Transport-Security')).toBe('max-age=63072000; includeSubDomains')
    expect(res.headers.get('X-Frame-Options')).toBe('DENY')
    expect(res.headers.get('Referrer-Policy')).toBe('no-referrer')
    expect(res.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp')
  })

  test('no X-Powered-By disclosure', async () => {
    const res = await app.request('http://localhost/')
    expect(res.headers.get('X-Powered-By')).toBeNull()
  })

  test('404 carries X-Robots-Tag noindex', async () => {
    const res = await app.request('http://localhost/nope')
    expect(res.status).toBe(404)
    expect(res.headers.get('X-Robots-Tag')).toBe('noindex, nofollow')
  })

  test('public/_headers stays in sync with src/security.ts', async () => {
    const headersFile = await Bun.file(join(import.meta.dir, '../public/_headers')).text()
    const line = (name: string) =>
      headersFile.split('\n').find((l) => l.startsWith(`  ${name}: `))
    expect(line('Content-Security-Policy')?.slice('  Content-Security-Policy: '.length)).toBe(
      CONTENT_SECURITY_POLICY
    )
    const res = await app.request('http://localhost/')
    expect(
      line('Strict-Transport-Security')?.slice('  Strict-Transport-Security: '.length)
    ).toBe(res.headers.get('Strict-Transport-Security') ?? '')
  })
})

describe('crawler files', () => {
  test('robots.txt allows crawling and lists the sitemap', async () => {
    const res = await app.request('http://localhost/robots.txt')
    expect(res.status).toBe(200)
    const body = await res.text()
    expect(body).toContain('User-agent: *')
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })

  test('sitemap.xml lists every route with canonical URLs', async () => {
    const res = await app.request('http://localhost/sitemap.xml')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('application/xml')
    const xml = await res.text()
    expect(xml).toContain(`<loc>${SITE_URL}/</loc>`)
    expect(xml).toContain(`<loc>${SITE_URL}/features</loc>`)
    expect(xml).toContain(`<loc>${SITE_URL}/notes</loc>`)
  })
})

describe('dev-only features', () => {
  test('live-reload routes are not registered outside development', async () => {
    const hash = await app.request('http://localhost/__dev/hash')
    const script = await app.request('http://localhost/__dev/livereload.js')
    expect(hash.status).toBe(404)
    expect(script.status).toBe(404)
  })
})
