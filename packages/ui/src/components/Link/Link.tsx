import type { ComponentPropsWithRef } from 'react';

export type LinkProps = ComponentPropsWithRef<'a'>;

const linkStyles =
  'font-ui-sans text-ui-action underline underline-offset-4 transition-colors hover:text-ui-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-focus motion-reduce:transition-none';

export function Link({ className = '', ...props }: LinkProps) {
  return <a {...props} className={`${linkStyles} ${className}`.trim()} />;
}
