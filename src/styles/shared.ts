import { css } from 'hono/css'

export const hero = css`
  padding-block: 88px 56px;
`

export const heroHome = css`
  padding-block: 112px 64px;
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
  letter-spacing: -0.03em;
  font-weight: 700;
  text-wrap: balance;
`

export const grad = css`
  background: linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const lead = css`
  color: var(--muted);
  margin-top: 20px;
  font-size: 1.0625rem;
  max-width: 62ch;
`

export const note = css`
  color: var(--muted);
  margin-top: 14px;
  font-size: 0.92rem;
  max-width: 62ch;
`

export const pipeline = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 32px;
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

export const actions = css`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
`

export const btn = css`
  display: inline-block;
  padding: 11px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--on-accent);
  background: var(--accent);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  }
`

export const btnGhost = css`
  display: inline-block;
  padding: 11px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
  border: 1px solid var(--border);
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`

export const cards = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`

export const section = css`
  padding-bottom: 80px;
`

export const sectionTitle = css`
  font-size: 1.3rem;
  letter-spacing: -0.01em;
  font-weight: 650;
  margin-bottom: 14px;
`

export const sectionLead = css`
  color: var(--muted);
  max-width: 62ch;
  margin-bottom: 26px;
`

export const cardLink = css`
  display: inline-block;
  margin-top: 16px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
`

export const chip = css`
  display: inline-block;
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
`

export const codeLine = css`
  display: block;
  margin-top: 10px;
  padding: 10px 14px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow-x: auto;
`

export const steps = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const step = css`
  padding-block: 26px;
  border-top: 1px solid var(--border);

  &:first-child {
    border-top: none;
    padding-top: 6px;
  }
`

export const stepNum = css`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent);
`

export const stepTitle = css`
  font-size: 1.08rem;
  font-weight: 650;
  margin-top: 6px;
`

export const stepText = css`
  color: var(--muted);
  margin-top: 8px;
  max-width: 62ch;
`

export const stackRow = css`
  display: block;
  margin-bottom: 14px;
  padding: 22px 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: rgba(79, 70, 229, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(16, 24, 40, 0.06);
  }
`

export const stackTitle = css`
  font-size: 1.05rem;
  font-weight: 650;
  color: var(--text);
`

export const stackRole = css`
  display: block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  margin-top: 4px;
`

export const stackDesc = css`
  color: var(--muted);
  margin-top: 10px;
  font-size: 0.95rem;
`

export const noteCard = css`
  margin-bottom: 14px;
  padding: 20px 22px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 12px;
`

export const noteTitle = css`
  font-size: 1rem;
  font-weight: 650;
`

export const noteText = css`
  color: var(--muted);
  margin-top: 8px;
  font-size: 0.95rem;
`

export const notfoundTitle = css`
  font-size: clamp(2.5rem, 6vw, 3.8rem);
`
