import { cloudflare } from '@cloudflare/vite-plugin'
import ssg from '@hono/vite-ssg'
import { defineConfig } from 'vite'

export default defineConfig(({ command, isPreview }) => ({
  appType: 'mpa',
  plugins: [
    // @hono/vite-ssg is `apply: "build"` only — inert during serve/preview.
    // It pre-renders every route to static HTML in dist/ during `vite build`.
    isPreview ? null : ssg(),
    // Dev only: serves the Hono app live in workerd with HMR. Disabled for
    // build (SSG handles it) and preview (use `bun run preview` -> wrangler dev).
    command === 'serve' && !isPreview ? cloudflare() : null
  ]
}))