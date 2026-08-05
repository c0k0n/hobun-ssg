import type { Child } from 'hono/jsx'
import { html } from 'hono/html'
import { css, cx, Style } from 'hono/css'
import globalCss from '../styles/global.css' with { type: 'text' }
import { isDev, ROBOTS_INDEX, canonicalUrl } from '../site'

type PageKey = 'home' | 'features' | 'how-it-works' | 'stack' | 'notes'

type LayoutProps = {
  title: string
  description: string
  active?: PageKey
  path: string
  robots?: string
  children: Child
}

const NAV: { key: PageKey; label: string; href: string }[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'features', label: 'Features', href: '/features' },
  { key: 'how-it-works', label: 'How it works', href: '/how-it-works' },
  { key: 'stack', label: 'Stack', href: '/stack' },
  { key: 'notes', label: 'Notes', href: '/notes' },
]

const header = css`
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid var(--border);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  z-index: 10;
`

const headerInner = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-block: 14px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    padding-block: 12px;
  }
`

const brand = css`
  font-weight: 700;
  letter-spacing: -0.02em;
  font-size: 1.05rem;
  color: var(--text);
`

const navList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  padding: 0;
  list-style: none;
`

const navLink = css`
  display: inline-block;
  color: var(--muted);
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.15s ease, background 0.15s ease;

  @media (max-width: 640px) {
    padding: 8px 10px;
    font-size: 0.85rem;
  }

  &:hover {
    color: var(--text);
    background: var(--surface-2);
  }

  &[aria-current='page'] {
    color: var(--accent);
  }
`

const skipLink = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  padding: 12px 16px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-radius: 0 0 10px 0;
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
  z-index: 100;

  &:focus,
  &:focus-visible {
    width: auto;
    height: auto;
    clip-path: none;
    white-space: normal;
  }
`

const footer = css`
  border-top: 1px solid var(--border);
  padding-block: 26px;
`

const footerText = css`
  color: var(--muted);
  font-size: 0.85rem;

  @media (max-width: 640px) {
    text-align: center;
  }
`

export function Layout({ title, description, active, path, robots = ROBOTS_INDEX, children }: LayoutProps) {
  const year = new Date().getFullYear()
  const canonical = canonicalUrl(path)
  return (
    <>
      {html`<!doctype html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content={description} />
          <meta name="robots" content={robots} />
          <link rel="canonical" href={canonical} />
          <link rel="alternate" hreflang="en" href={canonical} />
          <link rel="alternate" hreflang="x-default" href={canonical} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonical} />
          <meta property="og:site_name" content="hobun" />
          <link rel="icon" href="/favicon.ico" />
          <title>{title}</title>
          <style>{globalCss}</style>
          <Style />
          {isDev &&
            html`<script src="/__dev/livereload.js" defer></script>`}
        </head>
        <body>
          <a class={skipLink} href="#main">
            Skip to main content
          </a>
          <header class={header}>
            <div class={cx('container', headerInner)}>
              <a class={brand} href="/" translate="no">
                hobun
              </a>
              <nav aria-label="Primary">
                <ul class={navList}>
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a
                        class={navLink}
                        href={item.href}
                        aria-current={active === item.key ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          {/* tabindex=-1 makes the skip link move focus in Safari too; the
              focus ring is suppressed on main in global.css. */}
          <main id="main" tabindex={-1}>{children}</main>
          <footer class={footer}>
            <p class={cx('container', footerText)}>
              &copy; {year} hobun &middot; built with <a href="https://hono.dev">Hono</a> on{' '}
              <a href="https://bun.com/docs">Bun</a>, hosted on{' '}
              <a href="https://developers.cloudflare.com/pages/">Cloudflare Pages</a>
              &middot; <a href="https://github.com/c0k0n/hobun-ssg">source on GitHub</a>
            </p>
          </footer>
        </body>
      </html>
    </>
  )
}
