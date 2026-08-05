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
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  & p {
    color: var(--muted);
    font-size: 0.92rem;
  }

  & p + p {
    margin-top: 8px;
  }

  &:hover {
    border-color: rgba(79, 70, 229, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(16, 24, 40, 0.07);
  }
`

const cardTitle = css`
  font-size: 1rem;
  letter-spacing: -0.01em;
  font-weight: 650;
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
