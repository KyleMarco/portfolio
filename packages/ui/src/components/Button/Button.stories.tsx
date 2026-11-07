import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sun } from 'lucide-react';
import { Button } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Save changes',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    type: 'submit',
    children: 'Submit form',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    variant: 'secondary',
    'aria-label': 'Toggle theme',
    children: <Sun aria-hidden="true" focusable="false" className="size-4" />,
  },
};
