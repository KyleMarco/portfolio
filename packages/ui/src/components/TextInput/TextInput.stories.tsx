import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter a value',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <label className="grid w-full max-w-sm gap-2 font-ui-sans text-sm text-ui-text">
      Full name
      <TextInput {...args} autoComplete="name" />
    </label>
  ),
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'name@example.com',
  },
  render: (args) => (
    <label className="grid w-full max-w-sm gap-2 font-ui-sans text-sm text-ui-text">
      Email address
      <TextInput {...args} autoComplete="email" />
    </label>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Unavailable',
  },
  render: (args) => (
    <label className="grid w-full max-w-sm gap-2 font-ui-sans text-sm text-ui-text">
      Account name
      <TextInput {...args} />
    </label>
  ),
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    value: 'not-an-email',
  },
  render: (args) => (
    <label className="grid w-full max-w-sm gap-2 font-ui-sans text-sm text-ui-text">
      Email address
      <TextInput {...args} type="email" />
      <span className="text-sm text-ui-error">Enter a valid email address.</span>
    </label>
  ),
};
