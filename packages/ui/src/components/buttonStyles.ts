export type ButtonVariant = 'primary' | 'secondary';

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-ui-md px-4 py-2.5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-focus disabled:cursor-not-allowed disabled:bg-ui-disabled disabled:text-ui-on-disabled motion-reduce:transition-none';

export const buttonStyles: Record<ButtonVariant, string> = {
  primary: `${baseStyles} bg-ui-action text-ui-on-action enabled:hover:bg-ui-action-hover [&:is(a):hover]:bg-ui-action-hover`,
  secondary: `${baseStyles} border border-ui-border bg-ui-surface-muted text-ui-text enabled:hover:bg-ui-canvas [&:is(a):hover]:bg-ui-canvas`,
};
