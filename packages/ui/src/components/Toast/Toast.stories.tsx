import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ToastProvider, useToast } from '@portfolio/ui';

function ToastActions() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast.success('Saved successfully')} type="button">
        Show success
      </Button>
      <Button onClick={() => toast.error('Could not save changes')} type="button">
        Show error
      </Button>
      <Button onClick={() => toast.info('A new update is available')} type="button">
        Show info
      </Button>
    </div>
  );
}

const meta = {
  title: 'Shared UI/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
  args: {
    children: null,
  },
  render: () => (
    <ToastProvider>
      <ToastActions />
    </ToastProvider>
  ),
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
