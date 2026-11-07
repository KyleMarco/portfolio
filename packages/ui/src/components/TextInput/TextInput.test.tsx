import { createRef, useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { TextInput } from '@portfolio/ui';

afterEach(cleanup);

describe('TextInput', () => {
  it('associates a visible label and validation message and exposes its native input ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <>
        <label htmlFor="email">Email</label>
        <TextInput
          ref={ref}
          id="email"
          name="email"
          type="email"
          required
          aria-invalid="true"
          aria-describedby="email-error"
        />
        <p id="email-error">Enter a valid email address.</p>
      </>,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Email' });

    expect(ref.current).toBe(input);
    expect(input.type).toBe('email');
    expect(input.checkValidity()).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById(input.getAttribute('aria-describedby')!)?.textContent).toBe(
      'Enter a valid email address.',
    );
    ref.current?.focus();
    expect(document.activeElement).toBe(input);
    fireEvent.change(input, { target: { value: 'marco@example.com' } });
    expect(input.checkValidity()).toBe(true);
  });

  it('updates a controlled value through the caller change handler', () => {
    function ControlledInput() {
      const [value, setValue] = useState('Marco');
      return (
        <>
          <TextInput
            aria-label="Name"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <output aria-label="Preview">{value}</output>
        </>
      );
    }
    render(<ControlledInput />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Kyle' } });

    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe('Kyle');
    expect(screen.getByLabelText('Preview').textContent).toBe('Kyle');
  });

  it('submits an uncontrolled field through its associated form and resets its default', () => {
    render(
      <>
        <form id="profile" aria-label="Profile" />
        <TextInput aria-label="Name" form="profile" name="name" defaultValue="Marco" />
      </>,
    );
    const form = screen.getByRole<HTMLFormElement>('form', { name: 'Profile' });
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Name' });
    fireEvent.change(input, { target: { value: 'Kyle' } });

    expect(new FormData(form).get('name')).toBe('Kyle');
    form.reset();
    expect(input.value).toBe('Marco');
    expect(new FormData(form).get('name')).toBe('Marco');
  });

  it('omits disabled fields from submission and keyboard focus', () => {
    render(
      <form aria-label="Profile">
        <TextInput aria-label="Name" name="name" defaultValue="Marco" disabled />
      </form>,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Name' });

    expect(input.disabled).toBe(true);
    input.focus();
    expect(document.activeElement).not.toBe(input);
    expect(new FormData(screen.getByRole<HTMLFormElement>('form')).has('name')).toBe(false);
  });
});
