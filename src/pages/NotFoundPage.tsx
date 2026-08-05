import { cx } from 'hono/css'
import { Layout } from '../components/Layout'
import { btn, eyebrow, grad, hero, lead, notfoundTitle, title } from '../styles/shared'

export function NotFoundPage() {
  return (
    <Layout
      title="Page not found | hobun"
      description="The page you are looking for does not exist."
      path="/404"
      robots="noindex, nofollow"
    >
      <section class={cx(hero, 'container')}>
        <p class={eyebrow}>Error 404</p>
        <h1 class={cx(title, notfoundTitle)}>
          Page <span class={grad}>not found</span>
        </h1>
        <p class={lead}>The page you&rsquo;re looking for doesn&rsquo;t exist. It may have moved.</p>
        <a class={btn} href="/">
          Return to the home page
        </a>
      </section>
    </Layout>
  )
}
