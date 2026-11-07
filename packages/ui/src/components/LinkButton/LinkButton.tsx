import type { ComponentPropsWithRef } from 'react';
import { Link } from 'react-router-dom';
import { buttonSizeStyles, buttonStyles, type ButtonVariant } from '../buttonStyles';

export type LinkButtonVariant = ButtonVariant;

export type LinkButtonProps = ComponentPropsWithRef<typeof Link> & {
  variant?: LinkButtonVariant;
};

export function LinkButton({ variant = 'primary', className = '', ...props }: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={`${buttonStyles[variant]} ${buttonSizeStyles.default} ${className}`.trim()}
    />
  );
}
