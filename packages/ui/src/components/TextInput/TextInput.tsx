import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type TextInputProps = ComponentPropsWithoutRef<'input'>;

const textInputStyles =
  'block w-full min-w-0 rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2 font-ui-sans text-base leading-normal text-ui-text shadow-sm placeholder:text-ui-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus focus-visible:ring-offset-2 focus-visible:ring-offset-ui-surface disabled:cursor-not-allowed disabled:bg-ui-disabled disabled:text-ui-on-disabled aria-invalid:border-ui-error aria-invalid:focus-visible:ring-ui-error';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { type = 'text', className = '', ...props },
  ref,
) {
  return (
    <input {...props} ref={ref} type={type} className={`${textInputStyles} ${className}`.trim()} />
  );
});
