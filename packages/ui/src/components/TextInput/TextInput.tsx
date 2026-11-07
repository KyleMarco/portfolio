import type { ComponentPropsWithRef } from 'react';

export type TextInputProps = ComponentPropsWithRef<'input'>;

const textInputStyles =
  'w-full rounded-ui-md border border-ui-border bg-ui-surface px-ui-3 py-ui-2 font-ui-sans text-base leading-normal text-ui-text placeholder:text-ui-text-muted focus-visible:border-ui-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-not-allowed disabled:border-ui-border disabled:bg-ui-disabled disabled:text-ui-on-disabled aria-invalid:border-ui-error aria-invalid:focus-visible:ring-ui-error';

export function TextInput({ className = '', ...props }: TextInputProps) {
  return <input {...props} className={`${textInputStyles} ${className}`.trim()} />;
}
