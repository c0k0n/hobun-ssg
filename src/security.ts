import type { MiddlewareHandler } from 'hono'

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
  "require-trusted-types-for 'script'",
].join('; ')

export const securityHeaders: MiddlewareHandler = async (c, next) => {
  await next()
  const res = c.res
  res.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY)
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
}