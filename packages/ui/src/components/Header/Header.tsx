import type { ComponentPropsWithRef } from 'react';

export type HeaderProps = ComponentPropsWithRef<'header'>;

export function Header({ className = '', ...props }: HeaderProps) {
  return (
    <header
      {...props}
      className={`mb-ui-6 border-b border-ui-border bg-ui-surface py-ui-4 font-ui-sans text-ui-text ${className}`.trim()}
    />
  );
}
