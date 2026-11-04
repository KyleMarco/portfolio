import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

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
