import type { ComponentPropsWithRef } from 'react';

export type CardVariant = 'outlined' | 'elevated';

export type CardProps = ComponentPropsWithRef<'div'> & {
  variant?: CardVariant;
};

const variants: Record<CardVariant, string> = {
  outlined: '',
  elevated: 'shadow-ui-card',
};

export function Card({ variant = 'outlined', className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`my-ui-4 min-w-0 rounded-ui-lg border border-ui-border bg-ui-surface p-ui-4 font-ui-sans text-ui-text sm:p-ui-6 ${variants[variant]} ${className}`.trim()}
    />
  );
}
