import { Hono } from 'hono'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { securityHeaders, robotsTag } from './security'

const app = new Hono()

app.use('*', securityHeaders, robotsTag)

app.get('/', (c) => {
  return c.html(<HomePage />)
})

app.get('/about', (c) => {
  return c.html(<AboutPage />)
})

app.get('/404', (c) => {
  return c.html(<NotFoundPage />)
})

app.notFound((c) => {
  return c.html(<NotFoundPage />, 404)
})

export default app