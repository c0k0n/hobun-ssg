import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { cards, chip, eyebrow, grad, hero, lead, section, sectionLead, sectionTitle, title } from '../styles/shared'

export function FeaturesPage() {
  return (
    <Layout
      title="Features — hobun"
      description="Everything this site does on purpose: pure SSG, scoped CSS, strict security headers, layered 404s, and more."
      active="features"
      path="/features"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>What's inside</p>
        <h1 class={title}>
          Nothing here by <span class={grad}>accident</span>
        </h1>
        <p class={lead}>
          Every feature on this site is a lesson from learning Hono and Bun. Most exist because the
          default toolchain got in the way of something first.
        </p>
      </section>
      <section class={cx(section, 'container')} aria-label="Feature list">
        <h2 class={sectionTitle}>The feature list</h2>
        <p class={sectionLead}>Each one is small. Together they are the whole project.</p>
        <div class={cards}>
          <Card title="Pure static site generation">
            <p>
              <code class={chip}>toSSG</code> walks the registered routes at build time and writes one
              real HTML file per route — <code class={chip}>/404</code> becomes{' '}
              <code class={chip}>404.html</code>.
            </p>
          </Card>
          <Card title="Zero client-side JavaScript">
            <p>
              No bundler, no hydration, no inline bootstrap script. The strict CSP isn't a compromise
              — there is nothing to exempt.
            </p>
          </Card>
          <Card title="CSS scoped per page">
            <p>
              hono/css collects styles at render time and emits them inline, so each page ships only
              what it uses. The 404 page has none of the home page's styles — that's checkable in
              <code class={chip}>dist/404.html</code>.
            </p>
          </Card>
          <Card title="Live reload without Vite">
            <p>
              <code class={chip}>bun --hot</code> reloads the server; a ~15-line script polls a hash
              endpoint and reloads the browser. Both are dev-only.
            </p>
          </Card>
          <Card title="404s that behave">
            <p>
              <code class={chip}>404.html</code> catches every unmatched path on Pages, and{' '}
              <code class={chip}>app.notFound</code> returns the same styled page in dev. Both are
              marked noindex.
            </p>
          </Card>
          <Card title="robots.txt and sitemap.xml as routes">
            <p>
              Served in dev exactly like production, pre-rendered at build, and generated from one
              <code class={chip}>ROUTES</code> array that can't go stale.
            </p>
          </Card>
          <Card title="Security headers, twice">
            <p>
              <code class={chip}>public/_headers</code> covers static assets; Hono's{' '}
              <code class={chip}>secureHeaders</code> covers app responses. The two are kept
              byte-identical.
            </p>
          </Card>
          <Card title="Tests without a framework">
            <p>
              16 tests using <code class={chip}>bun:test</code> and the app's own{' '}
              <code class={chip}>request()</code> — no supertest, no test doubles, no extra
              dependencies.
            </p>
          </Card>
        </div>
      </section>
    </Layout>
  )
}
