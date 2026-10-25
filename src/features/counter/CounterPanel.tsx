import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { Button } from '../../shared/components/Button'
import { Card } from '../../shared/components/Card'
import { decrement, increment, incrementByAmount, reset } from './counterSlice'

export function CounterPanel() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <Card title="Counter state">
      <div
        aria-live="polite"
        className="mb-5 flex min-h-28 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-slate-50"
      >
        <span className="text-5xl font-black text-slate-900">{count}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => dispatch(increment())} variant="secondary">
          +
        </Button>
        <Button onClick={() => dispatch(decrement())} variant="secondary">
          -
        </Button>
        <Button onClick={() => dispatch(reset())} variant="secondary">
          Reset
        </Button>
        <Button onClick={() => dispatch(incrementByAmount(5))} variant="secondary">
          +5
        </Button>
      </div>
    </Card>
  )
}
