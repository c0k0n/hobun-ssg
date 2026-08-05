import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import {
  codeLine,
  eyebrow,
  grad,
  hero,
  lead,
  section,
  step,
  stepNum,
  steps,
  stepText,
  stepTitle,
  title,
} from '../styles/shared'

export function HowItWorksPage() {
  return (
    <Layout
      title="How it works | hobun"
      description="The same Hono app lives four lives: dev, build, preview, and deploy. Here is each one."
      active="how-it-works"
      path="/how-it-works"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>How it works</p>
        <h1 class={title}>
          One app, <span class={grad}>four lives</span>
        </h1>
        <p class={lead}>
          The same Hono app drives development, the build, the preview, and the deployed site: four
          roles, learned one piece at a time.
        </p>
      </section>
      <section class={cx(section, 'container')} aria-label="Pipeline stages">
        <ol class={steps}>
          <li class={step}>
            <span class={stepNum}>01 · Dev</span>
            <h2 class={stepTitle}>Bun serves the app directly</h2>
            <p class={stepText}>
              <code class={codeLine}>bun run dev</code>
            </p>
            <p class={stepText}>
              Bun detects the app's <code>fetch</code> and serves it. <code>--hot</code> re-evaluates
              the code on every save, and a small script polls a hash endpoint to reload the browser.
              Dev behaves like production: same routes, same security headers.
            </p>
          </li>
          <li class={step}>
            <span class={stepNum}>02 · Build</span>
            <h2 class={stepTitle}>toSSG bakes every route to a file</h2>
            <p class={stepText}>
              <code class={codeLine}>bun run build</code>
            </p>
            <p class={stepText}>
              <code>scripts/build.ts</code> clears <code>dist/</code>, runs{' '}
              <code>toSSG</code> from <code>hono/bun</code>, and copies <code>public/</code> over.
              Bun transpiles the TSX at runtime; there is no compile step and no bundler.
            </p>
          </li>
          <li class={step}>
            <span class={stepNum}>03 · Preview</span>
            <h2 class={stepTitle}>Wrangler reproduces the Pages shape</h2>
            <p class={stepText}>
              <code class={codeLine}>bun run preview</code>
            </p>
            <p class={stepText}>
              <code>wrangler pages dev dist</code> is the only tool that serves the built output with
              real Pages semantics: genuine 404s, <code>_headers</code> applied, the 404.html
              fallback working.
            </p>
          </li>
          <li class={step}>
            <span class={stepNum}>04 · Deploy</span>
            <h2 class={stepTitle}>Pages runs the build and serves the files</h2>
            <p class={stepText}>
              <code class={codeLine}>git push</code>
            </p>
            <p class={stepText}>
              Cloudflare Pages' Git integration runs <code>bun run build</code> on every push and
              serves <code>dist/</code> from the edge. Pages understands <code>_headers</code> and{' '}
              <code>404.html</code> natively; nothing else is needed.
            </p>
          </li>
        </ol>
      </section>
    </Layout>
  )
}
