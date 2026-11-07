import { type ComponentPropsWithRef, type ReactElement } from 'react';

export type TextVariant = 'body' | 'caption' | 'label';

type TextElement = 'div' | 'em' | 'label' | 'p' | 'small' | 'span' | 'strong';

type TextOwnProps<T extends TextElement> = {
  as?: T;
  variant?: TextVariant;
};

export type TextProps<T extends TextElement = 'span'> = TextOwnProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof TextOwnProps<T>>;

const variants: Record<TextVariant, string> = {
  body: 'font-ui-sans text-base leading-normal text-ui-text',
  caption: 'font-ui-sans text-sm leading-normal text-ui-text-muted',
  label: 'font-ui-sans text-sm font-semibold leading-normal text-ui-text',
};

function TextBase({ as, variant = 'body', className = '', ...props }: TextProps<'span'>) {
  const Component = (as ?? 'span') as 'span';

  return <Component {...props} className={`${variants[variant]} ${className}`.trim()} />;
}

type PolymorphicText = <T extends TextElement = 'span'>(props: TextProps<T>) => ReactElement | null;

export const Text = TextBase as PolymorphicText;
