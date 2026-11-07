import type { ComponentPropsWithRef } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';

export type ContainerProps = ComponentPropsWithRef<'div'> & {
  size?: ContainerSize;
};

const sizes: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-none',
};

export function Container({ size = 'lg', className = '', ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={`mx-auto w-full px-ui-4 sm:px-ui-6 lg:px-ui-8 ${sizes[size]} ${className}`.trim()}
    />
  );
}
