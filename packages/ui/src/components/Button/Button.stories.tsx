import type { Meta, StoryObj } from '@storybook/react-vite';
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
    children: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
};
