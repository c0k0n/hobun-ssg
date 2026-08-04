import { css } from 'hono/css'

export const hero = css`
  padding-block: 96px 64px;
`

export const eyebrow = css`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 18px;
`

export const title = css`
  font-size: clamp(2rem, 4.6vw, 2.9rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  font-weight: 700;
  text-wrap: balance;
`

export const grad = css`
  background: linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 55%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const lead = css`
  color: var(--muted);
  margin-top: 20px;
  font-size: 1.0625rem;
  max-width: 58ch;
`

export const pipeline = css`
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--muted);

  & li + li::before {
    content: '→';
    margin-inline: 10px;
    color: var(--accent);
  }
`

export const btn = css`
  display: inline-block;
  margin-top: 34px;
  padding: 11px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--on-accent);
  background: linear-gradient(180deg, var(--accent-2) 0%, var(--accent) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 8px 24px rgba(216, 178, 106, 0.16);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.04);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 12px 30px rgba(216, 178, 106, 0.24);
  }
`

export const cards = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  padding-bottom: 96px;
`

export const notfoundTitle = css`
  font-size: clamp(2.5rem, 6vw, 3.8rem);
`
