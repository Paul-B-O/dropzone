import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import type { Drop } from '../api'
import { formatPrice } from '../format'
import { makeDrop } from '../test/fixtures'
import { DropCard } from './DropCard'

function renderCard(drop: Drop): HTMLElement {
  const { container } = render(
    <MemoryRouter>
      <DropCard drop={drop} />
    </MemoryRouter>,
  )
  return container
}

function find(container: HTMLElement, selector: string): HTMLElement {
  const element = container.querySelector<HTMLElement>(selector)
  if (!element) throw new Error(`${selector} introuvable`)
  return element
}

describe('DropCard', () => {
  it('shows the product, price, remaining stock and status', () => {
    const card = renderCard(makeDrop())

    const link = find(card, '.card__title a')
    expect(link).toHaveAttribute('href', '/drops/1')
    expect(link.textContent).toBe('Air Max 1 « Laval »')

    expect(find(card, '.card__price').textContent).toBe(formatPrice(18000))
    expect(find(card, '.card__stock').textContent).toBe('42 / 100 paires restantes')

    const badge = find(card, '.badge')
    expect(badge).toHaveClass('badge--live')
    expect(badge.textContent).toBe('En vente')
  })

  it.each([
    ['upcoming', 'À venir'],
    ['sold_out', 'Épuisé'],
  ] as const)('shows the label of the %s status', (status, label) => {
    const card = renderCard(makeDrop({ status, opens_at: '2100-01-01T00:00:00Z' }))
    const badge = find(card, '.badge')
    expect(badge).toHaveClass(`badge--${status}`)
    expect(badge.textContent).toBe(label)
  })
})
