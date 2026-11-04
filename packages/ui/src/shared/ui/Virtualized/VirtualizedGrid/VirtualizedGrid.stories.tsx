import type { Meta, StoryObj } from '@storybook/react-vite';
import { VirtualizedGrid, type VirtualizedGridProps } from './VirtualizedGrid';

const items = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  label: `Cell ${index + 1}`,
}));

const meta = {
  title: 'Shared UI/VirtualizedGrid',
  component: VirtualizedGrid,
  tags: ['autodocs'],
  args: {
    items,
    columnCount: 25,
    ariaLabel: 'Sample data grid',
    className: 'rounded-xl border border-stone-200 bg-white',
    cellClassName: 'border-b border-r border-stone-100 p-3 text-sm text-stone-700',
    renderCell: (item) => item.label,
    height: 320,
  },
} satisfies Meta<VirtualizedGridProps<(typeof items)[number]>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
