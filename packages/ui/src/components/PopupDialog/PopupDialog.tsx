import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

function getTabbableElements(dialog: HTMLElement | null): HTMLElement[] {
  const candidates = dialog?.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]',
  );

  return Array.from(candidates ?? []).filter((element) => {
    if (
      element.tabIndex < 0 ||
      element.matches(':disabled, input[type="hidden"]') ||
      element.closest('[hidden], [inert]')
    ) {
      return false;
    }

    const { visibility } = window.getComputedStyle(element);
    if (visibility === 'hidden' || visibility === 'collapse') {
      return false;
    }

    for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
      if (window.getComputedStyle(ancestor).display === 'none') {
        return false;
      }
    }

    return true;
  });
}

export type PopupDialogProps = {
  children: ReactNode;
  labelledBy: string;
  closeLabel: string;
  onClose: () => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  overlayClassName: string;
  backdropClassName: string;
  panelClassName: string;
};

export function PopupDialog({
  children,
  labelledBy,
  closeLabel,
  onClose,
  initialFocusRef,
  returnFocusRef,
  overlayClassName,
  backdropClassName,
  panelClassName,
}: PopupDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = returnFocusRef?.current ?? document.activeElement;
    document.body.style.overflow = 'hidden';

    const [firstFocusableElement] = getTabbableElements(dialogRef.current);
    const initialFocus = initialFocusRef?.current ?? firstFocusableElement ?? dialogRef.current;
    initialFocus?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [initialFocusRef, returnFocusRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const currentFocusableElements = getTabbableElements(dialogRef.current);
      const firstElement = currentFocusableElements[0];
      const lastElement = currentFocusableElements[currentFocusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialogRef.current?.focus();
      } else if (!currentFocusableElements.some((element) => element === document.activeElement)) {
        event.preventDefault();
        const nextElement = event.shiftKey ? lastElement : firstElement;
        nextElement.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={`motion-backdrop-enter fixed inset-0 z-50 ${overlayClassName}`}>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full cursor-default ${backdropClassName}`}
      />
      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`motion-enter relative z-10 ${panelClassName}`}
      >
        {children}
      </section>
    </div>,
    document.body,
  );
}
