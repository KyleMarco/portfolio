import type { ComponentPropsWithRef } from 'react';
import { buttonStyles, type ButtonVariant } from '../buttonStyles';

export type { ButtonVariant } from '../buttonStyles';

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: ButtonVariant;
};

export function Button({
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button {...props} type={type} className={`${buttonStyles[variant]} ${className}`.trim()} />
  );
}
