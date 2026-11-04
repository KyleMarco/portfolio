import { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '@portfolio/ui';

afterEach(cleanup);

describe('Button', () => {
  it('renders its content and calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save changes</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports button attributes and disabled state', () => {
    const onClick = vi.fn();
    render(
      <Button type="submit" variant="secondary" disabled onClick={onClick}>
        Submit
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button.getAttribute('type')).toBe('submit');
    expect((button as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards native attributes and a ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button
        ref={ref}
        aria-label="Save profile"
        form="profile"
        name="action"
        value="save"
        className="w-full"
      >
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save profile' });
    expect(ref.current).toBe(button);
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('form')).toBe('profile');
    expect(button.getAttribute('name')).toBe('action');
    expect(button.getAttribute('value')).toBe('save');
    expect(button.classList.contains('w-full')).toBe(true);
    ref.current?.focus();
    expect(document.activeElement).toBe(button);
  });
});
