import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { btn, cards, eyebrow, grad, hero, lead, pipeline, title } from '../styles/shared'

export function HomePage() {
  return (
    <Layout
      title="hobun — Pure SSG"
      description="A static site pre-rendered from a Hono app and served on Cloudflare's edge."
      active="home"
      path="/"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>Static Site Generation</p>
        <h1 class={title}>
          Hello! This page was pre-rendered to <span class={grad}>static HTML</span> at build time.
        </h1>
        <p class={lead}>No server-side code runs when you visit — just files on Cloudflare's edge, planetwide.</p>
        <ul class={pipeline} aria-label="Build pipeline">
          <li>src/</li>
          <li>dist/</li>
          <li>edge</li>
        </ul>
        <a class={btn} href="/about">
          Read how this site is built
        </a>
      </section>
      <section class={cx(cards, 'container')} aria-label="Highlights">
        <Card title="Hono renders">
          <p>
            <code>toSSG</code> walks your routes at build time and writes one real HTML file per page.
          </p>
        </Card>
        <Card title="CSS scoped">
          <p>
            Styles are scoped per page with <code>hono/css</code> and only included where they are used.
          </p>
        </Card>
      </section>
    </Layout>
  )
}