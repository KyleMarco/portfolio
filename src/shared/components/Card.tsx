import type { ReactNode } from 'react'

type CardProps = {
  title?: string
  children: ReactNode
  headerAction?: ReactNode
}

export function Card({ title, children, headerAction }: CardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
      {(title || headerAction) && (
        <div className="mb-5 flex items-center justify-between gap-3">
          {title && <h2 className="text-xl font-semibold text-white">{title}</h2>}
          {headerAction}
        </div>
      )}

      {children}
    </div>
  )
}
