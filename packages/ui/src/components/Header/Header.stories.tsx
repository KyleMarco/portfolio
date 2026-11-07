import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Container, Header, Link } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: (
      <Container
        className="flex flex-wrap items-center justify-between gap-ui-4"
        style={{ marginBlock: 0, paddingBlock: 0 }}
      >
        <Link href="#home" className="text-lg font-semibold">
          Portfolio
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap gap-ui-4">
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </Container>
    ),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    children: (
      <Container
        className="flex flex-wrap items-center justify-between gap-ui-4"
        style={{ marginBlock: 0, paddingBlock: 0 }}
      >
        <Link href="#home" className="text-lg font-semibold">
          Workspace
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap gap-ui-4">
          <Link href="#projects">Projects</Link>
          <Link href="#team">Team</Link>
        </nav>
        <Button onClick={() => window.alert('Create project selected')}>Create project</Button>
      </Container>
    ),
  },
};
