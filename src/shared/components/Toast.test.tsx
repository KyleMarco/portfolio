import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast';

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function ToastControls() {
  const toast = useToast();

  return (
    <>
      <button onClick={() => toast.success('Saved successfully')}>Success</button>
      <button onClick={() => toast.error('Could not save')}>Error</button>
      <button onClick={() => toast.info('Update available')}>Info</button>
    </>
  );
}

describe('ToastProvider', () => {
  it('displays messages for each toast variant', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastControls />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Success' }));
    fireEvent.click(screen.getByRole('button', { name: 'Error' }));
    fireEvent.click(screen.getByRole('button', { name: 'Info' }));

    expect(screen.getAllByRole('status').map((status) => status.textContent)).toEqual([
      '✓Saved successfully',
      '!Could not save',
      'iUpdate available',
    ]);
  });

  it('throws when useToast is used outside its provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ToastControls />)).toThrow('useToast must be used within a ToastProvider');
  });
});
