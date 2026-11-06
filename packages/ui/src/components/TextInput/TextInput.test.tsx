import { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TextInput } from '@portfolio/ui';

afterEach(cleanup);

describe('TextInput', () => {
  it('renders a text input with an accessible label and native attributes', () => {
    render(
      <>
        <label htmlFor="full-name">Full name</label>
        <TextInput
          id="full-name"
          name="fullName"
          placeholder="Jane Doe"
          required
          aria-describedby="name-help"
        />
        <span id="name-help">Enter your first and last name.</span>
      </>,
    );

    const input = screen.getByRole('textbox', { name: 'Full name' });
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('name')).toBe('fullName');
    expect(input.getAttribute('placeholder')).toBe('Jane Doe');
    expect(input.getAttribute('aria-describedby')).toBe('name-help');
    expect((input as HTMLInputElement).required).toBe(true);
  });

  it('supports other input types, disabled and invalid states, and custom classes', () => {
    render(
      <TextInput
        type="email"
        aria-label="Email address"
        aria-invalid="true"
        disabled
        className="mt-2"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input.getAttribute('type')).toBe('email');
    expect((input as HTMLInputElement).disabled).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.classList.contains('aria-invalid:border-ui-error')).toBe(true);
    expect(input.classList.contains('mt-2')).toBe(true);
  });

  it('forwards refs and change events to the native input', () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    render(<TextInput ref={ref} aria-label="Search" onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: 'Search' });
    expect(ref.current).toBe(input);
    expect(input.classList.contains('w-full')).toBe(true);
    ref.current?.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.change(input, { target: { value: 'portfolio' } });
    expect(onChange).toHaveBeenCalledOnce();
    expect((input as HTMLInputElement).value).toBe('portfolio');
  });
});
