import { useRef, useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, PopupDialog, TextInput } from '@portfolio/ui';

function PopupDialogExample({
  editable = false,
  focusHeading = false,
  ...props
}: ComponentProps<typeof PopupDialog> & { editable?: boolean; focusHeading?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setIsOpen(true)}>
        Open dialog
      </Button>
      {isOpen && (
        <PopupDialog
          {...props}
          onClose={closeDialog}
          initialFocusRef={focusHeading ? headingRef : closeRef}
          returnFocusRef={triggerRef}
        >
          <h2 id={props.labelledBy} ref={headingRef} tabIndex={focusHeading ? -1 : undefined}>
            Account settings
          </h2>
          <p>{props.children}</p>
          {editable && (
            <label className="my-4 block">
              Display name
              <TextInput value={name} onChange={(event) => setName(event.target.value)} />
            </label>
          )}
          <Button ref={closeRef} onClick={closeDialog}>
            Close dialog
          </Button>
          {focusHeading && (
            <Button disabled tabIndex={0}>
              Unavailable action
            </Button>
          )}
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

export const EditableContent: Story = {
  render: (args) => <PopupDialogExample {...args} editable />,
};

export const KeyboardFocus: Story = {
  render: (args) => <PopupDialogExample {...args} editable focusHeading />,
};
