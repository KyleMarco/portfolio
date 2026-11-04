import type { Meta, StoryObj } from '@storybook/react-vite';
import { VirtualizedList, type VirtualizedListProps } from './VirtualizedList';

const items = Array.from({ length: 1000 }, (_, index) => `Record ${index + 1}`);

const meta = {
  title: 'Shared UI/VirtualizedList',
  component: VirtualizedList,
  tags: ['autodocs'],
  args: {
    items,
    ariaLabel: 'Records',
    className: 'rounded-xl border border-stone-200 bg-white',
    itemClassName: 'border-b border-stone-100 px-4 py-3 text-sm text-stone-800',
    renderItem: (item) => item,
    height: 320,
  },
} satisfies Meta<VirtualizedListProps<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
