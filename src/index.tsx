import { Hono } from 'hono'
import { HomePage } from './pages/HomePage'
import { FeaturesPage } from './pages/FeaturesPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { StackPage } from './pages/StackPage'
import { NotesPage } from './pages/NotesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { securityHeaders, robotsTag } from './security'
import { isDev, ROBOTS_TXT, sitemapXml } from './site'
import { registerDevRoutes } from './dev-livereload'

const app = new Hono()

app.use('*', securityHeaders, robotsTag)

app.get('/', (c) => {
  return c.html(<HomePage />)
})

app.get('/features', (c) => {
  return c.html(<FeaturesPage />)
})

app.get('/how-it-works', (c) => {
  return c.html(<HowItWorksPage />)
})

app.get('/stack', (c) => {
  return c.html(<StackPage />)
})

app.get('/notes', (c) => {
  return c.html(<NotesPage />)
})

app.get('/404', (c) => {
  return c.html(<NotFoundPage />)
})

// Crawler-facing files are app routes so dev serves them exactly like
// production. toSSG pre-renders both into dist/ at build time.
app.get('/robots.txt', (c) => {
  return c.text(ROBOTS_TXT)
})

app.get('/sitemap.xml', (c) => {
  return c.text(sitemapXml(), 200, { 'Content-Type': 'application/xml; charset=utf-8' })
})

app.notFound((c) => {
  return c.html(<NotFoundPage />, 404)
})

if (isDev) {
  registerDevRoutes(app)
}

export default app
