import { useCallback, useRef, useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, PopupDialog } from '@portfolio/ui';

function PopupDialogExample(props: ComponentProps<typeof PopupDialog>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setIsOpen(true)}>
        Open dialog
      </Button>
      {isOpen && (
        <PopupDialog
          {...props}
          onClose={closeDialog}
          initialFocusRef={closeRef}
          returnFocusRef={triggerRef}
        >
          <h2 id={props.labelledBy}>Account settings</h2>
          <p>{props.children}</p>
          <Button ref={closeRef} onClick={closeDialog}>
            Close dialog
          </Button>
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
    panelClassName: 'w-full max-w-md rounded-ui-lg bg-ui-surface p-6 text-ui-text shadow-ui-dialog',
  },
} satisfies Meta<typeof PopupDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
