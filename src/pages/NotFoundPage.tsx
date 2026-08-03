import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { btn, eyebrow, grad, hero, notfoundTitle, title, lead } from '../styles/shared'

export function NotFoundPage() {
  return (
    <Layout
      title="Page not found — clworkersvite"
      description="The page you are looking for does not exist."
      active="home"
      path="/404"
      robots="noindex, nofollow"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>Error 404</p>
        <h1 class={cx(title, notfoundTitle)}>
          Page <span class={grad}>not found</span>
        </h1>
        <p class={lead}>The page you&rsquo;re looking for doesn&rsquo;t exist — it may have moved.</p>
        <a class={btn} href="/">
          Return to the home page
        </a>
      </section>
    </Layout>
  )
}