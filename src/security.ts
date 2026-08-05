import type { MiddlewareHandler } from 'hono'
import { secureHeaders } from 'hono/secure-headers'

// Content-Security-Policy as configured by `secureHeaders` below. Kept as a
// constant so public/_headers (static assets on Pages) stays in sync with the
// middleware (app-generated responses: dev + the 404 page).
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

// Hono's official secure-headers middleware. Values follow the security
// headers guide; CSP keeps the stricter directive set (inline styles require
// style-src 'unsafe-inline'). The three deprecated/legacy defaults Hono ships
// (origin-agent-cluster, X-Download-Options, X-XSS-Protection) are disabled so
// dev responses carry exactly the headers public/_headers defines for Pages.
export const securityHeaders: MiddlewareHandler = secureHeaders({
  strictTransportSecurity: 'max-age=63072000; includeSubDomains',
  xFrameOptions: 'DENY',
  crossOriginEmbedderPolicy: 'require-corp',
  referrerPolicy: 'no-referrer',
  originAgentCluster: false,
  xDownloadOptions: false,
  xXssProtection: false,
  permissionsPolicy: {
    // ambient-light-sensor and battery are intentionally absent: Chrome no
    // longer recognizes them (the underlying APIs were removed/flag-gated),
    // and listing them logs "Unrecognized feature" warnings in the console.
    accelerometer: [],
    autoplay: [],
    camera: [],
    crossOriginIsolated: [],
    displayCapture: [],
    encryptedMedia: [],
    fullscreen: [],
    geolocation: [],
    gyroscope: [],
    keyboardMap: [],
    magnetometer: [],
    microphone: [],
    midi: [],
    payment: [],
    pictureInPicture: [],
    publickeyCredentialsGet: [],
    screenWakeLock: [],
    serial: [],
    syncXhr: [],
    usb: [],
    webShare: [],
    xrSpatialTracking: [],
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    scriptSrcAttr: ["'none'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
    upgradeInsecureRequests: [],
    requireTrustedTypesFor: ["'script'"],
  },
})

// Crawler guidance for app-generated responses. Only 404s are marked, to
// match Pages, where normal pages carry no X-Robots-Tag (see public/_headers):
// the noindex <meta> on the 404 page covers real unmatched-path 404s there.
export const robotsTag: MiddlewareHandler = async (c, next) => {
  await next()
  if (c.res.status === 404) {
    c.res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
}
