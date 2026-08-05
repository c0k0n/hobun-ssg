# hobun: a Hono app, pre-rendered to static HTML, served on Cloudflare Pages

**Live site:** <https://hobun-ssg.pages.dev>

This is a static site, generated at build time. Every page starts life as a JSX component inside a [Hono](https://hono.dev) app and gets baked into a plain HTML file. When someone visits, Cloudflare Pages just serves files: no server-side code runs, there is zero client-side JavaScript, and the whole toolchain is Bun.

The question this project asked: how much of the modern framework stack does a simple static site actually need? The answer I landed on: almost none. Not because this is the smartest way to build a static site (there are plenty of easier and more conventional ones), but because it's the path this project took. No Vite, no bundler, no npm: one runtime dependency (`hono`), a ~20-line build script, and Bun transpiling the TSX natively. This README explains the whole thing, including the parts that were wrong along the way.

Why this repository exists: I was curious about Hono and Bun, how far two tools can go when they get a simple job and nothing else to lean on. This is a learning project, and the site is the write-up: every page doubles as a note about the tool that produced it. Most of the research was done with an AI assistant fetching the docs and the how-tos; the notes that survived are on the site and in `docs/`. If you're learning the same two tools, the page order roughly matches the order the lessons happened in.

## The stack

| Tool | Version (installed) | Role |
| --- | --- | --- |
| [Bun](https://bun.com/docs) | 1.3.14 | runtime, package manager, JSX/TSX transpiler, test runner |
| [Hono](https://hono.dev) | 4.13.0 | the app: routing, JSX rendering, middleware |
| `hono/css` | part of Hono | component-scoped CSS, deduped and emitted inline |
| `hono/bun` (`toSSG`) | part of Hono | pre-renders every route to `dist/` during the build |
| TypeScript | 7.0.2 | typechecking only (`tsc --noEmit`, nothing is compiled) |
| Wrangler | 4.118.0 | local preview via `wrangler pages dev dist` |
| Cloudflare Pages | n/a | hosting; the Git integration runs the build and serves `dist/` |

That's the whole dependency tree: `package.json` lists `hono` as the only runtime dependency, plus `wrangler`, `typescript`, and `@types/bun` for tooling. No npm/npx/pnpm anywhere; the only npm-ecosystem binary that runs at all is `wrangler`, and it's invoked through bun.

## How a request becomes a file

```
src/index.tsx  ──routes──▶  src/pages/* (JSX)  ──toSSG at build──▶  dist/*.html  ──Pages──▶  edge
     │                            │                    │
     └── served live by Bun ──────┘                    └── copied: public/_headers, favicon
```

The same app is used three different ways, and that's deliberate:

- **Dev:** `bun run --hot` serves the app directly, so routes behave exactly like production (including the security headers).
- **Preview:** `wrangler pages dev dist` serves the *built* output with real Pages semantics.
- **Production:** Pages runs `bun run build` on every push and serves `dist/` as static files.

## Project layout

```
hobun/
├── src/
│   ├── index.tsx           # the entire router: 5 pages + robots.txt + sitemap.xml + notFound
│   ├── site.ts             # SITE_URL, ROUTES (sitemap source of truth), robots.txt/sitemap text
│   ├── security.ts         # secureHeaders middleware + the CSP constant public/_headers mirrors
│   ├── dev-livereload.ts   # dev-only /__dev/hash and /__dev/livereload.js
│   ├── app.test.ts         # 17 tests, bun:test + app.request(), no extra deps
│   ├── components/         # Layout (html shell, meta, nav, footer), Card
│   ├── pages/              # Home, Features, HowItWorks, Stack, Notes, NotFound
│   └── styles/             # global.css (inlined into every page) + shared.ts (hono/css)
├── scripts/build.ts        # the whole build system: toSSG, then copy public/ into dist/
├── public/                 # favicon.ico + _headers (everything else is generated)
├── docs/                   # the reference notes (bun/hono doc indexes, security header guide)
└── package.json            # 5 scripts, 1 runtime dependency
```

## Commands

```sh
bun install            # install dependencies (bun.lock is committed)
bun run dev            # serve the app on :3000; server hot-reload + browser auto-refresh
bun run build          # pre-render every route to static files in dist/
bun test               # 17 tests against the app itself (bun:test, zero extra deps)
bun run typecheck      # tsc --noEmit
bun run preview        # serve dist/ with Pages semantics (wrangler pages dev dist)
```

## The dev loop: Bun's `--hot` plus a hand-rolled live reload

`bun run dev` runs `NODE_ENV=development bun run --hot src/index.tsx`. Bun sees that the default export has a `fetch` method and serves it. `--hot` re-evaluates the app on file changes, but, as [Bun's own watch-mode docs](https://bun.com/docs/runtime/watch-mode) put it, that's the *server-side* equivalent of hot reloading. It does not push anything to the browser.

So the browser half is hand-rolled: `Layout` injects `<script src="/__dev/livereload.js">` (a real file served from the app, no inline code, so the strict CSP holds even in dev). That script polls `/__dev/hash` every 400 ms; the endpoint sums the mtimes of every file under `src/`, and when the sum changes after a save, the page reloads. Crude, but it works and it's ~15 lines of code.

Both `/__dev/*` routes are registered only when `NODE_ENV=development` (`src/site.ts` reads the env var, `src/index.tsx` gates on it). Nothing dev-related exists in the production build; a grep of the built HTML for `__dev` finds zero hits, and a test asserts the routes 404 outside dev.

## The build: `toSSG` and the CSS story

`scripts/build.ts` is the whole build system:

1. `rmSync(dist)`: always start clean.
2. `toSSG(app, { dir: dist })` from `hono/bun`: walks every registered route, runs it through the app, writes one real file per route.
3. `cpSync(public, dist)`: copies the only static assets, the favicon and `_headers`.

Bun transpiles the TSX at runtime, so there is no compile step and no bundler in the pipeline. The output after `bun run build` is exactly what Pages serves:

```
dist/
├── 404.html
├── index.html
├── features.html
├── how-it-works.html
├── stack.html
├── notes.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
└── _headers
```

The CSS part is worth understanding. `hono/css` gives every component a stable class name and dedupes styles at render time, so each page ships only the CSS it actually used. It's checkable in the build output: `dist/404.html` contains a strict subset of the class names in `dist/index.html`: the 404 page doesn't import the card grid styles, and they're absent from its HTML. True globals (the `:root` variables, reset, `body`, focus styles, `prefers-reduced-motion`) live in `src/styles/global.css` and get inlined into every page. Total runtime cost of styling: zero requests.

## Preview: what Pages will actually do

`bun run preview` uses `wrangler pages dev dist` on purpose: a plain static server would not behave like Pages. Wrangler gives the real shape locally: unmatched paths return a genuine `404` (not a 200 with an error page), `_headers` is parsed and applied, and the custom `404.html` kicks in for anything that doesn't exist. All three are checkable with curl.

## 404, handled twice

Not-found handling is layered, because dev, preview, and production each need a different half of the story:

- **Static (production + preview):** `/404` is a normal route, so `toSSG` writes `dist/404.html`, and Pages serves it for any unmatched path (Pages auto-detects a `404.html` and uses it as the custom 404 page; documented behavior, confirmed against Cloudflare's docs).
- **Dynamic (dev):** `app.notFound` returns the same styled page from the Hono app, so dev and preview both show it with a real `404` status.

The noindex story is where it gets subtle. Pages matches `_headers` rules against the *requested* URL, not against the file it ends up serving; Cloudflare's docs are explicit that rules apply to the incoming request URL. That means a `/_headers` rule can never target real unmatched paths (the request URL is something like `/this-does-not-exist`), so the `<meta name="robots" content="noindex, nofollow">` inside `404.html` is what keeps actual 404 responses out of search indexes. `X-Robots-Tag: noindex` is layered on via `_headers` for direct `/404` and `/404.html` requests, and via a tiny middleware for app-generated 404s in dev. The middleware exists because the `_headers` wildcard rule deliberately omits `X-Robots-Tag` (see below).

## robots.txt and sitemap.xml are app routes

Both files are real routes (`/robots.txt`, `/sitemap.xml` in `src/index.tsx`), not static files. Two consequences:

- Dev serves them exactly like production would, so there are no "works in prod, broken in dev" surprises.
- `toSSG` pre-renders both into `dist/` on every build, so the deployed copies can't go stale.

The sitemap is generated from the `ROUTES` array in `src/site.ts`; that's the single source of truth, not the router. Each entry carries `lastmod` (build date), `changefreq`, `priority`, and `xhtml:link` hreflang alternates (en + x-default), all built from `SITE_URL`. The current routes: `/`, `/features`, `/how-it-works`, `/stack`, `/notes`. The 404 page is deliberately not in `ROUTES`: it's marked noindex, so listing it in a sitemap would be nonsense.

## SEO and accessibility, the checklist

Every page gets, from `Layout`: a doctype, `lang="en"`, per-page `<title>` and meta description, explicit `<meta name="robots">`, `rel="canonical"` and self-referencing hreflang alternates (en + x-default) built from `SITE_URL`, Open Graph tags (title, description, type, url, site_name), and a theme-color hint. The shell has a skip link that moves focus to `<main>` (with the ring suppressed on `main` so it isn't noise), a `nav` with `aria-current="page"` on the active link, descriptive link text, `:focus-visible` outlines, in-text links underlined (so they're distinguishable without color), and a `prefers-reduced-motion` block that kills transitions and animations.

## Security headers, kept in sync from two places

Headers are applied twice, because Pages static responses and app-generated responses (dev, 404s) are produced by different machines:

- `public/_headers`: the wildcard rule covers every asset Pages serves.
- `src/security.ts`: Hono's [`secureHeaders`](https://hono.dev/docs/middleware/builtin/secure-headers) middleware for app responses.

The middleware config explicitly disables the three legacy defaults Hono ships (`X-XSS-Protection`, `X-Download-Options`, `Origin-Agent-Cluster`), so dev responses carry *exactly* the headers `_headers` defines. Verifiable by dumping the response headers from the app and diffing them against `_headers`: the CSP string, Permissions-Policy (including the camelCase → kebab-case serialization), HSTS, everything matches.

The CSP follows the [security header guide](docs/securityheadersguide.md) (the reference notes), with a stricter directive set than the guide's baseline: `default-src 'self'`, `script-src 'self'` with Trusted Types required, `style-src 'self' 'unsafe-inline'` (inline styles need it; that's the one exception), `frame-ancestors 'none'`, `upgrade-insecure-requests`, and so on. There's no `'unsafe-inline'` for scripts in any environment, which is only possible because there is no bundler injecting inline bootstrap scripts. That was the whole point of the Vite removal.

One header is intentionally not in the sync set: `X-Robots-Tag`. It's crawler guidance, not a security header, and putting it on the wildcard rule would also stamp `noindex` on every real 404 response Pages serves (headers match the requested URL, remember), contradicting the sitemap.

## Tests

`bun test` runs 17 tests against the app itself using `app.request()`; no test framework beyond `bun:test`, no supertest, nothing. The suite covers:

- every route returns 200 with expected content, unknown paths return a styled 404;
- HEAD behaves like GET without a body;
- every sitemap route is actually served by the app;
- the CSP is strict (contains `script-src 'self'`, does *not* contain `'unsafe-inline'` for scripts, requires Trusted Types), HSTS/X-Frame-Options/Referrer-Policy/COEP match the guide, no `X-Powered-By`;
- 404s carry `X-Robots-Tag: noindex, nofollow`;
- robots.txt and sitemap.xml contents;
- the dev-only routes are not registered when not in dev (bun's test runner sets `NODE_ENV=test`, so the suite runs in production shape).

## Adding a page: the full recipe

Three steps, two of which people forget:

```tsx
// 1. src/pages/LearnPage.tsx
import { Layout } from '../components/Layout'

export function LearnPage() {
  return (
    <Layout title="Learn" description="..." path="/learn">
      <h1>Learn</h1>
    </Layout>
  )
}
```

```tsx
// 2. src/index.tsx
app.get('/learn', (c) => {
  return c.html(<LearnPage />)
})
```

```ts
// 3. src/site.ts: add it to ROUTES or it won't appear in the sitemap
{ path: '/learn', changefreq: 'monthly', priority: '0.7' },
```

`path` is a required prop on `Layout`; it builds the canonical and hreflang URLs, so a page missing it would fail typecheck. `active` is optional; if you want the nav to highlight, add the page's key to the `PageKey` union in `Layout`. For dynamic routes use `ssgParams` (Next.js-style `generateStaticParams`), and for routes you never want pre-rendered, `disableSSG` (both current APIs, per [Hono's SSG docs](https://hono.dev/docs/helpers/ssg)).

## What was removed, and why

The project started as a `create-cloudflare` Workers template with a Vite pipeline, and the git history reads as a series of realizations that none of it was needed:

- **Vite 8:** its jobs (dev server, client bundling, HMR, asset hashing) are irrelevant when the output has zero client-side JavaScript. Keeping it also meant depending on plugins built against the pre-Rolldown plugin API, a compatibility risk not worth carrying.
- **`@hono/vite-ssg`:** a thin plugin that ran `toSSG` inside `vite build` so TSX got compiled. Hono ships a native Bun adapter, `toSSG(app)` from `hono/bun` writes to Bun's filesystem and Bun transpiles the TSX at runtime. `scripts/build.ts` replaced it and `vite.config.ts` together.
- **`@hono/vite-dev-server`:** ran the app inside the Vite dev server with HMR. Bun does the server half natively (`--hot`) and the small live-reload script does the browser half. Bonus: the old dev setup needed `'unsafe-inline'` in the dev CSP for Vite's HMR bootstrap; that vector is gone.
- **`@cloudflare/vite-plugin`, `wrangler.jsonc`, `worker-configuration.d.ts` (14,706 lines!), the `cf-typegen` script:** Workers bindings machinery for a site that has no bindings.
- **`bun --bun run build`:** this one used to be documented backwards. The actual history: forcing Vite onto Bun's runtime with `--bun` caused the build to *hang*: `@hono/vite-ssg` starts an internal server whose WebSocket never closes under Bun, so the process stalled after writing the files. The workaround was removing `--bun`. With Vite gone entirely, there is no internal server left to hang.

`wrangler` is the one survivor, kept only for `bun run preview`; it's the only tool that reproduces the Pages shape locally.

## Gotchas worth writing down

- **TypeScript 6/7 no longer auto-discovers `@types` packages** (per Bun's docs). Without `"types": ["bun"]` in `tsconfig.json`, `Bun` globals don't resolve.
- **Bun has no `?raw` import.** The CSS import uses `with { type: 'text' }`, with a `text-imports.d.ts` shim so TypeScript understands it.
- **`bun run build` before `--bun` hung silently.** Builds that print nothing and never exit are not failures; they're hangs, and they're the worst kind of bug.
- **Pages `_headers` matches the requested URL, not the served file.** Easy to lose a day on why a `noindex` rule can't hit real 404s.
- **`hono/css` dedupes by class at render time.** The per-page CSS scoping isn't magic; it's just that a page can't emit styles for components it never renders.

## Reference notes

`docs/` holds the working notes for this project and is gitignored on purpose: `buninfolinks.txt` and `honoinfolinks.txt` are doc indexes kept around to re-check claims like the ones above, and `securityheadersguide.md` is the research the header config is based on. If a claim here disagrees with those docs, the docs are newer than the claim.

## License

Licensed under the [MIT license](LICENSE).
