import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'A short supporting caption.',
  },
};

export const Label: Story = {
  args: {
    as: 'label',
    variant: 'label',
    children: 'Email address',
  },
};
