import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    id: 'language',
    name: 'language',
    defaultValue: '',
    children: (
      <>
        <option value="" disabled>
          Choose a language
        </option>
        <option value="en">English</option>
        <option value="fil">Filipino</option>
      </>
    ),
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Language
      </label>
      <Dropdown {...args} />
    </div>
  ),
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  args: { id: 'controlled-language', defaultValue: undefined },
  render: function ControlledDropdown(args) {
    const [value, setValue] = useState('en');

    return (
      <div className="grid w-full max-w-md gap-ui-2">
        <label htmlFor={args.id} className="font-semibold">
          Language
        </label>
        <Dropdown
          {...args}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <p className="text-sm text-ui-text-muted" aria-live="polite">
          Selected value: {value}
        </p>
      </div>
    );
  },
};

export const Grouped: Story = {
  args: {
    id: 'grouped-language',
    defaultValue: 'en',
    children: (
      <>
        <optgroup label="Available">
          <option value="en">English</option>
          <option value="fil">Filipino</option>
        </optgroup>
        <optgroup label="Coming soon">
          <option value="es" disabled>
            Spanish
          </option>
        </optgroup>
      </>
    ),
  },
};

export const Multiple: Story = {
  args: {
    id: 'multiple-languages',
    name: 'languages',
    multiple: true,
    defaultValue: ['en', 'fil'],
    children: (
      <>
        <option value="en">English</option>
        <option value="fil">Filipino</option>
        <option value="es">Spanish</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { id: 'disabled-language', disabled: true, defaultValue: 'en' },
};

export const Invalid: Story = {
  args: {
    id: 'invalid-language',
    required: true,
    'aria-invalid': true,
    'aria-describedby': 'language-error',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Language (required)
      </label>
      <Dropdown {...args} />
      <p id="language-error" className="text-sm text-ui-error">
        Choose a language before submitting.
      </p>
    </div>
  ),
};
