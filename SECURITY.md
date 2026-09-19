# Security Policy

The site is static: no server-side code runs in production, no client-side JavaScript ships, and there is no database or user data. The security surface is therefore small and mostly configuration.

![response hardening: one contract, two emitters](assets/security-layers.svg)

## Supported

Only the `main` branch is maintained. There are no versioned releases or published packages, so a report should always be against the current commit.

## What is in scope

```mermaid
flowchart TD
  R{"what did you find?"} -->|"headers, CSP, Permissions-Policy"| IN1["in scope<br/>public/_headers · src/security.ts"]
  R -->|"app code, routing, build output"| IN2["in scope<br/>src/ · scripts/build.ts"]
  R -->|"secrets handling in CI"| IN3["in scope<br/>.github/workflows/deploy.yml"]
  R -->|"Cloudflare platform itself"| OUT1["out of scope<br/>report to Cloudflare"]
  R -->|"a bug in Hono, Bun or Wrangler"| OUT2["out of scope<br/>report upstream"]
```

## How to report

**Do not open a public issue with exploit details, credentials, or private data.** Use private channels:

1. GitHub's **Report a vulnerability** (Security Advisories) on this repository — preferred, it keeps the thread private until a fix lands.
2. Otherwise contact `c0k0n` through [the GitHub profile](https://github.com/c0k0n).

```mermaid
flowchart LR
  REPORT["private report"] --> TRIAGE["triage<br/>confirm + assess impact"]
  TRIAGE --> FIX["fix on a branch<br/>headers test must still pass"]
  FIX --> MERGE["merge to main"]
  MERGE --> DEPLOY["Actions deploys<br/>hobun-ssg.pages.dev"]
  DEPLOY --> DISCLOSE["disclose, coordinated"]
```

Include: the affected file or commit, reproduction steps, the impact you believe it has, and safe supporting evidence (header dumps, a curl transcript — not anyone's private data).

## What to expect

This is a learning project, so response and fixes are best-effort. Please allow time for investigation before making a report public.

A useful detail when assessing header reports: the same policy is emitted twice, once by `public/_headers` for Pages static files and once by `src/security.ts` for app responses, and `bun test` asserts the two match. A finding against one is a finding against both.
