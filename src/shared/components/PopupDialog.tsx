import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

type PopupDialogProps = {
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

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusableElement = focusableElements?.[0];
    const initialFocus = initialFocusRef?.current ?? firstFocusableElement ?? dialogRef.current;
    initialFocus?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const currentFocusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = currentFocusableElements?.[0];
      const lastElement = currentFocusableElements?.[currentFocusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (!dialogRef.current?.contains(document.activeElement)) {
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [initialFocusRef, onClose, returnFocusRef]);

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
