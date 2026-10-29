import type { MouseEventHandler, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

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
      'rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500',
    secondary:
      'rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 font-semibold text-slate-900 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
