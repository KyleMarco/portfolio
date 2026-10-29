import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LinkButton } from './LinkButton'

describe('LinkButton', () => {
  it('renders an internal link with its destination and variant', () => {
    render(
      <MemoryRouter>
        <LinkButton to="/demo" variant="secondary">
          View shop demo
        </LinkButton>
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: 'View shop demo' })
    expect(link.getAttribute('href')).toBe('/demo')
    expect(link.className).toContain('border-slate-300')
  })

  it('uses the primary style by default', () => {
    render(
      <MemoryRouter>
        <LinkButton to="/">Go home</LinkButton>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Go home' }).className).toContain('bg-blue-600')
  })
})
