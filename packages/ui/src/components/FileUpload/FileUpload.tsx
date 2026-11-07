import type { ComponentPropsWithRef } from 'react';

export type FileUploadProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'value' | 'defaultValue' | 'children'
>;

const fileUploadStyles =
  'w-full min-w-0 cursor-pointer rounded-ui-md border border-ui-border bg-ui-surface px-ui-3 py-ui-2 font-ui-sans text-base leading-normal text-ui-text file:me-ui-3 file:cursor-pointer file:rounded-ui-sm file:border-0 file:bg-ui-action file:px-ui-3 file:py-ui-2 file:font-semibold file:text-ui-on-action focus-visible:border-ui-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-not-allowed disabled:border-ui-border disabled:bg-ui-disabled disabled:text-ui-on-disabled disabled:file:cursor-not-allowed disabled:file:bg-ui-disabled disabled:file:text-ui-on-disabled aria-invalid:border-ui-error aria-invalid:focus-visible:ring-ui-error';

export function FileUpload({ className = '', ...props }: FileUploadProps) {
  return <input {...props} type="file" className={`${fileUploadStyles} ${className}`.trim()} />;
}
