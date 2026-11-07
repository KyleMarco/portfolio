import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Full name',
    placeholder: 'Enter your name',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Alex Morgan',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
};
