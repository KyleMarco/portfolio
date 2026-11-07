import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight } from 'lucide-react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { LinkButton } from '@portfolio/ui/router';

function CurrentLocation() {
  const { pathname, search, hash } = useLocation();

  return (
    <p role="status" className="break-all text-sm">
      Current location: <code>{`${pathname}${search}${hash}`}</code>
    </p>
  );
}

const meta = {
  title: 'Shared UI/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A React Router link with shared button styles. Requires a router provider and supports Link props and anchor attributes, including refs. Use it for navigation within an app.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      table: { defaultValue: { summary: 'primary' } },
    },
    children: { control: 'text' },
    to: { description: 'The destination as a path string or a pathname, search, and hash object.' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    children: 'View project',
    to: '/projects/sample',
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const WithIcon: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {
    children: (
      <>
        View project
        <ArrowRight aria-hidden="true" focusable="false" className="size-4" />
      </>
    ),
  },
};

export const Navigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Activate the link with a click or Enter to see the destination update inside the memory router. The Storybook URL stays unchanged.',
      },
    },
  },
  args: {
    to: { pathname: '/projects/sample', search: '?tab=details', hash: '#overview' },
  },
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <LinkButton {...args} />
      <CurrentLocation />
    </div>
  ),
};
