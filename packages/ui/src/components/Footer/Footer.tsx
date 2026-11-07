import type { ComponentPropsWithRef } from 'react';

export type FooterProps = ComponentPropsWithRef<'footer'>;

export function Footer({ className = '', ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={`mt-ui-8 border-t border-ui-border bg-ui-surface py-ui-6 font-ui-sans text-ui-text ${className}`.trim()}
    />
  );
}
