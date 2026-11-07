import { createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { VirtualizedDropdown, type VirtualizedDropdownOption } from '@portfolio/ui/virtualized';

const options: VirtualizedDropdownOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
];
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return Number.parseFloat(this.style.height) || 120;
  });
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return this.offsetHeight;
  });
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(280);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(280);
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    const inner = this.firstElementChild;
    return inner instanceof HTMLElement ? Number.parseFloat(inner.style.height) || 120 : 120;
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value(this: HTMLElement, position: ScrollToOptions) {
      this.scrollTop = position.top ?? 0;
      this.dispatchEvent(new Event('scroll'));
    },
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  if (originalScrollTo) Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
  else delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo;
});

function activeOption(trigger = screen.getByRole('combobox')) {
  const id = trigger.getAttribute('aria-activedescendant');
  expect(id).toBeTruthy();
  const option = document.getElementById(id!);
  expect(option?.getAttribute('role')).toBe('option');
  return option!;
}

describe('VirtualizedDropdown', () => {
  it('renders a bounded window of 10,000 options and exposes its label, ref, and list positions', () => {
    const ref = createRef<HTMLButtonElement>();
    const records = Array.from({ length: 10000 }, (_, index) => ({
      value: String(index),
      label: `Record ${index + 1}`,
    }));
    render(
      <>
        <label htmlFor="record">Record</label>
        <VirtualizedDropdown
          id="record"
          ref={ref}
          options={records}
          height={120}
          optionHeight={40}
          overscan={1}
          className="custom-field"
          aria-describedby="record-help"
        />
        <p id="record-help">Choose a record.</p>
      </>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Record' });
    expect(ref.current).toBe(trigger);
    expect(trigger.classList.contains('custom-field')).toBe(true);
    expect(trigger.getAttribute('aria-describedby')).toBe('record-help');
    expect(screen.queryByRole('listbox')).toBeNull();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(document.activeElement).toBe(trigger);
    expect(trigger.getAttribute('aria-controls')).toBe(screen.getByRole('listbox').id);
    expect(screen.getAllByRole('option').length).toBeLessThan(10);
    expect(activeOption().textContent).toBe('Record 1');
    expect(activeOption().getAttribute('aria-posinset')).toBe('1');
    expect(activeOption().getAttribute('aria-setsize')).toBe('10000');
    expect(screen.queryByRole('option', { name: 'Record 10000' })).toBeNull();
    // The form proxy contains only the empty and currently selected values.
    expect(document.querySelectorAll('select option').length).toBe(1);
  });

  it('keeps the active option mounted across virtual boundaries and pointer scrolling', async () => {
    const records = Array.from({ length: 10000 }, (_, index) => ({
      value: String(index),
      label: `Record ${index + 1}`,
    }));
    const onValueChange = vi.fn();
    render(
      <VirtualizedDropdown
        options={records}
        aria-label="Record"
        height={120}
        overscan={1}
        onValueChange={onValueChange}
      />,
    );
    const trigger = screen.getByRole('combobox');
    fireEvent.keyDown(trigger, { key: 'End' });
    expect(activeOption().textContent).toBe('Record 10000');
    expect(screen.getAllByRole('option').length).toBeLessThan(10);
    await waitFor(() => expect(screen.getByRole('listbox').scrollTop).toBeGreaterThan(390000));

    fireEvent.scroll(screen.getByRole('listbox'), { target: { scrollTop: 0 } });
    await waitFor(() => expect(screen.getByRole('option', { name: 'Record 1' })).toBeTruthy());
    expect(activeOption().textContent).toBe('Record 10000');
    expect(screen.getAllByRole('option').length).toBeLessThan(10);
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('9999');
    expect(trigger.textContent).toBe('Record 10000');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('skips disabled options, supports Home/End, and cancels changes with Escape', () => {
    const onValueChange = vi.fn();
    render(
      <VirtualizedDropdown
        options={options}
        aria-label="Fruit"
        defaultValue="apricot"
        onValueChange={onValueChange}
      />,
    );
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(activeOption().textContent).toBe('Apricot');
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(activeOption().textContent).toBe('Blueberry');
    fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(activeOption().textContent).toBe('Apricot');
    fireEvent.keyDown(trigger, { key: 'End' });
    expect(activeOption().textContent).toBe('Cherry');
    fireEvent.keyDown(trigger, { key: 'Home' });
    expect(activeOption().textContent).toBe('Apple');
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(trigger.getAttribute('aria-activedescendant')).toBeNull();
    expect(trigger.textContent).toBe('Apricot');
    expect(document.activeElement).toBe(trigger);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('supports multi-character typeahead, repeated-letter cycling, and timeout', () => {
    let time = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => time);
    render(<VirtualizedDropdown options={options} aria-label="Fruit" />);
    const trigger = screen.getByRole('combobox');
    fireEvent.keyDown(trigger, { key: 'a' });
    expect(activeOption().textContent).toBe('Apple');
    fireEvent.keyDown(trigger, { key: 'a' });
    expect(activeOption().textContent).toBe('Apricot');
    time += 1000;
    fireEvent.keyDown(trigger, { key: 'b' });
    expect(activeOption().textContent).toBe('Blueberry');
    fireEvent.keyDown(trigger, { key: 'l' });
    expect(activeOption().textContent).toBe('Blueberry');
    fireEvent.keyDown(trigger, { key: 'Escape' });
    fireEvent.keyDown(trigger, { key: 'c' });
    expect(activeOption().textContent).toBe('Cherry');
  });

  it('commits with Space and Tab without preventing normal Tab navigation', () => {
    render(<VirtualizedDropdown options={options} aria-label="Fruit" />);
    const trigger = screen.getByRole('combobox');
    fireEvent.keyDown(trigger, { key: ' ' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(trigger.textContent).toBe('Apricot');
    fireEvent.keyDown(trigger, { key: 'End' });
    expect(fireEvent.keyDown(trigger, { key: 'Tab' })).toBe(true);
    expect(trigger.textContent).toBe('Cherry');
    expect(screen.queryByRole('listbox')).toBeNull();
    fireEvent.keyDown(trigger, { key: 'a' });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(trigger.textContent).toBe('Apple');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('selects by pointer, ignores disabled options, and dismisses on outside interaction or blur', () => {
    render(
      <>
        <VirtualizedDropdown options={options} aria-label="Fruit" />
        <button>Next</button>
      </>,
    );
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(screen.getByRole('listbox')).toBeTruthy();
    fireEvent.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(trigger.textContent).toBe('Cherry');
    expect(document.activeElement).toBe(trigger);
    fireEvent.click(trigger);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Next' }));
    expect(screen.queryByRole('listbox')).toBeNull();
    fireEvent.click(trigger);
    fireEvent.blur(trigger, { relatedTarget: screen.getByRole('button', { name: 'Next' }) });
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('supports controlled values and follows external updates', () => {
    function Controlled() {
      const [value, setValue] = useState('apple');
      return (
        <>
          <VirtualizedDropdown
            options={options}
            aria-label="Fruit"
            value={value}
            onValueChange={setValue}
          />
          <button onClick={() => setValue('cherry')}>Change externally</button>
        </>
      );
    }
    render(<Controlled />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Apricot' }));
    expect(trigger.textContent).toBe('Apricot');
    fireEvent.click(screen.getByRole('button', { name: 'Change externally' }));
    expect(trigger.textContent).toBe('Cherry');
    fireEvent.click(trigger);
    expect(screen.getByRole('option', { name: 'Cherry' }).getAttribute('aria-selected')).toBe(
      'true',
    );
  });

  it('submits through an associated form and resets an uncontrolled value', async () => {
    render(
      <>
        <form id="preferences" aria-label="Preferences" />
        <VirtualizedDropdown
          options={options}
          aria-label="Fruit"
          name="fruit"
          form="preferences"
          defaultValue="apple"
        />
      </>,
    );
    const form = screen.getByRole('form') as HTMLFormElement;
    const trigger = screen.getByRole('combobox');
    expect(new FormData(form).get('fruit')).toBe('apple');
    fireEvent.keyDown(trigger, { key: 'End' });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(new FormData(form).get('fruit')).toBe('cherry');
    await act(async () => form.reset());
    expect(trigger.textContent).toBe('Apple');
    expect(new FormData(form).get('fruit')).toBe('apple');
  });

  it('preserves controlled values and canceled resets in form data', async () => {
    const { rerender } = render(
      <form aria-label="Preferences">
        <VirtualizedDropdown options={options} aria-label="Fruit" name="fruit" value="cherry" />
      </form>,
    );
    const form = screen.getByRole('form') as HTMLFormElement;
    await act(async () => form.reset());
    expect(new FormData(form).get('fruit')).toBe('cherry');
    rerender(
      <form aria-label="Preferences" onReset={(event) => event.preventDefault()}>
        <VirtualizedDropdown
          options={options}
          aria-label="Fruit"
          name="fruit"
          defaultValue="apple"
        />
      </form>,
    );
    const trigger = screen.getByRole('combobox');
    fireEvent.keyDown(trigger, { key: 'End' });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    await act(async () => form.reset());
    expect(new FormData(form).get('fruit')).toBe('cherry');
  });

  it('validates required fields, describes the error, and focuses the visible control', () => {
    render(
      <form aria-label="Preferences">
        <VirtualizedDropdown options={options} aria-label="Fruit" name="fruit" required />
      </form>,
    );
    const form = screen.getByRole('form') as HTMLFormElement;
    const trigger = screen.getByRole('combobox');
    act(() => {
      expect(form.checkValidity()).toBe(false);
    });
    expect(trigger.getAttribute('aria-required')).toBe('true');
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    expect(document.activeElement).toBe(trigger);
    expect(
      document.getElementById(trigger.getAttribute('aria-describedby')!)?.textContent,
    ).toBeTruthy();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Apple' }));
    expect(trigger.getAttribute('aria-invalid')).toBeNull();
    expect(form.checkValidity()).toBe(true);
  });

  it('clears native validation feedback when a controlled value is supplied externally', () => {
    const onInvalid = vi.fn();
    const { rerender } = render(
      <form aria-label="Preferences">
        <VirtualizedDropdown
          options={options}
          aria-label="Fruit"
          required
          value=""
          onInvalid={onInvalid}
        />
      </form>,
    );
    act(() => {
      (screen.getByRole('form') as HTMLFormElement).checkValidity();
    });
    expect(onInvalid).toHaveBeenCalledOnce();
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBe('true');
    rerender(
      <form aria-label="Preferences">
        <VirtualizedDropdown
          options={options}
          aria-label="Fruit"
          required
          value="apple"
          onInvalid={onInvalid}
        />
      </form>,
    );
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBeNull();
    expect(screen.getByRole('combobox').getAttribute('aria-describedby')).toBeNull();
    expect((screen.getByRole('form') as HTMLFormElement).checkValidity()).toBe(true);
  });

  it('respects native disabled fieldsets', () => {
    render(
      <form aria-label="Preferences">
        <fieldset disabled>
          <VirtualizedDropdown
            options={options}
            aria-label="Fruit"
            name="fruit"
            defaultValue="apple"
            required
          />
        </fieldset>
      </form>,
    );
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).has('fruit')).toBe(false);
    expect((screen.getByRole('form') as HTMLFormElement).checkValidity()).toBe(true);
  });

  it('handles disabled controls, empty lists, and lists with only disabled options', () => {
    const { rerender } = render(
      <form aria-label="Preferences">
        <VirtualizedDropdown
          options={options}
          aria-label="Fruit"
          name="fruit"
          disabled
          defaultValue="apple"
        />
      </form>,
    );
    const trigger = screen.getByRole('combobox') as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
    trigger.focus();
    expect(document.activeElement).not.toBe(trigger);
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).has('fruit')).toBe(false);
    rerender(
      <VirtualizedDropdown options={[]} aria-label="Fruit" emptyMessage="Nothing available" />,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('status').textContent).toBe('Nothing available');
    expect(screen.getByRole('combobox').getAttribute('aria-activedescendant')).toBeNull();
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    rerender(
      <VirtualizedDropdown
        options={options.map((option) => ({ ...option, disabled: true }))}
        aria-label="Fruit"
      />,
    );
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'End' });
    expect(screen.getByRole('combobox').getAttribute('aria-activedescendant')).toBeNull();
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('updates active targets when options change and closes when disabled', () => {
    const { rerender } = render(
      <VirtualizedDropdown options={options} aria-label="Fruit" defaultValue="cherry" />,
    );
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    expect(activeOption().textContent).toBe('Cherry');
    rerender(
      <VirtualizedDropdown options={[options[0]]} aria-label="Fruit" defaultValue="cherry" />,
    );
    expect(activeOption().textContent).toBe('Apple');
    expect(trigger.textContent).toBe('Choose an option');
    rerender(<VirtualizedDropdown options={options} aria-label="Fruit" disabled />);
    expect(screen.queryByRole('listbox')).toBeNull();
    rerender(<VirtualizedDropdown options={options} aria-label="Fruit" />);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('allows consumer handlers to prevent opening and positions a constrained popup above the trigger', () => {
    const { rerender } = render(
      <VirtualizedDropdown
        options={options}
        aria-label="Fruit"
        onClick={(event) => event.preventDefault()}
        onKeyDown={(event) => event.preventDefault()}
      />,
    );
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.queryByRole('listbox')).toBeNull();
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(0, window.innerHeight - 50, 280, 40),
    );
    rerender(<VirtualizedDropdown options={options} aria-label="Fruit" />);
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox').parentElement?.classList.contains('bottom-full')).toBe(true);
  });
});
