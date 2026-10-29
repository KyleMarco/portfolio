import { useCallback, useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PopupDialog } from './PopupDialog';

function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>
      {isOpen && (
        <PopupDialog
          labelledBy="dialog-title"
          closeLabel="Close dialog"
          onClose={closeDialog}
          initialFocusRef={closeRef}
          returnFocusRef={triggerRef}
          overlayClassName="flex items-center justify-center p-4"
          backdropClassName="bg-black/50"
          panelClassName="rounded-xl bg-white p-4"
        >
          <h2 id="dialog-title">Dialog title</h2>
          <button ref={closeRef} type="button" onClick={closeDialog}>
            Close
          </button>
          <button type="button">Last action</button>
        </PopupDialog>
      )}
    </>
  );
}

describe('PopupDialog', () => {
  it('traps focus, locks page scrolling, and restores focus on Escape', () => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'scroll';
    render(<DialogExample />);

    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Dialog title' });
    expect(dialog).toBeTruthy();
    expect(dialog.classList.contains('motion-enter')).toBe(true);
    expect(dialog.parentElement?.classList.contains('motion-backdrop-enter')).toBe(true);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    const lastAction = screen.getByRole('button', { name: 'Last action' });
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastAction);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('scroll');
    document.body.style.overflow = previousOverflow;
  });
});
