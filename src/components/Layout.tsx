import type { Child } from 'hono/jsx'
import { html } from 'hono/html'
import { css, cx, Style } from 'hono/css'
import globalCss from '../styles/global.css?raw'
import { canonicalUrl } from '../site'

type LayoutProps = {
  title: string
  description: string
  active: 'home' | 'about'
  path: string
  children: Child
}

const header = css`
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  background: rgba(11, 13, 18, 0.72);
  border-bottom: 1px solid var(--border);
  z-index: 10;
`

const headerInner = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 14px;
`

const brand = css`
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
`

const brandAccent = css`
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

const navList = css`
  display: flex;
  gap: 4px;
  padding: 0;
  list-style: none;
`

const navLink = css`
  display: inline-block;
  color: var(--muted);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.92rem;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover,
  &[aria-current='page'] {
    color: var(--text);
    background: rgba(255, 255, 255, 0.06);
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
  border-radius: 0 0 8px 0;
  background: var(--accent);
  color: #fff;
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
  padding-block: 22px;
`

const footerText = css`
  color: var(--muted);
  font-size: 0.85rem;
`

export function Layout({ title, description, active, path, children }: LayoutProps) {
  const year = new Date().getFullYear()
  return (
    <>
      {html`<!doctype html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl(path)} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
          <title>{title}</title>
          <style>{globalCss}</style>
          <Style />
        </head>
        <body>
          <a class={skipLink} href="#main">
            Skip to main content
          </a>
          <header>
            <div class={cx('container', headerInner)}>
              <a class={brand} href="/">
                clworkers<span class={brandAccent}>vite</span>
              </a>
              <nav aria-label="Primary">
                <ul class={navList}>
                  <li>
                    <a class={navLink} href="/" aria-current={active === 'home' ? 'page' : undefined}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a class={navLink} href="/about" aria-current={active === 'about' ? 'page' : undefined}>
                      About
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer>
            <div class="container">
              <p class={footerText}>
                &copy; {year} clworkersvite &middot; <a href="https://hono.dev">Visit the Hono website</a>
              </p>
            </div>
          </footer>
        </body>
      </html>
    </>
  )
}