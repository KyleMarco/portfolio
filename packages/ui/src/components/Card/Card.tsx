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
      className={`min-w-0 rounded-ui-lg border border-ui-border bg-ui-surface p-ui-6 font-ui-sans text-ui-text ${variants[variant]} ${className}`.trim()}
    />
  );
}
