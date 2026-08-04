import type { Child } from 'hono/jsx'
import { css } from 'hono/css'

type CardProps = {
  title: string
  children: Child
}

const card = css`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;

  & p {
    color: var(--muted);
    font-size: 0.92rem;
  }

  & p + p {
    margin-top: 8px;
  }

  &:hover {
    border-color: rgba(216, 178, 106, 0.35);
    background: var(--surface-2);
    transform: translateY(-2px);
  }
`

const cardTitle = css`
  font-size: 1.02rem;
  letter-spacing: -0.01em;
  font-weight: 600;
  margin-bottom: 10px;
`

export function Card({ title, children }: CardProps) {
  return (
    <article class={card}>
      <h2 class={cardTitle}>{title}</h2>
      {children}
    </article>
  )
}
