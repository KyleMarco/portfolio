import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  VirtualizedTable,
  type VirtualizedTableColumn,
  type VirtualizedTableProps,
} from '@portfolio/ui/virtualized';

type Person = {
  id: number;
  name: string;
  department: string;
  email: string;
};

const people: Person[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
  department: ['Design', 'Engineering', 'Product'][index % 3],
  email: `person${index + 1}@example.com`,
}));

const columns: VirtualizedTableColumn<Person>[] = [
  { id: 'name', header: 'Name', renderCell: (person) => person.name, width: 180 },
  {
    id: 'department',
    header: 'Department',
    renderCell: (person) => person.department,
    width: 160,
  },
  { id: 'email', header: 'Email', renderCell: (person) => person.email },
];

const meta = {
  title: 'Shared UI/VirtualizedTable',
  component: VirtualizedTable,
  tags: ['autodocs'],
  args: {
    items: people,
    columns,
    getRowKey: (person) => person.id,
    ariaLabel: 'People',
    className: 'overflow-hidden rounded-ui-md border border-ui-border bg-ui-surface',
    height: 320,
  },
} satisfies Meta<VirtualizedTableProps<Person>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
