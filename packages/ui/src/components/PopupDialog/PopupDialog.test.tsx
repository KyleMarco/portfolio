import { createRef, useCallback, useRef, useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PopupDialog } from '@portfolio/ui';

afterEach(cleanup);

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

function EditableDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Edit profile
      </button>
      {isOpen && (
        <PopupDialog
          labelledBy="profile-title"
          closeLabel="Dismiss profile"
          onClose={() => setIsOpen(false)}
          overlayClassName=""
          backdropClassName=""
          panelClassName=""
        >
          <h2 id="profile-title">Profile</h2>
          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        </PopupDialog>
      )}
    </>
  );
}

describe('PopupDialog', () => {
  it.each([
    {
      name: 'disabled controls with a tab index',
      excluded: (
        <button disabled tabIndex={0}>
          Excluded
        </button>
      ),
    },
    {
      name: 'disabled fieldset contents',
      excluded: (
        <fieldset disabled>
          <button>Excluded</button>
        </fieldset>
      ),
    },
    { name: 'negative tab indices', excluded: <input aria-label="Excluded" tabIndex={-1} /> },
    { name: 'hidden inputs', excluded: <input type="hidden" /> },
    {
      name: 'hidden subtrees',
      excluded: (
        <div hidden>
          <button>Excluded</button>
        </div>
      ),
    },
    {
      name: 'inert subtrees',
      excluded: (
        <div inert>
          <button>Excluded</button>
        </div>
      ),
    },
    {
      name: 'display-none subtrees',
      excluded: (
        <div style={{ display: 'none' }}>
          <button>Excluded</button>
        </div>
      ),
    },
    {
      name: 'invisible controls',
      excluded: <button style={{ visibility: 'hidden' }}>Excluded</button>,
    },
  ])('skips $name for initial focus and keyboard wrapping', ({ excluded }) => {
    render(
      <PopupDialog
        labelledBy="dialog-title"
        closeLabel="Dismiss dialog"
        onClose={() => undefined}
        overlayClassName=""
        backdropClassName=""
        panelClassName=""
      >
        <h2 id="dialog-title">Dialog title</h2>
        {excluded}
        <button type="button">First action</button>
        <button type="button">Last action</button>
        {excluded}
      </PopupDialog>,
    );

    const firstAction = screen.getByRole('button', { name: 'First action' });
    const lastAction = screen.getByRole('button', { name: 'Last action' });
    expect(document.activeElement).toBe(firstAction);

    lastAction.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(firstAction);

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastAction);
  });

  it('moves focus from a heading to the first or last action when tabbing', () => {
    const initialFocusRef = createRef<HTMLHeadingElement>();
    render(
      <PopupDialog
        labelledBy="dialog-title"
        closeLabel="Dismiss dialog"
        onClose={() => undefined}
        initialFocusRef={initialFocusRef}
        overlayClassName=""
        backdropClassName=""
        panelClassName=""
      >
        <h2 id="dialog-title" tabIndex={-1} ref={initialFocusRef}>
          Dialog title
        </h2>
        <button type="button">First action</button>
        <button type="button">Last action</button>
      </PopupDialog>,
    );

    expect(document.activeElement).toBe(initialFocusRef.current);
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Last action' }));

    initialFocusRef.current?.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'First action' }));
  });

  it('focuses the panel when tabbing with no available actions', () => {
    render(
      <>
        <button type="button">Outside action</button>
        <PopupDialog
          labelledBy="dialog-title"
          closeLabel="Dismiss dialog"
          onClose={() => undefined}
          overlayClassName=""
          backdropClassName=""
          panelClassName=""
        >
          <h2 id="dialog-title">Dialog title</h2>
          <button type="button" disabled>
            Unavailable action
          </button>
        </PopupDialog>
      </>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Dialog title' });
    expect(document.activeElement).toBe(dialog);

    for (const shiftKey of [false, true]) {
      screen.getByRole('button', { name: 'Outside action' }).focus();
      fireEvent.keyDown(window, { key: 'Tab', shiftKey });
      expect(document.activeElement).toBe(dialog);
    }
  });

  it('preserves focus while editing with an inline close callback and restores the trigger on close', () => {
    const previousOverflow = document.body.style.overflow;
    render(<EditableDialogExample />);

    const trigger = screen.getByRole('button', { name: 'Edit profile' });
    trigger.focus();
    fireEvent.click(trigger);

    const input = screen.getByRole('textbox', { name: 'Name' });
    input.focus();
    fireEvent.change(input, { target: { value: 'Marco' } });

    expect(document.activeElement).toBe(input);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it('uses the latest close callback for Escape and backdrop clicks after rerendering', () => {
    const originalClose = vi.fn();
    const updatedClose = vi.fn();
    const renderDialog = (onClose: () => void) => (
      <PopupDialog
        labelledBy="dialog-title"
        closeLabel="Dismiss dialog"
        onClose={onClose}
        overlayClassName=""
        backdropClassName=""
        panelClassName=""
      >
        <h2 id="dialog-title">Dialog title</h2>
        <button type="button">Action</button>
      </PopupDialog>
    );
    const { rerender, unmount } = render(renderDialog(originalClose));

    rerender(renderDialog(updatedClose));
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss dialog' }));

    expect(originalClose).not.toHaveBeenCalled();
    expect(updatedClose).toHaveBeenCalledTimes(2);

    unmount();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(updatedClose).toHaveBeenCalledTimes(2);
  });

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

    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('scroll');
    document.body.style.overflow = previousOverflow;
  });
});
