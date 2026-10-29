import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import HomePage from './HomePage'
import { educationTracks, experiences, interests, skillGroups } from './mockData'

afterEach(cleanup)

describe('HomePage experience details', () => {
  it('shows experience highlights in a portal only after an experience is selected', () => {
    render(<HomePage />)

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByText(experiences[0].highlights[0])).toBeNull()

    const trigger = screen.getByRole('button', {
      name: `View ${experiences[0].company} experience highlights`,
    })
    fireEvent.click(trigger)

    const dialog = screen.getByRole('dialog', { name: experiences[0].company })
    expect(within(dialog).getByText(experiences[0].highlights[0])).toBeTruthy()
    expect(within(dialog).getByText(experiences[0].role)).toBeTruthy()
    expect(within(dialog).getByRole('heading', { name: 'Technologies' })).toBeTruthy()
    expect(within(dialog).getByText('ReactJS')).toBeTruthy()

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  it('updates the education, skill, and interest panels when selected', () => {
    render(<HomePage />)

    const focusAreasButton = screen.getByRole('button', { name: 'Focus areas' })
    fireEvent.click(focusAreasButton)
    expect(focusAreasButton.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText(educationTracks[1].content).classList.contains('motion-enter')).toBe(
      true,
    )

    const toolsButton = screen.getByRole('button', {
      name: skillGroups[1].label,
    })
    fireEvent.click(toolsButton)
    expect(toolsButton.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Jira')).toBeTruthy()

    const fitnessButton = screen.getByRole('button', { name: /Fitness/ })
    fireEvent.click(fitnessButton)
    expect(fitnessButton.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText(interests[1].note)).toBeTruthy()
  })
})
