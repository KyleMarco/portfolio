import { createRef, useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Dropdown } from '@portfolio/ui';

afterEach(cleanup);

describe('Dropdown', () => {
  it('supports a visible label, native field props, custom styles, and a select ref', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <>
        <label htmlFor="language">Language</label>
        <Dropdown
          ref={ref}
          id="language"
          name="language"
          required
          aria-invalid="true"
          aria-describedby="language-error"
          className="max-w-md"
          style={{ marginTop: 8 }}
          defaultValue=""
        >
          <option value="" disabled>
            Choose a language
          </option>
          <option value="en">English</option>
        </Dropdown>
        <p id="language-error">Choose a language.</p>
      </>,
    );

    const select = screen.getByRole('combobox', { name: 'Language' }) as HTMLSelectElement;
    expect(select.name).toBe('language');
    expect(select.required).toBe(true);
    expect(select.checkValidity()).toBe(false);
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-describedby')).toBe('language-error');
    expect(select.classList.contains('max-w-md')).toBe(true);
    expect(select.style.marginTop).toBe('8px');
    expect(ref.current).toBe(select);
    ref.current?.focus();
    expect(document.activeElement).toBe(select);
  });

  it('updates a controlled value through the native change event', () => {
    function ControlledDropdown() {
      const [value, setValue] = useState('en');
      return (
        <>
          <Dropdown
            aria-label="Language"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          >
            <option value="en">English</option>
            <option value="fil">Filipino</option>
          </Dropdown>
          <output aria-label="Selected language">{value}</output>
        </>
      );
    }
    render(<ControlledDropdown />);
    const select = screen.getByRole('combobox', { name: 'Language' }) as HTMLSelectElement;
    expect(select.value).toBe('en');

    fireEvent.change(select, { target: { value: 'fil' } });

    expect(select.value).toBe('fil');
    expect(screen.getByLabelText('Selected language').textContent).toBe('fil');
  });

  it('submits an uncontrolled value through an associated form and resets to its default', () => {
    render(
      <>
        <form id="preferences" aria-label="Preferences" />
        <Dropdown aria-label="Language" form="preferences" name="language" defaultValue="en">
          <option value="en">English</option>
          <option value="fil">Filipino</option>
        </Dropdown>
      </>,
    );
    const form = screen.getByRole('form', { name: 'Preferences' }) as HTMLFormElement;
    const select = screen.getByRole('combobox', { name: 'Language' }) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'fil' } });
    expect(new FormData(form).get('language')).toBe('fil');

    form.reset();

    expect(select.value).toBe('en');
    expect(new FormData(form).get('language')).toBe('en');
  });

  it('preserves grouped and disabled options and multiple selections', () => {
    render(
      <form aria-label="Preferences">
        <Dropdown aria-label="Languages" name="languages" multiple defaultValue={['en', 'fil']}>
          <optgroup label="Available">
            <option value="en">English</option>
            <option value="fil">Filipino</option>
          </optgroup>
          <option value="es" disabled>
            Spanish
          </option>
        </Dropdown>
      </form>,
    );
    const form = screen.getByRole('form', { name: 'Preferences' }) as HTMLFormElement;
    expect(screen.getByRole('listbox', { name: 'Languages' })).toBeTruthy();
    expect(screen.getByRole('group', { name: 'Available' })).toBeTruthy();
    expect((screen.getByRole('option', { name: 'Spanish' }) as HTMLOptionElement).disabled).toBe(
      true,
    );
    expect(new FormData(form).getAll('languages')).toEqual(['en', 'fil']);
  });

  it('keeps a disabled dropdown out of keyboard focus and form submission', () => {
    render(
      <form aria-label="Preferences">
        <Dropdown aria-label="Language" name="language" disabled defaultValue="en">
          <option value="en">English</option>
        </Dropdown>
      </form>,
    );
    const select = screen.getByRole('combobox', { name: 'Language' }) as HTMLSelectElement;
    const form = screen.getByRole('form', { name: 'Preferences' }) as HTMLFormElement;

    expect(select.disabled).toBe(true);
    select.focus();
    expect(document.activeElement).not.toBe(select);
    expect(new FormData(form).has('language')).toBe(false);
  });
});
