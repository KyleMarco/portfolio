import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Motion',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drift: Story = {
  render: () => (
    <div className="relative h-64 overflow-hidden rounded-ui-lg bg-ui-surface-muted">
      <div className="motion-drift absolute left-10 top-10 size-36 rounded-full bg-ui-action/20" />
      <div className="motion-drift [animation-delay:-9s] absolute right-10 top-10 size-36 rounded-full bg-ui-action/40" />
    </div>
  ),
};

export const Flip: Story = {
  render: () => (
    <div className="flex min-h-40 items-center justify-center">
      <div className="motion-flip flex size-24 items-center justify-center rounded-ui-lg bg-ui-action text-ui-on-action">
        Flip
      </div>
    </div>
  ),
};

function RevealExample() {
  const [state, setState] = useState<'hidden' | 'visible'>();

  return (
    <div className="space-y-6">
      <Button onClick={() => setState(state === 'hidden' ? 'visible' : 'hidden')}>
        {state === 'hidden' ? 'Reveal sample' : 'Hide sample'}
      </Button>
      <p className="motion-reveal rounded-ui-lg bg-ui-surface-muted p-6" data-reveal-state={state}>
        The sample stays visible with reduced motion or when no reveal state is set.
      </p>
    </div>
  );
}

export const Reveal: Story = {
  render: () => <RevealExample />,
};
