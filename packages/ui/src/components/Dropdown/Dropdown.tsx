import type { ComponentPropsWithRef } from 'react';

export type DropdownProps = ComponentPropsWithRef<'select'>;

const dropdownStyles =
  'w-full min-w-0 cursor-pointer rounded-ui-md border border-ui-border bg-ui-surface px-ui-3 py-ui-2 font-ui-sans text-base leading-normal text-ui-text focus-visible:border-ui-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-not-allowed disabled:border-ui-border disabled:bg-ui-disabled disabled:text-ui-on-disabled aria-invalid:border-ui-error aria-invalid:focus-visible:ring-ui-error';

export function Dropdown({ className = '', ...props }: DropdownProps) {
  return <select {...props} className={`${dropdownStyles} ${className}`.trim()} />;
}
