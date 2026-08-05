import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import {
  actions,
  btn,
  btnGhost,
  cardLink,
  cards,
  eyebrow,
  grad,
  heroHome,
  lead,
  note,
  pipeline,
  section,
  sectionTitle,
  title,
} from '../styles/shared'

export function HomePage() {
  return (
    <Layout
      title="hobun | learning Hono and Bun"
      description="A learning project: Hono and Bun, pre-rendered to static HTML and served from Cloudflare Pages. The site is the write-up."
      active="home"
      path="/"
    >
      <section class={cx(heroHome, 'container')}>
        <p class={eyebrow}>Learning Hono &amp; Bun</p>
        <h1 class={title}>
          I wanted to learn <span class={grad}>Hono and Bun</span>. So I built this site with them.
        </h1>
        <p class={lead}>
          This is a learning project that doubles as its own write-up: a static site pre-rendered
          from a Hono app and served from Cloudflare Pages, with each step explained on the pages
          themselves.
        </p>
        <p class={note}>
          There are simpler and more conventional ways to reach the same result. This is the path
          this project took, the one that taught the most per line of configuration.
        </p>
        <ul class={pipeline} aria-label="Build pipeline">
          <li>src/</li>
          <li>toSSG</li>
          <li>dist/</li>
          <li>edge</li>
        </ul>
        <div class={actions}>
          <a class={btn} href="/features">
            What I learned
          </a>
          <a class={btnGhost} href="/how-it-works">
            How it works
          </a>
          <a class={btnGhost} href="https://github.com/c0k0n/hobun-ssg" target="_blank" rel="noreferrer">
            See the code
          </a>
        </div>
      </section>
      <section class={cx(section, 'container')} aria-label="What you will find here">
        <h2 class={sectionTitle}>What you'll find here</h2>
        <div class={cards}>
          <Card title="The tools I set out to learn">
            <p>
              Bun and Hono, used for real: routing, rendering, building, testing, deploying. Nothing
              else in the pipeline.
            </p>
            <a class={cardLink} href="/stack">
              The stack &rarr;
            </a>
          </Card>
          <Card title="The features are lessons">
            <p>
              Scoped CSS, a strict CSP, layered 404s, crawler files as routes, each one something
              the project had to figure out.
            </p>
            <a class={cardLink} href="/features">
              Features &rarr;
            </a>
          </Card>
          <Card title="What broke, written down">
            <p>
              Silent build hangs, TypeScript 7 surprises, Pages' _headers matching. The notes page
              has them all.
            </p>
            <a class={cardLink} href="/notes">
              Notes &rarr;
            </a>
          </Card>
        </div>
      </section>
    </Layout>
  )
}
