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
      'rounded-xl bg-stone-950 px-4 py-2.5 font-semibold text-white transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500',
    secondary:
      'rounded-xl border border-stone-300 bg-[#f2f0eb] px-4 py-2 font-semibold text-stone-900 transition hover:bg-[#fbfaf7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500',
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
