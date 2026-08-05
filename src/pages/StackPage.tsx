import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { eyebrow, grad, hero, lead, note, section, stackDesc, stackRole, stackRow, stackTitle, title } from '../styles/shared'

const TOOLS = [
  {
    name: 'Bun',
    role: 'runtime, package manager, transpiler, test runner',
    desc: 'Bun transpiles the TSX, serves the dev server, runs the build, and runs the tests. No Node, no npm, no separate compiler.',
    href: 'https://bun.com/docs',
    label: 'bun.com/docs',
  },
  {
    name: 'Hono',
    role: 'the app itself',
    desc: 'Routing, JSX rendering, middleware, and the SSG helper that bakes every route to a static file. The only runtime dependency in package.json.',
    href: 'https://hono.dev',
    label: 'hono.dev',
  },
  {
    name: 'Hono on Bun',
    role: 'the guide this project effectively starts from',
    desc: 'The official getting-started page shows a Hono app running on Bun — roughly the first four lines of this repository.',
    href: 'https://hono.dev/docs/getting-started/bun',
    label: 'hono.dev/docs/getting-started/bun',
  },
  {
    name: 'hono/css',
    role: 'scoped styles, emitted inline',
    desc: 'A css template literal that returns a stable class name; the <Style /> component collects the styles and prints them once per page.',
    href: 'https://hono.dev/docs/helpers/css',
    label: 'hono.dev/docs/helpers/css',
  },
  {
    name: 'Cloudflare Pages',
    role: 'the host',
    desc: 'The Git integration runs the build on every push and serves the output from the edge. It understands _headers and 404.html natively.',
    href: 'https://developers.cloudflare.com/pages/',
    label: 'developers.cloudflare.com/pages',
  },
  {
    name: 'Wrangler',
    role: 'the local stand-in for Pages',
    desc: 'wrangler pages dev is the only tool that reproduces the Pages shape on a laptop — real 404s, headers applied, custom 404 page working.',
    href: 'https://developers.cloudflare.com/workers/wrangler/',
    label: 'developers.cloudflare.com/workers/wrangler',
  },
]

export function StackPage() {
  return (
    <Layout
      title="Stack — hobun"
      description="Bun, Hono, and Cloudflare Pages — the tools this learning project is about, with links to their docs."
      active="stack"
      path="/stack"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>The stack</p>
        <h1 class={title}>
          What I set out to <span class={grad}>learn</span>
        </h1>
        <p class={lead}>
          Two tools and a host: Bun, Hono, and Cloudflare Pages. Nothing here is exotic — each one
          does the part it is best at. Click any row for its docs.
        </p>
        <p class={note}>
          There are easier stacks, and there are fancier ones. This one taught the most per line of
          configuration.
        </p>
      </section>
      <section class={cx(section, 'container')} aria-label="The tools">
        {TOOLS.map((tool) => (
          <a
            key={tool.name}
            class={stackRow}
            href={tool.href}
            target="_blank"
            rel="noreferrer"
          >
            <span class={stackTitle}>{tool.name}</span>
            <span class={stackRole}>{tool.role}</span>
            <span class={stackDesc}>{tool.desc}</span>
            <span class={stackRole}>{tool.label} &rarr;</span>
          </a>
        ))}
      </section>
    </Layout>
  )
}
