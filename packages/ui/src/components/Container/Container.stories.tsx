import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Text } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
  args: {
    children: (
      <div className="rounded-ui-lg border border-ui-border bg-ui-surface p-ui-4">
        <Text as="p">Centered content with responsive horizontal padding.</Text>
      </div>
    ),
    className: 'py-ui-8',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const FullWidth: Story = {
  args: { size: 'full' },
};
