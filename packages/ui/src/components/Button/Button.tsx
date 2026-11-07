import type { ComponentPropsWithRef } from 'react';
import {
  buttonSizeStyles,
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from '../buttonStyles';

export type { ButtonSize, ButtonVariant } from '../buttonStyles';

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  type = 'button',
  variant = 'primary',
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${buttonStyles[variant]} ${buttonSizeStyles[size]} ${className}`.trim()}
    />
  );
}
