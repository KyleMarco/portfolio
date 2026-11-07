import { createRef, useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { TextArea } from '@portfolio/ui';

afterEach(cleanup);

describe('TextArea', () => {
  it('associates a visible label and validation message and exposes its native textarea ref', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <>
        <label htmlFor="message">Message</label>
        <TextArea
          ref={ref}
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid="true"
          aria-describedby="message-error"
        />
        <p id="message-error">Enter a message.</p>
      </>,
    );
    const input = screen.getByRole<HTMLTextAreaElement>('textbox', { name: 'Message' });

    expect(ref.current).toBe(input);
    expect(input.rows).toBe(6);
    expect(input.checkValidity()).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById(input.getAttribute('aria-describedby')!)?.textContent).toBe(
      'Enter a message.',
    );
    ref.current?.focus();
    expect(document.activeElement).toBe(input);
    fireEvent.change(input, { target: { value: 'Hello\nMarco' } });
    expect(input.checkValidity()).toBe(true);
  });

  it('preserves multiline edits through a controlled change handler', () => {
    function ControlledTextArea() {
      const [value, setValue] = useState('Hello');
      return (
        <>
          <TextArea
            aria-label="Message"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <output aria-label="Preview">{value}</output>
        </>
      );
    }
    render(<ControlledTextArea />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello\nMarco' } });

    expect(screen.getByRole<HTMLTextAreaElement>('textbox').value).toBe('Hello\nMarco');
    expect(screen.getByLabelText('Preview').textContent).toBe('Hello\nMarco');
  });

  it('submits uncontrolled edits through its associated form and resets its default', () => {
    render(
      <>
        <form id="contact" aria-label="Contact" />
        <TextArea aria-label="Message" form="contact" name="message" defaultValue="Hello" />
      </>,
    );
    const form = screen.getByRole<HTMLFormElement>('form', { name: 'Contact' });
    const input = screen.getByRole<HTMLTextAreaElement>('textbox');
    fireEvent.change(input, { target: { value: 'Updated message' } });

    expect(new FormData(form).get('message')).toBe('Updated message');
    form.reset();
    expect(input.value).toBe('Hello');
    expect(new FormData(form).get('message')).toBe('Hello');
  });

  it('omits disabled fields from submission and keyboard focus', () => {
    render(
      <form aria-label="Contact">
        <TextArea aria-label="Message" name="message" defaultValue="Hello" disabled />
      </form>,
    );
    const input = screen.getByRole<HTMLTextAreaElement>('textbox');

    expect(input.disabled).toBe(true);
    input.focus();
    expect(document.activeElement).not.toBe(input);
    expect(new FormData(screen.getByRole<HTMLFormElement>('form')).has('message')).toBe(false);
  });
});
