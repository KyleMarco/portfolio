import type { MouseEventHandler, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  const classes: Record<ButtonVariant, string> = {
    primary:
      'rounded-xl bg-sky-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400',
    secondary:
      'rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

