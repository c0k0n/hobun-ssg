import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { eyebrow, grad, hero, lead, note, noteCard, noteText, noteTitle, section, title } from '../styles/shared'

const NOTES = [
  {
    title: 'TypeScript 6/7 stopped auto-discovering @types',
    text: 'Per Bun\u2019s docs, TypeScript 6 and 7 no longer auto-discover @types packages. Without "types": ["bun"] in tsconfig.json, the Bun globals don\u2019t resolve at all.',
  },
  {
    title: 'Bun has no ?raw import',
    text: 'The CSS file comes in with with { type: \u201ctext\u201d }, backed by a declaration shim so TypeScript understands it. Vite\u2019s ?raw trick has no direct equivalent.',
  },
  {
    title: 'A silent hang is the worst build bug',
    text: 'bun --bun run build used to never exit: @hono/vite-ssg starts an internal server whose WebSocket never closes under Bun. A build that prints nothing and doesn\u2019t finish is a hang, not a success.',
  },
  {
    title: 'Pages matches _headers against the requested URL',
    text: 'A noindex rule can never hit real unmatched paths, because the rule sees the requested URL, not the 404.html file that gets served. The meta tag has to carry that job.',
  },
  {
    title: 'CSS scoping isn\u2019t magic',
    text: 'hono/css dedupes by class name at render time. A page only ships the styles of the components it actually rendered \u2014 which is why the 404 page has none of the home page\u2019s styles.',
  },
]

export function NotesPage() {
  return (
    <Layout
      title="Notes — hobun"
      description="The things this project taught, mostly by breaking: TypeScript 7, Bun imports, silent build hangs, Pages _headers, and hono/css."
      active="notes"
      path="/notes"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>Notes</p>
        <h1 class={title}>
          Learned the <span class={grad}>hard way</span>
        </h1>
        <p class={lead}>
          The interesting parts of this project are the mistakes. These are the ones worth writing
          down.
        </p>
      </section>
      <section class={cx(section, 'container')} aria-label="Lessons learned">
        {NOTES.map((item) => (
          <article class={noteCard} key={item.title}>
            <h2 class={noteTitle}>{item.title}</h2>
            <p class={noteText}>{item.text}</p>
          </article>
        ))}
        <p class={note}>None of this is groundbreaking. All of it was new to the person who built it.</p>
      </section>
    </Layout>
  )
}
