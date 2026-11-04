import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast';

function ToastActions() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        className="rounded-lg bg-stone-950 px-4 py-2 font-semibold text-white"
        onClick={() => toast.success('Saved successfully')}
        type="button"
      >
        Show success
      </button>
      <button
        className="rounded-lg bg-stone-950 px-4 py-2 font-semibold text-white"
        onClick={() => toast.error('Could not save changes')}
        type="button"
      >
        Show error
      </button>
      <button
        className="rounded-lg bg-stone-950 px-4 py-2 font-semibold text-white"
        onClick={() => toast.info('A new update is available')}
        type="button"
      >
        Show info
      </button>
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
