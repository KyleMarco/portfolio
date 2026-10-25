import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
}: ButtonProps) {
  const classes: Record<ButtonVariant, string> = {
    primary:
      'rounded-xl bg-sky-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-sky-300',
    secondary:
      'rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-900 transition hover:bg-white',
  }

  return (
    <button type={type} onClick={onClick} className={`${classes[variant]} ${className}`.trim()}>
      {children}
    </button>
  )
}
