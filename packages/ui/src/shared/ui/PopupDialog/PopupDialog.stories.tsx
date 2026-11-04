import { useCallback, useRef, useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopupDialog } from './PopupDialog';

function PopupDialogExample(props: ComponentProps<typeof PopupDialog>) {
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
          {...props}
          onClose={closeDialog}
          initialFocusRef={closeRef}
          returnFocusRef={triggerRef}
        >
          <h2 id={props.labelledBy}>Account settings</h2>
          <p>{props.children}</p>
          <button ref={closeRef} type="button" onClick={closeDialog}>
            Close dialog
          </button>
        </PopupDialog>
      )}
    </>
  );
}

const meta = {
  title: 'Shared UI/PopupDialog',
  component: PopupDialog,
  tags: ['autodocs'],
  render: (args) => <PopupDialogExample {...args} />,
  args: {
    children: 'Manage your profile and notification preferences.',
    labelledBy: 'account-settings-title',
    closeLabel: 'Dismiss dialog',
    onClose: () => undefined,
    overlayClassName: 'flex items-center justify-center p-4',
    backdropClassName: 'bg-black/50',
    panelClassName: 'w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl',
  },
} satisfies Meta<typeof PopupDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
