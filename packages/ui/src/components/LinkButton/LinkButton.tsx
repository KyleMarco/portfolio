import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { buttonStyles, type ButtonVariant } from '../buttonStyles';

export type LinkButtonVariant = ButtonVariant;

export type LinkButtonProps = LinkProps & {
  variant?: LinkButtonVariant;
};

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { variant = 'primary', className = '', ...props },
  ref,
) {
  return <Link {...props} ref={ref} className={`${buttonStyles[variant]} ${className}`.trim()} />;
});
