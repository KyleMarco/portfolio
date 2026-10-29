import type { ReactNode } from 'react'
import { Link, type To } from 'react-router-dom'

type LinkButtonVariant = 'primary' | 'secondary'

type LinkButtonProps = {
  children: ReactNode
  to: To
  variant?: LinkButtonVariant
}

const variantClasses: Record<LinkButtonVariant, string> = {
  primary:
    'rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600',
  secondary:
    'rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500',
}

export function LinkButton({
  children,
  to,
  variant = 'primary',
}: LinkButtonProps) {
  return (
    <Link to={to} className={variantClasses[variant]}>
      {children}
    </Link>
  )
}
