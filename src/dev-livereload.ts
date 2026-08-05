import type { Hono } from 'hono'
import { Glob } from 'bun'

// Dev-only live reload. `bun run --hot` re-executes the server on file
// changes (that is all it promises; see bun.com/docs/runtime/watch-mode),
// but nothing pushes that to the browser. This restores the Vite-era
// auto-refresh with zero dependencies:
//
//   - Layout injects <script src="/__dev/livereload.js"> in dev only.
//   - The script polls /__dev/hash; the endpoint sums the mtimes of every
//     file under src/ on each request. When a save changes the sum, the
//     script reloads the page (~400ms after saving).
//
// It is strict-CSP compliant: the script is served as 'self' (no inline
// code, no Trusted Types violations) and both routes are only registered
// when NODE_ENV=development, so nothing ships in the SSG build.

const SRC_DIR = import.meta.dir

const LIVERELOAD_JS = `(() => {
  let last = null
  async function tick() {
    try {
      const res = await fetch('/__dev/hash', { cache: 'no-store' })
      const hash = await res.text()
      if (last !== null && hash !== last) location.reload()
      last = hash
    } catch {
      // Server mid-restart; the next tick will succeed.
    }
    setTimeout(tick, 400)
  }
  tick()
})()`

function sourceHash(): string {
  let sum = 0
  const files = new Glob('**/*').scanSync({ cwd: SRC_DIR, onlyFiles: true })
  for (const name of files) {
    sum += Math.round(Bun.file(`${SRC_DIR}/${name}`).lastModified)
  }
  return sum.toString(36)
}

export function registerDevRoutes(app: Hono): void {
  app.get('/__dev/hash', (c) => {
    return c.text(sourceHash(), 200, { 'Cache-Control': 'no-store' })
  })
  app.get('/__dev/livereload.js', (c) => {
    return c.text(LIVERELOAD_JS, 200, {
      'Content-Type': 'text/javascript; charset=utf-8',
      'Cache-Control': 'no-store',
    })
  })
}
