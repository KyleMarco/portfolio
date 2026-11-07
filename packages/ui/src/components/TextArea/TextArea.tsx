import type { ComponentPropsWithRef } from 'react';

export type TextAreaProps = ComponentPropsWithRef<'textarea'>;

const textAreaStyles =
  'w-full min-h-24 resize-y rounded-ui-md border border-ui-border bg-ui-surface px-ui-3 py-ui-2 font-ui-sans text-base leading-normal text-ui-text placeholder:text-ui-text-muted focus-visible:border-ui-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-not-allowed disabled:border-ui-border disabled:bg-ui-disabled disabled:text-ui-on-disabled aria-invalid:border-ui-error aria-invalid:focus-visible:ring-ui-error';

export function TextArea({ className = '', ...props }: TextAreaProps) {
  return <textarea {...props} className={`${textAreaStyles} ${className}`.trim()} />;
}
