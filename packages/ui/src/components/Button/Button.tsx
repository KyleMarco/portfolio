import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { buttonStyles, type ButtonVariant } from '../buttonStyles';

export type { ButtonVariant } from '../buttonStyles';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = 'button', variant = 'primary', className = '', ...props },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={`${buttonStyles[variant]} ${className}`.trim()}
    />
  );
});
