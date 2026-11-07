import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from '@portfolio/ui';

afterEach(() => {
  cleanup();
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
  it('expires each message independently after its own display interval', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastControls />
      </ToastProvider>,
    );

    expect(screen.queryByRole('status')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Success' }));
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.click(screen.getByRole('button', { name: 'Error' }));

    act(() => vi.advanceTimersByTime(1199));
    expect(screen.getAllByRole('status')).toHaveLength(2);

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getAllByRole('status').map((status) => status.textContent)).toEqual([
      'Could not save',
    ]);

    act(() => vi.advanceTimersByTime(999));
    expect(screen.getByRole('status').textContent).toBe('Could not save');
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('keeps repeated messages separate when they are added at the same time', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.25).mockReturnValueOnce(0.75);
    render(
      <ToastProvider>
        <ToastControls />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Success' }));
    fireEvent.click(screen.getByRole('button', { name: 'Success' }));

    expect(screen.getAllByRole('status').map((status) => status.textContent)).toEqual([
      'Saved successfully',
      'Saved successfully',
    ]);
    act(() => vi.advanceTimersByTime(2200));
    expect(screen.queryByRole('status')).toBeNull();
  });

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
      'Saved successfully',
      'Could not save',
      'Update available',
    ]);
  });

  it('throws when useToast is used outside its provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ToastControls />)).toThrow('useToast must be used within a ToastProvider');
  });
});
