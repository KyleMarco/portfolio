import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Message',
    placeholder: 'Write a message',
    rows: 4,
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'This message cannot be edited.',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
};
