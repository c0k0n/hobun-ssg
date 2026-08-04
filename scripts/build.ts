import { toSSG } from 'hono/bun'
import { cpSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import app from '../src/index.tsx'

// Pre-render every route to static HTML in dist/. Run by `bun run build`;
// Bun transpiles the TSX natively, so there is no separate compile step.
// Routes served by the app (pages, /robots.txt, /sitemap.xml) are all
// emitted here by toSSG. Paths are anchored to this file so the script
// works regardless of the working directory.
const root = join(import.meta.dir, '..')
const dist = join(root, 'dist')

rmSync(dist, { recursive: true, force: true })

const result = await toSSG(app, { dir: dist })
if (!result.success) {
  throw result.error ?? new Error('toSSG failed')
}

// Copy the static assets Pages needs next to the pre-rendered HTML.
cpSync(join(root, 'public'), dist, { recursive: true })
