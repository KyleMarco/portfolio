import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Card, Link, Text } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated'],
    },
  },
  args: {
    children: (
      <>
        <h2 className="mb-ui-2 text-lg font-semibold">Project overview</h2>
        <Text as="p" className="mb-0">
          Group related content on a shared, themed surface.
        </Text>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Elevated: Story = {
  args: { variant: 'elevated' },
};

export const WithActions: Story = {
  args: {
    children: (
      <>
        <h2 className="mb-ui-2 text-lg font-semibold">Profile settings</h2>
        <Text as="p" className="mb-ui-4">
          Manage the details you share with your team.
        </Text>
        <div className="flex flex-wrap items-center gap-ui-4">
          <Button>Edit profile</Button>
          <Link href="mailto:hello@example.com">Contact support</Link>
        </div>
      </>
    ),
  },
};

export const ResponsiveGrid: Story = {
  render: (args) => (
    <div className="grid gap-ui-4 sm:grid-cols-2 lg:grid-cols-3">
      {['Design', 'Development', 'Accessibility'].map((title) => (
        <Card {...args} key={title} style={{ ...args.style, marginBlock: 0 }}>
          <h2 className="mb-ui-2 text-lg font-semibold">{title}</h2>
          <Text as="p" className="mb-0">
            The grid owns the gaps; card margins are reset so spacing stays consistent.
          </Text>
        </Card>
      ))}
    </div>
  ),
};
