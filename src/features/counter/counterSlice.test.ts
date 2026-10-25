import { describe, expect, it } from 'vitest'
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from './counterSlice'
import counterReducer from './counterSlice'

describe('counter reducer', () => {
  it('starts at zero and increments or decrements by one', () => {
    const initialState = counterReducer(undefined, { type: 'unknown' })
    const incrementedState = counterReducer(initialState, increment())
    const decrementedState = counterReducer(incrementedState, decrement())

    expect(initialState.value).toBe(0)
    expect(incrementedState.value).toBe(1)
    expect(decrementedState.value).toBe(0)
  })

  it('increments by an amount and resets to zero', () => {
    const incrementedState = counterReducer(undefined, incrementByAmount(7))
    const resetState = counterReducer(incrementedState, reset())

    expect(incrementedState.value).toBe(7)
    expect(resetState.value).toBe(0)
  })
})
