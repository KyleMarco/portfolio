import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { describe, expect, it } from 'vitest'
import counterReducer from './counterSlice'
import { CounterPanel } from './CounterPanel'

const renderCounterPanel = () => {
  const store = configureStore({
    reducer: { counter: counterReducer },
  })

  return render(
    <Provider store={store}>
      <CounterPanel />
    </Provider>,
  )
}

describe('CounterPanel', () => {
  it('updates the displayed count from its controls', () => {
    renderCounterPanel()

    expect(screen.getByText('0')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '+5' }))
    expect(screen.getByText('5')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('6')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('0')).toBeTruthy()
  })
})
