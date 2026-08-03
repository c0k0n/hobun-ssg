import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { cards, eyebrow, hero, lead, title } from '../styles/shared'

export function AboutPage() {
  return (
    <Layout
      title="About — clworkersvite"
      description="How this static site is built with Hono, Vite, and Cloudflare."
      active="about"
      path="/about"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>About</p>
        <h1 class={title}>Built on three layers</h1>
        <p class={lead}>Each tool plays one small role, and the output is plain HTML you can host anywhere.</p>
      </section>
      <section class={cx(cards, 'container')} aria-label="Technology stack">
        <Card title="Hono + hono/jsx">
          <p>
            Pages are written as JSX components and rendered server-side during the build.
          </p>
        </Card>
        <Card title="@hono/vite-ssg">
          <p>
            The official Vite plugin that runs <code>toSSG</code> as part of <code>vite build</code>.
          </p>
        </Card>
        <Card title="Workers Static Assets">
          <p>
            <code>wrangler deploy</code> uploads <code>dist/</code> to Cloudflare&rsquo;s edge CDN.
          </p>
        </Card>
      </section>
    </Layout>
  )
}