import type { Meta, StoryObj } from '@storybook/react-vite';
import { VirtualizedList, type VirtualizedListProps } from '@portfolio/ui/virtualized';

const items = Array.from({ length: 1000 }, (_, index) => `Record ${index + 1}`);

const meta = {
  title: 'Shared UI/VirtualizedList',
  component: VirtualizedList,
  tags: ['autodocs'],
  args: {
    items,
    ariaLabel: 'Records',
    className: 'rounded-ui-md border border-ui-border bg-ui-surface',
    itemClassName: 'border-b border-ui-border px-4 py-3 text-sm text-ui-text',
    renderItem: (item) => item,
    height: 320,
  },
} satisfies Meta<VirtualizedListProps<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
