import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ToastContext, type ToastContextValue, type ToastVariant } from './toastContext';

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, variant: ToastVariant) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, variant }]);

      window.setTimeout(() => {
        dismiss(id);
      }, 2200);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (message: string) => pushToast(message, 'success'),
      error: (message: string) => pushToast(message, 'error'),
      info: (message: string) => pushToast(message, 'info'),
      dismiss,
    }),
    [dismiss, pushToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}

type ToastViewportProps = {
  toasts: ToastItem[];
};

function ToastViewport({ toasts }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  const variants: Record<ToastVariant, string> = {
    success: 'border-ui-success/30 text-ui-success ring-ui-success/20',
    error: 'border-ui-error/30 text-ui-error ring-ui-error/20',
    info: 'border-ui-border text-ui-text ring-ui-border/20',
  };

  const iconStyles: Record<ToastVariant, string> = {
    success: 'bg-ui-success/15 text-ui-success',
    error: 'bg-ui-error/15 text-ui-error',
    info: 'bg-ui-action text-ui-on-action',
  };

  const symbols: Record<ToastVariant, string> = {
    success: '✓',
    error: '!',
    info: 'i',
  };

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className={`pointer-events-auto flex items-center gap-3 rounded-ui-lg border bg-ui-surface px-4 py-3 text-sm font-medium shadow-ui-card ring-1 backdrop-blur-sm ${variants[toast.variant]}`}
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
  );
}
