import type { ComponentPropsWithRef } from 'react';

export type HeaderProps = ComponentPropsWithRef<'header'>;

export function Header({ className = '', ...props }: HeaderProps) {
  return (
    <header
      {...props}
      className={`border-b border-ui-border bg-ui-surface font-ui-sans text-ui-text ${className}`.trim()}
    />
  );
}
