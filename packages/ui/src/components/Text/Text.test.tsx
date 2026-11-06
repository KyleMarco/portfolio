import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Text } from '@portfolio/ui';

afterEach(cleanup);

describe('Text', () => {
  it('renders a span with the body style by default', () => {
    render(<Text>Profile details</Text>);

    const text = screen.getByText('Profile details');
    expect(text.tagName).toBe('SPAN');
    expect(text.classList.contains('text-base')).toBe(true);
    expect(text.classList.contains('text-ui-text')).toBe(true);
  });

  it('supports semantic elements, native attributes, variants, and custom classes', () => {
    render(
      <Text as="p" variant="caption" id="description" aria-live="polite" className="mt-2">
        A short description
      </Text>,
    );

    const text = screen.getByText('A short description');
    expect(text.tagName).toBe('P');
    expect(text.getAttribute('id')).toBe('description');
    expect(text.getAttribute('aria-live')).toBe('polite');
    expect(text.classList.contains('text-sm')).toBe(true);
    expect(text.classList.contains('text-ui-text-muted')).toBe(true);
    expect(text.classList.contains('mt-2')).toBe(true);
  });

  it('supports native attributes for the selected semantic element', () => {
    render(
      <>
        <Text as="label" htmlFor="email">
          Email address
        </Text>
        <input id="email" />
      </>,
    );

    expect(screen.getByLabelText('Email address')).toBe(screen.getByRole('textbox'));
  });

  it('forwards refs to the selected element', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(
      <Text as="p" ref={ref} variant="label">
        Email address
      </Text>,
    );

    expect(ref.current).toBe(screen.getByText('Email address'));
    expect(ref.current?.tagName).toBe('P');
    expect(ref.current?.classList.contains('font-semibold')).toBe(true);
  });
});
