import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link, Text } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Contact me',
    href: 'mailto:hello@example.com',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inline: Story = {
  render: (args) => (
    <Text as="p">
      Have a project in mind? <Link {...args} /> to discuss the details.
    </Text>
  ),
};

export const External: Story = {
  args: {
    children: 'Visit example.com (opens in a new tab)',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const Download: Story = {
  args: {
    children: 'Download sample text',
    href: 'data:text/plain;charset=utf-8,Hello%20from%20Shared%20UI!',
    download: 'sample.txt',
  },
};
