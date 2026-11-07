import type { ComponentPropsWithRef } from 'react';

export type FooterProps = ComponentPropsWithRef<'footer'>;

export function Footer({ className = '', ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={`border-t border-ui-border bg-ui-surface font-ui-sans text-ui-text ${className}`.trim()}
    />
  );
}
