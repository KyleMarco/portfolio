import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Footer, Header, Link, Text } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Footer',
  component: Footer,
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
        <Text as="p" className="mb-0">
          Built with care.
        </Text>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-ui-4">
          <Link href="mailto:hello@example.com">Contact</Link>
          <Link href="#top">Back to top</Link>
        </nav>
      </Container>
    ),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Columns: Story = {
  args: {
    children: (
      <Container
        className="grid gap-ui-8 sm:grid-cols-3"
        style={{ marginBlock: 0, paddingBlock: 0 }}
      >
        <div>
          <p className="mb-ui-2 font-semibold">Portfolio</p>
          <Text as="p" className="mb-0">
            Thoughtful interfaces for everyday work.
          </Text>
        </div>
        <nav aria-label="Explore" className="flex flex-col items-start gap-ui-3">
          <p className="font-semibold">Explore</p>
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
        </nav>
        <nav aria-label="Connect" className="flex flex-col items-start gap-ui-3">
          <p className="font-semibold">Connect</p>
          <Link href="mailto:hello@example.com">Email</Link>
          <Link href="#contact">Contact details</Link>
        </nav>
      </Container>
    ),
  },
};

export const PageLayout: Story = {
  render: (args) => (
    <div id="top" className="flex min-h-[32rem] flex-col bg-ui-canvas">
      <Header>
        <Container
          className="flex flex-wrap items-center justify-between gap-ui-4"
          style={{ marginBlock: 0, paddingBlock: 0 }}
        >
          <Link href="#top" className="text-lg font-semibold">
            Portfolio
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="#content">Read introduction</Link>
          </nav>
        </Container>
      </Header>
      <main id="content" className="flex-1">
        <Container>
          <h1 className="mb-ui-4 text-3xl font-semibold">A place for your work</h1>
          <Text as="p">
            Compose a page with shared landmarks and responsive content containers.
          </Text>
        </Container>
      </main>
      <Footer {...args} />
    </div>
  ),
};
