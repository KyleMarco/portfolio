import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ToastVariant = 'success' | 'error' | 'info'

type ToastItem = {
  id: number
  message: string
  variant: ToastVariant
}

type ToastContextValue = {
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (message: string, variant: ToastVariant) => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current, { id, message, variant }])

      window.setTimeout(() => {
        dismiss(id)
      }, 2200)
    },
    [dismiss],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (message: string) => pushToast(message, 'success'),
      error: (message: string) => pushToast(message, 'error'),
      info: (message: string) => pushToast(message, 'info'),
      dismiss,
    }),
    [dismiss, pushToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

type ToastViewportProps = {
  toasts: ToastItem[]
}

function ToastViewport({ toasts }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null
  }

  const variants: Record<ToastVariant, string> = {
    success:
      'border-emerald-500/40 bg-emerald-500/15 text-emerald-100 ring-emerald-500/30',
    error: 'border-rose-500/40 bg-rose-500/15 text-rose-100 ring-rose-500/30',
    info: 'border-sky-500/40 bg-sky-500/15 text-sky-100 ring-sky-500/30',
  }

  const iconStyles: Record<ToastVariant, string> = {
    success: 'bg-emerald-500 text-slate-950',
    error: 'bg-rose-500 text-slate-950',
    info: 'bg-sky-500 text-slate-950',
  }

  const symbols: Record<ToastVariant, string> = {
    success: '✓',
    error: '!',
    info: 'i',
  }

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className={`pointer-events-auto flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-xl shadow-slate-950/30 ring-1 backdrop-blur-sm ${variants[toast.variant]}`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-base font-bold ${iconStyles[toast.variant]}`}
          >
            {symbols[toast.variant]}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
