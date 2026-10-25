import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders its title and children', () => {
    render(
      <Card title="Account details">
        <p>Profile content</p>
      </Card>,
    )

    expect(screen.getByRole('heading', { name: 'Account details' })).toBeTruthy()
    expect(screen.getByText('Profile content')).toBeTruthy()
  })

  it('renders a header action even when no title is provided', () => {
    render(
      <Card headerAction={<button type="button">Edit</button>}>
        <p>Card content</p>
      </Card>,
    )

    expect(screen.getByRole('button', { name: 'Edit' })).toBeTruthy()
    expect(screen.getByText('Card content')).toBeTruthy()
  })
})
