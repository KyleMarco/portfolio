import { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileUpload } from '@portfolio/ui';

afterEach(cleanup);

describe('FileUpload', () => {
  it('supports a visible label, native attributes, classes, and a ref to the file input', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <>
        <label htmlFor="resume">Résumé</label>
        <FileUpload
          ref={ref}
          id="resume"
          name="resume"
          form="application"
          accept=".pdf"
          required
          aria-invalid="true"
          aria-describedby="resume-help"
          className="max-w-md"
        />
        <p id="resume-help">Choose a PDF document.</p>
      </>,
    );

    const input = screen.getByLabelText('Résumé') as HTMLInputElement;
    expect(input.type).toBe('file');
    expect(input.name).toBe('resume');
    expect(input.accept).toBe('.pdf');
    expect(input.required).toBe(true);
    expect(input.multiple).toBe(false);
    expect(input.getAttribute('form')).toBe('application');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('resume-help');
    expect(input.classList.contains('max-w-md')).toBe(true);
    expect(ref.current).toBe(input);
    ref.current?.focus();
    expect(document.activeElement).toBe(input);
  });

  it.each([false, true])('exposes selected files through onChange (multiple=%s)', (multiple) => {
    const onFilesSelected = vi.fn();
    const files = [new File(['resume'], 'resume.pdf', { type: 'application/pdf' })];
    if (multiple) {
      files.push(new File(['cover letter'], 'cover-letter.pdf', { type: 'application/pdf' }));
    }
    render(
      <FileUpload
        aria-label="Attachments"
        multiple={multiple}
        onChange={(event) => onFilesSelected(Array.from(event.currentTarget.files ?? []))}
      />,
    );
    const input = screen.getByLabelText('Attachments') as HTMLInputElement;

    expect(input.multiple).toBe(multiple);
    fireEvent.change(input, { target: { files } });

    expect(onFilesSelected).toHaveBeenCalledExactlyOnceWith(files);
  });

  it('keeps a disabled input out of keyboard focus', () => {
    render(<FileUpload aria-label="Attachment" disabled />);
    const input = screen.getByLabelText('Attachment') as HTMLInputElement;

    expect(input.disabled).toBe(true);
    input.focus();
    expect(document.activeElement).not.toBe(input);
  });
});
