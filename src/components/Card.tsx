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
  padding: 24px;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(108, 140, 255, 0.45);
    transform: translateY(-2px);
  }
`

const cardTitle = css`
  font-size: 1.02rem;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
`

const cardBody = css`
  color: var(--muted);
  font-size: 0.92rem;
`

export function Card({ title, children }: CardProps) {
  return (
    <article class={card}>
      <h2 class={cardTitle}>{title}</h2>
      <div class={cardBody}>{children}</div>
    </article>
  )
}