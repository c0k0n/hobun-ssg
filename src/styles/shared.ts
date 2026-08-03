import { css } from 'hono/css'

export const hero = css`
  padding-block: 88px 56px;
`

export const eyebrow = css`
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
`

export const title = css`
  font-size: clamp(1.9rem, 4.5vw, 2.7rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 700;
`

export const grad = css`
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const lead = css`
  color: var(--muted);
  margin-top: 18px;
  font-size: 1.05rem;
  max-width: 56ch;
`

export const btn = css`
  display: inline-block;
  margin-top: 28px;
  padding: 10px 22px;
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 6px 24px rgba(108, 140, 255, 0.28);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 30px rgba(108, 140, 255, 0.38);
  }
`

export const cards = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
  padding-bottom: 88px;
`

export const notfoundTitle = css`
  font-size: clamp(2.4rem, 6vw, 3.6rem);
`