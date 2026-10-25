import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders its content and calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save changes</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('supports button attributes and disabled state', () => {
    const onClick = vi.fn()
    render(
      <Button type="submit" variant="secondary" disabled onClick={onClick}>
        Submit
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Submit' })

    expect(button.getAttribute('type')).toBe('submit')
    expect((button as HTMLButtonElement).disabled).toBe(true)
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
